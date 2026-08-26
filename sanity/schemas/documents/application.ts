import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

import { formatSubmittedAt } from "../../lib/formatSubmittedAt";

/**
 * A job application from the vacatures page — either for a specific vacancy
 * (the "Solliciteren" modal on a listing) or an open one (the "Open
 * sollicitatie" form further down). `kind` says which, and each gets its own
 * inbox in the Studio.
 *
 * Same rules as the contact form messages: `liveEdit` so status changes take
 * effect straight away, and what the applicant sent is read-only.
 */
export const application = defineType({
  name: "application",
  title: "Sollicitatie",
  type: "document",
  icon: UsersIcon,
  liveEdit: true,
  groups: [
    { name: "application", title: "Sollicitatie", default: true },
    { name: "internal", title: "Opvolging" },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "internal",
      options: {
        list: [
          { title: "Nieuw", value: "new" },
          { title: "Gelezen", value: "read" },
          { title: "Afgehandeld", value: "done" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Interne notities",
      type: "text",
      rows: 4,
      group: "internal",
      description:
        "Alleen zichtbaar in de CMS — de sollicitant ziet dit niet. Bijvoorbeeld wie opvolgt of wat er afgesproken is.",
    }),
    defineField({
      name: "kind",
      title: "Binnengekomen via",
      type: "string",
      group: "application",
      readOnly: true,
      description:
        "Deze sollicitatie is door een bezoeker verstuurd via het sollicitatieformulier op de vacaturepagina.",
      options: {
        list: [
          {
            title: "Sollicitatieformulier — op een specifieke vacature",
            value: "vacature",
          },
          {
            title: "Sollicitatieformulier — open (spontane) sollicitatie",
            value: "open",
          },
        ],
      },
    }),
    defineField({
      name: "vacatureTitle",
      title: "Vacature",
      type: "string",
      group: "application",
      readOnly: true,
      description:
        "De functie waarop gesolliciteerd is, zoals die op het moment van solliciteren heette.",
      hidden: ({ document }) => document?.kind !== "vacature",
    }),
    defineField({
      name: "vacature",
      title: "Gekoppelde vacature",
      type: "reference",
      to: [{ type: "vacature" }],
      // Weak: a vacancy that gets filled and deleted must not drag its
      // applications down with it, or block its own removal.
      weak: true,
      group: "application",
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "vacature",
    }),
    defineField({
      name: "desiredRole",
      title: "Functie van interesse",
      type: "string",
      group: "application",
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "open",
    }),
    defineField({
      name: "firstName",
      title: "Voornaam",
      type: "string",
      group: "application",
      readOnly: true,
    }),
    defineField({
      name: "lastName",
      title: "Achternaam",
      type: "string",
      group: "application",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      group: "application",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Telefoonnummer",
      type: "string",
      group: "application",
      readOnly: true,
    }),
    defineField({
      name: "cv",
      title: "CV",
      type: "file",
      group: "application",
      readOnly: true,
      description: "Klik op het bestand om het te openen of te downloaden.",
    }),
    defineField({
      name: "motivation",
      title: "Motivatie",
      type: "text",
      rows: 8,
      group: "application",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Ontvangen op",
      type: "datetime",
      group: "application",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      name: "newestFirst",
      title: "Nieuwste eerst",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      name: "oldestFirst",
      title: "Oudste eerst",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      kind: "kind",
      vacatureTitle: "vacatureTitle",
      desiredRole: "desiredRole",
      submittedAt: "submittedAt",
      status: "status",
      cv: "cv.asset",
    },
    prepare({
      firstName,
      lastName,
      kind,
      vacatureTitle,
      desiredRole,
      submittedAt,
      status,
      cv,
    }) {
      const name = [firstName, lastName].filter(Boolean).join(" ") || "Naamloos";
      const dot = status === "new" ? "● " : "";
      const origin =
        kind === "open"
          ? "Open sollicitatie"
          : `Sollicitatie · ${vacatureTitle || "vacature onbekend"}`;
      return {
        title: `${dot}${name}`,
        subtitle: [
          origin,
          kind === "open" ? desiredRole : null,
          formatSubmittedAt(submittedAt),
          cv ? "CV bijgevoegd" : "geen CV",
        ]
          .filter(Boolean)
          .join("  ·  "),
        media: UsersIcon,
      };
    },
  },
});
