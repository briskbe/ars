import { NextResponse } from "next/server";

import { getWriteClient } from "../../../sanity/lib/writeClient";
import { notifyAdmins, siteOrigin, studioUrlFor } from "../../../sanity/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Field length caps, so a bot can't write a novel into the dataset. */
const LIMITS = {
  firstName: 100,
  lastName: 100,
  company: 150,
  email: 200,
  phone: 60,
  service: 150,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCES = ["contact", "home"] as const;

type Source = (typeof SOURCES)[number];

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  // Honeypot: a field hidden from people but happily filled in by bots. Answer
  // as if it worked so the bot has nothing to learn, and store nothing.
  if (text(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const submission = {
    firstName: text(body.firstName, LIMITS.firstName),
    lastName: text(body.lastName, LIMITS.lastName),
    company: text(body.company, LIMITS.company),
    email: text(body.email, LIMITS.email),
    phone: text(body.phone, LIMITS.phone),
    service: text(body.service, LIMITS.service),
    message: text(body.message, LIMITS.message),
  };

  const missing = (["firstName", "lastName", "email", "phone", "message"] as const).filter(
    (field) => !submission[field],
  );
  if (missing.length) {
    return NextResponse.json({ error: "missing-fields", fields: missing }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(submission.email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const source: Source = SOURCES.includes(body.source as Source)
    ? (body.source as Source)
    : "contact";

  const client = getWriteClient();
  if (!client) {
    console.error(
      "[contact] SANITY_API_WRITE_TOKEN is not set — submission could not be stored.",
      { email: submission.email },
    );
    return NextResponse.json({ error: "not-configured" }, { status: 500 });
  }

  let created;
  try {
    created = await client.create({
      _type: "submission",
      ...submission,
      source,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    // Log the message itself: if Sanity is unreachable, the server log is the
    // only remaining copy of what someone tried to send us.
    console.error("[contact] failed to store submission:", err, submission);
    return NextResponse.json({ error: "store-failed" }, { status: 502 });
  }

  // Best-effort: the message is safely stored, so a mail problem must not turn
  // into an error for the visitor.
  try {
    const origin = siteOrigin(request);
    await notifyAdmins({
      subject: `Nieuw bericht via het contactformulier — ${submission.firstName} ${submission.lastName}`,
      heading: "Nieuw bericht via het contactformulier",
      replyTo: submission.email,
      studioUrl: studioUrlFor(origin, created._id, "submission"),
      lines: [
        {
          label: "Binnengekomen via",
          value:
            source === "home"
              ? "Contactformulier — homepagina"
              : "Contactformulier — contactpagina",
        },
        { label: "Naam", value: `${submission.firstName} ${submission.lastName}` },
        ...(submission.company ? [{ label: "Bedrijf", value: submission.company }] : []),
        { label: "E-mail", value: submission.email },
        { label: "Telefoon", value: submission.phone },
        ...(submission.service ? [{ label: "Dienst", value: submission.service }] : []),
      ],
      body: submission.message,
    });
  } catch (err) {
    console.error("[contact] stored, but the notification email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
