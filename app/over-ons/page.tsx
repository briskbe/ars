"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Flame,
  HardHat,
  Zap,
  Sun,
  Shield,
  Wrench,
  CheckCircle2,
  Award,
  Target,
  Users,
  Sparkles,
  ShieldCheck,
  Calendar,
  Building2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS_LEFT = [
  { label: "Homepagina", href: "/" },
  { label: "Diensten", href: "/#diensten" },
  { label: "Realisaties", href: "/#over-ons" },
  { label: "Over ons", href: "/over-ons" },
];

const NAV_LINKS_RIGHT = [{ label: "Vacatures", href: "/vacatures" }];

const EXPERTISE = [
  {
    icon: Flame,
    title: "Rook- en warmteafvoer",
    description:
      "Professionele installatie en onderhoud van RWA-systemen volgens de laatste normen.",
  },
  {
    icon: Sun,
    title: "Lichtstraten & lichtkoepels",
    description:
      "Plaatsing en renovatie van lichtstraten en koepels voor optimale daglichttoetreding.",
  },
  {
    icon: Shield,
    title: "Rookschermen",
    description:
      "Vaste en automatische rookschermen voor veilige brandcompartimentering.",
  },
  {
    icon: HardHat,
    title: "Industriële montage",
    description:
      "Vakkundige montage van staalconstructies en industriële installaties.",
  },
  {
    icon: Zap,
    title: "Laswerken",
    description:
      "Gecertificeerde lasspecialisten voor MIG, TIG en elektrisch laswerk.",
  },
  {
    icon: Wrench,
    title: "Maatwerk & installaties",
    description:
      "Complexe installaties afgestemd op de specifieke eisen van elk project.",
  },
];

const VALUES = [
  {
    icon: Award,
    title: "Kwaliteit",
    description:
      "Hoogwaardige, op maat gemaakte oplossingen die voldoen aan de hoogste normen, met oog voor detail en vakmanschap.",
  },
  {
    icon: ShieldCheck,
    title: "Veiligheid",
    description:
      "Structurele aandacht voor veiligheid op de werkvloer, ondersteund door ons VCA*-certificaat en continue opleidingen.",
  },
  {
    icon: Target,
    title: "Efficiëntie",
    description:
      "Elk project wordt tijdig en binnen budget voltooid, dankzij onze doordachte aanpak en ervaren team.",
  },
];

const HIGHLIGHTS = [
  "Opgericht in 2014",
  "VCA*-gecertificeerd bedrijf",
  "Maatwerk voor elk project",
  "Nauwe samenwerking met klanten",
  "Oog voor detail en vakmanschap",
  "Ervaren in complexe installaties",
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
                  ? link.href === "/over-ons"
                    ? "font-semibold text-black"
                    : "text-gray-800 hover:text-black"
                  : link.href === "/over-ons"
                    ? "font-semibold text-white"
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
            href="/contact"
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
            href="/contact"
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
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-gray-950 pb-20 pt-32 lg:min-h-[65vh] lg:pb-28 lg:pt-40">
      {/* Background image */}
      <img
        src="/over.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div
          className={`max-w-3xl transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Over ARS Metaalwerken
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
            Vakmanschap dat{" "}
            <span className="underline decoration-white/30 decoration-[3px] underline-offset-[8px]">
              verschil
            </span>{" "}
            maakt
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Al meer dan tien jaar is ARS Metaalwerken de betrouwbare partner
            voor industriële installaties in België. Een innovatief en
            dynamisch bedrijf met expertise die voortkomt uit jarenlange
            ervaring.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
            >
              Vraag een vrijblijvende offerte
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/#diensten"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
            >
              Bekijk onze diensten
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function StatsStrip() {
  const { ref, inView } = useInView(0.1);

  const stats = [
    { icon: Calendar, value: "2014", label: "Opgericht" },
    { icon: Building2, value: "2000+", label: "Projecten" },
    { icon: Users, value: "10+", label: "Jaar ervaring" },
    { icon: ShieldCheck, value: "VCA*", label: "Gecertificeerd" },
  ];

  return (
    <section ref={ref} className="relative z-10 -mt-14 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40 sm:p-8 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex items-center gap-4 transition-all duration-500 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Story() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid items-start gap-16 lg:grid-cols-5 lg:gap-20">
          {/* Left — sticky intro */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Award className="h-3.5 w-3.5" />
              Ons verhaal
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              Innovatief, dynamisch en al tien jaar uw partner
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-500">
              ARS Metaalwerken is in 2014 opgericht met een duidelijke missie:
              onze uitgebreide kennis en ervaring in de industriële
              dienstensector verder uitbouwen en doorgeven aan onze klanten.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-start gap-2.5 transition-all duration-500 ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 60}ms` }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gray-900"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — rich text */}
          <div
            className={`space-y-6 lg:col-span-3 transition-all duration-700 delay-100 ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-8 md:p-10">
              <p className="text-lg leading-relaxed text-gray-700">
                Wij specialiseren ons in een breed scala aan diensten en zijn
                trots op onze expertise in{" "}
                <span className="font-semibold text-gray-900">
                  rook- en warmteafvoer, lichtstraten, lichtkoepels
                </span>
                , zowel vaste als automatische{" "}
                <span className="font-semibold text-gray-900">
                  rookschermen
                </span>
                , evenals{" "}
                <span className="font-semibold text-gray-900">
                  industriële montage en laswerken
                </span>
                .
              </p>
            </div>

            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              Met onze jarenlange ervaring leveren wij hoogwaardige, op maat
              gemaakte oplossingen die voldoen aan de specifieke eisen van elk
              project. Of u nu een bedrijf bent dat op zoek is naar
              betrouwbare partners voor complexe installaties, of een
              studiebureau dat installateurs nodig heeft voor technische en
              specialistische werkzaamheden — wij bieden de expertise en
              flexibiliteit die u nodig heeft.
            </p>

            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              Onze focus ligt op{" "}
              <span className="font-semibold text-gray-900">
                kwaliteit, veiligheid en efficiëntie
              </span>
              , waardoor we in staat zijn om elk project tijdig en binnen
              budget te voltooien. Wij begrijpen de complexiteit van
              industriële projecten en werken nauw samen met onze klanten om
              optimale resultaten te behalen.
            </p>

            <div className="flex items-start gap-4 rounded-2xl border-l-4 border-gray-900 bg-white p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-base leading-relaxed text-gray-700">
                ARS Metaalwerken is uw ideale partner voor installaties die
                voldoen aan de hoogste normen, met{" "}
                <span className="font-semibold text-gray-900">
                  oog voor detail en vakmanschap
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Expertise() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="section-padding bg-gray-50/80">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
            <Wrench className="h-3.5 w-3.5" />
            Onze expertise
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Een brede waaier aan specialisaties
          </h2>
          <p className="mt-5 text-balance text-lg text-gray-500">
            Het bedrijf staat bekend om zijn brede aanbod en de expertise die
            het zijn klanten biedt, voortkomend uit jarenlange ervaring.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="mb-5 inline-flex rounded-xl bg-gray-100 p-3 text-gray-700 transition-colors group-hover:bg-black group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Values() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="section-padding bg-black text-white">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
            <Target className="h-3.5 w-3.5" />
            Onze waarden
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Drie pijlers die ons werk{" "}
            <span className="underline decoration-gray-600 decoration-[3px] underline-offset-[6px]">
              definiëren
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            ARS Metaalwerken levert maatwerk en hecht veel waarde aan
            klanttevredenheid, waardoor wij een betrouwbare partner zijn voor
            onze klanten.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:bg-white/10 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gray-300 transition-colors group-hover:bg-white group-hover:text-black">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Safety() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — VCA showcase */}
          <div
            className={`relative transition-all duration-700 ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-10 ring-1 ring-teal-100 md:p-14">
              {/* decorative grid */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
                <div className="grid-bg h-full w-full" />
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-700 shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Officieel gecertificeerd
                </div>

                <img
                  src="/vca.png"
                  alt="VCA Certified"
                  className="mt-8 h-24 w-auto md:h-28"
                />

                <h3 className="mt-6 text-2xl font-extrabold text-gray-900 md:text-3xl">
                  VCA*-gecertificeerd
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">
                  Een bewijs dat ARS Metaalwerken structureel aandacht besteedt
                  aan veiligheid tijdens het werk.
                </p>

                <div className="mt-8 grid w-full max-w-sm grid-cols-3 gap-3 border-t border-teal-100 pt-6">
                  <div>
                    <div className="text-xl font-extrabold text-gray-900">
                      100%
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Inzet
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-gray-900">
                      24/7
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Aandacht
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-gray-900">
                      0
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Compromis
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gray-100" />
          </div>

          {/* Right — content */}
          <div
            className={`transition-all duration-700 delay-100 ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Shield className="h-3.5 w-3.5" />
              Veiligheid & gezondheid
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              Een veilige werkvloer is geen optie — het is een standaard
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-500">
              Als bedrijf hechten wij voortdurend waarde aan veiligheid en
              gezondheid op de werkvloer. Onze preventiedienst ondersteunt ons
              personeel met de benodigde opleidingen voor het behalen van
              certificaten.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: "Preventiedienst op maat",
                  description:
                    "Interne ondersteuning die onze medewerkers begeleidt bij opleidingen en certificeringen.",
                },
                {
                  title: "Continue opleiding",
                  description:
                    "Structureel investeren in kennis en vaardigheden houdt ons team scherp en veilig.",
                },
                {
                  title: "VCA*-certificaat",
                  description:
                    "Een officiële erkenning van onze blijvende inzet voor veilig werken.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5 transition-colors hover:border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CTA() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="px-6 pb-24 lg:px-12 lg:pb-32">
      <div className="container-wide">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gray-950 px-8 py-16 text-center transition-all duration-700 md:px-16 md:py-20 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div className="grid-bg h-full w-full" />
          </div>
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              Klaar voor uw project?
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Til uw volgende project naar een hoger niveau
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-white/70">
              Heeft u een project waarvoor u professionele installateurs nodig
              heeft? Neem gerust contact met ons op voor een vrijblijvende
              offerte en ontdek hoe wij het verschil kunnen maken.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
              >
                Vraag een vrijblijvende offerte
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+3289367787"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                +32 (0)89 36 77 87
              </a>
            </div>
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
                { label: "Over ons", href: "/over-ons" },
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
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Gecertificeerd
              </p>
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

export default function OverOnsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Story />
      <Expertise />
      <Values />
      <Safety />
      <CTA />
      <Footer />
    </main>
  );
}
