/**
 * Thin Resend client. Mail is a courtesy on top of the stored submission:
 * every send is fire-and-forget at the call site and a failure here must
 * never fail the form — the message is already safe in Sanity.
 */

export const ADMIN_EMAIL = process.env.CONTACT_INBOX_EMAIL || "info@ars-metals.be";
export const FROM_EMAIL =
  process.env.EMAIL_FROM || "ARS Metals <noreply@ars-metals.be>";

export type EmailAttachment = {
  filename: string;
  /** Base64-encoded file body. */
  content: string;
};

export type Email = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

export async function sendEmail(email: Email): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY is not set — skipping:", email.subject);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
        ...(email.attachments?.length ? { attachments: email.attachments } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend rejected the send:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}

/** Sends a batch concurrently; logs failures, never throws. */
export async function sendEmails(emails: Email[]): Promise<void> {
  await Promise.allSettled(emails.map(sendEmail));
}
