/**
 * Eenmalig: koppelt de dienstfoto's van de oude Framer-site aan de
 * service-documenten in Sanity. Foto's worden als échte Sanity-assets
 * geüpload, dus de redactie kan ze daarna gewoon in de Studio vervangen.
 *
 *   npx tsx scripts/attach-service-images.ts
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: [".env.local", ".env"] });
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Zet NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET en SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

const FRAMER = "https://framerusercontent.com/images/";

/**
 * Dienst-titel → foto van de oude site. Een pad dat met "/" begint wordt
 * lokaal gelezen (gebruikt voor één foto die op de Framer-CDN zelf
 * beschadigd is en eerst hersteld moest worden).
 */
const IMAGES: Record<string, { url: string; filename: string }> = {
  "Rook- en warmteafvoer": { url: `${FRAMER}hojY2fhSaZijqktDj1sJcWfCqoo.jpeg`, filename: "rwa-dakluiken.jpeg" },
  "Montagewerken": { url: `${FRAMER}Tpb2dbwXbtVcOdY0wyunWkP6iD4.jpg`, filename: "montage-staalhal.jpg" },
  "Laswerken": { url: `${FRAMER}I1dR4fHKR0F50DHzMBB24u93A.jpg`, filename: "laswerken-vonken.jpg" },
  "Service & Onderhoud": { url: `${FRAMER}yAk62wKMOPGtAczpDTfoPWCEkY.jpeg`, filename: "service-onderhoud-hal.jpeg" },
  "Industrieel montage & verhuis": { url: `${FRAMER}qLkndppoW2KyVfaFWA5vcHferc.jpeg`, filename: "machineverhuis-transport.jpeg" },
  "Rookschermen & Smoke Fabric": { url: `${FRAMER}NgAXeKquKwI302Po0Xzm4ov5vU.jpeg`, filename: "rookschermen-smoke-fabric.jpeg" },
  "Lichtstraten & lichtkoepels": { url: `${FRAMER}24iqDCrefC0TMj7uHJZYxLCDo.jpeg`, filename: "lichtkoepels-dak.jpeg" },
  "Industrieel las- en montagewerken": { url: "/tmp/industrieel-laswerk.jpeg", filename: "industrieel-laswerk.jpeg" },
};

(async () => {
  const services: { _id: string; title: string }[] = await client.fetch(
    '*[_type == "service"]{ _id, title }',
  );

  for (const service of services) {
    const source = IMAGES[service.title];
    if (!source) {
      console.log(`— geen foto gedefinieerd voor: ${service.title}`);
      continue;
    }
    let buffer: Buffer;
    if (source.url.startsWith("/")) {
      buffer = readFileSync(source.url);
    } else {
      const res = await fetch(source.url);
      if (!res.ok) throw new Error(`Download mislukt (${res.status}): ${source.url}`);
      buffer = Buffer.from(await res.arrayBuffer());
    }
    const asset = await client.assets.upload("image", buffer, { filename: source.filename });
    await client.patch(service._id).set({
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    }).commit();
    console.log(`✓ ${service.title} ← ${source.filename} (${Math.round(buffer.length / 1024)} kB)`);
  }
  console.log("Klaar.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
