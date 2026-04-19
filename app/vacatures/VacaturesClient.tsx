"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  X,
  Briefcase,
  ChevronDown,
  CheckCircle2,
  Upload,
  FileText,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getIcon } from "../components/Icon";
import type {
  SiteSettings,
  VacaturesPage,
  SanityVacature,
} from "../../sanity/lib/types";

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

function Hero({ page }: { page: VacaturesPage }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  const heroImage = page.heroImageUrl ?? "/vacatures.png";

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
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">
              {page.heroEyebrow}
            </p>
          )}

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {page.heroTitle ?? "Werken bij ARS"}
          </h1>

          {page.heroSubtitle && (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              {page.heroSubtitle}
            </p>
          )}

          {!!page.heroCtas?.length && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {page.heroCtas.map((cta, i) => {
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
            </div>
          )}
        </div>

        {!!page.heroStats?.length && (
          <div
            className={`mt-16 grid max-w-lg grid-cols-3 gap-8 transition-all delay-200 duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {page.heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Benefits({ page }: { page: VacaturesPage }) {
  const { ref, inView } = useInView(0.1);
  const benefits = page.benefits ?? [];

  return (
    <section ref={ref} className="px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {page.benefitsEyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              {page.benefitsEyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {page.benefitsTitle ?? "Wat wij bieden"}
          </h2>
          {page.benefitsSubtitle && (
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {page.benefitsSubtitle}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = getIcon(benefit.icon);
            return (
              <div
                key={benefit.title}
                className={`group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 group-hover:bg-gray-900 group-hover:text-white">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JobCard({
  job,
  index,
  inView,
  onApply,
}: {
  job: SanityVacature;
  index: number;
  inView: boolean;
  onApply: (jobTitle: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(job.icon);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-500 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${100 + index * 80}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-gray-50 md:items-center md:p-8"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <Icon className="h-5 w-5 text-gray-900" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <Briefcase className="h-3.5 w-3.5" />
              {job.type}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-6 pb-6 pt-5 md:px-8 md:pb-8">
            <p className="text-sm leading-relaxed text-gray-600">{job.description}</p>

            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-900">Wat verwachten we:</p>
              <ul className="mt-3 space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
                    <span className="text-sm text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApply(job.title);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.98]"
              >
                Solliciteren
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplyModal({
  jobTitle,
  onClose,
}: {
  jobTitle: string;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1800);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400";
  const inputIdle = "border-gray-200 hover:border-gray-300";
  const inputFocus = "border-gray-900 ring-2 ring-gray-900/10";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl animate-modal-in">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 sm:px-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Solliciteren</h3>
            <p className="mt-0.5 text-sm text-gray-400">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {formState === "sent" ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Sollicitatie ontvangen</h3>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Bedankt voor je interesse in de functie {jobTitle}. Wij nemen zo snel mogelijk
              contact met je op.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Sluiten
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8">
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Voornaam *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jan"
                    onFocus={() => setFocusedField("m-firstname")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${
                      focusedField === "m-firstname" ? inputFocus : inputIdle
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
                    onFocus={() => setFocusedField("m-lastname")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${
                      focusedField === "m-lastname" ? inputFocus : inputIdle
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  E-mailadres *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="email"
                    placeholder="jan@voorbeeld.be"
                    onFocus={() => setFocusedField("m-email")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} pl-11 ${
                      focusedField === "m-email" ? inputFocus : inputIdle
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
                    onFocus={() => setFocusedField("m-phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} pl-11 ${
                      focusedField === "m-phone" ? inputFocus : inputIdle
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  CV uploaden *
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-4 transition-all duration-200 ${
                    fileName
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="hidden"
                  />
                  {fileName ? (
                    <>
                      <FileText className="h-5 w-5 shrink-0 text-gray-900" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {fileName}
                        </p>
                        <p className="text-xs text-gray-400">Klik om te wijzigen</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 shrink-0 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Klik om je CV te uploaden
                        </p>
                        <p className="text-xs text-gray-400">PDF, DOC of DOCX (max. 10MB)</p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Motivatie
                </label>
                <textarea
                  rows={3}
                  placeholder="Vertel kort waarom je interesse hebt in deze functie..."
                  onFocus={() => setFocusedField("m-message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputBase} resize-none ${
                    focusedField === "m-message" ? inputFocus : inputIdle
                  }`}
                />
              </div>

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
                    Versturen...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sollicitatie versturen
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function JobListings({
  page,
  internalJobs,
  subcontractorJobs,
  onApply,
}: {
  page: VacaturesPage;
  internalJobs: SanityVacature[];
  subcontractorJobs: SanityVacature[];
  onApply: (jobTitle: string) => void;
}) {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      ref={ref}
      id="openstaande-vacatures"
      className="scroll-mt-20 bg-gray-50 px-6 py-20 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {page.listingsEyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              {page.listingsEyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {page.internalTitle ?? "Interne medewerkers"}
          </h2>
          {page.internalSubtitle && (
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {page.internalSubtitle}
            </p>
          )}
        </div>

        <div className="mt-10 space-y-3">
          {internalJobs.map((job, i) => (
            <JobCard
              key={job._id}
              job={job}
              index={i}
              inView={inView}
              onApply={onApply}
            />
          ))}
        </div>

        {!!subcontractorJobs.length && (
          <>
            <div
              className={`mt-20 max-w-2xl transition-all duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {page.subcontractorTitle ?? "Onderaannemers"}
              </h2>
              {page.subcontractorSubtitle && (
                <p className="mt-4 text-base leading-relaxed text-gray-500">
                  {page.subcontractorSubtitle}
                </p>
              )}
            </div>

            <div className="mt-10 space-y-3">
              {subcontractorJobs.map((job, i) => (
                <JobCard
                  key={job._id}
                  job={job}
                  index={i}
                  inView={inView}
                  onApply={onApply}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ApplicationCTA({
  page,
  site,
}: {
  page: VacaturesPage;
  site: SiteSettings | null;
}) {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1800);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400";
  const inputIdle = "border-gray-200 hover:border-gray-300";
  const inputFocus = "border-gray-900 ring-2 ring-gray-900/10";

  const bullets = page.applyBullets ?? [];

  return (
    <section ref={ref} id="solliciteren" className="scroll-mt-20 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {page.applyEyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
                {page.applyEyebrow}
              </p>
            )}
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {page.applyTitle ?? "Klaar voor een nieuwe uitdaging?"}
            </h2>
            {page.applySubtitle && (
              <p className="mt-4 text-base leading-relaxed text-gray-500">{page.applySubtitle}</p>
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

            <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5">
              {page.applyContactTitle && (
                <p className="text-sm font-semibold text-gray-900">{page.applyContactTitle}</p>
              )}
              {page.applyContactNote && (
                <p className="mt-1 text-sm text-gray-500">{page.applyContactNote}</p>
              )}
              <div className="mt-3 space-y-2">
                {site?.phone && (
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
                  >
                    <Phone className="h-4 w-4" />
                    {site.phone}
                  </a>
                )}
                {site?.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
                  >
                    <Mail className="h-4 w-4" />
                    {site.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {formState === "sent" ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900">Sollicitatie ontvangen</h3>
                <p className="mt-2 max-w-sm text-gray-500">
                  Bedankt voor je interesse in ARS. Wij nemen zo snel mogelijk contact met je op.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Nieuwe sollicitatie
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-8 md:p-10">
                <h3 className="text-lg font-bold text-gray-900">Open sollicitatie</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Staat jouw functie er niet bij? Solliciteer hier spontaan
                </p>

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
                        onFocus={() => setFocusedField("lastname")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} ${
                          focusedField === "lastname" ? inputFocus : inputIdle
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
                          placeholder="jan@voorbeeld.be"
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
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputBase} pl-11 ${
                            focusedField === "phone" ? inputFocus : inputIdle
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Functie van interesse
                    </label>
                    <input
                      type="text"
                      placeholder="Bv. Industrieel Lasser, RWA Installateur..."
                      onFocus={() => setFocusedField("function")}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase} ${
                        focusedField === "function" ? inputFocus : inputIdle
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      CV uploaden
                    </label>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-4 transition-all duration-200 ${
                        fileName
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="hidden"
                      />
                      {fileName ? (
                        <>
                          <FileText className="h-5 w-5 shrink-0 text-gray-900" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {fileName}
                            </p>
                            <p className="text-xs text-gray-400">Klik om te wijzigen</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Klik om je CV te uploaden
                            </p>
                            <p className="text-xs text-gray-400">PDF, DOC of DOCX (max. 10MB)</p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Motivatie / bericht
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Vertel kort iets over jezelf en je ervaring..."
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase} resize-none ${
                        focusedField === "message" ? inputFocus : inputIdle
                      }`}
                    />
                  </div>

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
                        Versturen...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sollicitatie versturen
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

export default function VacaturesClient({
  page,
  site,
  internalJobs,
  subcontractorJobs,
}: {
  page: VacaturesPage;
  site: SiteSettings | null;
  internalJobs: SanityVacature[];
  subcontractorJobs: SanityVacature[];
}) {
  const [applyJob, setApplyJob] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Navbar site={site} variant="transparent" scrollThreshold={20} />
      <Hero page={page} />
      <Benefits page={page} />
      <JobListings
        page={page}
        internalJobs={internalJobs}
        subcontractorJobs={subcontractorJobs}
        onApply={(title) => setApplyJob(title)}
      />
      <ApplicationCTA page={page} site={site} />
      <Footer site={site} variant="withContact" />

      {applyJob && <ApplyModal jobTitle={applyJob} onClose={() => setApplyJob(null)} />}
    </main>
  );
}
