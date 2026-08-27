"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element inside the page as it scrolls into
 * view, by adding `is-visible`. The displacement and easing live in CSS, so
 * this hook only decides *when* an element has arrived.
 *
 * Elements are unobserved once revealed — a section never animates twice.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!nodes.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

/** Staggers a list: `style={revealDelay(i)}`. */
export function revealDelay(index: number, step = 80) {
  return { "--reveal-delay": `${index * step}ms` } as React.CSSProperties;
}
