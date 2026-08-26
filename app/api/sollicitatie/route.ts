import { NextResponse } from "next/server";

import { getWriteClient } from "../../../sanity/lib/writeClient";
import { notifyAdmins, siteOrigin, studioUrlFor } from "../../../sanity/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 200,
  phone: 60,
  desiredRole: 150,
  vacatureTitle: 200,
  motivation: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KINDS = ["vacature", "open"] as const;

type Kind = (typeof KINDS)[number];

/**
 * Vercel rejects a request body over 4.5 MB before it reaches this handler, so
 * the cap has to sit below that — a bigger CV would fail as an opaque 413
 * rather than the message the visitor gets here. Kept in step with
 * MAX_CV_BYTES in app/components/useApplicationForm.ts, which stops an
 * oversized file from ever being uploaded.
 */
const MAX_CV_BYTES = 4 * 1024 * 1024;

const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

function text(value: FormDataEntryValue | null, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function hasAllowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ALLOWED_CV_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid-form" }, { status: 400 });
  }

  // Honeypot: hidden from people, filled in by bots. Answer as if it worked.
  if (text(form.get("website"), 100)) {
    return NextResponse.json({ ok: true });
  }

  const kindValue = text(form.get("kind"), 20);
  const kind: Kind = KINDS.includes(kindValue as Kind)
    ? (kindValue as Kind)
    : "open";

  const applicant = {
    firstName: text(form.get("firstName"), LIMITS.firstName),
    lastName: text(form.get("lastName"), LIMITS.lastName),
    email: text(form.get("email"), LIMITS.email),
    phone: text(form.get("phone"), LIMITS.phone),
    motivation: text(form.get("motivation"), LIMITS.motivation),
  };

  const missing = (["firstName", "lastName", "email", "phone"] as const).filter(
    (field) => !applicant[field],
  );
  if (missing.length) {
    return NextResponse.json({ error: "missing-fields", fields: missing }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(applicant.email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const cv = form.get("cv");
  const hasCv = cv instanceof File && cv.size > 0;

  // Applying to a posted vacancy requires a CV; an open application does not.
  if (kind === "vacature" && !hasCv) {
    return NextResponse.json({ error: "cv-required" }, { status: 400 });
  }
  if (hasCv) {
    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json({ error: "cv-too-large" }, { status: 400 });
    }
    if (!ALLOWED_CV_TYPES.has(cv.type) && !hasAllowedExtension(cv.name)) {
      return NextResponse.json({ error: "cv-wrong-type" }, { status: 400 });
    }
  }

  const client = getWriteClient();
  if (!client) {
    console.error(
      "[sollicitatie] SANITY_API_WRITE_TOKEN is not set — application could not be stored.",
      { email: applicant.email },
    );
    return NextResponse.json({ error: "not-configured" }, { status: 500 });
  }

  let created: { _id: string } | undefined;
  let cvUrl: string | undefined;
  let vacatureTitle = "";
  try {
    // Upload the CV first: a stored application that claims to have a CV but
    // does not would be worse than failing outright, since nobody would know
    // to ask the applicant for it again.
    let cvField: Record<string, unknown> | undefined;
    if (hasCv) {
      const asset = await client.assets.upload(
        "file",
        Buffer.from(await cv.arrayBuffer()),
        { filename: cv.name, contentType: cv.type || undefined },
      );
      cvField = {
        _type: "file",
        asset: { _type: "reference", _ref: asset._id },
      };
      cvUrl = asset.url;
    }

    const document: { _type: string } & Record<string, unknown> = {
      _type: "application",
      ...applicant,
      kind,
      status: "new",
      submittedAt: new Date().toISOString(),
    };
    if (cvField) document.cv = cvField;

    if (kind === "vacature") {
      // The title is stored as well as referenced: vacancies get filled and
      // deleted, and an application that no longer says which job it was for
      // is useless.
      vacatureTitle = text(form.get("vacatureTitle"), LIMITS.vacatureTitle);
      document.vacatureTitle = vacatureTitle;
      const vacatureId = text(form.get("vacatureId"), 100);
      if (vacatureId) {
        document.vacature = { _type: "reference", _ref: vacatureId, _weak: true };
      }
    } else {
      document.desiredRole = text(form.get("desiredRole"), LIMITS.desiredRole);
    }

    created = await client.create(document);
  } catch (err) {
    console.error("[sollicitatie] failed to store application:", err, applicant);
    return NextResponse.json({ error: "store-failed" }, { status: 502 });
  }

  // Best-effort: the application is safely stored, so a mail problem must not
  // turn into an error for the applicant.
  try {
    const origin = siteOrigin(request);
    const name = `${applicant.firstName} ${applicant.lastName}`;
    const desiredRole = text(form.get("desiredRole"), LIMITS.desiredRole);
    await notifyAdmins({
      subject:
        kind === "vacature"
          ? `Nieuwe sollicitatie — ${vacatureTitle || "vacature"} — ${name}`
          : `Nieuwe spontane sollicitatie — ${name}`,
      heading:
        kind === "vacature"
          ? "Nieuwe sollicitatie op een vacature"
          : "Nieuwe spontane sollicitatie",
      replyTo: applicant.email,
      studioUrl: created ? studioUrlFor(origin, created._id, "application") : undefined,
      attachmentUrl: cvUrl,
      lines: [
        {
          label: "Binnengekomen via",
          value:
            kind === "vacature"
              ? "Sollicitatieformulier — op een specifieke vacature"
              : "Sollicitatieformulier — open (spontane) sollicitatie",
        },
        ...(kind === "vacature"
          ? [{ label: "Vacature", value: vacatureTitle || "onbekend" }]
          : desiredRole
            ? [{ label: "Functie van interesse", value: desiredRole }]
            : []),
        { label: "Naam", value: name },
        { label: "E-mail", value: applicant.email },
        { label: "Telefoon", value: applicant.phone },
        { label: "CV", value: cvUrl ? "bijgevoegd" : "geen CV meegestuurd" },
      ],
      body: applicant.motivation,
    });
  } catch (err) {
    console.error("[sollicitatie] stored, but the notification email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
