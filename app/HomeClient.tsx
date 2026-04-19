"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  Wrench,
  Award,
  Star,
  HardHat,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getIcon } from "./components/Icon";
import type {
  HomePage,
  SanityCta,
  SanityService,
  SiteSettings,
} from "../sanity/lib/types";

type Props = {
  page: HomePage;
  site: SiteSettings | null;
  services: SanityService[];
};

function CtaButton({ cta, dark }: { cta: SanityCta; dark?: boolean }) {
  const primary = (cta.style ?? "primary") === "primary";
  if (primary) {
    return (
      <a
        href={cta.href}
        className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100"
      >
        {cta.label}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    );
  }
  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 text-[15px] font-semibold transition-all duration-200 ${
        dark
          ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
          : "border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      {cta.label}
    </a>
  );
}

function Hero({ page }: { page: HomePage }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * -6;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      });
    };

    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const heroImage = page.heroImageUrl ?? "/hero.jpg";
  const titleLines = (page.heroTitle ?? "Vakmanschap voor\nde industrie").split("\n");

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-gray-950">
      <div
        ref={bgRef}
        className="absolute inset-0 scale-105 will-change-transform"
        style={{ transition: "transform 0.6s ease-out" }}
      >
        <img src={heroImage} alt="" className="hero-bg-image h-full w-full object-cover" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-10 pt-32">
        <div className="container-wide px-6 lg:px-12">
          {page.heroEyebrow && (
            <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-widest text-white/50">
              {page.heroEyebrow}
            </p>
          )}

          <h1 className="animate-fade-in-up animate-delay-100 mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {page.heroSubtitle && (
            <p className="animate-fade-in-up animate-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
              {page.heroSubtitle}
            </p>
          )}

          {!!page.heroCtas?.length && (
            <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-wrap gap-4">
              {page.heroCtas.map((cta) => (
                <CtaButton key={cta.label} cta={cta} dark />
              ))}
            </div>
          )}

          {!!page.stats?.length && (
            <div className="animate-fade-in-up animate-delay-500 mt-20 border-t border-white/10 pt-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {page.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm font-medium text-white/40">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Services({ page, services }: { page: HomePage; services: SanityService[] }) {
  return (
    <section id="diensten" className="section-padding bg-gray-50/80">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
            <Wrench className="h-3.5 w-3.5" />
            {page.servicesEyebrow ?? "Wat wij doen"}
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {page.servicesTitle ?? "Ons complete aanbod aan industriële diensten"}
          </h2>
          {page.servicesSubtitle && (
            <p className="mt-5 text-balance text-lg text-gray-500">{page.servicesSubtitle}</p>
          )}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service._id}
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gray-100 p-3 text-gray-700 transition-colors group-hover:bg-black group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
                  {service.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Meer info <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About({ page, site }: { page: HomePage; site: SiteSettings | null }) {
  const logoUrl = site?.logoUrl ?? "/logo.png";
  return (
    <section id="over-ons" className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
              <div className="absolute inset-0 opacity-[0.07]">
                <div className="grid-bg h-full w-full" />
              </div>
              <div className="relative flex h-full flex-col items-center justify-center p-12 text-center">
                <img
                  src={logoUrl}
                  alt="ARS Industrial Services"
                  className="mb-4 h-14 w-auto brightness-0 invert"
                />
                {page.aboutCardTagline && (
                  <p className="mt-3 max-w-sm text-lg text-gray-400">
                    {page.aboutCardTagline}
                  </p>
                )}
                {!!page.aboutCardStats?.length && (
                  <div className="mt-8 grid grid-cols-3 gap-8">
                    {page.aboutCardStats.map((s) => (
                      <div key={s.label}>
                        <div className="text-2xl font-extrabold text-white">{s.value}</div>
                        <div className="mt-1 text-xs text-gray-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gray-100" />
          </div>

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Award className="h-3.5 w-3.5" />
              {page.aboutEyebrow ?? "Over ons"}
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              {page.aboutTitle}
            </h2>
            {page.aboutParagraphs?.map((p, i) => (
              <p key={i} className="mt-6 text-lg leading-relaxed text-gray-500">
                {p}
              </p>
            ))}

            {!!page.aboutBullets?.length && (
              <div className="mt-8 space-y-4">
                {page.aboutBullets.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black">
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            )}

            <a href="#contact" className="btn-primary mt-10 inline-flex">
              Neem contact op
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyARS({ page }: { page: HomePage }) {
  // Title supports [bracketed] segments shown with the underlined accent.
  const renderTitle = (title?: string) => {
    if (!title) return null;
    const parts = title.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span
            key={i}
            className="underline decoration-gray-600 decoration-[3px] underline-offset-[6px]"
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section id="waarom" className="section-padding bg-black text-white">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
            <Star className="h-3.5 w-3.5" />
            {page.whyEyebrow ?? "Waarom ARS Metals"}
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {renderTitle(page.whyTitle)}
          </h2>
          {page.whySubtitle && (
            <p className="mt-5 text-lg text-gray-400">{page.whySubtitle}</p>
          )}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {page.reasons?.map((reason, index) => (
            <div
              key={reason.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gray-300 transition-colors group-hover:bg-white group-hover:text-black">
                <span className="text-lg font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-bold">{reason.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobsBanner({ page }: { page: HomePage }) {
  const cta = page.jobsBannerCta;
  return (
    <section className="bg-gray-900">
      <div className="container-wide flex flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-12">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <HardHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {page.jobsBannerTitle ?? "We hebben openstaande vacatures!"}
            </h3>
            {page.jobsBannerText && (
              <p className="text-sm text-gray-400">{page.jobsBannerText}</p>
            )}
          </div>
        </div>
        {cta && (
          <a
            href={cta.href}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}

function ContactSection({ page, site }: { page: HomePage; site: SiteSettings | null }) {
  return (
    <section id="contact" className="section-padding bg-gray-50/80">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
              <Mail className="h-3.5 w-3.5" />
              {page.contactEyebrow ?? "Contact"}
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              {page.contactTitle ?? "Klaar om samen te werken?"}
            </h2>
            {page.contactSubtitle && (
              <p className="mt-5 text-lg leading-relaxed text-gray-500">
                {page.contactSubtitle}
              </p>
            )}

            <div className="mt-10 space-y-6">
              {site?.phone && (
                <ContactRow icon={<Phone className="h-5 w-5" />} label="Telefoon" value={site.phone} />
              )}
              {site?.email && (
                <ContactRow icon={<Mail className="h-5 w-5" />} label="E-mail" value={site.email} />
              )}
              {(site?.address || site?.addressLine2) && (
                <ContactRow
                  icon={<MapPin className="h-5 w-5" />}
                  label="Adres"
                  value={[site?.address, site?.addressLine2].filter(Boolean).join(", ")}
                />
              )}
              {site?.hours && (
                <ContactRow icon={<Clock className="h-5 w-5" />} label="Bereikbaarheid" value={site.hours} />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/80 md:p-10">
            <h3 className="text-xl font-bold text-gray-900">Stuur ons een bericht</h3>
            <p className="mt-2 text-sm text-gray-400">
              Vul het formulier in en wij nemen zo snel mogelijk contact met u op.
            </p>
            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Voornaam" placeholder="Jan" />
                <FormField label="Achternaam" placeholder="De Vries" />
              </div>
              <FormField label="E-mailadres" placeholder="jan@bedrijf.be" type="email" />
              <FormField label="Telefoonnummer" placeholder="+32 (0) 123 45 67 89" type="tel" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Bericht</label>
                <textarea
                  rows={4}
                  placeholder="Vertel ons over uw project..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>
              <button type="submit" className="btn-primary w-full text-base">
                Verstuur bericht
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-400">{label}</div>
        <div className="mt-1 text-lg font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
      />
    </div>
  );
}

export default function HomeClient({ page, site, services }: Props) {
  return (
    <main className="min-h-screen">
      <Navbar site={site} variant="transparent" trackActive />
      <Hero page={page} />
      <Services page={page} services={services} />
      <About page={page} site={site} />
      <WhyARS page={page} />
      <JobsBanner page={page} />
      <ContactSection page={page} site={site} />
      <Footer site={site} services={services} variant="withServices" />
    </main>
  );
}
