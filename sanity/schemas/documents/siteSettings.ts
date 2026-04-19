import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-instellingen",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site-titel",
      type: "string",
      initialValue: "ARS Metals | Jouw Partner voor Industriële Diensten",
    }),
    defineField({
      name: "description",
      title: "Meta-omschrijving",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({
      name: "navLeft",
      title: "Navigatie (links)",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({
      name: "navRight",
      title: "Navigatie (rechts)",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({
      name: "phone",
      title: "Telefoonnummer",
      type: "string",
    }),
    defineField({ name: "email", title: "E-mailadres", type: "string" }),
    defineField({ name: "address", title: "Adres (regel 1)", type: "string" }),
    defineField({ name: "addressLine2", title: "Adres (regel 2)", type: "string" }),
    defineField({ name: "mapsUrl", title: "Google Maps URL", type: "url" }),
    defineField({ name: "mapEmbedUrl", title: "Google Maps Embed URL", type: "url" }),
    defineField({ name: "hours", title: "Openingsuren", type: "string" }),
    defineField({ name: "hoursNote", title: "Openingsuren — extra", type: "string" }),
    defineField({
      name: "footerTagline",
      title: "Footer — tagline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerLinks",
      title: "Footer-navigatie",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({ name: "vcaCertified", title: "VCA-gecertificeerd tonen", type: "boolean", initialValue: true }),
  ],
  preview: { prepare: () => ({ title: "Site-instellingen" }) },
});
