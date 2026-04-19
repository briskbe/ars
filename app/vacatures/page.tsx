import { sanityFetch } from "../../sanity/lib/fetch";
import { VACATURES_QUERY } from "../../sanity/lib/queries";
import type {
  SanityVacature,
  SiteSettings,
  VacaturesPage,
} from "../../sanity/lib/types";
import VacaturesClient from "./VacaturesClient";

type VacaturesData = {
  page: VacaturesPage | null;
  site: SiteSettings | null;
  internalJobs: SanityVacature[];
  subcontractorJobs: SanityVacature[];
};

export default async function Page() {
  const data = (await sanityFetch<VacaturesData>(VACATURES_QUERY)) ?? ({} as VacaturesData);
  return (
    <VacaturesClient
      page={data.page ?? {}}
      site={data.site ?? null}
      internalJobs={data.internalJobs ?? []}
      subcontractorJobs={data.subcontractorJobs ?? []}
    />
  );
}
