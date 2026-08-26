import type { StructureResolver } from "sanity/structure";
import {
  ArchiveIcon,
  CheckmarkCircleIcon,
  DocumentsIcon,
  EnvelopeIcon,
} from "@sanity/icons";

import { apiVersion } from "./env";

const SUBMISSION_ORDERING = [
  { field: "submittedAt", direction: "desc" as const },
];

/** A filtered view on the submission inbox, newest message first. */
const inboxList = (
  S: Parameters<StructureResolver>[0],
  id: string,
  title: string,
  filter: string,
  icon: React.ComponentType,
) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(
      S.documentList()
        .title(title)
        .apiVersion(apiVersion)
        .filter(filter)
        .defaultOrdering(SUBMISSION_ORDERING)
        .canHandleIntent(
          (intent, params) =>
            intent === "edit" && params.type === "submission",
        ),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      S.listItem()
        .title("Contactformulier — berichten")
        .id("inbox")
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title("Berichten van het contactformulier")
            .items([
              inboxList(
                S,
                "inbox-new",
                "Nieuw",
                '_type == "submission" && (!defined(status) || status == "new")',
                EnvelopeIcon,
              ),
              inboxList(
                S,
                "inbox-read",
                "Gelezen",
                '_type == "submission" && status == "read"',
                CheckmarkCircleIcon,
              ),
              inboxList(
                S,
                "inbox-done",
                "Afgehandeld",
                '_type == "submission" && status == "done"',
                ArchiveIcon,
              ),
              S.divider(),
              inboxList(
                S,
                "inbox-all",
                "Alle berichten",
                '_type == "submission"',
                DocumentsIcon,
              ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Site-instellingen")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("Homepagina")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Contactpagina")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.listItem()
        .title("Vacaturepagina")
        .id("vacaturesPage")
        .child(
          S.document().schemaType("vacaturesPage").documentId("vacaturesPage"),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Diensten"),
      S.documentTypeListItem("vacature").title("Vacatures"),
    ]);
