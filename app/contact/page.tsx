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
  MessageSquare,
  Building2,
  Sparkles,
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

const NAV_LINKS_RIGHT = [{ label: "Vacatures", href: "/#vacatures" }];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Telefoon",
    value: "+32 (0)89 36 77 87",
    href: "tel:+3289367787",
    description: "Ma - Vr: 07:00 - 18:00",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    ringColor: "ring-blue-100",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "info@ars-metals.be",
    href: "mailto:info@ars-metals.be",
    description: "Reactie binnen 48 uur",
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50",
    ringColor: "ring-violet-100",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Mondeolaan 2E, Bus 20",
    href: "https://www.google.com/maps/search/Mondeolaan+2E+Bus+20+3600+Genk",
    description: "3600 Genk, België",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    ringColor: "ring-emerald-100",
  },
  {
    icon: Clock,
    label: "Bereikbaarheid",
    value: "Ma - Vr: 07:00 - 18:00",
    href: undefined,
    description: "Weekend op afspraak",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    ringColor: "ring-amber-100",
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
      <div className="container-wide mx-auto flex h-[72px] items-center px-6 lg:px-12">
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

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="grid-bg h-full w-full" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-500/15 to-blue-500/15 blur-[100px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
      </div>

      <div className="container-wide relative mx-auto px-6 py-32 lg:px-12 lg:py-40">
        <div className="max-w-3xl">
          <div
            className={`transition-all duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white/70">
                ARS Metaalwerken BV
              </span>
            </div>
          </div>

          <h1
            className={`text-balance text-4xl font-extrabold tracking-tight text-white transition-all delay-100 duration-700 sm:text-5xl lg:text-6xl ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              opnemen
            </span>
          </h1>

          <p
            className={`mt-6 max-w-xl text-lg leading-relaxed text-gray-400 transition-all delay-200 duration-700 sm:text-xl ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Neem gerust contact op met ARS Metals voor al uw vragen over
            industriële diensten. Wij staan klaar om u te helpen.
          </p>

          <div
            className={`mt-10 flex flex-wrap gap-4 transition-all delay-300 duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/15 active:translate-y-0"
            >
              <MessageSquare className="h-4 w-4" />
              Stuur een bericht
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:+3289367787"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 active:translate-y-0"
            >
              <Phone className="h-4 w-4" />
              +32 (0)89 36 77 87
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ContactCards() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="-mt-16 relative z-10 px-6 lg:px-12">
      <div className="container-wide mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map((item, i) => {
            const Icon = item.icon;
            const cardClass = `group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-100/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              item.href ? "cursor-pointer" : ""
            } ${
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`;
            const cardStyle = { transitionDelay: `${i * 100}ms` };
            const iconColor =
              item.color === "from-blue-500 to-blue-600"
                ? "#3b82f6"
                : item.color === "from-violet-500 to-violet-600"
                ? "#8b5cf6"
                : item.color === "from-emerald-500 to-emerald-600"
                ? "#10b981"
                : "#f59e0b";

            const cardContent = (
              <>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.bgColor} ring-1 ${item.ringColor} transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" style={{ color: iconColor }} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.label}
                  </div>
                  <div className="mt-1 text-[15px] font-bold text-gray-900">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {item.description}
                  </div>
                  {item.href && (
                    <ExternalLink className="absolute right-0 top-0 h-4 w-4 text-gray-200 transition-all duration-300 group-hover:text-gray-400" />
                  )}
                </div>
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
                {cardContent}
              </a>
            ) : (
              <div key={item.label} className={cardClass} style={cardStyle}>
                {cardContent}
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

  return (
    <section
      ref={ref}
      id="contact-form"
      className="scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="container-wide mx-auto">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Left info column */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              inView
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Send className="h-3.5 w-3.5" />
              Contactformulier
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              Laat ons weten hoe we u kunnen helpen
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">
              Vul het formulier in en wij nemen zo snel mogelijk contact met u
              op. We streven ernaar om binnen 48 uur feedback te geven.
            </p>

            {/* Trust signals */}
            <div className="mt-10 space-y-5">
              {[
                {
                  icon: CheckCircle2,
                  text: "Gratis en vrijblijvend adviesgesprek",
                },
                { icon: CheckCircle2, text: "Reactie binnen 48 uur" },
                { icon: CheckCircle2, text: "Offerte op maat" },
                {
                  icon: CheckCircle2,
                  text: "Meer dan 2000+ succesvolle projecten",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    inView
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <item.icon className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-[15px] text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Direct contact CTA */}
            <div className="mt-12 rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
              <p className="text-sm font-semibold text-gray-900">
                Liever direct contact?
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Bel ons tijdens kantooruren voor een direct antwoord.
              </p>
              <a
                href="tel:+3289367787"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-black transition-colors hover:text-gray-600"
              >
                <Phone className="h-4 w-4" />
                +32 (0)89 36 77 87
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right form column */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              inView
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            {formState === "sent" ? (
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-xl shadow-gray-100/80">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                </div>
                <h3 className="mt-8 text-2xl font-bold text-gray-900">
                  Bericht verzonden!
                </h3>
                <p className="mt-3 max-w-sm text-gray-500">
                  Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met
                  u op, uiterlijk binnen 48 uur.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
                >
                  Nieuw bericht
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/80 md:p-10"
              >
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Stuur ons een bericht
                    </h3>
                    <p className="text-sm text-gray-400">
                      Alle velden met * zijn verplicht
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
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
                        className={`w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 ${
                          focusedField === "firstname"
                            ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                            : "border-gray-200 hover:border-gray-300"
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
                        className={`w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 ${
                          focusedField === "lastname"
                            ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                            : "border-gray-200 hover:border-gray-300"
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
                      <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                      <input
                        type="text"
                        placeholder="Uw bedrijfsnaam"
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full rounded-xl border bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 ${
                          focusedField === "company"
                            ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & phone row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        E-mailadres *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                        <input
                          required
                          type="email"
                          placeholder="jan@bedrijf.be"
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full rounded-xl border bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 ${
                            focusedField === "email"
                              ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Telefoonnummer *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                        <input
                          required
                          type="tel"
                          placeholder="+32 (0) 123 45 67 89"
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full rounded-xl border bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 ${
                            focusedField === "phone"
                              ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                              : "border-gray-200 hover:border-gray-300"
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
                        className={`flex w-full items-center justify-between rounded-xl border bg-gray-50/50 px-4 py-3 text-sm outline-none transition-all duration-300 ${
                          serviceOpen
                            ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                            : "border-gray-200 hover:border-gray-300"
                        } ${
                          selectedService ? "text-gray-900" : "text-gray-300"
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
                        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-auto rounded-xl border border-gray-100 bg-white py-1 shadow-xl shadow-gray-200/50">
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
                                  ? "bg-gray-50 font-semibold text-black"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
                              }`}
                            >
                              {selectedService === option && (
                                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                              )}
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
                      className={`w-full resize-none rounded-xl border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 ${
                        focusedField === "message"
                          ? "border-black bg-white shadow-lg shadow-black/5 ring-4 ring-black/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="group relative w-full overflow-hidden rounded-xl bg-black px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <span className="relative flex items-center justify-center gap-2">
                      {formState === "sending" ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
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
                        </>
                      ) : (
                        <>
                          Verstuur bericht
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
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
    <section ref={ref} className="px-6 pb-24 lg:px-12 lg:pb-32">
      <div className="container-wide mx-auto">
        <div
          className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/60 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Map header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Onze locatie</h3>
              <p className="mt-1 text-sm text-gray-400">
                Mondeolaan 2E, Bus 20 — 3600 Genk, België
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/Mondeolaan+2E+Bus+20+3600+Genk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]"
            >
              <MapPin className="h-4 w-4" />
              Routebeschrijving
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Map embed */}
          <div className="relative h-[400px] w-full bg-gray-100 lg:h-[450px]">
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
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-wide mx-auto px-6 py-16 lg:px-12">
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
              Uw betrouwbare partner voor industriële diensten. Van laswerken tot
              montage, van onderhoud tot verhuizingen — wij staan voor u klaar.
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
                { label: "Vacatures", href: "/#vacatures" },
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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ContactCards />
      <ContactForm />
      <MapSection />
      <Footer />
    </main>
  );
}
