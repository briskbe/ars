"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS_LEFT = [
  { label: "Homepagina", href: "/" },
  { label: "Diensten", href: "/#diensten" },
  { label: "Realisaties", href: "/#over-ons" },
  { label: "Over ons", href: "/#waarom" },
];

const NAV_LINKS_RIGHT = [{ label: "Vacatures", href: "/vacatures" }];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Telefoon",
    value: "+32 (0)89 36 77 87",
    href: "tel:+3289367787",
    description: "Ma - Vr: 07:00 - 18:00",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "info@ars-metals.be",
    href: "mailto:info@ars-metals.be",
    description: "Reactie binnen 48 uur",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Mondeolaan 2E, Bus 20",
    href: "https://www.google.com/maps/search/Mondeolaan+2E+Bus+20+3600+Genk",
    description: "3600 Genk, België",
  },
  {
    icon: Clock,
    label: "Bereikbaarheid",
    value: "Ma - Vr: 07:00 - 18:00",
    href: undefined,
    description: "Weekend op afspraak",
  },
];

const SERVICE_OPTIONS = [
  "Rook- en warmteafvoer",
  "Montagewerken",
  "Laswerken",
  "Service & Onderhoud",
  "Industrieel montage & verhuis",
  "Rookschermen & Smoke Fabric",
  "Lichtstraten & lichtkoepels",
  "Industrieel las- en montagewerken",
  "Anders",
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-6 lg:px-12">
        <a href="/" className="mr-12 flex-shrink-0">
          <img
            src="/logo.png"
            alt="ARS Industrial Services"
            className={`h-8 w-auto transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS_LEFT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[15px] font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-gray-800 hover:text-black"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex-1" />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS_RIGHT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[15px] font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-gray-800 hover:text-black"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact-form"
            className={`rounded-xl px-6 py-2.5 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] ${
              scrolled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`rounded-lg p-2 transition-colors md:hidden ${
            scrolled
              ? "text-gray-600 hover:bg-gray-50"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-2 md:hidden">
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-gray-50 px-2 py-3.5 text-[15px] font-medium text-gray-600 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact-form"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-xl bg-black px-6 py-3 text-center text-[15px] font-semibold text-white transition-all hover:bg-gray-800"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gray-900 pb-20 pt-32 lg:min-h-[55vh] lg:pb-24 lg:pt-40">
      {/* Background image */}
      <img
        src="/contact.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
            ARS Metaalwerken BV
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Contact opnemen
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Heeft u een vraag of wilt u een vrijblijvende offerte? Ons team
            staat voor u klaar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
            >
              Stuur een bericht
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+3289367787"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              +32 (0)89 36 77 87
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ContactCards() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="relative z-10 -mt-12 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map((item, i) => {
            const Icon = item.icon;
            const cardClass = `group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
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
                <p className="mt-1 text-[15px] font-semibold text-gray-900">
                  {item.value}
                </p>
                <p className="mt-0.5 text-sm text-gray-400">
                  {item.description}
                </p>
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={
                  item.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={cardClass}
                style={cardStyle}
              >
                {content}
              </a>
            ) : (
              <div
                key={item.label}
                className={cardClass}
                style={cardStyle}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ContactForm() {
  const { ref, inView } = useInView(0.05);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1800);
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400";
  const inputIdle = "border-gray-200 hover:border-gray-300";
  const inputFocus =
    "border-gray-900 ring-2 ring-gray-900/10";

  return (
    <section
      ref={ref}
      id="contact-form"
      className="scroll-mt-20 px-6 py-20 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
          {/* Left column */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Contactformulier
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Laat ons weten hoe we u kunnen helpen
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              Vul het formulier in en wij nemen zo snel mogelijk contact met u
              op. We streven ernaar om binnen 48 uur te reageren.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Gratis en vrijblijvend adviesgesprek",
                "Reactie binnen 48 uur",
                "Offerte op maat",
                "Meer dan 2000 succesvolle projecten",
              ].map((text, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-gray-900" />
                  <span className="text-sm text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-900">
                Liever direct contact?
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Bel ons tijdens kantooruren.
              </p>
              <a
                href="tel:+3289367787"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
              >
                <Phone className="h-4 w-4" />
                +32 (0)89 36 77 87
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right form column */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            {formState === "sent" ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  Bericht verzonden
                </h3>
                <p className="mt-2 max-w-sm text-gray-500">
                  Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact
                  met u op, uiterlijk binnen 48 uur.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Nieuw bericht versturen
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-200 bg-white p-8 md:p-10"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  Stuur ons een bericht
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Velden met * zijn verplicht
                </p>

                <div className="mt-8 space-y-5">
                  {/* Name row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Voornaam *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Jan"
                        onFocus={() => setFocusedField("firstname")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} ${
                          focusedField === "firstname"
                            ? inputFocus
                            : inputIdle
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
                        onFocus={() => setFocusedField("lastname")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} ${
                          focusedField === "lastname"
                            ? inputFocus
                            : inputIdle
                        }`}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Bedrijfsnaam
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Uw bedrijfsnaam"
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} pl-11 ${
                          focusedField === "company"
                            ? inputFocus
                            : inputIdle
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & phone */}
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
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputBase} pl-11 ${
                            focusedField === "email"
                              ? inputFocus
                              : inputIdle
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
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputBase} pl-11 ${
                            focusedField === "phone"
                              ? inputFocus
                              : inputIdle
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Welke dienst heeft u nodig? *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setServiceOpen(!serviceOpen)}
                        onBlur={() =>
                          setTimeout(() => setServiceOpen(false), 150)
                        }
                        className={`flex w-full items-center justify-between ${inputBase} ${
                          serviceOpen ? inputFocus : inputIdle
                        } ${
                          selectedService ? "text-gray-900" : "text-gray-400"
                        }`}
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
                          {SERVICE_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setSelectedService(option);
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

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Bericht *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Vertel ons over uw project, wensen of vragen..."
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase} resize-none ${
                        focusedField === "message"
                          ? inputFocus
                          : inputIdle
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.99] disabled:opacity-60"
                  >
                    {formState === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
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

/* ------------------------------------------------------------------ */

function MapSection() {
  const { ref, inView } = useInView(0.1);

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
                Onze locatie
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Mondeolaan 2E, Bus 20 — 3600 Genk, België
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/Mondeolaan+2E+Bus+20+3600+Genk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.98]"
            >
              <MapPin className="h-4 w-4" />
              Routebeschrijving
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="relative h-[380px] w-full bg-gray-100 lg:h-[420px]">
            <iframe
              title="ARS Metals locatie"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.5!2d5.4972!3d50.9654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0d94834f8e9a3%3A0x0!2sMondeolaan%202E%2C%203600%20Genk!5e0!3m2!1snl!2sbe!4v1"
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

/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="/">
              <img
                src="/logo.png"
                alt="ARS Industrial Services"
                className="h-9 w-auto"
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Uw betrouwbare partner voor industriële diensten. Van laswerken
              tot montage, van onderhoud tot verhuizingen — wij staan voor u
              klaar.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Contact
            </h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="tel:+3289367787"
                  className="text-sm text-gray-400 transition-colors hover:text-black"
                >
                  +32 (0)89 36 77 87
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ars-metals.be"
                  className="text-sm text-gray-400 transition-colors hover:text-black"
                >
                  info@ars-metals.be
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-400">
                  Mondeolaan 2E, Bus 20
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400">3600 Genk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Navigatie
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { label: "Homepagina", href: "/" },
                { label: "Diensten", href: "/#diensten" },
                { label: "Over ons", href: "/#waarom" },
                { label: "Vacatures", href: "/vacatures" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-black"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ARS Metals. Alle rechten
            voorbehouden.
          </p>
          <div className="flex items-center gap-2.5 rounded-lg border border-teal-200/60 bg-gradient-to-r from-teal-50/80 to-cyan-50/60 px-4 py-2 shadow-sm">
            <img src="/vca.png" alt="VCA Certified" className="h-7 w-auto" />
            <div className="border-l border-teal-200 pl-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Gecertificeerd</p>
              <p className="text-[10px] text-teal-600">Veiligheid</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-400 transition-colors hover:text-black"
            >
              Privacybeleid
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 transition-colors hover:text-black"
            >
              Voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ContactCards />
      <ContactForm />
      <MapSection />
      <Footer />
    </main>
  );
}
