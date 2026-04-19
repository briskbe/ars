import { defineType, defineField } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Navigatielink",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link (href)", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
