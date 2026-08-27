import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Realisatie",
  type: "document",
  groups: [
    { name: "content", title: "Inhoud" },
    { name: "media", title: "Foto's" },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      group: "content",
      description: "Bijv. Laswerken, Montagewerken, RWA — gebruikt als filter op de pagina",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Korte omschrijving",
      type: "text",
      rows: 3,
      group: "content",
      description: "Eén à twee zinnen, getoond in het overzicht",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Uitgebreide omschrijving",
      type: "text",
      rows: 6,
      group: "content",
      description: "Getoond wanneer een bezoeker het project opent",
    }),
    defineField({
      name: "mainImage",
      title: "Hoofdfoto",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-tekst",
          type: "string",
          description: "Korte beschrijving van de foto voor toegankelijkheid",
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Fotogalerij",
      type: "array",
      group: "media",
      description: "Extra foto's van het project — sleep om te herordenen",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt-tekst", type: "string" }),
            defineField({ name: "caption", title: "Bijschrift", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "clientName",
      title: "Opdrachtgever",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "location",
      title: "Locatie",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "string",
      group: "details",
      description: "Bijv. 2025 of 2024 – 2025",
    }),
    defineField({
      name: "highlights",
      title: "Kerncijfers / feiten",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      description: "Bijv. \"1.200 m² dakoppervlak\" of \"3 weken doorlooptijd\"",
    }),
    defineField({
      name: "featured",
      title: "Uitgelicht",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Uitgelichte projecten krijgen het grote formaat bovenaan de pagina",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      group: "details",
      initialValue: 0,
      description: "Lager nummer = eerst getoond",
    }),
  ],
  orderings: [
    {
      title: "Volgorde",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "mainImage" },
  },
});
