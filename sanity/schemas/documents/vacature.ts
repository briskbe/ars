import { defineType, defineField } from "sanity";

export const vacature = defineType({
  name: "vacature",
  title: "Vacature",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Functietitel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icoon", type: "iconName", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Interne medewerker", value: "internal" },
          { title: "Onderaannemer", value: "subcontractor" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (r) => r.required(),
    }),
    defineField({ name: "type", title: "Type (bv. Voltijds)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Locatie", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Omschrijving",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "requirements",
      title: "Vereisten",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "active",
      title: "Actief",
      type: "boolean",
      initialValue: true,
      description: "Schakel uit om de vacature tijdelijk te verbergen.",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      initialValue: 0,
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
    select: { title: "title", subtitle: "category", media: "icon" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle === "internal" ? "Intern" : "Onderaannemer",
      };
    },
  },
});
