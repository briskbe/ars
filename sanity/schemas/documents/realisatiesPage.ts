import { defineType, defineField } from "sanity";

export const realisatiesPage = defineType({
  name: "realisatiesPage",
  title: "Realisatiepagina",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "cta", title: "Afsluiter" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Hero — kleine tekst", type: "string", group: "hero" }),
    defineField({
      name: "heroTitle",
      title: "Hero — titel",
      type: "text",
      rows: 2,
      group: "hero",
      description: "Regeleinden blijven behouden; woorden tussen [haakjes] worden hol weergegeven",
    }),
    defineField({ name: "heroSubtitle", title: "Hero — subtitel", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero — achtergrondfoto",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // Slot / CTA
    defineField({ name: "ctaEyebrow", title: "Afsluiter — kleine tekst", type: "string", group: "cta" }),
    defineField({
      name: "ctaTitle",
      title: "Afsluiter — titel",
      type: "string",
      group: "cta",
      description: "Woorden tussen [haakjes] krijgen het accent",
    }),
    defineField({ name: "ctaText", title: "Afsluiter — tekst", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaButton", title: "Afsluiter — knop", type: "cta", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Realisatiepagina" }) },
});
