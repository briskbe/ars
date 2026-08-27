/**
 * The ARS mail identity: the site's monochrome molten-steel look translated
 * to email-safe HTML — tables, inline styles, system font stacks. Black
 * header and footer, hazard-stripe accent, hollow oversized type where the
 * site would use `.text-outline`.
 */

const INK = "#030712"; // Tailwind gray-950, the site's black
const PAPER = "#ffffff";
const CANVAS = "#f4f4f5";
const RULE = "#e5e7eb";
const MUTED = "#6b7280";
const BODY_TEXT = "#4b5563";

const SANS =
  "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif";
const DISPLAY =
  "'Archivo','Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escapes CMS/visitor text and preserves line breaks. */
export const nl2br = (value: string) => escapeHtml(value).replace(/\n/g, "<br>");

export { escapeHtml };

/** Small-caps eyebrow above the headline, like the site's section labels. */
export function eyebrow(text: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="width:32px;border-top:1px solid ${INK};font-size:0;line-height:0;">&nbsp;</td>
      <td style="padding-left:10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${MUTED};">${escapeHtml(text)}</td>
    </tr></table>`;
}

export function heading(text: string): string {
  return `<h1 style="margin:16px 0 0;font-family:${DISPLAY};font-size:28px;line-height:1.05;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;color:${INK};">${escapeHtml(text)}</h1>`;
}

export function paragraph(html: string): string {
  return `<p style="margin:18px 0 0;font-family:${SANS};font-size:15px;line-height:1.65;color:${BODY_TEXT};">${html}</p>`;
}

/** A label/value ledger, the email cousin of the site's facts grids. */
export function factsTable(
  facts: Array<{ label: string; value: string } | null | undefined | false>,
): string {
  const rows = facts.filter(Boolean) as { label: string; value: string }[];
  if (!rows.length) return "";
  const cells = rows
    .map(
      ({ label, value }, i) => `
      <tr>
        <td style="padding:12px 18px;border-top:${i ? `1px solid ${RULE}` : "0"};font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top;width:140px;">${escapeHtml(label)}</td>
        <td style="padding:12px 18px;border-top:${i ? `1px solid ${RULE}` : "0"};font-family:${SANS};font-size:14px;font-weight:600;color:${INK};">${value}</td>
      </tr>`,
    )
    .join("");
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;border:1px solid ${RULE};background:#f9fafb;">
      ${cells}
    </table>`;
}

/** Visitor-written copy, quoted the way the site quotes its hero subtitle. */
export function quote(text: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
      <tr>
        <td style="width:3px;background:${INK};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:4px 0 4px 18px;font-family:${SANS};font-size:15px;line-height:1.65;color:${BODY_TEXT};">${nl2br(text)}</td>
      </tr>
    </table>`;
}

export function button(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:30px;"><tr>
      <td bgcolor="${INK}" style="border-radius:999px;">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 30px;font-family:${SANS};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${escapeHtml(label)}&nbsp;&nbsp;&rarr;</a>
      </td>
    </tr></table>`;
}

/** Thin horizontal rule with breathing room. */
export function divider(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;"><tr><td style="border-top:1px solid ${RULE};font-size:0;line-height:0;">&nbsp;</td></tr></table>`;
}

const HAZARD =
  `background-color:${INK};background-image:repeating-linear-gradient(-45deg,#ffffff 0,#ffffff 8px,${INK} 8px,${INK} 16px);`;

/**
 * Wraps body content in the branded shell: black masthead with the ARS
 * wordmark, hazard-stripe seam, white body, black footer with the contact
 * details, and a quiet explanation of why the mail was sent.
 */
export function shell(options: {
  /** Small tag in the masthead's right corner, e.g. "Contact" */
  tag: string;
  /** Preview text shown by mail clients next to the subject. */
  preview: string;
  body: string;
  /** One line under the card: why the recipient got this mail. */
  reason: string;
}): string {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>ARS Metals</title>
</head>
<body style="margin:0;padding:0;background:${CANVAS};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(options.preview)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${CANVAS}">
    <tr><td align="center" style="padding:36px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">

        <!-- Masthead -->
        <tr><td bgcolor="${INK}" style="padding:30px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td>
              <span style="font-family:${DISPLAY};font-size:26px;font-weight:900;letter-spacing:4px;color:#ffffff;">ARS</span><br>
              <span style="font-family:${SANS};font-size:9px;font-weight:600;letter-spacing:4px;color:#9ca3af;text-transform:uppercase;">Industrial&nbsp;Services</span>
            </td>
            <td align="right" style="font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#6b7280;vertical-align:top;">${escapeHtml(options.tag)}</td>
          </tr></table>
        </td></tr>

        <!-- Hazard seam -->
        <tr><td style="height:6px;font-size:0;line-height:0;${HAZARD}">&nbsp;</td></tr>

        <!-- Body -->
        <tr><td bgcolor="${PAPER}" style="padding:42px 40px 46px;">
          ${options.body}
        </td></tr>

        <!-- Footer -->
        <tr><td bgcolor="${INK}" style="padding:30px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family:${SANS};font-size:12px;line-height:1.9;color:#9ca3af;">
              <span style="color:#ffffff;font-weight:700;">ARS Metals</span><br>
              Mondeolaan 2E, Bus 20 &middot; 3600 Genk, Belgi&euml;<br>
              <a href="tel:+3289367787" style="color:#9ca3af;text-decoration:none;">+32 (0)89 36 77 87</a> &middot;
              <a href="mailto:info@ars-metals.be" style="color:#9ca3af;text-decoration:none;">info@ars-metals.be</a>
            </td>
            <td align="right" style="font-family:${DISPLAY};font-size:38px;font-weight:900;color:transparent;-webkit-text-stroke:1px #374151;vertical-align:bottom;" aria-hidden="true">ARS</td>
          </tr></table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr>
            <td style="border-top:1px solid #1f2937;padding-top:14px;font-family:${SANS};font-size:11px;color:#6b7280;">
              &copy; ${year} ARS Metals &middot; VCA-gecertificeerd &middot; Ma&nbsp;&ndash;&nbsp;Vr: 07:00&nbsp;&ndash;&nbsp;18:00
            </td>
          </tr></table>
        </td></tr>

      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;"><tr>
        <td style="padding:18px 8px 0;font-family:${SANS};font-size:11px;line-height:1.6;color:#9ca3af;text-align:center;">
          ${escapeHtml(options.reason)}
        </td>
      </tr></table>
    </td></tr>
  </table>
</body>
</html>`;
}
