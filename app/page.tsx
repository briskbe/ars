"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Sparkles,
} from "lucide-react";

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

const REASONS = [
  {
    title: "Allround expertise",
    description:
      "Van laswerk tot montage, van onderhoud tot complete verhuizingen — wij dekken het volledige spectrum van industriële diensten.",
  },
  {
    title: "Oplossingsgericht",
    description:
      "Geen probleem is te complex. Wij denken mee en bieden pragmatische oplossingen die echt werken op de werkvloer.",
  },
  {
    title: "Betrouwbaar & flexibel",
    description:
      "Afspraak is afspraak. Wij leveren op tijd en passen ons aan wanneer uw planning wijzigt.",
  },
  {
    title: "Veiligheid voorop",
    description:
      "Alle werkzaamheden worden uitgevoerd volgens de strengste veiligheidsnormen met gecertificeerde vakmensen.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-wide flex h-[72px] items-center px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="mr-12 flex-shrink-0" onClick={() => setActiveLink("#")}>
          <img src="/logo.png" alt="ARS Industrial Services" className="h-8 w-auto" />
        </a>

        {/* Desktop: left nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS_LEFT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative py-1 text-[15px] transition-colors duration-200 ${
                activeLink === link.href
                  ? "font-semibold text-black"
                  : "font-medium text-gray-800 hover:text-black"
              }`}
            >
              {link.label}
              {/* Active underline */}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-black transition-all duration-300 ${
                  activeLink === link.href ? "w-full" : "w-0"
                }`}
              />
              {/* Hover underline */}
              {activeLink !== link.href && (
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-black/40 transition-all duration-300 group-hover:w-full" />
              )}
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
                activeLink === link.href
                  ? "font-semibold text-black"
                  : "font-medium text-gray-800 hover:text-black"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-black transition-all duration-300 ${
                  activeLink === link.href ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
          <a
            href="/contact"
            className="rounded-xl bg-black px-6 py-2.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 md:hidden"
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

/* ------------------------------------------------------------------ */
/*  HERO PARTICLES CONFIG                                              */
/* ------------------------------------------------------------------ */
const PARTICLES = [
  { size: 3, left: "10%", top: "20%", tx: "60px", ty: "-100px", duration: "7s", delay: "0s" },
  { size: 2, left: "20%", top: "60%", tx: "-40px", ty: "-80px", duration: "5s", delay: "1s" },
  { size: 4, left: "70%", top: "30%", tx: "30px", ty: "-140px", duration: "8s", delay: "0.5s" },
  { size: 2, left: "85%", top: "70%", tx: "-50px", ty: "-90px", duration: "6s", delay: "2s" },
  { size: 3, left: "50%", top: "80%", tx: "20px", ty: "-110px", duration: "7s", delay: "1.5s" },
  { size: 2, left: "35%", top: "40%", tx: "-30px", ty: "-70px", duration: "5.5s", delay: "0.8s" },
  { size: 3, left: "60%", top: "55%", tx: "50px", ty: "-130px", duration: "6.5s", delay: "2.5s" },
  { size: 2, left: "15%", top: "75%", tx: "40px", ty: "-60px", duration: "7.5s", delay: "3s" },
  { size: 4, left: "90%", top: "45%", tx: "-60px", ty: "-100px", duration: "8s", delay: "1.2s" },
  { size: 2, left: "45%", top: "15%", tx: "25px", ty: "-90px", duration: "6s", delay: "0.3s" },
  { size: 3, left: "75%", top: "85%", tx: "-35px", ty: "-120px", duration: "7s", delay: "1.8s" },
  { size: 2, left: "5%", top: "50%", tx: "45px", ty: "-75px", duration: "5s", delay: "2.2s" },
];

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background image with slow zoom */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(1.08)`,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src="/hero.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ animation: "heroZoom 20s ease-in-out alternate infinite" }}
        />
      </div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      {/* Extra bottom fade for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Scan line effect */}
      <div className="hero-scan-line" />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: "rgba(255, 255, 255, 0.6)",
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.3)",
            ["--tx" as string]: p.tx,
            ["--ty" as string]: p.ty,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-32 pt-32 lg:px-12"
        style={{
          transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`,
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-white/70" />
              <span className="text-sm font-medium tracking-wide text-white/80">
                Al meer dan 10 jaar uw industriële partner
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up animate-delay-100 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Jouw partner voor
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">industriële diensten</span>
                <span className="hero-accent-line absolute -bottom-2 left-0 right-0 h-[3px] rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up animate-delay-200 mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-white/60 md:text-xl">
              Van laswerken tot montage, van onderhoud tot industriële
              verhuizingen — ARS Metals biedt vakmanschap en betrouwbaarheid
              voor elk project.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#diensten"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-black shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20"
              >
                Onze diensten
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
              >
                Contact opnemen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar — glass morphism, pinned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 lg:px-12">
        <div className="container-wide">
          <div className="animate-reveal-up animate-delay-700 mx-auto max-w-5xl">
            <div className="glass-card rounded-2xl p-1">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`glass-card-hover rounded-xl px-4 py-6 text-center md:px-8 ${
                      i < STATS.length - 1
                        ? "border-r border-white/5 md:border-r"
                        : ""
                    } ${i < 2 ? "border-b border-white/5 md:border-b-0" : ""}`}
                  >
                    <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white/70">
                      {stat.label}
                    </div>
                    <div className="mt-0.5 text-xs text-white/40">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
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

function About() {
  return (
    <section id="over-ons" className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 opacity-[0.07]">
                <div className="grid-bg h-full w-full" />
              </div>
              {/* Content */}
              <div className="relative flex h-full flex-col items-center justify-center p-12 text-center">
                <img src="/logo.png" alt="ARS Industrial Services" className="mb-4 h-14 w-auto brightness-0 invert" />
                <p className="mt-3 max-w-sm text-lg text-gray-400">
                  Vakmanschap, betrouwbaarheid en toewijding sinds dag één
                </p>
                <div className="mt-8 grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-2xl font-extrabold text-white">
                      2000+
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Projecten</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white">
                      10+
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Jaar actief
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white">
                      100%
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Inzet</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gray-100" />
          </div>

          {/* Right — text */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Award className="h-3.5 w-3.5" />
              Over ons
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              Meer dan 10 jaar ervaring in de industriële sector
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-500">
              ARS Metals is opgericht vanuit een passie voor industrieel
              vakmanschap. Met een team van ervaren specialisten bieden wij een
              allround service die verder gaat dan alleen uitvoering — wij
              denken mee, adviseren en leveren altijd een resultaat waar we trots
              op zijn.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Of het nu gaat om een kleine reparatie of een groot montageproject,
              bij ARS Metals bent u verzekerd van kwaliteit, veiligheid en een
              persoonlijke aanpak.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Gecertificeerde vakmensen",
                "Flexibele inzet op locatie",
                "Korte communicatielijnen",
                "Altijd binnen afgesproken termijn",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>

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

function WhyARS() {
  return (
    <section id="waarom" className="section-padding bg-black text-white">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
            <Star className="h-3.5 w-3.5" />
            Waarom ARS Metals
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Waarom klanten voor{" "}
            <span className="underline decoration-gray-600 decoration-[3px] underline-offset-[6px]">
              ons kiezen
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Ontdek wat ons onderscheidt van de rest en waarom bedrijven ons keer
            op keer als partner kiezen.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {REASONS.map((reason, index) => (
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
              <p className="mt-3 leading-relaxed text-gray-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ARS Metals. Alle rechten
            voorbehouden.
          </p>
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
      <About />
      <WhyARS />
      <JobsBanner />
      <Contact />
      <Footer />
    </main>
  );
}
