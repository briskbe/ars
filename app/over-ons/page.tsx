"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  ArrowRight,
  Menu,
  X,
  Flame,
  HardHat,
  Zap,
  Sun,
  Shield,
  Wrench,
  Award,
  Users,
  Target,
  Heart,
  Sparkles,
  Building2,
  Calendar,
  Handshake,
  ShieldCheck,
  GraduationCap,
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

const VALUES = [
  {
    icon: Award,
    title: "Vakmanschap",
    description:
      "Hoogwaardige, op maat gemaakte oplossingen uitgevoerd door ervaren specialisten met oog voor detail.",
  },
  {
    icon: ShieldCheck,
    title: "Veiligheid",
    description:
      "VCA*-gecertificeerd en continu aandacht voor veilig werken op elke werf, voor iedereen.",
  },
  {
    icon: Handshake,
    title: "Klanttevredenheid",
    description:
      "Wij werken nauw samen met onze klanten om tot optimale resultaten te komen — afspraak is afspraak.",
  },
  {
    icon: Target,
    title: "Efficiëntie",
    description:
      "Elk project tijdig en binnen budget afgerond, met respect voor uw planning en werkomgeving.",
  },
];

const EXPERTISE = [
  { icon: Flame, title: "Rook- en warmteafvoer" },
  { icon: Sun, title: "Lichtstraten & lichtkoepels" },
  { icon: Shield, title: "Vaste & automatische rookschermen" },
  { icon: HardHat, title: "Industriële montage" },
  { icon: Zap, title: "Industrieel laswerk" },
  { icon: Wrench, title: "Service & onderhoud" },
];

const TIMELINE = [
  {
    year: "2014",
    title: "Oprichting ARS Metaalwerken",
    description:
      "Opgericht vanuit een passie om onze jarenlange kennis en ervaring in de industriële dienstensector verder uit te breiden.",
  },
  {
    year: "2017",
    title: "Uitbreiding van expertise",
    description:
      "Specialisatie in rook- en warmteafvoer, lichtstraten, lichtkoepels en rookschermen — zowel vast als automatisch.",
  },
  {
    year: "2020",
    title: "VCA*-certificering",
    description:
      "Formeel erkend als VCA*-gecertificeerd bedrijf: bewijs van onze structurele aandacht voor veiligheid op de werkvloer.",
  },
  {
    year: "Vandaag",
    title: "Uw betrouwbare partner",
    description:
      "Meer dan 2000 succesvolle projecten later blijven we de ideale partner voor complexe industriële installaties.",
  },
];

const SAFETY_POINTS = [
  {
    icon: ShieldCheck,
    title: "VCA*-certificaat",
    description:
      "Ons VCA*-certificaat toont aan dat ARS Metaalwerken structureel aandacht besteedt aan veiligheid tijdens het werk.",
  },
  {
    icon: GraduationCap,
    title: "Opleiding & certificering",
    description:
      "Onze preventiedienst ondersteunt ons personeel met de benodigde opleidingen voor het behalen van certificaten.",
  },
  {
    icon: Heart,
    title: "Welzijn op de werkvloer",
    description:
      "Wij hechten voortdurend waarde aan de veiligheid en gezondheid van iedereen op de werf.",
  },
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
              className={`text-[15px] transition-colors duration-200 ${
                link.href === "/over-ons"
                  ? scrolled
                    ? "font-semibold text-black"
                    : "font-semibold text-white"
                  : scrolled
                    ? "font-medium text-gray-800 hover:text-black"
                    : "font-medium text-white/80 hover:text-white"
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
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-gray-900 pb-20 pt-32 lg:min-h-[65vh] lg:pb-24 lg:pt-40">
      {/* Background image */}
      <img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/60 to-gray-950/90" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div
          className={`max-w-3xl transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
            Over ARS Metaalwerken
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            Vakmanschap met{" "}
            <span className="relative inline-block">
              <span className="relative z-10">oog voor detail</span>
              <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-white/15" />
            </span>
            , sinds 2014
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Een innovatief en dynamisch bedrijf gespecialiseerd in industriële
            diensten. Van rook- en warmteafvoer tot montage- en laswerken —
            steeds met oog voor kwaliteit, veiligheid en efficiëntie.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#verhaal"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
            >
              Ons verhaal
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
            >
              Vraag een offerte
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/10 pt-8 md:grid-cols-4 transition-all delay-200 duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {[
            { value: "2014", label: "Opgericht" },
            { value: "10+", label: "Jaar ervaring" },
            { value: "2000+", label: "Projecten" },
            { value: "VCA*", label: "Gecertificeerd" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-extrabold text-white md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Story() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      ref={ref}
      id="verhaal"
      className="scroll-mt-20 px-6 py-20 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — label + heading */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Ons verhaal
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Wie wij zijn en waar wij voor staan
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Calendar,
                  title: "Opgericht in 2014",
                  description:
                    "Vanuit de ambitie om onze jarenlange kennis verder uit te breiden.",
                },
                {
                  icon: Building2,
                  title: "Innovatief en dynamisch",
                  description:
                    "Een breed aanbod aan industriële diensten, steeds op maat.",
                },
                {
                  icon: Users,
                  title: "Betrouwbare partner",
                  description:
                    "Voor bedrijven én studiebureaus die specialisten nodig hebben.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 transition-all duration-500 ${
                      inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${150 + i * 80}ms` }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <Icon className="h-[18px] w-[18px] text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — long-form text */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-100 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                <span className="font-semibold text-gray-900">
                  ARS METAALWERKEN
                </span>{" "}
                is een innovatief en dynamisch bedrijf, opgericht in 2014, met
                als doel zijn uitgebreide kennis en ervaring in de industriële
                dienstensector verder uit te breiden. Wij specialiseren ons in
                een breed scala van diensten en zijn trots op onze expertise op
                het gebied van rook- en warmteafvoer, lichtstraten,
                lichtkoepels, zowel vaste als automatische rookschermen, evenals
                industriële montage en laswerken.
              </p>

              <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                Met onze jarenlange ervaring leveren wij hoogwaardige, op maat
                gemaakte oplossingen die voldoen aan de specifieke eisen van
                elk project. Of u nu een bedrijf bent dat op zoek is naar
                betrouwbare partners voor complexe installaties, of een
                studiebureau dat installateurs nodig heeft voor technische en
                specialistische werkzaamheden — wij bieden de expertise en
                flexibiliteit die u nodig heeft.
              </p>

              <div className="mt-8 rounded-xl border-l-4 border-gray-900 bg-gray-50 p-6">
                <p className="text-base italic leading-relaxed text-gray-700">
                  "Onze focus ligt op kwaliteit, veiligheid en efficiëntie,
                  waardoor we elk project tijdig en binnen budget kunnen
                  voltooien."
                </p>
              </div>

              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Wij begrijpen de complexiteit van industriële projecten en
                werken nauw samen met onze klanten om optimale resultaten te
                behalen. ARS Metaalwerken is uw ideale partner voor het
                uitvoeren van installaties die voldoen aan de hoogste normen,
                met oog voor detail en vakmanschap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Values() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="bg-gray-50 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Onze waarden
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Wat ons uniek maakt
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            Het bedrijf staat bekend om zijn brede aanbod en de expertise die
            het klanten biedt — voortkomend uit jarenlange ervaring en een
            oprechte toewijding aan maatwerk.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 group-hover:bg-gray-900 group-hover:text-white">
                  <Icon className="h-[19px] w-[19px]" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
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

function Expertise() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Onze expertise
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Een breed aanbod, één partner
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              ARS Metaalwerken levert maatwerk en hecht veel waarde aan
              klanttevredenheid. Daarom kiezen onze klanten keer op keer voor
              ons als betrouwbare partner.
            </p>

            <a
              href="/#diensten"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
            >
              Bekijk alle diensten
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {EXPERTISE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`group flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all duration-500 hover:border-gray-900 hover:shadow-md ${
                      inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${100 + i * 60}ms` }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 group-hover:bg-gray-900 group-hover:text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Timeline() {
  const { ref, inView } = useInView(0.05);

  return (
    <section ref={ref} className="bg-gray-900 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
            Ons traject
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Tien jaar bouwen aan vertrouwen
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Van oprichting tot één van de meest betrouwbare partners in de
            sector — een greep uit onze mijlpalen.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative grid gap-6 md:grid-cols-2 md:gap-12 transition-all duration-700 ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${150 + i * 120}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <div className="h-3 w-3 rounded-full bg-white" />
                    <div className="absolute h-6 w-6 rounded-full bg-white/20" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 ${
                      isLeft
                        ? "md:col-start-1 md:pr-10 md:text-right"
                        : "md:col-start-2 md:pl-10"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                      <Sparkles className="h-3 w-3" />
                      {item.year}
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Safety() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — VCA badge + content */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Veiligheid & gezondheid
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Veilig werken — voor iedereen
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              Als bedrijf hechten wij voortdurend waarde aan veiligheid en
              gezondheid op de werkvloer. Ons VCA*-certificaat toont aan dat
              ARS Metaalwerken structureel aandacht besteedt aan veiligheid
              tijdens het werk.
            </p>

            {/* VCA certificate highlight */}
            <div className="mt-8 flex items-center gap-4 rounded-xl border border-teal-200/70 bg-gradient-to-br from-teal-50 to-cyan-50 p-5 shadow-sm">
              <img
                src="/vca.png"
                alt="VCA* Certified"
                className="h-14 w-auto shrink-0"
              />
              <div className="border-l border-teal-200 pl-4">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  VCA* Gecertificeerd
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900">
                  Veiligheid, gezondheid en milieu
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Erkend checklist voor aannemers
                </p>
              </div>
            </div>
          </div>

          {/* Right — safety points */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {SAFETY_POINTS.map((point, i) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className={`flex gap-5 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:border-gray-300 hover:shadow-md ${
                      inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${150 + i * 80}ms` }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
    <section ref={ref} className="px-6 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div
          className={`relative overflow-hidden rounded-2xl bg-gray-900 px-8 py-16 text-center shadow-xl transition-all duration-700 md:px-16 md:py-20 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Klaar om samen te werken?
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Laat ons uw project naar een hoger niveau tillen
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Heeft u een project waarvoor u professionele installateurs nodig
              heeft? Neem gerust contact met ons op voor een vrijblijvende
              offerte.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
              >
                Vraag een offerte
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
      <Story />
      <Values />
      <Expertise />
      <Timeline />
      <Safety />
      <CTA />
      <Footer />
    </main>
  );
}
