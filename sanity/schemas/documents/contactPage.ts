import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contactpagina",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "cards", title: "Contactkaarten" },
    { name: "form", title: "Formulier" },
    { name: "map", title: "Kaart" },
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

    // Cards
    defineField({
      name: "contactCards",
      title: "Contactkaarten",
      type: "array",
      of: [{ type: "contactItem" }],
      group: "cards",
    }),

    // Form
    defineField({ name: "formEyebrow", title: "Formulier — kleine tekst", type: "string", group: "form" }),
    defineField({ name: "formTitle", title: "Formulier — titel", type: "string", group: "form" }),
    defineField({ name: "formSubtitle", title: "Formulier — subtitel", type: "text", rows: 3, group: "form" }),
    defineField({
      name: "formBullets",
      title: "Formulier — opsomming",
      type: "array",
      of: [{ type: "string" }],
      group: "form",
    }),
    defineField({
      name: "serviceOptions",
      title: "Diensten in dropdown",
      type: "array",
      of: [{ type: "string" }],
      group: "form",
    }),
    defineField({ name: "directContactTitle", title: "Direct contact — titel", type: "string", group: "form" }),
    defineField({ name: "directContactNote", title: "Direct contact — tekst", type: "string", group: "form" }),

    // Map
    defineField({ name: "mapTitle", title: "Kaart — titel", type: "string", group: "map" }),
    defineField({ name: "mapSubtitle", title: "Kaart — adresregel", type: "string", group: "map" }),
  ],
  preview: { prepare: () => ({ title: "Contactpagina" }) },
});
