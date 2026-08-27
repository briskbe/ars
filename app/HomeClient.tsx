"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
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
import CountUp from "./components/CountUp";
import { useReveal, revealDelay } from "./components/useReveal";
import type {
  HomePage,
  SanityCta,
  SanityService,
  SiteSettings,
} from "../sanity/lib/types";
import { useContactForm } from "./components/useContactForm";

type Props = {
  page: HomePage;
  site: SiteSettings | null;
  services: SanityService[];
};

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

/**
 * Points a card's radial highlight at the cursor. The gradient itself lives
 * in `.spotlight`; this only feeds it coordinates, written straight to the
 * node so moving the mouse never re-renders React.
 */
function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (event: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return { ref, onMouseMove };
}

/** Splits a line into words, marking everything inside [brackets] as accented. */
function accentWords(line: string) {
  const tokens: { word: string; accent: boolean }[] = [];
  let inside = false;

  for (const raw of line.split(/\s+/).filter(Boolean)) {
    let word = raw;
    let accent = inside;
    if (word.startsWith("[")) {
      accent = true;
      inside = true;
      word = word.slice(1);
    }
    if (word.endsWith("]")) {
      accent = true;
      inside = false;
      word = word.slice(0, -1);
    }
    tokens.push({ word, accent });
  }

  return tokens;
}

function CtaButton({ cta, dark }: { cta: SanityCta; dark?: boolean }) {
  const primary = (cta.style ?? "primary") === "primary";

  if (primary) {
    return (
      <a href={cta.href} className="btn-ember group">
        {cta.label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    );
  }

  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-[15px] font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${
        dark
          ? "border-white/25 text-white hover:border-white/60 hover:bg-white/10"
          : "border-gray-300 text-gray-900 hover:border-black hover:bg-gray-50"
      }`}
    >
      {cta.label}
    </a>
  );
}

function SectionEyebrow({
  children,
  icon: Icon,
  tone = "light",
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`eyebrow ${
        tone === "dark" ? "text-ember-400" : "text-ember-600"
      }`}
    >
      <span
        className={`h-px w-8 ${tone === "dark" ? "bg-ember-400/60" : "bg-ember-500/50"}`}
      />
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroTitle({ title }: { title: string }) {
  const lines = title.split("\n");
  const hasBrackets = /\[[^\]]+\]/.test(title);
  const totalWords = title.split(/\s+/).filter(Boolean).length;
  let index = -1;

  return (
    <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,8.5vw,7rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden pb-[0.06em]">
          {accentWords(line).map(({ word, accent }, wordIndex) => {
            index += 1;
            // With no [brackets] in the CMS copy, the closing word carries the
            // accent so the headline always lands on something molten.
            const highlight = hasBrackets ? accent : index === totalWords - 1;
            return (
              <span
                key={`${lineIndex}-${wordIndex}`}
                className="word-rise mr-[0.25em]"
                style={{ animationDelay: `${220 + index * 90}ms` }}
              >
                <span
                  className={
                    highlight
                      ? "text-ember-500 [text-shadow:0_0_60px_rgba(255,95,31,0.45)]"
                      : undefined
                  }
                >
                  {word}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Hero({ page }: { page: HomePage }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * -14;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
        bg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const heroImage = page.heroImageUrl ?? "/hero.jpg";
  const title = page.heroTitle ?? "Vakmanschap voor\nde industrie";

  return (
    <section
      ref={heroRef}
      className="grain relative min-h-[100svh] overflow-hidden bg-gray-950"
    >
      <div
        ref={bgRef}
        className="absolute -inset-8 will-change-transform"
        style={{ transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <img
          src={heroImage}
          alt=""
          className="hero-bg-image h-full w-full object-cover"
        />
      </div>

      {/* Scrims: one for the navbar, one to seat the copy, one for the seam. */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/45 to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/25 to-transparent" />

      {/* The forge glow. */}
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[36rem] w-[36rem] animate-ember-pulse rounded-full bg-ember-600/25 blur-[140px]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-12 pt-32">
        <div className="container-wide w-full px-6 lg:px-12">
          {page.heroEyebrow && (
            <div className="animate-fade-in-up eyebrow text-white/70">
              <span className="h-px w-10 bg-ember-500" />
              {page.heroEyebrow}
            </div>
          )}

          <HeroTitle title={title} />

          {page.heroSubtitle && (
            <p className="animate-fade-in-up animate-delay-500 mt-6 max-w-xl sm:mt-8 border-l-2 border-ember-500/60 pl-5 text-lg leading-relaxed text-white/70 md:text-xl">
              {page.heroSubtitle}
            </p>
          )}

          {!!page.heroCtas?.length && (
            <div className="animate-fade-in-up animate-delay-700 mt-10 flex flex-wrap gap-4">
              {page.heroCtas.map((cta) => (
                <CtaButton key={cta.label} cta={cta} dark />
              ))}
            </div>
          )}

          {!!page.stats?.length && (
            <div className="animate-fade-in-up animate-delay-700 mt-12 grid grid-cols-2 gap-px lg:mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-4">
              {page.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-950/40 px-6 py-6 transition-colors duration-300 hover:bg-gray-950/10"
                >
                  <CountUp
                    value={stat.value}
                    className="block font-display text-3xl font-black tracking-tight text-white md:text-4xl"
                  />
                  <div className="mt-1.5 text-sm font-medium text-white/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative block h-16 w-px bg-white/15">
          <span className="animate-scroll-cue absolute left-0 top-0 block h-5 w-px bg-ember-500" />
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Capability ticker                                                  */
/* ------------------------------------------------------------------ */

function Ticker({ services }: { services: SanityService[] }) {
  if (!services.length) return null;

  // Two identical runs sit side by side; translating the pair by -50% lands
  // exactly where it started, so the loop has no visible seam.
  const run = [...services, ...services];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-gray-950 py-6"
    >
      <div className="marquee-mask flex">
        <div className="animate-marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
          {run.map((service, i) => (
            <span key={`${service._id}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white/60">
                {service.title}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ember-500" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

function ServiceCard({
  service,
  index,
}: {
  service: SanityService;
  index: number;
}) {
  const Icon = getIcon(service.icon);
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      data-reveal
      style={revealDelay(index, 70)}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-200 hover:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.45)]"
    >
      <span className="pointer-events-none absolute right-4 top-2 select-none font-display text-6xl font-black leading-none text-gray-100 transition-colors duration-500 group-hover:text-ember-50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex flex-1 flex-col">
        <div className="inline-flex self-start rounded-xl bg-gray-900 p-3 text-white transition-all duration-500 group-hover:bg-ember-500 group-hover:shadow-lg group-hover:shadow-ember-500/35">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>

        <h3 className="mt-6 font-display text-lg font-bold leading-snug text-gray-900">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
          {service.description}
        </p>

        {/* The hairline grows on hover — the card reacts without pretending
            to be a link to a detail page that does not exist. */}
        <span className="mt-6 block h-[2px] w-10 shrink-0 rounded-full bg-gray-200 transition-all duration-500 group-hover:w-full group-hover:bg-ember-500" />
      </div>
    </article>
  );
}

function Services({
  page,
  services,
}: {
  page: HomePage;
  services: SanityService[];
}) {
  return (
    <section
      id="diensten"
      className="relative overflow-hidden bg-white section-padding"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white to-transparent" />

      <div className="container-wide relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7" data-reveal>
            <SectionEyebrow icon={Wrench}>
              {page.servicesEyebrow ?? "Wat wij doen"}
            </SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.98] tracking-[-0.02em] text-gray-950 sm:text-5xl">
              {page.servicesTitle ?? "Ons complete aanbod aan industriële diensten"}
            </h2>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:pb-2" data-reveal="right">
            {page.servicesSubtitle && (
              <p className="text-pretty text-lg leading-relaxed text-gray-500">
                {page.servicesSubtitle}
              </p>
            )}
            <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-gray-900">
              <span className="font-display text-2xl font-black text-ember-500">
                {String(services.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-gray-200" />
              <span className="uppercase tracking-[0.18em] text-gray-400">
                Specialisaties
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service._id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About({ page, site }: { page: HomePage; site: SiteSettings | null }) {
  const logoUrl = site?.logoUrl ?? "/logo.png";

  return (
    <section id="over-ons" className="bg-gray-50 section-padding">
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative min-w-0" data-reveal="left">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-ember-500/25 via-ember-500/5 to-transparent blur-3xl" />

            <div className="grain relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-950 shadow-2xl shadow-gray-900/20">
              <div className="absolute inset-0 blueprint-bg opacity-70" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ember-600/30 blur-[90px]" />

              <div className="relative flex h-full flex-col items-center justify-center p-10 text-center">
                <img
                  src={logoUrl}
                  alt="ARS Industrial Services"
                  className="h-14 w-auto brightness-0 invert"
                />
                {page.aboutCardTagline && (
                  <p className="mt-5 max-w-sm text-balance text-lg leading-relaxed text-gray-400">
                    {page.aboutCardTagline}
                  </p>
                )}
                {!!page.aboutCardStats?.length && (
                  <div className="mt-10 grid w-full max-w-md grid-cols-3 divide-x divide-white/10">
                    {page.aboutCardStats.map((stat) => (
                      <div key={stat.label} className="px-3">
                        <CountUp
                          value={stat.value}
                          className="block font-display text-2xl font-black text-white"
                        />
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-gray-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {site?.vcaCertified !== false && (
              <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3.5 shadow-xl shadow-gray-900/10 lg:-left-8">
                <img src="/vca.png" alt="" className="h-8 w-auto" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                    VCA gecertificeerd
                  </p>
                  <p className="text-[11px] text-gray-400">Veilig werken, altijd</p>
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0" data-reveal="right">
            <SectionEyebrow icon={Award}>
              {page.aboutEyebrow ?? "Over ons"}
            </SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-black uppercase leading-[1.02] tracking-[-0.02em] text-gray-950 sm:text-4xl lg:text-5xl">
              {page.aboutTitle}
            </h2>

            {page.aboutParagraphs?.map((paragraph, i) => (
              <p
                key={i}
                className="mt-6 text-pretty text-lg leading-relaxed text-gray-500"
              >
                {paragraph}
              </p>
            ))}

            {!!page.aboutBullets?.length && (
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {page.aboutBullets.map((item, i) => (
                  <div
                    key={item}
                    data-reveal
                    style={revealDelay(i, 60)}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3"
                  >
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-ember-500"
                      strokeWidth={2.25}
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <a href="#contact" className="btn-ember group mt-10">
              Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why ARS                                                            */
/* ------------------------------------------------------------------ */

function ReasonCard({
  reason,
  index,
}: {
  reason: { title: string; description: string };
  index: number;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      data-reveal
      style={revealDelay(index, 90)}
      className="spotlight spotlight-dark group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-500 hover:border-ember-500/40 hover:bg-white/[0.07] sm:p-10"
    >
      <div className="relative flex gap-6">
        <span className="font-display text-5xl font-black leading-none text-white/15 transition-colors duration-500 group-hover:text-ember-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-white">
            {reason.title}
          </h3>
          <p className="mt-3 leading-relaxed text-gray-400">
            {reason.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function WhyARS({ page }: { page: HomePage }) {
  // Title supports [bracketed] segments shown with the molten underline.
  const renderTitle = (title?: string) => {
    if (!title) return null;
    return title.split(/(\[[^\]]+\])/g).map((part, i) =>
      part.startsWith("[") && part.endsWith("]") ? (
        <span
          key={i}
          className="underline decoration-ember-500 decoration-[5px] underline-offset-[10px]"
        >
          {part.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <section
      id="waarom"
      className="grain relative overflow-hidden bg-gray-950 text-white section-padding"
    >
      <div className="absolute inset-0 blueprint-bg opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-600/20 blur-[130px]" />

      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <div className="flex justify-center">
            <SectionEyebrow icon={Star} tone="dark">
              {page.whyEyebrow ?? "Waarom ARS Metals"}
            </SectionEyebrow>
          </div>
          <h2 className="mt-5 text-balance font-display text-4xl font-black uppercase leading-[1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {renderTitle(page.whyTitle)}
          </h2>
          {page.whySubtitle && (
            <p className="mt-6 text-pretty text-lg leading-relaxed text-gray-400">
              {page.whySubtitle}
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {page.reasons?.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Jobs banner                                                        */
/* ------------------------------------------------------------------ */

function JobsBanner({ page }: { page: HomePage }) {
  const cta = page.jobsBannerCta;

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="hazard-stripes h-1.5 w-full opacity-90" />

      <div className="container-wide flex flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row lg:px-12">
        <div className="flex items-center gap-5" data-reveal="left">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ember-500 shadow-lg shadow-ember-500/30">
            <HardHat className="h-7 w-7 text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              {page.jobsBannerTitle ?? "We hebben openstaande vacatures!"}
            </h3>
            {page.jobsBannerText && (
              <p className="mt-1 text-sm text-gray-400">{page.jobsBannerText}</p>
            )}
          </div>
        </div>

        {cta && (
          <a
            href={cta.href}
            data-reveal="right"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-500 hover:text-white hover:shadow-xl hover:shadow-ember-500/30"
          >
            {cta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function ContactSection({
  page,
  site,
}: {
  page: HomePage;
  site: SiteSettings | null;
}) {
  const { values, setField, state, submit, reset } = useContactForm("home");

  return (
    <section id="contact" className="relative bg-gray-50 section-padding">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="min-w-0" data-reveal="left">
            <SectionEyebrow icon={Mail}>
              {page.contactEyebrow ?? "Contact"}
            </SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[1] tracking-[-0.02em] text-gray-950 sm:text-5xl">
              {page.contactTitle ?? "Klaar om samen te werken?"}
            </h2>
            {page.contactSubtitle && (
              <p className="mt-6 text-pretty text-lg leading-relaxed text-gray-500">
                {page.contactSubtitle}
              </p>
            )}

            <div className="mt-10 space-y-3">
              {site?.phone && (
                <ContactRow
                  icon={<Phone className="h-5 w-5" />}
                  label="Telefoon"
                  value={site.phone}
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  index={0}
                />
              )}
              {site?.email && (
                <ContactRow
                  icon={<Mail className="h-5 w-5" />}
                  label="E-mail"
                  value={site.email}
                  href={`mailto:${site.email}`}
                  index={1}
                />
              )}
              {(site?.address || site?.addressLine2) && (
                <ContactRow
                  icon={<MapPin className="h-5 w-5" />}
                  label="Adres"
                  value={[site?.address, site?.addressLine2]
                    .filter(Boolean)
                    .join(", ")}
                  href={site?.mapsUrl}
                  index={2}
                />
              )}
              {site?.hours && (
                <ContactRow
                  icon={<Clock className="h-5 w-5" />}
                  label="Bereikbaarheid"
                  value={site.hours}
                  index={3}
                />
              )}
            </div>
          </div>

          <div
            data-reveal="right"
            className="min-w-0 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-900/[0.07] md:p-10"
          >
            {state === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-500 shadow-lg shadow-ember-500/30">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-gray-900">
                  Bericht verzonden
                </h3>
                <p className="mt-2 max-w-sm text-gray-500">
                  Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u
                  op.
                </p>
                <button
                  onClick={reset}
                  className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Nieuw bericht versturen
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-gray-900">
                  Stuur ons een bericht
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Vul het formulier in en wij nemen zo snel mogelijk contact met u
                  op.
                </p>
                <form onSubmit={submit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      label="Voornaam"
                      placeholder="Jan"
                      required
                      value={values.firstName}
                      onChange={setField("firstName")}
                    />
                    <FormField
                      label="Achternaam"
                      placeholder="De Vries"
                      required
                      value={values.lastName}
                      onChange={setField("lastName")}
                    />
                  </div>
                  <FormField
                    label="E-mailadres"
                    placeholder="jan@bedrijf.be"
                    type="email"
                    required
                    value={values.email}
                    onChange={setField("email")}
                  />
                  <FormField
                    label="Telefoonnummer"
                    placeholder="+32 (0) 123 45 67 89"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={setField("phone")}
                  />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Bericht
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={values.message}
                      onChange={(e) => setField("message")(e.target.value)}
                      placeholder="Vertel ons over uw project..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-ember-500 focus:bg-white focus:ring-4 focus:ring-ember-500/10"
                    />
                  </div>

                  {/* Hidden from people, irresistible to bots. */}
                  <div aria-hidden className="hidden">
                    <label htmlFor="home-website">Website</label>
                    <input
                      id="home-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => setField("website")(e.target.value)}
                    />
                  </div>

                  {state === "error" && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      Uw bericht kon niet verzonden worden. Probeer het opnieuw
                      {site?.phone ? (
                        <>
                          {" "}
                          of bel ons op{" "}
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
                    disabled={state === "sending"}
                    className="btn-ember w-full text-base disabled:opacity-60"
                  >
                    {state === "sending"
                      ? "Bericht versturen..."
                      : "Verstuur bericht"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
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
  href,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  index: number;
}) {
  const body = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-colors duration-300 group-hover:bg-ember-500">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {label}
        </div>
        <div className="mt-0.5 break-words font-display text-base font-bold text-gray-900 sm:text-lg">
          {value}
        </div>
      </div>
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 transition-all duration-300 hover:border-ember-200 hover:shadow-lg hover:shadow-gray-900/5";

  return href ? (
    <a
      href={href}
      data-reveal
      style={revealDelay(index, 60)}
      className={className}
    >
      {body}
    </a>
  ) : (
    <div data-reveal style={revealDelay(index, 60)} className={className}>
      {body}
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-ember-500 focus:bg-white focus:ring-4 focus:ring-ember-500/10"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function HomeClient({ page, site, services }: Props) {
  useReveal();

  return (
    <main className="min-h-screen">
      <Navbar site={site} variant="transparent" trackActive />
      <Hero page={page} />
      <Ticker services={services} />
      <Services page={page} services={services} />
      <About page={page} site={site} />
      <WhyARS page={page} />
      <JobsBanner page={page} />
      <ContactSection page={page} site={site} />
      <Footer site={site} services={services} variant="withServices" />
    </main>
  );
}
