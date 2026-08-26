import nodemailer from "nodemailer";

import { client } from "./client";

/**
 * Notifies the team by email when a form comes in.
 *
 * There is no email service involved: this signs in to the site's own mailbox
 * over SMTP and sends from there, so nothing new has to be signed up for. The
 * credentials come from the environment; with none set, notifications are
 * skipped and the rest of the request carries on as normal.
 *
 * Sending is always best-effort. The submission is already stored in Sanity by
 * the time this runs, and losing a notification is an annoyance — failing the
 * visitor's form because a mail server was slow would be a real loss.
 */

const RECIPIENTS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  notificationEmails, email
}`;

type NotificationLine = { label: string; value: string };

export type Notification = {
  subject: string;
  heading: string;
  lines: NotificationLine[];
  /** Free text shown as its own block, e.g. the message or motivation. */
  body?: string;
  /** Replying to the notification should reach the person who wrote in. */
  replyTo?: string;
  /** Link straight to the document in the Studio. */
  studioUrl?: string;
  /** Link to a CV or other attachment held in Sanity. */
  attachmentUrl?: string;
};

function transport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 starts plain and upgrades with STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });
}

async function recipients(): Promise<string[]> {
  try {
    const settings = await client.fetch<{
      notificationEmails?: string[];
      email?: string;
    } | null>(RECIPIENTS_QUERY, {}, { cache: "no-store" });

    const configured = (settings?.notificationEmails ?? [])
      .map((address) => address.trim())
      .filter(Boolean);
    if (configured.length) return configured;

    const fallback = settings?.email?.trim();
    return fallback ? [fallback] : [];
  } catch (err) {
    console.error("[notify] could not read notification recipients:", err);
    return [];
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function render(notification: Notification) {
  const { heading, lines, body, studioUrl, attachmentUrl } = notification;

  const text = [
    heading,
    "",
    ...lines.map(({ label, value }) => `${label}: ${value}`),
    ...(body ? ["", body] : []),
    ...(attachmentUrl ? ["", `CV: ${attachmentUrl}`] : []),
    ...(studioUrl ? ["", `Openen in de CMS: ${studioUrl}`] : []),
  ].join("\n");

  const rows = lines
    .map(
      ({ label, value }) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#111827">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.6;color:#111827">
  <h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(heading)}</h2>
  <table style="border-collapse:collapse">${rows}</table>
  ${
    body
      ? `<div style="margin-top:16px;padding:12px 16px;background:#f9fafb;border-radius:8px;white-space:pre-wrap">${escapeHtml(
          body,
        )}</div>`
      : ""
  }
  ${
    attachmentUrl
      ? `<p style="margin-top:16px"><a href="${attachmentUrl}" style="color:#111827">CV downloaden</a></p>`
      : ""
  }
  ${
    studioUrl
      ? `<p style="margin-top:16px"><a href="${studioUrl}" style="color:#111827">Openen in de CMS</a></p>`
      : ""
  }
</div>`;

  return { text, html };
}

export async function notifyAdmins(notification: Notification): Promise<void> {
  const mailer = transport();
  if (!mailer) {
    console.warn(
      "[notify] SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS) — no notification sent.",
    );
    return;
  }

  const to = await recipients();
  if (!to.length) {
    console.warn(
      "[notify] no recipients configured — set 'Meldingen naar' or the site email in the CMS.",
    );
    return;
  }

  await mailer.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to,
    // The sender is the site's own mailbox, so replies would land back in it;
    // reply-to points at the person who actually wrote in instead.
    replyTo: notification.replyTo,
    subject: notification.subject,
    ...render(notification),
  });
}

/** Absolute URL of the running site, taken from the incoming request. */
export function siteOrigin(request: Request): string {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}

/** Deep link to a document in the embedded Studio. */
export function studioUrlFor(origin: string, id: string, type: string): string {
  return `${origin}/studio/intent/edit/id=${encodeURIComponent(id)};type=${encodeURIComponent(type)}/`;
}
