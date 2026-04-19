import { defineType, defineField } from "sanity";

export const contactItem = defineType({
  name: "contactItem",
  title: "Contactgegeven",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icoon", type: "iconName", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Waarde", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link (optioneel)", type: "string" }),
    defineField({ name: "description", title: "Omschrijving", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});
