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
    defineField({
      name: "notificationEmails",
      title: "Meldingen naar",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Wie een e-mail krijgt bij een nieuw bericht of een nieuwe sollicitatie. Leeg laten om het e-mailadres hierboven te gebruiken.",
    }),
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
    defineField({
      name: "whatsappEnabled",
      title: "WhatsApp-widget tonen",
      type: "boolean",
      description: "Toont de zwevende WhatsApp-knop op alle pagina's.",
      initialValue: true,
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp-nummer",
      type: "string",
      description:
        "In internationaal formaat, bv. +32 (0)89 36 77 87. Leeg laten om het telefoonnummer hierboven te gebruiken.",
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp — standaardbericht",
      type: "text",
      rows: 2,
      description: "Vooraf ingevuld bericht dat de bezoeker nog kan aanpassen.",
    }),
    defineField({
      name: "whatsappTagline",
      title: "WhatsApp — responstijd",
      type: "string",
      description: "Kleine regel onder de naam in het chatvenster.",
    }),
    defineField({ name: "vcaCertified", title: "VCA-gecertificeerd tonen", type: "boolean", initialValue: true }),
  ],
  preview: { prepare: () => ({ title: "Site-instellingen" }) },
});
