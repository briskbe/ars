import type { Metadata } from "next";
import { sanityFetch } from "../../sanity/lib/fetch";
import { CONTACT_QUERY } from "../../sanity/lib/queries";
import type { ContactPage, SiteSettings } from "../../sanity/lib/types";
import ContactClient from "./ContactClient";

const DESCRIPTION =
  "Neem contact op met ARS Metals in Genk: vraag een vrijblijvende offerte aan voor laswerken, montage, rook- en warmteafvoer of industrieel onderhoud. Reactie binnen 48 uur.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | ARS Metals",
    description: DESCRIPTION,
    url: "/contact",
  },
};

type ContactData = {
  page: ContactPage | null;
  site: SiteSettings | null;
};

export default async function Page() {
  const data = (await sanityFetch<ContactData>(CONTACT_QUERY)) ?? ({} as ContactData);
  return <ContactClient page={data.page ?? {}} site={data.site ?? null} />;
}
