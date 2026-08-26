import type { SchemaTypeDefinition } from "sanity";

import { iconField } from "./objects/iconField";
import { navLink } from "./objects/navLink";
import { cta } from "./objects/cta";
import { stat } from "./objects/stat";
import { contactItem } from "./objects/contactItem";

import { siteSettings } from "./documents/siteSettings";
import { service } from "./documents/service";
import { vacature } from "./documents/vacature";
import { homePage } from "./documents/homePage";
import { contactPage } from "./documents/contactPage";
import { vacaturesPage } from "./documents/vacaturesPage";
import { submission } from "./documents/submission";
import { application } from "./documents/application";

export const schemaTypes: SchemaTypeDefinition[] = [
  iconField,
  navLink,
  cta,
  stat,
  contactItem,
  siteSettings,
  service,
  vacature,
  homePage,
  contactPage,
  vacaturesPage,
  submission,
  application,
];
