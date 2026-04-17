"use client";

import { useState, useEffect, useRef } from "react";
import {
  Flame,
  Wrench,
  Zap,
  Settings,
  Truck,
  Shield,
  Sun,
  HardHat,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Clock,
  Award,
  CheckCircle2,
  Star,
  Calendar,
  Building2,
  Users,
  Target,
  Heart,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Handshake,
} from "lucide-react";
import { GradientWaveText } from "@/components/gradient-wave-text";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS_LEFT = [
  { label: "Homepagina", href: "#" },
  { label: "Diensten", href: "#diensten" },
  { label: "Realisaties", href: "#over-ons" },
  { label: "Over ons", href: "#waarom" },
];

const NAV_LINKS_RIGHT = [{ label: "Vacatures", href: "/vacatures" }];

const SERVICES = [
  {
    icon: Flame,
    title: "Rook- en warmteafvoer",
    description:
      "Professionele installatie en onderhoud van rookafvoersystemen voor optimale veiligheid en ventilatie in industriële omgevingen.",
  },
  {
    icon: HardHat,
    title: "Montagewerken",
    description:
      "Vakkundige montage van staalconstructies, machines en industriële installaties met oog voor precisie en veiligheid.",
  },
  {
    icon: Zap,
    title: "Laswerken",
    description:
      "Gecertificeerde lasspecialisten voor MIG, TIG en elektrisch lassen op alle gangbare materialen en legeringen.",
  },
  {
    icon: Settings,
    title: "Service & Onderhoud",
    description:
      "Preventief en correctief onderhoud om stilstand te minimaliseren en de levensduur van uw installaties te verlengen.",
  },
  {
    icon: Truck,
    title: "Industrieel montage & verhuis",
    description:
      "Complete demontage, transport en hermontage van industriële machines en productielijnen.",
  },
  {
    icon: Shield,
    title: "Rookschermen & Smoke Fabric",
    description:
      "Installatie van rookschermen en smoke barriers voor brandcompartimentering conform de laatste normen.",
  },
  {
    icon: Sun,
    title: "Lichtstraten & lichtkoepels",
    description:
      "Plaatsing en renovatie van lichtstraten en lichtkoepels voor optimale daglichttoetreding in uw bedrijfsgebouw.",
  },
  {
    icon: Wrench,
    title: "Industrieel las- en montagewerken",
    description:
      "All-round industriële las- en montageoplossingen voor projecten van klein tot groot, altijd op maat.",
  },
];

const STATS = [
  {
    value: "2000+",
    label: "Succesvolle projecten",
    description: "Afgerond met precisie",
  },
  {
    value: "10+",
    label: "Jaar ervaring",
    description: "In de industriële sector",
  },
  {
    value: "2x",
    label: "Snellere levering",
    description: "Door eigen werkwijze",
  },
  {
    value: "100%",
    label: "Klanttevredenheid",
    description: "Onze hoogste prioriteit",
  },
];

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

const STORY_HIGHLIGHTS = [
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
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/80 bg-white/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex h-[72px] items-center px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="mr-12 flex-shrink-0" onClick={() => setActiveLink("#")}>
          <img
            src="/logo.png"
            alt="ARS Industrial Services"
            className={`h-8 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
          />
        </a>

        {/* Desktop: left nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS_LEFT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative py-1 text-[15px] transition-colors duration-200 ${
                scrolled
                  ? activeLink === link.href
                    ? "font-semibold text-black"
                    : "font-medium text-gray-800 hover:text-black"
                  : activeLink === link.href
                    ? "font-semibold text-white"
                    : "font-medium text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ${
                  scrolled ? "bg-black" : "bg-white"
                } ${activeLink === link.href ? "w-full" : "w-0"}`}
              />
            </a>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop: right nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS_RIGHT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative py-1 text-[15px] transition-colors duration-200 ${
                scrolled
                  ? activeLink === link.href
                    ? "font-semibold text-black"
                    : "font-medium text-gray-800 hover:text-black"
                  : activeLink === link.href
                    ? "font-semibold text-white"
                    : "font-medium text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ${
                  scrolled ? "bg-black" : "bg-white"
                } ${activeLink === link.href ? "w-full" : "w-0"}`}
              />
            </a>
          ))}
          <a
            href="/contact"
            className={`rounded-xl px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] ${
              scrolled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`rounded-lg p-2 transition-colors md:hidden ${
            scrolled ? "text-gray-600 hover:bg-gray-50" : "text-white hover:bg-white/10"
          }`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-2 md:hidden">
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setOpen(false);
              }}
              className={`block border-b border-gray-50 px-2 py-3.5 text-[15px] transition-colors ${
                activeLink === link.href
                  ? "font-semibold text-black"
                  : "font-medium text-gray-600 hover:text-black"
              }`}
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

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /* Single subtle parallax on the background image only — no content jittering */
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

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Background image — very slow zoom + mouse parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-105 will-change-transform"
        style={{ transition: "transform 0.6s ease-out" }}
      >
        <img
          src="/hero.jpg"
          alt=""
          className="hero-bg-image h-full w-full object-cover"
        />
      </div>

      {/* Single dark overlay — clean, no stacking */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-10 pt-32">
        <div className="container-wide px-6 lg:px-12">
          <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-widest text-white/50">
            Al meer dan 10 jaar uw partner
          </p>

          <h1 className="animate-fade-in-up animate-delay-100 mt-5 w-full">
            <GradientWaveText
              align="left"
              repeat
              radial={false}
              baseColor="#ffffff"
              className="w-full text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              customColors={["#0f172a", "#1e293b", "#334155", "#475569", "#334155", "#1e293b"]}
            >
              {"Vakmanschap voor\nde industrie"}
            </GradientWaveText>
          </h1>

          <p className="animate-fade-in-up animate-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
            Van laswerken tot montage, van onderhoud tot industriële
            verhuizingen — ARS Metals levert precisie en betrouwbaarheid.
          </p>

          <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-wrap gap-4">
            <a
              href="#diensten"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100"
            >
              Bekijk onze diensten
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
            >
              Neem contact op
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up animate-delay-500 mt-20 border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((stat) => (
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
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="diensten" className="section-padding bg-gray-50/80">
      <div className="container-wide">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
            <Wrench className="h-3.5 w-3.5" />
            Wat wij doen
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Ons complete aanbod aan industriële diensten
          </h2>
          <p className="mt-5 text-balance text-lg text-gray-500">
            Met jarenlange ervaring en een breed scala aan specialisaties zijn
            wij uw allround partner voor elk industrieel project.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gray-100 p-3 text-gray-700 transition-colors group-hover:bg-black group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {service.title}
                </h3>
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

function AboutUs() {
  return (
    <>
      {/* ---- Ons verhaal ---- */}
      <section id="over-ons" className="section-padding scroll-mt-20 bg-white">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left — label, heading, highlights */}
            <div className="lg:col-span-5">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <Award className="h-3.5 w-3.5" />
                Ons verhaal
              </div>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Wie wij zijn en waar wij voor staan
              </h2>

              <div className="mt-8 space-y-5">
                {STORY_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
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
            <div className="lg:col-span-7">
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                <span className="font-semibold text-gray-900">
                  ARS METAALWERKEN
                </span>{" "}
                is een innovatief en dynamisch bedrijf, opgericht in 2014, met
                als doel zijn uitgebreide kennis en ervaring in de industriële
                dienstensector verder uit te breiden. Wij specialiseren ons in
                een breed scala aan diensten en zijn trots op onze expertise op
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
                  &ldquo;Onze focus ligt op kwaliteit, veiligheid en
                  efficiëntie, waardoor we elk project tijdig en binnen budget
                  kunnen voltooien.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Waarom klanten voor ons kiezen ---- */}
      <section id="waarom" className="section-padding scroll-mt-20 bg-gray-50/80">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
              <Star className="h-3.5 w-3.5" />
              Waarom ARS Metals
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Waarom klanten voor{" "}
              <span className="underline decoration-gray-300 decoration-[3px] underline-offset-[6px]">
                ons kiezen
              </span>
            </h2>
            <p className="mt-5 text-balance text-lg text-gray-500">
              Het bedrijf staat bekend om zijn brede aanbod en de expertise die
              het klanten biedt — voortkomend uit jarenlange ervaring en een
              oprechte toewijding aan maatwerk.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/60"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-gray-100 p-3 text-gray-700 transition-colors group-hover:bg-black group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Timeline ---- */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
              <Sparkles className="h-3.5 w-3.5" />
              Ons traject
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tien jaar bouwen aan vertrouwen
            </h2>
            <p className="mt-5 text-balance text-lg text-gray-400">
              Van oprichting tot één van de meest betrouwbare partners in de
              sector — een greep uit onze mijlpalen.
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className="relative grid gap-6 md:grid-cols-2 md:gap-12"
                  >
                    <div className="absolute left-4 top-2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                      <div className="h-3 w-3 rounded-full bg-white" />
                      <div className="absolute h-6 w-6 rounded-full bg-white/20" />
                    </div>

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
                      <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">
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

      {/* ---- Veiligheid & VCA ---- */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left — headline + VCA badge */}
            <div className="lg:col-span-5">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Veiligheid & gezondheid
              </div>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Veilig werken — voor iedereen
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray-500 sm:text-lg">
                Als bedrijf hechten wij voortdurend waarde aan veiligheid en
                gezondheid op de werkvloer. Ons VCA*-certificaat toont aan dat
                ARS Metaalwerken structureel aandacht besteedt aan veiligheid
                tijdens het werk.
              </p>

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
                {SAFETY_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.title}
                      className="flex gap-5 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
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
    </>
  );
}

function JobsBanner() {
  return (
    <section className="bg-gray-900">
      <div className="container-wide flex flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-12">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <HardHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              We hebben openstaande vacatures!
            </h3>
            <p className="text-sm text-gray-400">
              Ben jij een vakman met passie voor industrieel werk? Solliciteer
              vandaag nog.
            </p>
          </div>
        </div>
        <a
          href="/vacatures"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5"
        >
          Bekijk vacatures
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-padding bg-gray-50/80">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              Klaar om samen te werken?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">
              Heeft u een project in gedachten of wilt u meer weten over onze
              diensten? Neem vrijblijvend contact met ons op. Wij reageren
              binnen 24 uur.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    Telefoon
                  </div>
                  <div className="mt-1 text-lg font-bold text-gray-900">
                    +32 (0) 123 45 67 89
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    E-mail
                  </div>
                  <div className="mt-1 text-lg font-bold text-gray-900">
                    info@arsmetals.be
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    Adres
                  </div>
                  <div className="mt-1 text-lg font-bold text-gray-900">
                    België
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    Bereikbaarheid
                  </div>
                  <div className="mt-1 text-lg font-bold text-gray-900">
                    Ma - Vr: 07:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/80 md:p-10">
            <h3 className="text-xl font-bold text-gray-900">
              Stuur ons een bericht
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Vul het formulier in en wij nemen zo snel mogelijk contact met u
              op.
            </p>
            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Voornaam
                  </label>
                  <input
                    type="text"
                    placeholder="Jan"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Achternaam
                  </label>
                  <input
                    type="text"
                    placeholder="De Vries"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  E-mailadres
                </label>
                <input
                  type="email"
                  placeholder="jan@bedrijf.be"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  placeholder="+32 (0) 123 45 67 89"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Bericht
                </label>
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

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-wide px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#">
              <img src="/logo.png" alt="ARS Industrial Services" className="h-9 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Uw betrouwbare partner voor industriële diensten. Van laswerken tot
              montage, van onderhoud tot verhuizingen — wij staan voor u klaar.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Diensten
            </h4>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <a
                    href="#diensten"
                    className="text-sm text-gray-400 transition-colors hover:text-black"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Bedrijf
            </h4>
            <ul className="mt-5 space-y-3">
              {["Over ons", "Realisaties", "Vacatures", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 transition-colors hover:text-black"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 sm:flex-row">
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <JobsBanner />
      <Contact />
      <Footer />
    </main>
  );
}
