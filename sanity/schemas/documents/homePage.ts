import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepagina",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Diensten" },
    { name: "about", title: "Over ons" },
    { name: "why", title: "Waarom ARS" },
    { name: "jobsBanner", title: "Vacatures-banner" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // ---------- HERO ----------
    defineField({ name: "heroEyebrow", title: "Hero — kleine tekst", type: "string", group: "hero" }),
    defineField({
      name: "heroTitle",
      title: "Hero — titel",
      type: "text",
      rows: 2,
      group: "hero",
      description: "Gebruik een nieuwe regel voor de regelafbreking",
    }),
    defineField({ name: "heroSubtitle", title: "Hero — subtitel", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero — afbeelding", type: "image", group: "hero" }),
    defineField({
      name: "heroCtas",
      title: "Hero — knoppen",
      type: "array",
      of: [{ type: "cta" }],
      group: "hero",
      validation: (r) => r.max(2),
    }),
    defineField({
      name: "stats",
      title: "Hero — cijfers",
      type: "array",
      of: [{ type: "stat" }],
      group: "hero",
    }),

    // ---------- SERVICES ----------
    defineField({ name: "servicesEyebrow", title: "Diensten — kleine tekst", type: "string", group: "services" }),
    defineField({ name: "servicesTitle", title: "Diensten — titel", type: "string", group: "services" }),
    defineField({ name: "servicesSubtitle", title: "Diensten — subtitel", type: "text", rows: 2, group: "services" }),

    // ---------- ABOUT ----------
    defineField({ name: "aboutEyebrow", title: "Over ons — kleine tekst", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Over ons — titel", type: "string", group: "about" }),
    defineField({
      name: "aboutParagraphs",
      title: "Over ons — paragrafen",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "about",
    }),
    defineField({
      name: "aboutBullets",
      title: "Over ons — opsomming",
      type: "array",
      of: [{ type: "string" }],
      group: "about",
    }),
    defineField({
      name: "aboutCardTagline",
      title: "Over ons — kaart tagline",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutCardStats",
      title: "Over ons — kaart cijfers",
      type: "array",
      of: [{ type: "stat" }],
      validation: (r) => r.max(3),
      group: "about",
    }),

    // ---------- WHY ARS ----------
    defineField({ name: "whyEyebrow", title: "Waarom — kleine tekst", type: "string", group: "why" }),
    defineField({
      name: "whyTitle",
      title: "Waarom — titel",
      type: "string",
      group: "why",
      description: "Gebruik [haakjes] voor onderlijnde tekst",
    }),
    defineField({ name: "whySubtitle", title: "Waarom — subtitel", type: "text", rows: 2, group: "why" }),
    defineField({
      name: "reasons",
      title: "Waarom — redenen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titel", type: "string" },
            { name: "description", title: "Omschrijving", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      group: "why",
    }),

    // ---------- JOBS BANNER ----------
    defineField({ name: "jobsBannerTitle", title: "Vacatures-banner — titel", type: "string", group: "jobsBanner" }),
    defineField({ name: "jobsBannerText", title: "Vacatures-banner — tekst", type: "text", rows: 2, group: "jobsBanner" }),
    defineField({ name: "jobsBannerCta", title: "Vacatures-banner — knop", type: "cta", group: "jobsBanner" }),

    // ---------- CONTACT (op homepagina) ----------
    defineField({ name: "contactEyebrow", title: "Contact — kleine tekst", type: "string", group: "contact" }),
    defineField({ name: "contactTitle", title: "Contact — titel", type: "string", group: "contact" }),
    defineField({ name: "contactSubtitle", title: "Contact — subtitel", type: "text", rows: 2, group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "Homepagina" }) },
});
