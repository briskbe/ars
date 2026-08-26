"use client";

import { useState } from "react";

export type ApplicationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Only used by the open application form. */
  desiredRole: string;
  motivation: string;
  /** Honeypot — hidden from people, so anything in it means a bot. */
  website: string;
};

export type ApplicationFormState = "idle" | "sending" | "sent" | "error";

/**
 * Vercel rejects a request body over 4.5 MB before it reaches the route
 * handler, so an oversized CV is caught here and never uploaded. Kept in step
 * with MAX_CV_BYTES in app/api/sollicitatie/route.ts.
 */
export const MAX_CV_BYTES = 4 * 1024 * 1024;
export const MAX_CV_LABEL = "max. 4MB";

const EMPTY: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  desiredRole: "",
  motivation: "",
  website: "",
};

const ERRORS: Record<string, string> = {
  "cv-too-large": `Je CV is te groot (${MAX_CV_LABEL}).`,
  "cv-wrong-type": "Alleen PDF-, DOC- of DOCX-bestanden worden geaccepteerd.",
  "cv-required": "Voeg je CV toe om te solliciteren.",
  "invalid-email": "Dat e-mailadres lijkt niet te kloppen.",
};

/**
 * Shared state and submit handling for the two application forms on the
 * vacatures page. Posts multipart form data so the CV travels with it, and
 * keeps the typed values on failure so nobody has to fill the form in twice.
 */
export function useApplicationForm(
  kind: "vacature" | "open",
  job?: { id?: string; title?: string },
) {
  const [values, setValues] = useState<ApplicationFormValues>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ApplicationFormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const setField =
    (field: keyof ApplicationFormValues) =>
    (value: string) =>
      setValues((current) => ({ ...current, [field]: value }));

  const selectFile = (selected: File | null) => {
    if (selected && selected.size > MAX_CV_BYTES) {
      setFile(null);
      setState("error");
      setError(ERRORS["cv-too-large"]);
      return;
    }
    setError(null);
    if (state === "error") setState("idle");
    setFile(selected);
  };

  const reset = () => {
    setValues(EMPTY);
    setFile(null);
    setError(null);
    setState("idle");
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError(null);

    const body = new FormData();
    body.set("kind", kind);
    Object.entries(values).forEach(([key, value]) => body.set(key, value));
    if (job?.id) body.set("vacatureId", job.id);
    if (job?.title) body.set("vacatureTitle", job.title);
    if (file) body.set("cv", file);

    try {
      const response = await fetch("/api/sollicitatie", { method: "POST", body });
      if (!response.ok) {
        const reason = await response
          .json()
          .then((data: { error?: string }) => data?.error)
          .catch(() => undefined);
        setError(reason ? ERRORS[reason] ?? null : null);
        throw new Error(`Request failed: ${response.status}`);
      }
      setValues(EMPTY);
      setFile(null);
      setState("sent");
    } catch (err) {
      console.error("[sollicitatie] submission failed:", err);
      setState("error");
    }
  };

  return { values, setField, file, selectFile, state, error, submit, reset };
}
