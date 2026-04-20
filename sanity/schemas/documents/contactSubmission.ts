import { defineType, defineField } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contactaanvraag",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "Voornaam",
      type: "string",
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lastName",
      title: "Achternaam",
      type: "string",
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "company",
      title: "Bedrijfsnaam",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      readOnly: true,
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Telefoonnummer",
      type: "string",
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "service",
      title: "Gekozen dienst",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Bericht",
      type: "text",
      rows: 6,
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Verzonden op",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Nieuw", value: "new" },
          { title: "In behandeling", value: "in_progress" },
          { title: "Afgehandeld", value: "done" },
          { title: "Spam / genegeerd", value: "ignored" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "internalNotes",
      title: "Interne notities",
      type: "text",
      rows: 4,
    }),
  ],
  orderings: [
    {
      title: "Nieuwste eerst",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      subtitle: "email",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare({ firstName, lastName, subtitle, status, submittedAt }) {
      const name = [firstName, lastName].filter(Boolean).join(" ") || "Onbekend";
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString("nl-BE") : "";
      const statusLabel =
        status === "new"
          ? "Nieuw"
          : status === "in_progress"
            ? "In behandeling"
            : status === "done"
              ? "Afgehandeld"
              : status === "ignored"
                ? "Genegeerd"
                : "";
      return {
        title: `${name}${statusLabel ? ` — ${statusLabel}` : ""}`,
        subtitle: [date, subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
