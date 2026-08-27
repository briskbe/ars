import type { Metadata } from "next";
import { sanityFetch } from "../../sanity/lib/fetch";
import { VACATURES_QUERY } from "../../sanity/lib/queries";

const DESCRIPTION =
  "Werken bij ARS Metals in Genk: bekijk onze openstaande vacatures voor lassers, monteurs en techniekers, of stuur een open sollicitatie. Ook onderaannemers zijn welkom.";

export const metadata: Metadata = {
  title: "Vacatures",
  description: DESCRIPTION,
  alternates: { canonical: "/vacatures" },
  openGraph: {
    title: "Vacatures | ARS Metals",
    description: DESCRIPTION,
    url: "/vacatures",
  },
};
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
