"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a stat up to its final value the first time it scrolls into view.
 * Accepts the raw CMS string ("2000+", "10+", "2x", "100%") and animates only
 * the numeric part, leaving any prefix/suffix in place. Values without a
 * number render as-is.
 */
export default function CountUp({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);

  useEffect(() => {
    const node = ref.current;
    if (!node || !match) return;

    const [, prefix, rawNumber, suffix] = match;
    const decimals = (rawNumber.split(/[.,]/)[1] ?? "").length;
    const target = parseFloat(rawNumber.replace(",", "."));

    const settle = () => setDisplay(value);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      settle();
      return;
    }

    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast off the mark, gentle landing.
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (target * eased).toFixed(decimals);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else settle();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // `match` is derived from `value`, so this re-runs exactly when it should.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
