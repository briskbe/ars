"use client";

import { useState } from "react";

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  /** Honeypot — hidden from people, so anything in it means a bot. */
  website: string;
};

export type ContactFormState = "idle" | "sending" | "sent" | "error";

const EMPTY: ContactFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

/**
 * Shared state and submit handling for the contact forms, which post to
 * /api/contact and land in the Studio inbox.
 *
 * On failure the typed values are kept so the visitor can retry rather than
 * fill the form in again — the one thing worse than a form that fails is a
 * form that fails and throws the message away.
 */
export function useContactForm(source: "contact" | "home") {
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [state, setState] = useState<ContactFormState>("idle");

  const setField =
    (field: keyof ContactFormValues) =>
    (value: string) =>
      setValues((current) => ({ ...current, [field]: value }));

  const reset = () => {
    setValues(EMPTY);
    setState("idle");
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setValues(EMPTY);
      setState("sent");
    } catch (err) {
      console.error("[contact] submission failed:", err);
      setState("error");
    }
  };

  return { values, setField, state, submit, reset };
}
