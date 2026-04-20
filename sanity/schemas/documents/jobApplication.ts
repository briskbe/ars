import { defineType, defineField } from "sanity";

export const jobApplication = defineType({
  name: "jobApplication",
  title: "Sollicitatie",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Type sollicitatie",
      type: "string",
      options: {
        list: [
          { title: "Vacature-sollicitatie", value: "vacancy" },
          { title: "Open sollicitatie", value: "open" },
        ],
        layout: "radio",
      },
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "vacature",
      title: "Vacature",
      type: "reference",
      to: [{ type: "vacature" }],
      readOnly: true,
      description: "Enkel gevuld bij sollicitatie op een specifieke vacature.",
      hidden: ({ parent }) => parent?.kind !== "vacancy",
    }),
    defineField({
      name: "vacatureTitle",
      title: "Vacaturetitel (snapshot)",
      type: "string",
      readOnly: true,
      description: "Titel zoals getoond op het moment van solliciteren.",
    }),
    defineField({
      name: "desiredFunction",
      title: "Functie van interesse",
      type: "string",
      readOnly: true,
      description: "Enkel ingevuld bij open sollicitaties.",
      hidden: ({ parent }) => parent?.kind !== "open",
    }),
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
      name: "cv",
      title: "CV",
      type: "file",
      readOnly: true,
      options: { accept: ".pdf,.doc,.docx" },
    }),
    defineField({
      name: "motivation",
      title: "Motivatie",
      type: "text",
      rows: 6,
      readOnly: true,
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
          { title: "Uitgenodigd", value: "invited" },
          { title: "Aangenomen", value: "hired" },
          { title: "Afgewezen", value: "rejected" },
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
      kind: "kind",
      vacatureTitle: "vacatureTitle",
      desiredFunction: "desiredFunction",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare({ firstName, lastName, kind, vacatureTitle, desiredFunction, submittedAt, status }) {
      const name = [firstName, lastName].filter(Boolean).join(" ") || "Onbekend";
      const target =
        kind === "vacancy"
          ? vacatureTitle || "Vacature"
          : desiredFunction
            ? `Open: ${desiredFunction}`
            : "Open sollicitatie";
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString("nl-BE") : "";
      const statusLabel =
        status === "new"
          ? "Nieuw"
          : status === "in_progress"
            ? "In behandeling"
            : status === "invited"
              ? "Uitgenodigd"
              : status === "hired"
                ? "Aangenomen"
                : status === "rejected"
                  ? "Afgewezen"
                  : "";
      return {
        title: `${name} — ${target}`,
        subtitle: [date, statusLabel].filter(Boolean).join(" · "),
      };
    },
  },
});
