import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Archivo",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      colors: {
        // Heated steel — the accent that carries the whole homepage.
        ember: {
          50: "#fff5ed",
          100: "#ffe8d5",
          200: "#ffcdaa",
          300: "#ffab74",
          400: "#ff7d3c",
          500: "#ff5f1f",
          600: "#f04306",
          700: "#c73207",
          800: "#9e2b0e",
          900: "#7f280f",
        },
      },
      maxWidth: {
        "8xl": "88rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        emberPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
        scrollCue: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "ember-pulse": "emberPulse 6s ease-in-out infinite",
        "scroll-cue": "scrollCue 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
