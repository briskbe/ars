"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { nlNLLocale } from "@sanity/locale-nl-nl";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { inboxActions } from "./sanity/lib/inboxActions";

const SINGLETONS = ["siteSettings", "homePage", "contactPage", "vacaturesPage"];

// Messages and applications arrive from the website; nobody should hand-write
// one in the Studio, so they lose their "create" template alongside the
// singletons.
const NO_MANUAL_CREATE = [...SINGLETONS, "submission", "application"];

export default defineConfig({
  name: "ars-metals",
  title: "ARS Metals — CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !NO_MANUAL_CREATE.includes(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) => {
      // Inbox documents carry their own status and delete actions; the
      // built-in set (publish, duplicate, the generic delete) has nothing to
      // offer a record that arrived from a form and is never edited by hand.
      if (schemaType === "submission") return inboxActions("Bericht");
      if (schemaType === "application") return inboxActions("Sollicitatie");
      if (SINGLETONS.includes(schemaType)) {
        return input.filter(({ action }) =>
          ["publish", "discardChanges", "restore"].includes(action ?? ""),
        );
      }
      return input;
    },
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    nlNLLocale(),
  ],
});
