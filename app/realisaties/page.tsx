import type { Metadata } from "next";
import { sanityFetch } from "../../sanity/lib/fetch";
import { REALISATIES_QUERY } from "../../sanity/lib/queries";
import type {
  RealisatiesPage,
  SanityProject,
  SiteSettings,
} from "../../sanity/lib/types";
import RealisatiesClient from "./RealisatiesClient";

const DESCRIPTION =
  "Een selectie van onze industriële projecten: laswerken, montagewerken, rook- en warmteafvoer en complete machineverhuizingen — bekijk hoe wij vakmanschap in staal omzetten.";

export const metadata: Metadata = {
  title: "Realisaties",
  description: DESCRIPTION,
  alternates: { canonical: "/realisaties" },
  openGraph: {
    title: "Realisaties | ARS Metals",
    description: DESCRIPTION,
    url: "/realisaties",
  },
};

type RealisatiesData = {
  page: RealisatiesPage | null;
  site: SiteSettings | null;
  projects: SanityProject[];
};

export default async function Page() {
  const data =
    (await sanityFetch<RealisatiesData>(REALISATIES_QUERY)) ??
    ({} as RealisatiesData);
  return (
    <RealisatiesClient
      page={data.page ?? {}}
      site={data.site ?? null}
      projects={data.projects ?? []}
    />
  );
}
