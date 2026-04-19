import { defineType, defineField } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Cijfer / Statistiek",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Waarde", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Omschrijving", type: "string" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
