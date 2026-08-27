"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  page: HomePage;
  site: SiteSettings | null;
  services: SanityService[];
};

/* ------------------------------------------------------------------ */
/*  Motion plumbing                                                    */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;

/* useLayoutEffect flashes a warning during SSR; swap it out server-side. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Lenis inertia scrolling wired into GSAP's ticker, with ScrollTrigger kept
 * in sync. Same-page anchors are routed through Lenis so they glide instead
 * of jumping. Skipped entirely under prefers-reduced-motion — the page then
 * scrolls natively.
 */
function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const dest = document.querySelector(url.hash);
      if (!dest) return;
      event.preventDefault();
      lenis.scrollTo(dest as HTMLElement, { offset: -72, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    // Pin distances depend on final layout; re-measure once assets settle.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onClick);
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

/**
 * A white dot in difference blend mode that trails the cursor and swells over
 * anything interactive. The native cursor stays — this is an accent, not a
 * replacement. Mouse-only; touch devices never see it.
 */
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      // Materialize at the pointer on the first move — never at (0,0).
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

/** Hairline reading-progress bar; difference blend keeps it visible on any section. */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
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

/**
 * Monochrome workshop dust: white specks drifting up through the hero like
 * grinding sparks caught in a floodlight. Plain canvas, no dependencies;
 * paused offscreen and absent under prefers-reduced-motion.
 */
function Sparks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const parts = Array.from({ length: 70 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(0.4, 1.6),
      vx: rand(-0.015, 0.05),
      vy: rand(-0.12, -0.03),
      tw: rand(0, Math.PI * 2),
      ts: rand(0.5, 2),
    }));

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.tw += p.ts * dt;
        if (p.y < -0.05 || p.x > 1.05 || p.x < -0.05) {
          p.x = rand(0, 1);
          p.y = rand(0.95, 1.1);
        }
        const alpha = 0.1 + 0.32 * (0.5 + 0.5 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
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

function CtaButton({ cta }: { cta: SanityCta }) {
  const ref = useMagnet<HTMLAnchorElement>();
  const primary = (cta.style ?? "primary") === "primary";

  if (primary) {
    return (
      <a
        ref={ref}
        href={cta.href}
        className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-gray-950 transition-colors duration-300 hover:bg-gray-200"
      >
        {cta.label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    );
  }

  return (
    <a
      ref={ref}
      href={cta.href}
      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white/10"
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
      className={`eyebrow ${tone === "dark" ? "text-white/60" : "text-gray-500"}`}
    >
      <span
        className={`h-px w-8 ${tone === "dark" ? "bg-white/50" : "bg-gray-950/40"}`}
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
  let wordIndex = -1;
  let charIndex = 0;

  return (
    <h1
      aria-label={title.replace(/\n/g, " ").replace(/[\[\]]/g, "")}
      className="mt-6 max-w-6xl font-display text-[clamp(2.75rem,9vw,7.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white"
    >
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          aria-hidden
          className="block overflow-hidden pb-[0.08em]"
        >
          {accentWords(line).map(({ word, accent }, wordIdx) => {
            wordIndex += 1;
            // With no [brackets] in the CMS copy, the closing word goes
            // hollow — solid steel ends in an outline.
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

function Hero({ page }: { page: HomePage }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg || prefersReducedMotion()) return;

    // Mouse parallax on the backdrop.
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

    // The copy drifts up and dims as the hero scrolls away.
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
          className="hero-bg-image h-full w-full object-cover grayscale contrast-125 brightness-[0.8]"
        />
      </div>

      {/* Scrims: one for the navbar, one to seat the copy, one for the seam. */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/45 to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/25 to-transparent" />

      {/* Floodlight from the workshop floor. */}
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[36rem] w-[36rem] animate-glow-pulse rounded-full bg-white/10 blur-[140px]" />

      <div className="absolute inset-0">
        <Sparks />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-12 pt-32">
        <div ref={contentRef} className="container-wide w-full px-6 lg:px-12">
          {page.heroEyebrow && (
            <div className="animate-fade-in-up eyebrow text-white/70">
              <span className="h-px w-10 bg-white" />
              {page.heroEyebrow}
            </div>
          )}

          <HeroTitle title={title} />

          {page.heroSubtitle && (
            <p className="animate-fade-in-up animate-delay-500 mt-6 max-w-xl border-l-2 border-white/40 pl-5 text-lg leading-relaxed text-white/70 sm:mt-8 md:text-xl">
              {page.heroSubtitle}
            </p>
          )}

          {!!page.heroCtas?.length && (
            <div className="animate-fade-in-up animate-delay-700 mt-10 flex flex-wrap gap-4">
              {page.heroCtas.map((cta) => (
                <CtaButton key={cta.label} cta={cta} />
              ))}
            </div>
          )}

          {!!page.stats?.length && (
            <div className="animate-fade-in-up animate-delay-700 mt-12 grid grid-cols-2 gap-px border border-white/15 bg-white/15 backdrop-blur-md sm:grid-cols-4 lg:mt-16">
              {page.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-950/45 px-6 py-6 transition-colors duration-300 hover:bg-gray-950/10"
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
          <span className="animate-scroll-cue absolute left-0 top-0 block h-5 w-px bg-white" />
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
      className="relative overflow-hidden border-y border-white/10 bg-gray-950 py-7"
    >
      <div className="marquee-mask flex">
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap pr-12">
          {run.map((service, i) => (
            <span key={`${service._id}-${i}`} className="flex items-center gap-12">
              <span
                className={`font-display text-lg font-black uppercase tracking-[0.18em] ${
                  i % 2 ? "text-outline text-outline-thin text-white/80" : "text-white/70"
                }`}
              >
                {service.title}
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
/*  Services — pinned horizontal gallery                               */
/* ------------------------------------------------------------------ */

function ServiceCard({
  service,
  index,
  total,
  horizontal,
}: {
  service: SanityService;
  index: number;
  total: number;
  horizontal: boolean;
}) {
  const Icon = getIcon(service.icon);

  return (
    <article
      data-reveal
      style={revealDelay(horizontal ? 0 : index, 70)}
      className={`group relative flex flex-col overflow-hidden border border-gray-200 bg-white p-8 transition-colors duration-500 hover:border-gray-950 hover:bg-gray-950 ${
        horizontal
          ? `h-[24rem] w-[21rem] shrink-0 lg:w-[23rem] ${index % 2 === 1 ? "lg:mt-6" : ""}`
          : "h-full"
      }`}
    >
      {/* Watermark index, hollow until the card inverts. */}
      <span className="text-outline pointer-events-none absolute -bottom-8 -right-2 select-none font-display text-[9rem] font-black leading-none text-gray-200 transition-colors duration-500 group-hover:text-white/25">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-start justify-between">
        <div className="inline-flex bg-gray-950 p-3.5 text-white transition-colors duration-500 group-hover:bg-white group-hover:text-gray-950">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <span className="font-display text-xs font-bold tracking-[0.2em] text-gray-400 transition-colors duration-500 group-hover:text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-auto pt-10">
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-gray-950 transition-colors duration-500 group-hover:text-white">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500 transition-colors duration-500 group-hover:text-gray-400">
          {service.description}
        </p>
        <span className="mt-6 block h-[2px] w-10 bg-gray-200 transition-all duration-500 group-hover:w-full group-hover:bg-white" />
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
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);

  // Decide the layout before first paint so desktop never flashes the grid.
  useIsoLayoutEffect(() => {
    setHorizontal(
      window.matchMedia("(min-width: 1024px)").matches && !prefersReducedMotion(),
    );
  }, []);

  useEffect(() => {
    if (!horizontal) return;
    const section = pinRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // The section pins while vertical scroll is spent dragging the track
    // sideways — one screen of page becomes a full gallery.
    const getX = () =>
      Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getX(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getX(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      if (barRef.current) {
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + getX(),
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [horizontal, services.length]);

  return (
    <section
      id="diensten"
      ref={pinRef}
      className={`relative scroll-mt-20 overflow-hidden bg-white ${
        horizontal ? "flex h-screen flex-col justify-center" : "py-24 lg:py-32"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="container-wide relative w-full px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7" data-reveal>
            <SectionEyebrow icon={Wrench}>
              {page.servicesEyebrow ?? "Wat wij doen"}
            </SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.98] tracking-[-0.02em] text-gray-950 sm:text-5xl">
              {page.servicesTitle ?? "Ons complete aanbod aan industriële diensten"}
            </h2>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:pb-2" data-reveal>
            {page.servicesSubtitle && (
              <p className="text-pretty text-lg leading-relaxed text-gray-500">
                {page.servicesSubtitle}
              </p>
            )}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-outline font-display text-4xl font-black text-gray-950">
                {String(services.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                Specialisaties
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          horizontal
            ? "relative mt-10"
            : "container-wide relative mt-14 px-6 lg:px-12"
        }
      >
        <div
          ref={trackRef}
          className={
            horizontal
              ? "flex w-max items-start gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+3rem))] pr-24 will-change-transform"
              : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service._id}
              service={service}
              index={index}
              total={services.length}
              horizontal={horizontal}
            />
          ))}
        </div>
      </div>

      {horizontal && (
        <div className="container-wide relative mt-12 w-full px-6 lg:px-12">
          <div className="flex items-center gap-6">
            <div className="h-px flex-1 bg-gray-200">
              <div ref={barRef} className="h-px origin-left scale-x-0 bg-gray-950" />
            </div>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Scroll
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About({ page, site }: { page: HomePage; site: SiteSettings | null }) {
  const logoUrl = site?.logoUrl ?? "/logo.png";
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { y: 48 },
        {
          y: -48,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="over-ons"
      ref={sectionRef}
      className="scroll-mt-20 bg-gray-50 section-padding"
    >
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div ref={visualRef} className="relative min-w-0" data-reveal="left">
            <div className="grain relative aspect-[4/3] overflow-hidden bg-gray-950 shadow-2xl shadow-gray-900/25">
              <div className="absolute inset-0 blueprint-bg opacity-70" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-[90px]" />

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
              <div className="absolute -bottom-6 left-4 flex items-center gap-3 border border-gray-200 bg-white px-5 py-3.5 shadow-xl shadow-gray-900/10 lg:-left-8">
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
                    className="flex items-center gap-3 border border-gray-200 bg-white px-4 py-3"
                  >
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-gray-950"
                      strokeWidth={2.25}
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <a href="#contact" className="btn-mono group mt-10">
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
/*  Why ARS — inverting ledger rows                                    */
/* ------------------------------------------------------------------ */

function WhyARS({ page }: { page: HomePage }) {
  // Title supports [bracketed] segments shown with the underline accent.
  const renderTitle = (title?: string) => {
    if (!title) return null;
    return title.split(/(\[[^\]]+\])/g).map((part, i) =>
      part.startsWith("[") && part.endsWith("]") ? (
        <span
          key={i}
          className="underline decoration-white/70 decoration-4 underline-offset-8"
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
      className="grain relative scroll-mt-20 overflow-hidden bg-gray-950 py-24 text-white lg:py-32"
    >
      <div className="absolute inset-0 blueprint-bg opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-[130px]" />

      <div className="container-wide relative mb-16 grid gap-8 px-6 lg:grid-cols-12 lg:items-end lg:px-12" data-reveal>
        <div className="min-w-0 lg:col-span-8">
          <SectionEyebrow icon={Star} tone="dark">
            {page.whyEyebrow ?? "Waarom ARS Metals"}
          </SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {renderTitle(page.whyTitle)}
          </h2>
        </div>
        {page.whySubtitle && (
          <p className="min-w-0 text-pretty text-lg leading-relaxed text-gray-400 lg:col-span-4">
            {page.whySubtitle}
          </p>
        )}
      </div>

      <div className="relative border-t border-white/10">
        {page.reasons?.map((reason, index) => (
          <div
            key={reason.title}
            data-reveal
            style={revealDelay(index, 80)}
            className="group relative border-b border-white/10 transition-colors duration-500 hover:bg-white"
          >
            <div className="container-wide grid gap-3 px-6 py-10 lg:grid-cols-12 lg:items-center lg:gap-6 lg:px-12 lg:py-14">
              <span className="text-outline font-display text-5xl font-black leading-none text-white/50 transition-colors duration-500 group-hover:text-gray-950/60 lg:col-span-2 lg:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold uppercase leading-tight transition-colors duration-500 group-hover:text-gray-950 lg:col-span-4 lg:text-3xl">
                {reason.title}
              </h3>
              <p className="leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-600 lg:col-span-5">
                {reason.description}
              </p>
              <ArrowUpRight
                className="hidden h-9 w-9 justify-self-end text-white/25 transition-all duration-500 group-hover:rotate-45 group-hover:text-gray-950 lg:block"
                strokeWidth={1.5}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Jobs banner                                                        */
/* ------------------------------------------------------------------ */

function JobsBanner({ page }: { page: HomePage }) {
  const cta = page.jobsBannerCta;
  const ref = useMagnet<HTMLAnchorElement>(0.2);

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="hazard-stripes h-1.5 w-full" />

      <div className="container-wide flex flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row lg:px-12">
        <div className="flex items-center gap-5" data-reveal="left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-gray-950">
            <HardHat className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold uppercase text-white">
              {page.jobsBannerTitle ?? "We hebben openstaande vacatures!"}
            </h3>
            {page.jobsBannerText && (
              <p className="mt-1 text-sm text-gray-400">{page.jobsBannerText}</p>
            )}
          </div>
        </div>

        {cta && (
          <a
            ref={ref}
            href={cta.href}
            data-reveal="right"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-gray-950 transition-colors duration-300 hover:bg-gray-200"
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
    <section id="contact" className="relative scroll-mt-20 bg-white section-padding">
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
            className="min-w-0 border border-gray-200 bg-white p-8 shadow-2xl shadow-gray-900/[0.07] md:p-10"
          >
            {state === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-950">
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
                  className="mt-6 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
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
                      className="w-full resize-none border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-gray-950 focus:bg-white focus:ring-4 focus:ring-black/5"
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
                      className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
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
                    className="btn-mono w-full text-base disabled:opacity-60"
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gray-950 text-white">
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
    "group flex items-center gap-4 border border-gray-200 bg-white px-5 py-4 transition-all duration-300 hover:border-gray-950 hover:shadow-lg hover:shadow-gray-900/5";

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
        className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-gray-950 focus:bg-white focus:ring-4 focus:ring-black/5"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function HomeClient({ page, site, services }: Props) {
  useSmoothScroll();
  useReveal();

  return (
    <main className="min-h-screen">
      <Cursor />
      <ScrollProgress />
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
