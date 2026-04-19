import { sanityFetch } from "../sanity/lib/fetch";
import { HOME_QUERY } from "../sanity/lib/queries";
import type { HomePage, SanityService, SiteSettings } from "../sanity/lib/types";
import HomeClient from "./HomeClient";

type HomeData = {
  page: HomePage | null;
  site: SiteSettings | null;
  services: SanityService[];
};

export default async function Page() {
  const data = (await sanityFetch<HomeData>(HOME_QUERY)) ?? ({} as HomeData);
  return (
    <HomeClient
      page={data.page ?? {}}
      site={data.site ?? null}
      services={data.services ?? []}
    />
  );
}
