import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

/**
 * A contact form submission from the website.
 *
 * `liveEdit` is on so the inbox behaves like an inbox: marking a message read
 * or archiving it takes effect immediately instead of leaving a draft that
 * someone has to publish. Everything the visitor typed is read-only — this is
 * a record of what came in, not a document to edit. The two fields the team
 * owns are the status and the internal notes.
 */
export const submission = defineType({
  name: "submission",
  title: "Bericht",
  type: "document",
  icon: EnvelopeIcon,
  liveEdit: true,
  groups: [
    { name: "message", title: "Bericht", default: true },
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
        "Alleen zichtbaar in de CMS — de afzender ziet dit niet. Bijvoorbeeld wie opvolgt of wat er afgesproken is.",
    }),
    defineField({
      name: "firstName",
      title: "Voornaam",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "lastName",
      title: "Achternaam",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "company",
      title: "Bedrijfsnaam",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Telefoonnummer",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "service",
      title: "Gevraagde dienst",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Bericht",
      type: "text",
      rows: 8,
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Ontvangen op",
      type: "datetime",
      group: "message",
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Verstuurd via",
      type: "string",
      group: "message",
      readOnly: true,
      options: {
        list: [
          { title: "Contactpagina", value: "contact" },
          { title: "Homepagina", value: "home" },
        ],
      },
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
      company: "company",
      service: "service",
      message: "message",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare({ firstName, lastName, company, service, message, submittedAt, status }) {
      const name = [firstName, lastName].filter(Boolean).join(" ") || "Naamloos";
      const dot = status === "new" ? "● " : "";
      return {
        title: `${dot}${name}${company ? ` — ${company}` : ""}`,
        subtitle: [formatDate(submittedAt), service, firstLine(message)]
          .filter(Boolean)
          .join("  ·  "),
        media: EnvelopeIcon,
      };
    },
  },
});

function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function firstLine(message?: string): string {
  if (!message) return "";
  const line = message.trim().split("\n")[0];
  return line.length > 70 ? `${line.slice(0, 70)}…` : line;
}
