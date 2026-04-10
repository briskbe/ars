"use client";

import { useState } from "react";
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
  Building2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Diensten", href: "#diensten" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Waarom ARS", href: "#waarom" },
  { label: "Contact", href: "#contact" },
];

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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="container-wide flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 shadow-lg shadow-brand-600/25">
            <Building2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-navy-900">
              ARS
            </span>
            <span className="text-xl font-bold tracking-tight text-brand-600">
              {" "}
              Metals
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-gray-50 hover:text-navy-900"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary ml-4 !py-2.5 !text-sm">
            Contact opnemen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-navy-600 transition-colors hover:bg-gray-50 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-navy-700 transition-colors hover:bg-gray-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            Contact opnemen
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute right-0 top-20 h-[600px] w-[600px] rounded-full bg-brand-500/5 blur-3xl" />
      <div className="absolute -left-40 top-60 h-[400px] w-[400px] rounded-full bg-navy-500/5 blur-3xl" />

      <div className="container-wide relative px-6 pb-20 pt-24 md:pb-32 md:pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-2 text-sm font-medium text-brand-700">
            <Sparkles className="h-4 w-4" />
            Al meer dan 10 jaar uw industriële partner
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animate-delay-100 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Jouw partner voor{" "}
            <span className="gradient-text">industriële diensten</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animate-delay-200 mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-navy-500 md:text-xl">
            Van laswerken tot montage, van onderhoud tot industriële
            verhuizingen — ARS Metals biedt vakmanschap en betrouwbaarheid voor
            elk project.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#diensten" className="btn-primary text-base">
              Onze diensten
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-secondary text-base">
              Contact opnemen
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-in-up animate-delay-400 mx-auto mt-20 max-w-5xl rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-200/50">
          <div className="grid grid-cols-2 divide-x divide-gray-100 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center md:px-8">
                <div className="text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-navy-700">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-navy-400">
                  {stat.description}
                </div>
              </div>
            ))}
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
            <Wrench className="h-3.5 w-3.5" />
            Wat wij doen
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
            Ons complete aanbod aan{" "}
            <span className="gradient-text">industriële diensten</span>
          </h2>
          <p className="mt-5 text-balance text-lg text-navy-500">
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
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-xl bg-brand-50 p-3 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-500">
                  {service.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800">
              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid-bg h-full w-full" />
              </div>
              {/* Content */}
              <div className="relative flex h-full flex-col items-center justify-center p-12 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-600 shadow-2xl shadow-brand-600/40">
                  <Building2
                    className="h-10 w-10 text-white"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-3xl font-extrabold text-white md:text-4xl">
                  ARS Metals
                </h3>
                <p className="mt-3 max-w-sm text-lg text-navy-300">
                  Vakmanschap, betrouwbaarheid en toewijding sinds dag één
                </p>
                <div className="mt-8 grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-2xl font-extrabold text-brand-400">
                      2000+
                    </div>
                    <div className="mt-1 text-xs text-navy-400">Projecten</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-brand-400">
                      10+
                    </div>
                    <div className="mt-1 text-xs text-navy-400">
                      Jaar actief
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-brand-400">
                      100%
                    </div>
                    <div className="mt-1 text-xs text-navy-400">Inzet</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-brand-100" />
          </div>

          {/* Right — text */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-600">
              <Award className="h-3.5 w-3.5" />
              Over ons
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Meer dan 10 jaar ervaring in de{" "}
              <span className="gradient-text">industriële sector</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy-500">
              ARS Metals is opgericht vanuit een passie voor industrieel
              vakmanschap. Met een team van ervaren specialisten bieden wij een
              allround service die verder gaat dan alleen uitvoering — wij
              denken mee, adviseren en leveren altijd een resultaat waar we trots
              op zijn.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-navy-500">
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
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium text-navy-700">{item}</span>
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
    <section id="waarom" className="section-padding bg-navy-950 text-white">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <Star className="h-3.5 w-3.5" />
            Waarom ARS Metals
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Waarom klanten voor{" "}
            <span className="text-brand-400">ons kiezen</span>
          </h2>
          <p className="mt-5 text-lg text-navy-300">
            Ontdek wat ons onderscheidt van de rest en waarom bedrijven ons keer
            op keer als partner kiezen.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {REASONS.map((reason, index) => (
            <div
              key={reason.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-500/30 hover:bg-white/10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <span className="text-lg font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-bold">{reason.title}</h3>
              <p className="mt-3 leading-relaxed text-navy-300">
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
    <section className="bg-brand-600">
      <div className="container-wide flex flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-12">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
            <HardHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              We hebben openstaande vacatures!
            </h3>
            <p className="text-sm text-brand-100">
              Ben jij een vakman met passie voor industrieel werk? Solliciteer
              vandaag nog.
            </p>
          </div>
        </div>
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all duration-300 hover:bg-brand-50 hover:-translate-y-0.5"
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Klaar om samen te werken?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-500">
              Heeft u een project in gedachten of wilt u meer weten over onze
              diensten? Neem vrijblijvend contact met ons op. Wij reageren
              binnen 24 uur.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-400">
                    Telefoon
                  </div>
                  <div className="mt-1 text-lg font-bold text-navy-900">
                    +32 (0) 123 45 67 89
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-400">
                    E-mail
                  </div>
                  <div className="mt-1 text-lg font-bold text-navy-900">
                    info@arsmetals.be
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-400">
                    Adres
                  </div>
                  <div className="mt-1 text-lg font-bold text-navy-900">
                    België
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-400">
                    Bereikbaarheid
                  </div>
                  <div className="mt-1 text-lg font-bold text-navy-900">
                    Ma - Vr: 07:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50 md:p-10">
            <h3 className="text-xl font-bold text-navy-900">
              Stuur ons een bericht
            </h3>
            <p className="mt-2 text-sm text-navy-400">
              Vul het formulier in en wij nemen zo snel mogelijk contact met u
              op.
            </p>
            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Voornaam
                  </label>
                  <input
                    type="text"
                    placeholder="Jan"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Achternaam
                  </label>
                  <input
                    type="text"
                    placeholder="De Vries"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  E-mailadres
                </label>
                <input
                  type="email"
                  placeholder="jan@bedrijf.be"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  placeholder="+32 (0) 123 45 67 89"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  Bericht
                </label>
                <textarea
                  rows={4}
                  placeholder="Vertel ons over uw project..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
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
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 shadow-lg shadow-brand-600/25">
                <Building2 className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-navy-900">
                  ARS
                </span>
                <span className="text-xl font-bold tracking-tight text-brand-600">
                  {" "}
                  Metals
                </span>
              </div>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-400">
              Uw betrouwbare partner voor industriële diensten. Van laswerken tot
              montage, van onderhoud tot verhuizingen — wij staan voor u klaar.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy-900">
              Diensten
            </h4>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <a
                    href="#diensten"
                    className="text-sm text-navy-400 transition-colors hover:text-brand-600"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy-900">
              Bedrijf
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                "Over ons",
                "Realisaties",
                "Vacatures",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-navy-400 transition-colors hover:text-brand-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="text-sm text-navy-400">
            &copy; {new Date().getFullYear()} ARS Metals. Alle rechten
            voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-navy-400 transition-colors hover:text-brand-600"
            >
              Privacybeleid
            </a>
            <a
              href="#"
              className="text-sm text-navy-400 transition-colors hover:text-brand-600"
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
