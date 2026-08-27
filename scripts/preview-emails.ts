/**
 * Renders every mail template to .email-previews/*.html and (with --send)
 * mails the full set to a recipient so they can be checked in a real client.
 *
 *   npx tsx scripts/preview-emails.ts
 *   npx tsx scripts/preview-emails.ts --send iemand@voorbeeld.be
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: [".env.local", ".env"] });
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { contactEmails, applicationEmails } from "../lib/email/templates";
import { sendEmail } from "../lib/email/send";

const SAMPLE_CONTACT = {
  firstName: "Jan",
  lastName: "De Vries",
  company: "Machinebouw Peeters NV",
  email: "jan.devries@voorbeeld.be",
  phone: "+32 (0)472 12 34 56",
  service: "Laswerken",
  message:
    "Goedemiddag,\n\nVoor onze productiehal in Hasselt zoeken we een partner voor het lassen van een reeks inox leidingen (ca. 120 meter, voedingsindustrie). Graag hadden we een offerte ontvangen en gehoord welke doorlooptijd haalbaar is.\n\nMet vriendelijke groeten,\nJan De Vries",
};

const SAMPLE_VACATURE = {
  firstName: "Sofie",
  lastName: "Janssens",
  email: "sofie.janssens@voorbeeld.be",
  phone: "+32 (0)498 76 54 32",
  motivation:
    "Als gecertificeerd MIG/TIG-lasser met acht jaar ervaring in de industrie zou ik graag deel uitmaken van jullie team. Kwaliteit en veiligheid staan bij mij voorop.",
  kind: "vacature" as const,
  vacatureTitle: "Industrieel Lasser (MIG/TIG)",
  cv: { filename: "cv-sofie-janssens.pdf", content: "" },
};

const SAMPLE_OPEN = {
  firstName: "Ahmed",
  lastName: "El Amrani",
  email: "ahmed.elamrani@voorbeeld.be",
  phone: "+32 (0)485 11 22 33",
  motivation:
    "Ik werk al tien jaar als industrieel monteur en ben op zoek naar een nieuwe uitdaging in de regio Genk. Mijn VCA is up-to-date en ik ben snel beschikbaar.",
  kind: "open" as const,
  desiredRole: "Industrieel Monteur",
};

const all = [
  ...contactEmails(SAMPLE_CONTACT, "contact").map((e, i) => ({
    name: i === 0 ? "contact-bezoeker" : "contact-admin",
    email: e,
  })),
  ...applicationEmails(SAMPLE_VACATURE).map((e, i) => ({
    name: i === 0 ? "vacature-bezoeker" : "vacature-admin",
    email: e,
  })),
  ...applicationEmails(SAMPLE_OPEN).map((e, i) => ({
    name: i === 0 ? "open-sollicitatie-bezoeker" : "open-sollicitatie-admin",
    email: e,
  })),
];

const outDir = join(process.cwd(), ".email-previews");
mkdirSync(outDir, { recursive: true });
for (const { name, email } of all) {
  writeFileSync(join(outDir, `${name}.html`), email.html);
  console.log(`✓ ${name}.html  (onderwerp: ${email.subject})`);
}

const sendIndex = process.argv.indexOf("--send");
if (sendIndex !== -1) {
  const to = process.argv[sendIndex + 1];
  if (!to) {
    console.error("Gebruik: --send iemand@voorbeeld.be");
    process.exit(1);
  }
  (async () => {
    for (const { name, email } of all) {
      // Sample CVs are empty placeholders; drop the attachment when sending.
      const ok = await sendEmail({ ...email, to, attachments: undefined });
      console.log(`${ok ? "✓ verzonden" : "✗ mislukt"}: ${name} → ${to}`);
    }
  })();
}
