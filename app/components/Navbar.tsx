"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSettings, SanityNavLink } from "../../sanity/lib/types";

type Props = {
  site?: SiteSettings | null;
  variant?: "transparent" | "solid";
  scrollThreshold?: number;
  trackActive?: boolean;
  contactHref?: string;
};

export default function Navbar({
  site,
  variant = "transparent",
  scrollThreshold = 50,
  trackActive = false,
  contactHref = "/contact",
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  const transparent = variant === "transparent" && !scrolled;
  const navLeft: SanityNavLink[] = site?.navLeft ?? [];
  const navRight: SanityNavLink[] = site?.navRight ?? [];
  const logoUrl = site?.logoUrl ?? "/logo.png";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-6 lg:px-12">
        <a
          href="/"
          className="mr-12 flex-shrink-0"
          onClick={() => setActiveLink("#")}
        >
          <img
            src={logoUrl}
            alt="ARS Industrial Services"
            className={`h-8 w-auto transition-all duration-300 ${
              transparent ? "brightness-0 invert" : ""
            }`}
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLeft.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative py-1 text-[15px] transition-colors duration-200 ${
                transparent
                  ? trackActive && activeLink === link.href
                    ? "font-semibold text-white"
                    : "font-medium text-white/80 hover:text-white"
                  : trackActive && activeLink === link.href
                    ? "font-semibold text-black"
                    : "font-medium text-gray-800 hover:text-black"
              }`}
            >
              {link.label}
              {trackActive && (
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ${
                    transparent ? "bg-white" : "bg-black"
                  } ${activeLink === link.href ? "w-full" : "w-0"}`}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex-1" />

        <div className="hidden items-center gap-8 md:flex">
          {navRight.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-[15px] transition-colors duration-200 ${
                transparent
                  ? "font-medium text-white/80 hover:text-white"
                  : "font-medium text-gray-800 hover:text-black"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactHref}
            className={`rounded-xl px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] ${
              transparent
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`rounded-lg p-2 transition-colors md:hidden ${
            transparent
              ? "text-white hover:bg-white/10"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-2 md:hidden">
          {[...navLeft, ...navRight].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setOpen(false);
              }}
              className={`block border-b border-gray-50 px-2 py-3.5 text-[15px] transition-colors ${
                trackActive && activeLink === link.href
                  ? "font-semibold text-black"
                  : "font-medium text-gray-600 hover:text-black"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactHref}
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
