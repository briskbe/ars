import { defineType, defineField } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Knop (CTA)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "style",
      title: "Stijl",
      type: "string",
      options: { list: ["primary", "secondary"] },
      initialValue: "primary",
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
