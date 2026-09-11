"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  ArrowRight,
  MapPin,
  Building2,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getIcon } from "../components/Icon";
import type { ContactPage, SiteSettings } from "../../sanity/lib/types";
import { useContactForm } from "../components/useContactForm";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Hero({ page, site }: { page: ContactPage; site: SiteSettings | null }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  const heroImage = page.heroImageUrl ?? "/contact.jpg";

  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gray-900 pb-20 pt-32 lg:min-h-[55vh] lg:pb-24 lg:pt-40">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {page.heroEyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
              {page.heroEyebrow}
            </p>
          )}

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {page.heroTitle ?? "Contact opnemen"}
          </h1>

          {page.heroSubtitle && (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              {page.heroSubtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {page.heroCtas?.map((cta, i) => {
              const primary = (cta.style ?? "primary") === "primary";
              return (
                <a
                  key={i}
                  href={cta.href}
                  className={
                    primary
                      ? "inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
                      : "inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
                  }
                >
                  {cta.label}
                  {primary ? <ArrowRight className="h-4 w-4" /> : null}
                </a>
              );
            })}
            {!page.heroCtas?.length && site?.phone && (
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCards({ page }: { page: ContactPage }) {
  const { ref, inView } = useInView(0.1);
  const items = page.contactCards ?? [];
  if (!items.length) return null;

  return (
    <section ref={ref} className="relative z-10 -mt-12 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = getIcon(item.icon);
            const cardClass = `group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`;
            const cardStyle = { transitionDelay: `${i * 80}ms` };

            const content = (
              <>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 group-hover:bg-gray-900 group-hover:text-white">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {item.label}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-gray-900">{item.value}</p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-gray-400">{item.description}</p>
                )}
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cardClass}
                style={cardStyle}
              >
                {content}
              </a>
            ) : (
              <div key={item.label} className={cardClass} style={cardStyle}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ page, site }: { page: ContactPage; site: SiteSettings | null }) {
  const { ref, inView } = useInView(0.05);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const { values, setField, state: formState, submit, reset } = useContactForm("contact");
  const selectedService = values.service;

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400";
  const inputIdle = "border-gray-200 hover:border-gray-300";
  const inputFocus = "border-gray-900 ring-2 ring-gray-900/10";

  const serviceOptions = page.serviceOptions ?? [];
  const bullets = page.formBullets ?? [];

  return (
    <section ref={ref} id="contact-form" className="scroll-mt-20 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {page.formEyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
                {page.formEyebrow}
              </p>
            )}
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {page.formTitle ?? "Laat ons weten hoe we u kunnen helpen"}
            </h2>
            {page.formSubtitle && (
              <p className="mt-4 text-base leading-relaxed text-gray-500">{page.formSubtitle}</p>
            )}

            {!!bullets.length && (
              <div className="mt-8 space-y-4">
                {bullets.map((text, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${200 + i * 80}ms` }}
                  >
                    <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-gray-900" />
                    <span className="text-sm text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            )}

            {(page.directContactTitle || page.directContactNote || site?.phone) && (
              <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5">
                {page.directContactTitle && (
                  <p className="text-sm font-semibold text-gray-900">
                    {page.directContactTitle}
                  </p>
                )}
                {page.directContactNote && (
                  <p className="mt-1 text-sm text-gray-500">{page.directContactNote}</p>
                )}
                {site?.phone && (
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
                  >
                    <Phone className="h-4 w-4" />
                    {site.phone}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {formState === "sent" ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900">Bericht verzonden</h3>
                <p className="mt-2 max-w-sm text-gray-500">
                  Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op,
                  uiterlijk binnen 48 uur.
                </p>
                <button
                  onClick={reset}
                  className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Nieuw bericht versturen
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="rounded-xl border border-gray-200 bg-white p-8 md:p-10"
              >
                <h3 className="text-lg font-bold text-gray-900">Stuur ons een bericht</h3>
                <p className="mt-1 text-sm text-gray-400">Velden met * zijn verplicht</p>

                <div className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Voornaam *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Jan"
                        value={values.firstName}
                        onChange={(e) => setField("firstName")(e.target.value)}
                        onFocus={() => setFocusedField("firstname")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} ${
                          focusedField === "firstname" ? inputFocus : inputIdle
                        }`}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Achternaam *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="De Vries"
                        value={values.lastName}
                        onChange={(e) => setField("lastName")(e.target.value)}
                        onFocus={() => setFocusedField("lastname")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} ${
                          focusedField === "lastname" ? inputFocus : inputIdle
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Bedrijfsnaam
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Uw bedrijfsnaam"
                        value={values.company}
                        onChange={(e) => setField("company")(e.target.value)}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} pl-11 ${
                          focusedField === "company" ? inputFocus : inputIdle
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        E-mailadres *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          required
                          type="email"
                          placeholder="jan@bedrijf.be"
                          value={values.email}
                          onChange={(e) => setField("email")(e.target.value)}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputBase} pl-11 ${
                            focusedField === "email" ? inputFocus : inputIdle
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Telefoonnummer *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          required
                          type="tel"
                          placeholder="+32 (0) 123 45 67 89"
                          value={values.phone}
                          onChange={(e) => setField("phone")(e.target.value)}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputBase} pl-11 ${
                            focusedField === "phone" ? inputFocus : inputIdle
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {!!serviceOptions.length && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Welke dienst heeft u nodig? *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setServiceOpen(!serviceOpen)}
                          onBlur={() => setTimeout(() => setServiceOpen(false), 150)}
                          className={`flex w-full items-center justify-between ${inputBase} ${
                            serviceOpen ? inputFocus : inputIdle
                          } ${selectedService ? "text-gray-900" : "text-gray-400"}`}
                        >
                          {selectedService || "Selecteer een dienst"}
                          <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                              serviceOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {serviceOpen && (
                          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                            {serviceOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setField("service")(option);
                                  setServiceOpen(false);
                                }}
                                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors ${
                                  selectedService === option
                                    ? "bg-gray-50 font-semibold text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Bericht *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Vertel ons over uw project, wensen of vragen..."
                      value={values.message}
                      onChange={(e) => setField("message")(e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase} resize-none ${
                        focusedField === "message" ? inputFocus : inputIdle
                      }`}
                    />
                  </div>

                  {/* Hidden from people, irresistible to bots. */}
                  <div aria-hidden className="hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => setField("website")(e.target.value)}
                    />
                  </div>

                  {formState === "error" && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      Uw bericht kon niet verzonden worden. Probeer het opnieuw
                      {site?.phone ? (
                        <>
                          {" "}of bel ons op{" "}
                          <a
                            href={`tel:${site.phone.replace(/\s+/g, "")}`}
                            className="font-semibold underline"
                          >
                            {site.phone}
                          </a>
                        </>
                      ) : null}
                      .
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.99] disabled:opacity-60"
                  >
                    {formState === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Bericht versturen...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Verstuur bericht
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection({ page, site }: { page: ContactPage; site: SiteSettings | null }) {
  const { ref, inView } = useInView(0.1);
  if (!site?.mapEmbedUrl) return null;

  return (
    <section ref={ref} className="px-6 pb-20 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div
          className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {page.mapTitle ?? "Onze locatie"}
              </h3>
              {page.mapSubtitle && (
                <p className="mt-0.5 text-sm text-gray-500">{page.mapSubtitle}</p>
              )}
            </div>
            {site.mapsUrl && (
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.98]"
              >
                <MapPin className="h-4 w-4" />
                Routebeschrijving
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <div className="relative h-[380px] w-full bg-gray-100 lg:h-[420px]">
            <iframe
              title="ARS Metals locatie"
              src={site.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactClient({
  page,
  site,
}: {
  page: ContactPage;
  site: SiteSettings | null;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar site={site} variant="transparent" scrollThreshold={20} contactHref="#contact-form" />
      <Hero page={page} site={site} />
      <ContactCards page={page} />
      <ContactForm page={page} site={site} />
      <MapSection page={page} site={site} />
      <Footer site={site} variant="withContact" />
    </main>
  );
}
