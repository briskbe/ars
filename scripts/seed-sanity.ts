/**
 * Seeds Sanity with the original hard-coded site content.
 *
 * Run with:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Requires env vars (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (Editor or Admin token from sanity.io/manage)
 */
import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const SERVICES = [
  { icon: "Flame", title: "Rook- en warmteafvoer", description: "Professionele installatie en onderhoud van rookafvoersystemen voor optimale veiligheid en ventilatie in industriële omgevingen." },
  { icon: "HardHat", title: "Montagewerken", description: "Vakkundige montage van staalconstructies, machines en industriële installaties met oog voor precisie en veiligheid." },
  { icon: "Zap", title: "Laswerken", description: "Gecertificeerde lasspecialisten voor MIG, TIG en elektrisch lassen op alle gangbare materialen en legeringen." },
  { icon: "Settings", title: "Service & Onderhoud", description: "Preventief en correctief onderhoud om stilstand te minimaliseren en de levensduur van uw installaties te verlengen." },
  { icon: "Truck", title: "Industrieel montage & verhuis", description: "Complete demontage, transport en hermontage van industriële machines en productielijnen." },
  { icon: "Shield", title: "Rookschermen & Smoke Fabric", description: "Installatie van rookschermen en smoke barriers voor brandcompartimentering conform de laatste normen." },
  { icon: "Sun", title: "Lichtstraten & lichtkoepels", description: "Plaatsing en renovatie van lichtstraten en lichtkoepels voor optimale daglichttoetreding in uw bedrijfsgebouw." },
  { icon: "Wrench", title: "Industrieel las- en montagewerken", description: "All-round industriële las- en montageoplossingen voor projecten van klein tot groot, altijd op maat." },
];

const VACATURES_INTERNAL = [
  { title: "RWA Installateur", icon: "Flame", type: "Voltijds", location: "Genk + werf",
    description: "Je staat in voor de installatie, het onderhoud en de herstelling van rook- en warmteafvoersystemen bij industriële klanten.",
    requirements: ["Ervaring met RWA-systemen of industriële installaties", "Technisch inzicht en handig met gereedschap", "Rijbewijs B", "Bereid om op verschillende locaties te werken"] },
  { title: "Industrieel Lasser (MIG/TIG)", icon: "Zap", type: "Voltijds", location: "Genk + werf",
    description: "Als gecertificeerd lasser voer je diverse laswerken uit op staal, inox en aluminium voor industriële projecten.",
    requirements: ["Lascertificaat MIG en/of TIG", "Minimum 2 jaar ervaring in industrieel laswerk", "Nauwkeurig en kwaliteitsbewust", "Rijbewijs B"] },
  { title: "Industrieel Monteur", icon: "HardHat", type: "Voltijds", location: "Genk + werf",
    description: "Je bent verantwoordelijk voor de montage en demontage van staalconstructies, machines en industriële installaties.",
    requirements: ["Ervaring in industriële montage", "Kennis van staalconstructies", "Fysiek belastbaar en hoogtevaardig", "Teamspeler met zelfstandige werkhouding"] },
  { title: "Service & Onderhoudstechnicus", icon: "Settings", type: "Voltijds", location: "Genk + werf",
    description: "Je voert preventief en correctief onderhoud uit aan industriële installaties en machines bij onze klanten.",
    requirements: ["Technische opleiding (elektromechanica of gelijkwaardig)", "Ervaring met industrieel onderhoud", "Probleemoplossend denkvermogen", "Flexibel en klantgericht"] },
];

const VACATURES_SUB = [
  { title: "Zelfstandig Lasser", icon: "Zap", type: "Onderaannemer", location: "Diverse locaties",
    description: "We zoeken zelfstandige lassers voor projectmatige inzet bij industriële klanten in de Benelux.",
    requirements: ["Actief als zelfstandige of onderaannemer", "Geldige lascertificaten", "Eigen basisuitrusting", "Beschikbaar voor projectmatige inzet"] },
  { title: "Zelfstandig Monteur / Ploeg", icon: "HardHat", type: "Onderaannemer", location: "Diverse locaties",
    description: "We zoeken ervaren zelfstandige monteurs of montageteams voor industriële montageprojecten.",
    requirements: ["Actief als zelfstandige of onderaannemer", "Bewezen ervaring in industriële montage", "VCA-certificaat", "Flexibel inzetbaar"] },
];

async function seedSiteSettings() {
  return client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "ARS Metals | Jouw Partner voor Industriële Diensten",
    description:
      "ARS Metals biedt expertise in industriële las- en montagewerken, rook- en warmteafvoer, service & onderhoud en meer. Al meer dan 10 jaar uw betrouwbare partner.",
    navLeft: [
      { _key: "n1", label: "Homepagina", href: "/" },
      { _key: "n2", label: "Diensten", href: "/#diensten" },
      { _key: "n3", label: "Realisaties", href: "/#over-ons" },
      { _key: "n4", label: "Over ons", href: "/#waarom" },
    ],
    navRight: [{ _key: "nr1", label: "Vacatures", href: "/vacatures" }],
    phone: "+32 (0)89 36 77 87",
    email: "info@ars-metals.be",
    address: "Mondeolaan 2E, Bus 20",
    addressLine2: "3600 Genk, België",
    mapsUrl: "https://www.google.com/maps/search/Mondeolaan+2E+Bus+20+3600+Genk",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.5!2d5.4972!3d50.9654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0d94834f8e9a3%3A0x0!2sMondeolaan%202E%2C%203600%20Genk!5e0!3m2!1snl!2sbe!4v1",
    hours: "Ma - Vr: 07:00 - 18:00",
    hoursNote: "Weekend op afspraak",
    footerTagline:
      "Uw betrouwbare partner voor industriële diensten. Van laswerken tot montage, van onderhoud tot verhuizingen — wij staan voor u klaar.",
    footerLinks: [
      { _key: "f1", label: "Over ons", href: "/#waarom" },
      { _key: "f2", label: "Realisaties", href: "/#over-ons" },
      { _key: "f3", label: "Vacatures", href: "/vacatures" },
      { _key: "f4", label: "Contact", href: "/contact" },
    ],
    vcaCertified: true,
  });
}

async function seedHomePage() {
  return client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Al meer dan 10 jaar uw partner",
    heroTitle: "Vakmanschap voor\nde industrie",
    heroSubtitle:
      "Van laswerken tot montage, van onderhoud tot industriële verhuizingen — ARS Metals levert precisie en betrouwbaarheid.",
    heroCtas: [
      { _key: "c1", label: "Bekijk onze diensten", href: "#diensten", style: "primary" },
      { _key: "c2", label: "Neem contact op", href: "#contact", style: "secondary" },
    ],
    stats: [
      { _key: "s1", value: "2000+", label: "Succesvolle projecten", description: "Afgerond met precisie" },
      { _key: "s2", value: "10+", label: "Jaar ervaring", description: "In de industriële sector" },
      { _key: "s3", value: "2x", label: "Snellere levering", description: "Door eigen werkwijze" },
      { _key: "s4", value: "100%", label: "Klanttevredenheid", description: "Onze hoogste prioriteit" },
    ],
    servicesEyebrow: "Wat wij doen",
    servicesTitle: "Ons complete aanbod aan industriële diensten",
    servicesSubtitle:
      "Met jarenlange ervaring en een breed scala aan specialisaties zijn wij uw allround partner voor elk industrieel project.",
    aboutEyebrow: "Over ons",
    aboutTitle: "Meer dan 10 jaar ervaring in de industriële sector",
    aboutParagraphs: [
      "ARS Metals is opgericht vanuit een passie voor industrieel vakmanschap. Met een team van ervaren specialisten bieden wij een allround service die verder gaat dan alleen uitvoering — wij denken mee, adviseren en leveren altijd een resultaat waar we trots op zijn.",
      "Of het nu gaat om een kleine reparatie of een groot montageproject, bij ARS Metals bent u verzekerd van kwaliteit, veiligheid en een persoonlijke aanpak.",
    ],
    aboutBullets: [
      "Gecertificeerde vakmensen",
      "Flexibele inzet op locatie",
      "Korte communicatielijnen",
      "Altijd binnen afgesproken termijn",
    ],
    aboutCardTagline: "Vakmanschap, betrouwbaarheid en toewijding sinds dag één",
    aboutCardStats: [
      { _key: "a1", value: "2000+", label: "Projecten" },
      { _key: "a2", value: "10+", label: "Jaar actief" },
      { _key: "a3", value: "100%", label: "Inzet" },
    ],
    whyEyebrow: "Waarom ARS Metals",
    whyTitle: "Waarom klanten voor [ons kiezen]",
    whySubtitle:
      "Ontdek wat ons onderscheidt van de rest en waarom bedrijven ons keer op keer als partner kiezen.",
    reasons: [
      { _key: "r1", title: "Allround expertise", description: "Van laswerk tot montage, van onderhoud tot complete verhuizingen — wij dekken het volledige spectrum van industriële diensten." },
      { _key: "r2", title: "Oplossingsgericht", description: "Geen probleem is te complex. Wij denken mee en bieden pragmatische oplossingen die echt werken op de werkvloer." },
      { _key: "r3", title: "Betrouwbaar & flexibel", description: "Afspraak is afspraak. Wij leveren op tijd en passen ons aan wanneer uw planning wijzigt." },
      { _key: "r4", title: "Veiligheid voorop", description: "Alle werkzaamheden worden uitgevoerd volgens de strengste veiligheidsnormen met gecertificeerde vakmensen." },
    ],
    jobsBannerTitle: "We hebben openstaande vacatures!",
    jobsBannerText: "Ben jij een vakman met passie voor industrieel werk? Solliciteer vandaag nog.",
    jobsBannerCta: { label: "Bekijk vacatures", href: "/vacatures", style: "primary" },
    contactEyebrow: "Contact",
    contactTitle: "Klaar om samen te werken?",
    contactSubtitle:
      "Heeft u een project in gedachten of wilt u meer weten over onze diensten? Neem vrijblijvend contact met ons op. Wij reageren binnen 24 uur.",
  });
}

async function seedContactPage() {
  return client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroEyebrow: "ARS Metaalwerken BV",
    heroTitle: "Contact opnemen",
    heroSubtitle:
      "Heeft u een vraag of wilt u een vrijblijvende offerte? Ons team staat voor u klaar.",
    heroCtas: [
      { _key: "h1", label: "Stuur een bericht", href: "#contact-form", style: "primary" },
      { _key: "h2", label: "+32 (0)89 36 77 87", href: "tel:+3289367787", style: "secondary" },
    ],
    contactCards: [
      { _key: "c1", icon: "Phone", label: "Telefoon", value: "+32 (0)89 36 77 87", href: "tel:+3289367787", description: "Ma - Vr: 07:00 - 18:00" },
      { _key: "c2", icon: "Mail", label: "E-mail", value: "info@ars-metals.be", href: "mailto:info@ars-metals.be", description: "Reactie binnen 48 uur" },
      { _key: "c3", icon: "MapPin", label: "Adres", value: "Mondeolaan 2E, Bus 20", href: "https://www.google.com/maps/search/Mondeolaan+2E+Bus+20+3600+Genk", description: "3600 Genk, België" },
      { _key: "c4", icon: "Clock", label: "Bereikbaarheid", value: "Ma - Vr: 07:00 - 18:00", description: "Weekend op afspraak" },
    ],
    formEyebrow: "Contactformulier",
    formTitle: "Laat ons weten hoe we u kunnen helpen",
    formSubtitle:
      "Vul het formulier in en wij nemen zo snel mogelijk contact met u op. We streven ernaar om binnen 48 uur te reageren.",
    formBullets: [
      "Gratis en vrijblijvend adviesgesprek",
      "Reactie binnen 48 uur",
      "Offerte op maat",
      "Meer dan 2000 succesvolle projecten",
    ],
    serviceOptions: [
      "Rook- en warmteafvoer",
      "Montagewerken",
      "Laswerken",
      "Service & Onderhoud",
      "Industrieel montage & verhuis",
      "Rookschermen & Smoke Fabric",
      "Lichtstraten & lichtkoepels",
      "Industrieel las- en montagewerken",
      "Anders",
    ],
    directContactTitle: "Liever direct contact?",
    directContactNote: "Bel ons tijdens kantooruren.",
    mapTitle: "Onze locatie",
    mapSubtitle: "Mondeolaan 2E, Bus 20 — 3600 Genk, België",
  });
}

async function seedVacaturesPage() {
  return client.createOrReplace({
    _id: "vacaturesPage",
    _type: "vacaturesPage",
    heroEyebrow: "Carrière bij ARS",
    heroTitle: "Werken bij ARS",
    heroSubtitle:
      "Versterk ons dynamisch team. Bij ARS combineren we vakmanschap met een uitstekende werksfeer en tal van groeimogelijkheden.",
    heroCtas: [
      { _key: "v1", label: "Bekijk vacatures", href: "#openstaande-vacatures", style: "primary" },
      { _key: "v2", label: "Open sollicitatie", href: "#solliciteren", style: "secondary" },
    ],
    heroStats: [
      { _key: "vs1", value: "2000+", label: "Projecten" },
      { _key: "vs2", value: "10+", label: "Jaar ervaring" },
      { _key: "vs3", value: "100%", label: "Inzet" },
    ],
    benefitsEyebrow: "Waarom ARS",
    benefitsTitle: "Wat wij bieden",
    benefitsSubtitle:
      "Bij ARS investeren we in onze mensen. Ontdek wat werken bij ons zo aantrekkelijk maakt.",
    benefits: [
      { _key: "b1", icon: "TrendingUp", title: "Groeimogelijkheden", description: "Ontwikkel je vaardigheden met interne opleidingen en doorgroeikansen binnen het bedrijf." },
      { _key: "b2", icon: "Users", title: "Hecht team", description: "Werk in een collegiale sfeer waar samenwerking en wederzijds respect centraal staan." },
      { _key: "b3", icon: "Shield", title: "Veiligheid voorop", description: "Wij investeren in de beste veiligheidsuitrusting en continue training voor al onze medewerkers." },
      { _key: "b4", icon: "Heart", title: "Werk-privébalans", description: "Vaste werkuren, competitief verlof en aandacht voor het welzijn van elk teamlid." },
      { _key: "b5", icon: "Briefcase", title: "Competitief pakket", description: "Aantrekkelijk loon aangevuld met extralegale voordelen, maaltijdcheques en bedrijfswagen." },
      { _key: "b6", icon: "Wrench", title: "Afwisselend werk", description: "Geen dag is hetzelfde. Werk aan uiteenlopende industriële projecten bij diverse klanten." },
    ],
    listingsEyebrow: "Openstaande vacatures",
    internalTitle: "Interne medewerkers",
    internalSubtitle:
      "Wij zoeken altijd naar gemotiveerde collega's die ons team willen versterken. Bekijk onze openstaande functies.",
    subcontractorTitle: "Onderaannemers",
    subcontractorSubtitle:
      "Ook voor onderaannemers zijn we altijd op zoek naar gemotiveerde vakmensen om onze projecten te ondersteunen.",
    applyEyebrow: "Solliciteren",
    applyTitle: "Klaar voor een nieuwe uitdaging?",
    applySubtitle:
      "Staat jouw droompositie er niet bij? Stuur gerust een open sollicitatie. Wij zijn altijd op zoek naar talent.",
    applyBullets: [
      "Persoonlijk kennismakingsgesprek",
      "Snelle terugkoppeling",
      "Eerlijk en transparant proces",
    ],
    applyContactTitle: "Vragen over vacatures?",
    applyContactNote: "Neem direct contact op met ons team.",
  });
}

async function seedServices() {
  const tx = client.transaction();
  SERVICES.forEach((s, i) => {
    tx.createOrReplace({
      _id: `service-${i + 1}`,
      _type: "service",
      ...s,
      order: i,
    });
  });
  await tx.commit();
}

async function seedVacatures() {
  const tx = client.transaction();
  VACATURES_INTERNAL.forEach((j, i) => {
    tx.createOrReplace({
      _id: `vacature-internal-${i + 1}`,
      _type: "vacature",
      ...j,
      category: "internal",
      active: true,
      order: i,
    });
  });
  VACATURES_SUB.forEach((j, i) => {
    tx.createOrReplace({
      _id: `vacature-sub-${i + 1}`,
      _type: "vacature",
      ...j,
      category: "subcontractor",
      active: true,
      order: i,
    });
  });
  await tx.commit();
}

(async () => {
  console.log("Seeding Sanity dataset:", dataset);
  await seedSiteSettings();
  console.log("✓ siteSettings");
  await seedHomePage();
  console.log("✓ homePage");
  await seedContactPage();
  console.log("✓ contactPage");
  await seedVacaturesPage();
  console.log("✓ vacaturesPage");
  await seedServices();
  console.log(`✓ ${SERVICES.length} services`);
  await seedVacatures();
  console.log(`✓ ${VACATURES_INTERNAL.length + VACATURES_SUB.length} vacatures`);
  console.log("\nDone! Open /studio in your app to manage content.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
