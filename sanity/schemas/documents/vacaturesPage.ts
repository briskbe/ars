import { defineType, defineField } from "sanity";

export const vacaturesPage = defineType({
  name: "vacaturesPage",
  title: "Vacaturepagina",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "benefits", title: "Voordelen" },
    { name: "listings", title: "Vacatures" },
    { name: "apply", title: "Open sollicitatie" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Hero — kleine tekst", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Hero — titel", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Hero — subtitel", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero — afbeelding", type: "image", group: "hero" }),
    defineField({
      name: "heroCtas",
      title: "Hero — knoppen",
      type: "array",
      of: [{ type: "cta" }],
      validation: (r) => r.max(2),
      group: "hero",
    }),
    defineField({
      name: "heroStats",
      title: "Hero — cijfers",
      type: "array",
      of: [{ type: "stat" }],
      validation: (r) => r.max(3),
      group: "hero",
    }),

    // Benefits
    defineField({ name: "benefitsEyebrow", title: "Voordelen — kleine tekst", type: "string", group: "benefits" }),
    defineField({ name: "benefitsTitle", title: "Voordelen — titel", type: "string", group: "benefits" }),
    defineField({ name: "benefitsSubtitle", title: "Voordelen — subtitel", type: "text", rows: 3, group: "benefits" }),
    defineField({
      name: "benefits",
      title: "Voordelen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icoon", type: "iconName" },
            { name: "title", title: "Titel", type: "string" },
            { name: "description", title: "Omschrijving", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      group: "benefits",
    }),

    // Listings
    defineField({ name: "listingsEyebrow", title: "Vacatures — kleine tekst", type: "string", group: "listings" }),
    defineField({ name: "internalTitle", title: "Interne — titel", type: "string", group: "listings" }),
    defineField({ name: "internalSubtitle", title: "Interne — subtitel", type: "text", rows: 3, group: "listings" }),
    defineField({ name: "subcontractorTitle", title: "Onderaannemer — titel", type: "string", group: "listings" }),
    defineField({
      name: "subcontractorSubtitle",
      title: "Onderaannemer — subtitel",
      type: "text",
      rows: 3,
      group: "listings",
    }),

    // Apply
    defineField({ name: "applyEyebrow", title: "Solliciteren — kleine tekst", type: "string", group: "apply" }),
    defineField({ name: "applyTitle", title: "Solliciteren — titel", type: "string", group: "apply" }),
    defineField({ name: "applySubtitle", title: "Solliciteren — subtitel", type: "text", rows: 3, group: "apply" }),
    defineField({
      name: "applyBullets",
      title: "Solliciteren — opsomming",
      type: "array",
      of: [{ type: "string" }],
      group: "apply",
    }),
    defineField({ name: "applyContactTitle", title: "Vragen-blok — titel", type: "string", group: "apply" }),
    defineField({ name: "applyContactNote", title: "Vragen-blok — tekst", type: "string", group: "apply" }),
  ],
  preview: { prepare: () => ({ title: "Vacaturepagina" }) },
});
