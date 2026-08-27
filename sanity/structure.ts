import type { StructureResolver } from "sanity/structure";
import {
  ArchiveIcon,
  CheckmarkCircleIcon,
  DocumentsIcon,
  EnvelopeIcon,
  UserIcon,
  UsersIcon,
} from "@sanity/icons";

import { apiVersion } from "./env";

type S = Parameters<StructureResolver>[0];

const NEWEST_FIRST = [{ field: "submittedAt", direction: "desc" as const }];

/**
 * One inbox: a status-filtered view per state, over whatever GROQ filter
 * identifies the form the messages came from.
 */
const inbox = (
  S: S,
  config: { id: string; title: string; icon: React.ComponentType; type: string; filter: string },
) => {
  const view = (
    suffix: string,
    title: string,
    statusFilter: string,
    icon: React.ComponentType,
  ) =>
    S.listItem()
      .title(title)
      .id(`${config.id}-${suffix}`)
      .icon(icon)
      .child(
        S.documentList()
          .title(`${config.title} — ${title.toLowerCase()}`)
          .apiVersion(apiVersion)
          .filter(`${config.filter}${statusFilter}`)
          .defaultOrdering(NEWEST_FIRST)
          .canHandleIntent(
            (intent, params) => intent === "edit" && params.type === config.type,
          ),
      );

  return S.listItem()
    .title(config.title)
    .id(config.id)
    .icon(config.icon)
    .child(
      S.list()
        .title(config.title)
        .items([
          view("new", "Nieuw", ' && (!defined(status) || status == "new")', EnvelopeIcon),
          view("read", "Gelezen", ' && status == "read"', CheckmarkCircleIcon),
          view("done", "Afgehandeld", ' && status == "done"', ArchiveIcon),
          S.divider(),
          view("all", "Alle", "", DocumentsIcon),
        ]),
    );
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      inbox(S, {
        id: "inbox-contact",
        title: "Contactformulier — berichten",
        icon: EnvelopeIcon,
        type: "submission",
        filter: '_type == "submission"',
      }),
      inbox(S, {
        id: "inbox-vacature",
        title: "Sollicitaties — op een vacature",
        icon: UserIcon,
        type: "application",
        filter: '_type == "application" && kind == "vacature"',
      }),
      inbox(S, {
        id: "inbox-open",
        title: "Sollicitaties — spontaan",
        icon: UsersIcon,
        type: "application",
        filter: '_type == "application" && kind == "open"',
      }),
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
      S.listItem()
        .title("Realisatiepagina")
        .id("realisatiesPage")
        .child(
          S.document().schemaType("realisatiesPage").documentId("realisatiesPage"),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Diensten"),
      S.documentTypeListItem("project").title("Realisaties"),
      S.documentTypeListItem("vacature").title("Vacatures"),
    ]);
