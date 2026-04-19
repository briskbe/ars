import { sanityFetch } from "../../sanity/lib/fetch";
import { CONTACT_QUERY } from "../../sanity/lib/queries";
import type { ContactPage, SiteSettings } from "../../sanity/lib/types";
import ContactClient from "./ContactClient";

type ContactData = {
  page: ContactPage | null;
  site: SiteSettings | null;
};

export default async function Page() {
  const data = (await sanityFetch<ContactData>(CONTACT_QUERY)) ?? ({} as ContactData);
  return <ContactClient page={data.page ?? {}} site={data.site ?? null} />;
}
