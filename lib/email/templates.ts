import type { Email } from "./send";
import { ADMIN_EMAIL } from "./send";
import {
  button,
  divider,
  escapeHtml,
  eyebrow,
  factsTable,
  heading,
  paragraph,
  quote,
  shell,
} from "./layout";

/* ------------------------------------------------------------------ */
/*  Contactformulier                                                   */
/* ------------------------------------------------------------------ */

export type ContactSubmission = {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
};

export function contactEmails(
  submission: ContactSubmission,
  source: "contact" | "home",
): Email[] {
  const fullName = `${submission.firstName} ${submission.lastName}`.trim();
  const origin =
    source === "home" ? "de homepagina" : "de contactpagina";

  const visitor: Email = {
    to: submission.email,
    subject: "We hebben uw bericht goed ontvangen",
    html: shell({
      tag: "Contact",
      preview: `Bedankt ${submission.firstName} — we nemen zo snel mogelijk contact met u op.`,
      reason:
        "U ontvangt deze e-mail omdat u het contactformulier op ars-metals.be heeft ingevuld.",
      body: `
        ${eyebrow("Bericht ontvangen")}
        ${heading("Bedankt voor uw bericht")}
        ${paragraph(
          `Beste ${escapeHtml(submission.firstName)},`,
        )}
        ${paragraph(
          "Uw bericht is goed aangekomen bij ons team. We bekijken het persoonlijk en nemen zo snel mogelijk contact met u op — doorgaans binnen 48 uur.",
        )}
        ${paragraph("Dit is wat u ons stuurde:")}
        ${quote(submission.message)}
        ${factsTable([
          { label: "Naam", value: escapeHtml(fullName) },
          submission.company
            ? { label: "Bedrijf", value: escapeHtml(submission.company) }
            : null,
          submission.service
            ? { label: "Dienst", value: escapeHtml(submission.service) }
            : null,
          { label: "Telefoon", value: escapeHtml(submission.phone) },
          { label: "E-mail", value: escapeHtml(submission.email) },
        ])}
        ${divider()}
        ${paragraph(
          `Liever direct contact? Bel ons op <a href="tel:+3289367787" style="color:#030712;font-weight:700;text-decoration:none;">+32 (0)89 36 77 87</a> — bereikbaar op werkdagen van 07:00 tot 18:00.`,
        )}
      `,
    }),
  };

  const admin: Email = {
    to: ADMIN_EMAIL,
    replyTo: submission.email,
    subject: `Nieuw bericht via ${origin} — ${fullName}`,
    html: shell({
      tag: "Contactformulier",
      preview: `${fullName}: ${submission.message.slice(0, 80)}`,
      reason: `Automatisch bericht van het contactformulier op ${origin} van ars-metals.be. Beantwoorden gaat rechtstreeks naar de afzender.`,
      body: `
        ${eyebrow(`Via ${origin}`)}
        ${heading("Nieuw bericht")}
        ${paragraph(
          `<strong style="color:#030712;">${escapeHtml(fullName)}</strong> heeft het contactformulier ingevuld. Het bericht staat ook in de Studio onder <em>Contactformulier — berichten</em>.`,
        )}
        ${quote(submission.message)}
        ${factsTable([
          { label: "Naam", value: escapeHtml(fullName) },
          submission.company
            ? { label: "Bedrijf", value: escapeHtml(submission.company) }
            : null,
          submission.service
            ? { label: "Dienst", value: escapeHtml(submission.service) }
            : null,
          {
            label: "E-mail",
            value: `<a href="mailto:${escapeHtml(submission.email)}" style="color:#030712;">${escapeHtml(submission.email)}</a>`,
          },
          {
            label: "Telefoon",
            value: `<a href="tel:${escapeHtml(submission.phone.replace(/\s+/g, ""))}" style="color:#030712;">${escapeHtml(submission.phone)}</a>`,
          },
        ])}
        ${button(`Beantwoord ${submission.firstName}`, `mailto:${submission.email}`)}
      `,
    }),
  };

  return [visitor, admin];
}

/* ------------------------------------------------------------------ */
/*  Sollicitaties                                                      */
/* ------------------------------------------------------------------ */

export type ApplicationSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  motivation?: string;
  kind: "vacature" | "open";
  vacatureTitle?: string;
  desiredRole?: string;
  cv?: { filename: string; content: string };
};

export function applicationEmails(application: ApplicationSubmission): Email[] {
  const fullName = `${application.firstName} ${application.lastName}`.trim();
  const forVacature = application.kind === "vacature";
  const role = forVacature
    ? application.vacatureTitle || "een openstaande vacature"
    : application.desiredRole || "";

  const visitor: Email = {
    to: application.email,
    subject: forVacature
      ? `Uw sollicitatie voor ${role} is ontvangen`
      : "Uw open sollicitatie is ontvangen",
    html: shell({
      tag: "Sollicitatie",
      preview: `Bedankt ${application.firstName} — we bekijken uw sollicitatie en koppelen snel terug.`,
      reason:
        "U ontvangt deze e-mail omdat u heeft gesolliciteerd via ars-metals.be.",
      body: `
        ${eyebrow(forVacature ? "Sollicitatie ontvangen" : "Open sollicitatie ontvangen")}
        ${heading("Bedankt voor uw interesse")}
        ${paragraph(`Beste ${escapeHtml(application.firstName)},`)}
        ${paragraph(
          forVacature
            ? `Uw sollicitatie voor de functie <strong style="color:#030712;">${escapeHtml(role)}</strong> is goed aangekomen. Ons team bekijkt uw profiel en CV met aandacht.`
            : `Uw open sollicitatie is goed aangekomen${role ? ` — fijn dat u interesse heeft in een rol als <strong style="color:#030712;">${escapeHtml(role)}</strong>` : ""}. Ons team bekijkt uw profiel met aandacht.`,
        )}
        ${paragraph("Zo gaat het verder:")}
        ${factsTable([
          { label: "Stap 1", value: "We bekijken uw sollicitatie persoonlijk" },
          { label: "Stap 2", value: "U hoort snel van ons — eerlijk en transparant" },
          { label: "Stap 3", value: "Past het? Dan nodigen we u uit voor een kennismakingsgesprek" },
        ])}
        ${divider()}
        ${paragraph(
          `Vragen over uw sollicitatie? Bel ons op <a href="tel:+3289367787" style="color:#030712;font-weight:700;text-decoration:none;">+32 (0)89 36 77 87</a>.`,
        )}
      `,
    }),
  };

  const admin: Email = {
    to: ADMIN_EMAIL,
    replyTo: application.email,
    subject: forVacature
      ? `Nieuwe sollicitatie: ${role} — ${fullName}`
      : `Nieuwe spontane sollicitatie — ${fullName}`,
    attachments: application.cv ? [application.cv] : undefined,
    html: shell({
      tag: forVacature ? "Vacature" : "Open sollicitatie",
      preview: `${fullName} solliciteert${forVacature ? ` voor ${role}` : " spontaan"}.`,
      reason:
        "Automatisch bericht van het sollicitatieformulier op ars-metals.be. Beantwoorden gaat rechtstreeks naar de kandidaat.",
      body: `
        ${eyebrow(forVacature ? "Sollicitatie op vacature" : "Spontane sollicitatie")}
        ${heading(forVacature ? role : "Nieuwe kandidaat")}
        ${paragraph(
          `<strong style="color:#030712;">${escapeHtml(fullName)}</strong> heeft gesolliciteerd${
            forVacature
              ? ` op de vacature <strong style="color:#030712;">${escapeHtml(role)}</strong>.`
              : role
                ? ` met interesse in een rol als <strong style="color:#030712;">${escapeHtml(role)}</strong>.`
                : "."
          } De sollicitatie staat ook in de Studio onder <em>Sollicitaties</em>.`,
        )}
        ${application.motivation ? quote(application.motivation) : ""}
        ${factsTable([
          { label: "Naam", value: escapeHtml(fullName) },
          {
            label: "E-mail",
            value: `<a href="mailto:${escapeHtml(application.email)}" style="color:#030712;">${escapeHtml(application.email)}</a>`,
          },
          {
            label: "Telefoon",
            value: `<a href="tel:${escapeHtml(application.phone.replace(/\s+/g, ""))}" style="color:#030712;">${escapeHtml(application.phone)}</a>`,
          },
          {
            label: "CV",
            value: application.cv
              ? `Bijgevoegd: ${escapeHtml(application.cv.filename)}`
              : "Geen CV meegestuurd",
          },
        ])}
        ${button(`Beantwoord ${application.firstName}`, `mailto:${application.email}`)}
      `,
    }),
  };

  return [visitor, admin];
}
