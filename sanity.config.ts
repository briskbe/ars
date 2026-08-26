import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { nlNLLocale } from "@sanity/locale-nl-nl";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { submissionActions } from "./sanity/lib/submissionActions";

const SINGLETONS = ["siteSettings", "homePage", "contactPage", "vacaturesPage"];

// Submissions arrive from the website; nobody should hand-write one in the
// Studio, so they lose their "create" template alongside the singletons.
const NO_MANUAL_CREATE = [...SINGLETONS, "submission"];

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
      if (schemaType === "submission") {
        return [
          ...submissionActions,
          ...input.filter(({ action }) => action === "delete"),
        ];
      }
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
