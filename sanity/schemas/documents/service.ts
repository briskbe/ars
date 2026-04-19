import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Dienst",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icoon", type: "iconName", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Omschrijving",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
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
  preview: { select: { title: "title", subtitle: "icon" } },
});
