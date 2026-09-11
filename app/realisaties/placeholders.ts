import type { SanityProject } from "../../sanity/lib/types";

/**
 * Shown until de Realisaties in Sanity gevuld zijn — dezelfde vier projecten
 * staan in scripts/seed-sanity.ts, zodat de CMS-versie hier naadloos overneemt.
 */
export const PLACEHOLDER_PROJECTS: SanityProject[] = [
  {
    _id: "placeholder-1",
    title: "Staalconstructie nieuwe productiehal",
    category: "Montagewerken",
    summary:
      "Volledige montage van de draagstructuur voor een productiehal van 4.200 m² — van eerste kolom tot laatste windverband, opgeleverd binnen de geplande zes weken.",
    description:
      "Voor een industriële klant in Limburg stonden we in voor de complete montage van een nieuwe productiehal. Ons team monteerde 42 ton staal: kolommen, spanten, gordingen en windverbanden, inclusief het uitlijnen en aandraaien volgens momenttabel. Dankzij een strakke werfplanning en dagelijkse afstemming met de bouwheer bleef de werf continu in beweging — zonder één dag stilstand.",
    clientName: "Industriële klant — Limburg",
    location: "Genk",
    year: "2025",
    highlights: [
      "42 ton staal gemonteerd",
      "4.200 m² productiehal",
      "6 weken doorlooptijd",
      "Opgeleverd zonder stilstand",
    ],
    featured: true,
    imageUrl: "/hero.jpg",
    imageAlt: "Montage van een industriële staalconstructie",
    gallery: [
      { url: "/hero.jpg", alt: "Staalstructuur van de productiehal" },
      { url: "/over.jpg", alt: "Detail van de verbindingen" },
      { url: "/vacatures.jpg", alt: "Montageteam aan het werk" },
    ],
  },
  {
    _id: "placeholder-2",
    title: "RWA-installatie logistiek centrum",
    category: "Rook- en warmteafvoer",
    summary:
      "Plaatsing van 36 rookluiken met bijhorende sturing in een logistiek centrum in volle exploitatie — geleverd, geplaatst en gekeurd zonder onderbreking van de activiteit.",
    description:
      "In een logistiek centrum van 18.000 m² installeerden we een volledig rook- en warmteafvoersysteem conform EN 12101. Omdat het magazijn tijdens de werken operationeel bleef, werkten we in zones en buiten de piekuren. Na plaatsing volgde de indienststelling met de keuringsinstantie: alle 36 luiken in één keer goedgekeurd.",
    clientName: "Logistieke groep — Antwerpen",
    location: "Antwerpen",
    year: "2024",
    highlights: [
      "36 rookluiken geplaatst",
      "Conform EN 12101",
      "18.000 m² magazijn",
      "Geen onderbreking van de exploitatie",
    ],
    imageUrl: "/over.jpg",
    imageAlt: "Rookluiken op het dak van een logistiek centrum",
    gallery: [
      { url: "/over.jpg", alt: "Dakwerken aan het logistiek centrum" },
      { url: "/hero.jpg", alt: "Plaatsing van de rookluiken" },
    ],
  },
  {
    _id: "placeholder-3",
    title: "Inox leidingwerk voedingsindustrie",
    category: "Laswerken",
    summary:
      "480 meter TIG-gelast leidingwerk in inox 316L voor een productielijn in de voedingsindustrie — elke las gecontroleerd, honderd procent goedgekeurd.",
    description:
      "Voor een producent in de voedingsindustrie lasten onze gecertificeerde specialisten 480 meter procesleidingen in inox 316L. Alle verbindingen werden TIG-gelast onder beschermgas en aansluitend onderworpen aan niet-destructief onderzoek. Het resultaat: een volledige goedkeuring bij de eerste controle en een lijn die dezelfde week nog in productie ging.",
    clientName: "Voedingsproducent — Oost-Vlaanderen",
    location: "Gent",
    year: "2024",
    highlights: [
      "480 m leidingwerk",
      "TIG-gelast inox 316L",
      "100% goedgekeurd bij controle",
      "Zelfde week terug in productie",
    ],
    imageUrl: "/contact.jpg",
    imageAlt: "TIG-laswerk aan inox leidingen",
    gallery: [
      { url: "/contact.jpg", alt: "Laswerk aan de procesleidingen" },
      { url: "/hero.jpg", alt: "Overzicht van de installatie" },
    ],
  },
  {
    _id: "placeholder-4",
    title: "Verhuis complete productielijn",
    category: "Industrieel montage & verhuis",
    summary:
      "Demontage, transport en hermontage van een volledige productielijn met veertien machines — van laatste productiedag tot herstart in amper vijf dagen.",
    description:
      "Een producent verhuisde zijn volledige productie van Genk naar een nieuwe site in Luik. Wij demonteerden veertien machines, verzorgden het transport met uitzonderlijk vervoer en bouwden de lijn op de nieuwe locatie weer op — uitgelijnd, aangesloten en getest. Vijf dagen na de laatste productiedag draaide de lijn opnieuw op volle capaciteit, zonder één incident.",
    clientName: "Productiebedrijf — Limburg",
    location: "Genk → Luik",
    year: "2023",
    highlights: [
      "14 machines verplaatst",
      "Herstart binnen 5 dagen",
      "Uitgelijnd en getest opgeleverd",
      "Nul incidenten",
    ],
    imageUrl: "/vacatures.jpg",
    imageAlt: "Demontage van industriële machines",
    gallery: [
      { url: "/vacatures.jpg", alt: "Demontage van de productielijn" },
      { url: "/over.jpg", alt: "Hermontage op de nieuwe site" },
    ],
  },
];
