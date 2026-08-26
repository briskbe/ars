"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";

type Props = {
  /** Phone number in any human format, e.g. "+32 (0)89 36 77 87". */
  number?: string | null;
  /** Pre-filled message the visitor can edit before sending. */
  message?: string | null;
  /** Name shown in the panel header. */
  name?: string | null;
  /** Small line under the name, e.g. expected response time. */
  tagline?: string | null;
  /** Set to false in the CMS to hide the widget site-wide. */
  enabled?: boolean;
  /** Logo/avatar shown in the panel header. */
  logoUrl?: string | null;
};

const DEFAULT_MESSAGE = "Hallo, ik heb een vraag over jullie diensten.";
const DEFAULT_NAME = "ARS Metals";
const DEFAULT_TAGLINE = "Doorgaans binnen enkele uren een antwoord";

/**
 * Turns a display number into the digits-only form wa.me expects.
 * Drops a written-out trunk prefix — "+32 (0)89 …" is +3289…, not +32089… —
 * and normalises a leading international "00" to nothing.
 */
export function toWhatsAppNumber(raw?: string | null): string | null {
  if (!raw) return null;
  const digits = raw
    .replace(/\((0+)\)/g, "")
    .replace(/\D/g, "")
    .replace(/^00/, "");
  return digits.length >= 8 ? digits : null;
}

export default function WhatsAppWidget({
  number,
  message,
  name,
  tagline,
  enabled = true,
  logoUrl,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(message ?? DEFAULT_MESSAGE);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Keep the draft in sync when the CMS message changes between navigations.
  useEffect(() => {
    setDraft(message ?? DEFAULT_MESSAGE);
  }, [message]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const target = toWhatsAppNumber(number);

  // The Studio is a full-screen app of its own — no marketing chrome there.
  if (!enabled || !target || pathname?.startsWith("/studio")) return null;

  const href = `https://wa.me/${target}${
    draft.trim() ? `?text=${encodeURIComponent(draft.trim())}` : ""
  }`;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="WhatsApp-chat"
          className="animate-modal-in w-[calc(100vw-2.5rem)] max-w-[21rem] overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-black/15"
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/95">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt=""
                  className="h-6 w-auto object-contain"
                />
              ) : (
                <MessageCircle className="h-5 w-5 text-[#075E54]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {name ?? DEFAULT_NAME}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                {tagline ?? DEFAULT_TAGLINE}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Chat sluiten"
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-[#ECE5DD] px-5 py-6">
            <div className="relative max-w-[85%] rounded-xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
              <p className="text-sm leading-relaxed text-gray-700">
                Hallo! 👋 Waarmee kunnen we u helpen?
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-gray-100 bg-white px-5 py-4">
            <label htmlFor="whatsapp-message" className="sr-only">
              Uw bericht
            </label>
            <textarea
              id="whatsapp-message"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              placeholder="Typ uw bericht…"
              className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#25D366]"
            />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1EBE5A] active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              Start WhatsApp-chat
            </a>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "WhatsApp-chat sluiten" : "Chat via WhatsApp"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:bg-[#1EBE5A] hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20"
          />
        )}
        <span className="relative">
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <WhatsAppGlyph className="h-7 w-7 text-white" />
          )}
        </span>
      </button>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.895 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
