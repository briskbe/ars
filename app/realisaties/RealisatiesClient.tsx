"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  X,
  MapPin,
  Calendar,
  Building2,
  Layers,
  CheckCircle2,
  Camera,
  Plus,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountUp from "../components/CountUp";
import { useReveal, revealDelay } from "../components/useReveal";
import type {
  RealisatiesPage,
  SanityProject,
  SanityProjectImage,
  SiteSettings,
} from "../../sanity/lib/types";
import { PLACEHOLDER_PROJECTS } from "./placeholders";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  page: RealisatiesPage;
  site: SiteSettings | null;
  projects: SanityProject[];
};

/* ------------------------------------------------------------------ */
/*  Motion plumbing                                                    */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;

/** Sanity CDN images accept resize params; local placeholders don't need them. */
function sized(url: string | undefined, width: number) {
  if (!url) return "/hero.jpg";
  if (!url.includes("cdn.sanity.io")) return url;
  return `${url}?w=${width}&q=80&auto=format`;
}

function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

/** Pulls an element gently toward the cursor while hovered. */
function useMagnet<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return ref;
}

/** White difference-blend dot trailing the cursor; accent, not replacement. */
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      if (el.style.display !== "block") {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.style.display = "block";
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const hot = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [data-cursor]",
      );
      gsap.to(el, {
        scale: hot ? 3.4 : 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-3 w-3 rounded-full bg-white mix-blend-difference"
    />
  );
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left scale-x-0 bg-white mix-blend-difference"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

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

function HeroTitle({ title }: { title: string }) {
  const lines = title.split("\n");
  const hasBrackets = /\[[^\]]+\]/.test(title);
  const totalWords = title.split(/\s+/).filter(Boolean).length;
  let wordIndex = -1;
  let charIndex = 0;

  return (
    <h1
      aria-label={title.replace(/\n/g, " ").replace(/[\[\]]/g, "")}
      className="mt-6 max-w-6xl font-display text-[clamp(2.75rem,9vw,7.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white"
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} aria-hidden className="block overflow-hidden pb-[0.08em]">
          {accentWords(line).map(({ word, accent }, wordIdx) => {
            wordIndex += 1;
            const outlined = hasBrackets ? accent : wordIndex === totalWords - 1;
            return (
              <span
                key={`${lineIdx}-${wordIdx}`}
                className="mr-[0.24em] inline-block whitespace-nowrap"
              >
                {Array.from(word).map((char, charIdx) => {
                  const delay = 200 + charIndex++ * 22;
                  return (
                    <span
                      key={charIdx}
                      className={`char-rise ${outlined ? "text-outline text-white" : ""}`}
                      style={{ animationDelay: `${delay}ms` }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Hero({
  page,
  projectCount,
  categoryCount,
}: {
  page: RealisatiesPage;
  projectCount: number;
  categoryCount: number;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg || prefersReducedMotion()) return;

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

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -10,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, hero);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  const heroImage = page.heroImageUrl ?? "/hero.jpg";
  const title = page.heroTitle ?? "Werk dat\n[blijft staan]";

  return (
    <section
      ref={heroRef}
      className="grain relative min-h-[92svh] overflow-hidden bg-gray-950"
    >
      <div
        ref={bgRef}
        className="absolute -inset-8 will-change-transform"
        style={{ transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <img
          src={sized(heroImage, 2000)}
          alt=""
          className="hero-bg-image h-full w-full object-cover grayscale contrast-125 brightness-[0.7]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/45 to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/25 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[36rem] w-[36rem] animate-glow-pulse rounded-full bg-white/10 blur-[140px]" />

      <div className="relative z-10 flex min-h-[92svh] flex-col justify-end pb-14 pt-32">
        <div ref={contentRef} className="container-wide w-full px-6 lg:px-12">
          <div className="animate-fade-in-up eyebrow text-white/70">
            <span className="h-px w-10 bg-white" />
            {page.heroEyebrow ?? "Realisaties"}
          </div>

          <HeroTitle title={title} />

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="animate-fade-in-up animate-delay-500 max-w-xl border-l-2 border-white/40 pl-5 text-lg leading-relaxed text-white/70 md:text-xl">
              {page.heroSubtitle ??
                "Elk project vertelt hetzelfde verhaal: vakmanschap, precisie en een oplevering waar we achter staan. Een selectie van ons werk."}
            </p>

            <div className="animate-fade-in-up animate-delay-700 flex shrink-0 items-end gap-10">
              <div>
                <CountUp
                  value={`${projectCount}+`}
                  className="block font-display text-4xl font-black tracking-tight text-white md:text-5xl"
                />
                <div className="mt-1.5 text-sm font-medium text-white/55">
                  Projecten in beeld
                </div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div>
                <CountUp
                  value={String(categoryCount)}
                  className="block font-display text-4xl font-black tracking-tight text-white md:text-5xl"
                />
                <div className="mt-1.5 text-sm font-medium text-white/55">
                  Specialisaties
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative block h-16 w-px bg-white/15">
          <span className="animate-scroll-cue absolute left-0 top-0 block h-5 w-px bg-white" />
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Category marquee                                                   */
/* ------------------------------------------------------------------ */

function CategoryTicker({ categories }: { categories: string[] }) {
  if (!categories.length) return null;
  const run = [...categories, ...categories, ...categories, ...categories];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-gray-950 py-7"
    >
      <div className="marquee-mask flex">
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap pr-12">
          {run.map((category, i) => (
            <span key={`${category}-${i}`} className="flex items-center gap-12">
              <span
                className={`font-display text-lg font-black uppercase tracking-[0.18em] ${
                  i % 2 ? "text-outline text-outline-thin text-white/80" : "text-white/70"
                }`}
              >
                {category}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 border border-white/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Project rows                                                       */
/* ------------------------------------------------------------------ */

function ProjectRow({
  project,
  index,
  flipped,
  onOpen,
}: {
  project: SanityProject;
  index: number;
  flipped: boolean;
  onOpen: () => void;
}) {
  const extraPhotos = project.gallery?.length ?? 0;

  return (
    <article
      className="animate-fade-in-up group"
      style={{ animationDelay: `${Math.min(index, 3) * 90}ms` }}
    >
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Photo */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Bekijk project: ${project.title}`}
          className={`relative block w-full overflow-hidden bg-gray-950 text-left lg:col-span-7 ${
            flipped ? "lg:order-2" : ""
          }`}
          data-cursor
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={sized(project.imageUrl, 1600)}
              alt={project.imageAlt ?? project.title}
              loading={index > 0 ? "lazy" : undefined}
              data-parallax
              className="absolute inset-0 h-[114%] w-full object-cover grayscale contrast-110 transition-[filter,transform] duration-700 ease-out will-change-transform group-hover:grayscale-0"
            />
            {/* Seat the badges and let the image darken slightly at rest. */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/20 transition-opacity duration-700 group-hover:opacity-40" />

            {/* Hollow watermark index over the photo. */}
            <span className="text-outline pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[7rem] font-black leading-none text-white/70 lg:text-[9rem]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-950">
                {project.category}
              </span>
              {project.featured && (
                <span className="border border-white/40 bg-gray-950/50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  Uitgelicht
                </span>
              )}
            </div>

            {extraPhotos > 0 && (
              <span className="absolute bottom-5 left-5 flex items-center gap-2 border border-white/25 bg-gray-950/55 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                <Camera className="h-3.5 w-3.5" />
                {extraPhotos} foto{extraPhotos === 1 ? "" : "'s"}
              </span>
            )}

            {/* Expanding view hint. */}
            <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-white text-gray-950 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <Plus className="h-5 w-5" />
            </span>
          </div>
        </button>

        {/* Copy */}
        <div className={`min-w-0 lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="text-outline font-display text-3xl font-black text-gray-950">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              {project.year ?? ""}
            </span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-black uppercase leading-[1.02] tracking-[-0.02em] text-gray-950 sm:text-4xl">
            {project.title}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-gray-400">
            {project.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {project.location}
              </span>
            )}
            {project.clientName && (
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                {project.clientName}
              </span>
            )}
          </div>

          <p className="mt-5 text-pretty leading-relaxed text-gray-500">
            {project.summary}
          </p>

          {!!project.highlights?.length && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {project.highlights.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-semibold text-gray-800"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gray-950" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={onOpen} className="btn-mono group/btn mt-8">
            Bekijk project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectList({
  projects,
  onOpen,
}: {
  projects: SanityProject[];
  onOpen: (project: SanityProject) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
    [projects],
  );
  const [filter, setFilter] = useState<string | null>(null);

  const visible = filter
    ? projects.filter((p) => p.category === filter)
    : projects;

  // Slow vertical drift inside each photo frame; re-bound whenever the
  // filter remounts the list.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    }, list);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [visible.length, filter]);

  return (
    <section id="projecten" className="relative scroll-mt-20 bg-white section-padding">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="container-wide relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="min-w-0 lg:col-span-7">
            <div className="eyebrow text-gray-500">
              <span className="h-px w-8 bg-gray-950/40" />
              <Layers className="h-3.5 w-3.5" />
              Ons portfolio
            </div>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.98] tracking-[-0.02em] text-gray-950 sm:text-5xl">
              Van eerste las tot laatste bout
            </h2>
          </div>
          <div className="min-w-0 lg:col-span-5 lg:pb-2">
            <p className="text-pretty text-lg leading-relaxed text-gray-500">
              Blader door een selectie van onze projecten. Elk project is
              uitgevoerd door eigen vakmensen — en elk resultaat is er één om
              trots op te zijn.
            </p>
          </div>
        </div>

        {/* Filters */}
        {categories.length > 1 && (
          <div className="mt-12 flex flex-wrap items-center gap-2.5" data-reveal>
            <FilterPill
              label="Alle projecten"
              count={projects.length}
              active={filter === null}
              onClick={() => setFilter(null)}
            />
            {categories.map((category) => (
              <FilterPill
                key={category}
                label={category}
                count={projects.filter((p) => p.category === category).length}
                active={filter === category}
                onClick={() => setFilter(category)}
              />
            ))}
          </div>
        )}

        {/* The key remounts the rows so the entrance replays per filter. */}
        <div ref={listRef} key={filter ?? "all"} className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
          {visible.map((project, index) => (
            <ProjectRow
              key={project._id}
              project={project}
              index={index}
              flipped={index % 2 === 1}
              onOpen={() => onOpen(project)}
            />
          ))}

          {!visible.length && (
            <p className="py-16 text-center text-gray-400">
              Geen projecten in deze categorie.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
        active
          ? "border-gray-950 bg-gray-950 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-950 hover:text-gray-950"
      }`}
    >
      {label}
      <span
        className={`text-xs font-bold ${
          active ? "text-white/50" : "text-gray-300 group-hover:text-gray-400"
        }`}
      >
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Project detail overlay                                             */
/* ------------------------------------------------------------------ */

function ProjectModal({
  project,
  onClose,
}: {
  project: SanityProject;
  onClose: () => void;
}) {
  // The main photo leads, the gallery follows.
  const images = useMemo<SanityProjectImage[]>(() => {
    const main: SanityProjectImage[] = project.imageUrl
      ? [{ url: project.imageUrl, alt: project.imageAlt }]
      : [];
    const rest = (project.gallery ?? []).filter((img) => img.url !== project.imageUrl);
    const all = [...main, ...rest];
    return all.length ? all : [{ url: "/hero.jpg" }];
  }, [project]);

  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    // Freeze the page behind the overlay; Lenis scrolls natively, so
    // clamping the root is enough.
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  const active = images[current];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="animate-fade-in fixed inset-0 z-[100] bg-gray-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-in grain absolute inset-x-0 bottom-0 top-4 overflow-y-auto bg-gray-950 sm:inset-4 lg:inset-8"
      >
        <div className="pointer-events-none absolute inset-0 blueprint-bg opacity-40" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Sluiten"
          className="fixed right-6 top-8 z-20 flex h-12 w-12 items-center justify-center bg-white text-gray-950 transition-transform duration-300 hover:rotate-90 sm:absolute sm:right-5 sm:top-5"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative grid min-h-full lg:grid-cols-12">
          {/* Viewer */}
          <div className="relative flex flex-col bg-black/40 lg:col-span-7 lg:min-h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[24rem] lg:flex-1">
              <img
                key={active.url}
                src={sized(active.url, 1800)}
                alt={active.alt ?? project.title}
                className="animate-fade-in absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent" />

              {active.caption && (
                <p className="absolute bottom-4 left-5 right-20 text-sm font-medium text-white/80">
                  {active.caption}
                </p>
              )}

              <span className="absolute bottom-4 right-5 font-display text-sm font-bold tracking-[0.2em] text-white/60">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Vorige foto"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 bg-gray-950/50 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-gray-950"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Volgende foto"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 bg-gray-950/50 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-gray-950"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-4">
                {images.map((img, i) => (
                  <button
                    key={img.url + i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden transition-all duration-300 ${
                      i === current
                        ? "ring-2 ring-white"
                        : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={sized(img.url, 300)}
                      alt=""
                      className="h-full w-full object-cover grayscale"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="relative p-8 lg:col-span-5 lg:overflow-y-auto lg:p-12">
            <span className="bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-950">
              {project.category}
            </span>

            <h3 className="mt-6 font-display text-3xl font-black uppercase leading-[1.02] tracking-[-0.02em] text-white sm:text-4xl">
              {project.title}
            </h3>

            <ModalFacts project={project} />

            <p className="mt-8 text-pretty leading-relaxed text-gray-400">
              {project.description ?? project.summary}
            </p>

            {!!project.highlights?.length && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  In cijfers
                </h4>
                <ul className="mt-5 space-y-3">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-white/60" strokeWidth={2} />
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-gray-950 transition-colors duration-300 hover:bg-gray-200"
            >
              Bespreek uw project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalFacts({ project }: { project: SanityProject }) {
  const facts = [
    project.location && { icon: MapPin, label: "Locatie", value: project.location },
    project.year && { icon: Calendar, label: "Jaar", value: project.year },
    project.clientName && {
      icon: Building2,
      label: "Opdrachtgever",
      value: project.clientName,
    },
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[];

  if (!facts.length) return null;

  return (
    <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
      {facts.map((fact, i) => (
        <ModalFact
          key={fact.label}
          icon={fact.icon}
          label={fact.label}
          value={fact.value}
          // An odd count would leave a ghost cell; stretch the last fact instead.
          wide={facts.length % 2 === 1 && i === facts.length - 1}
        />
      ))}
    </div>
  );
}

function ModalFact({
  icon: Icon,
  label,
  value,
  wide = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`bg-gray-950 px-5 py-4 ${wide ? "col-span-2" : ""}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/45">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 font-display text-sm font-bold text-white">{value}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing CTA                                                        */
/* ------------------------------------------------------------------ */

function ClosingCta({ page }: { page: RealisatiesPage }) {
  const ref = useMagnet<HTMLAnchorElement>(0.2);
  const cta = page.ctaButton ?? { label: "Neem contact op", href: "/contact" };

  const renderTitle = (title: string) =>
    title.split(/(\[[^\]]+\])/g).map((part, i) =>
      part.startsWith("[") && part.endsWith("]") ? (
        <span key={i} className="text-outline text-white">
          {part.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );

  return (
    <section className="grain relative overflow-hidden bg-gray-950 py-24 text-white lg:py-32">
      <div className="absolute inset-0 blueprint-bg opacity-60" />
      <div className="hazard-stripes absolute inset-x-0 top-0 h-1.5" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-[130px]" />

      <div className="container-wide relative flex flex-col items-center px-6 text-center lg:px-12" data-reveal>
        <div className="eyebrow text-white/60">
          <span className="h-px w-8 bg-white/50" />
          {page.ctaEyebrow ?? "Uw project"}
          <span className="h-px w-8 bg-white/50" />
        </div>

        <h2 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {renderTitle(page.ctaTitle ?? "Uw project wordt onze [volgende realisatie]")}
        </h2>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-gray-400">
          {page.ctaText ??
            "Van een eerste schets tot de oplevering: vertel ons wat u voor ogen heeft en wij bekijken samen hoe we het waarmaken."}
        </p>

        <a
          ref={ref}
          href={cta.href}
          className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-gray-950 transition-colors duration-300 hover:bg-gray-200"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function RealisatiesClient({ page, site, projects }: Props) {
  useSmoothScroll();
  useReveal();

  const list = projects.length ? projects : PLACEHOLDER_PROJECTS;
  const categories = Array.from(
    new Set(list.map((p) => p.category).filter(Boolean)),
  );
  const [openProject, setOpenProject] = useState<SanityProject | null>(null);

  return (
    <main className="min-h-screen">
      <Cursor />
      <ScrollProgress />
      <Navbar site={site} variant="transparent" />
      <Hero
        page={page}
        projectCount={list.length}
        categoryCount={categories.length}
      />
      <CategoryTicker categories={categories} />
      <ProjectList projects={list} onOpen={setOpenProject} />
      <ClosingCta page={page} />
      <Footer site={site} variant="withContact" />

      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </main>
  );
}
