import type { Metadata } from "next";
import "./globals.css";
import { sanityFetch } from "../sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "../sanity/lib/queries";
import type { SiteSettings } from "../sanity/lib/types";

const FALLBACK_TITLE = "ARS Metals | Jouw Partner voor Industriële Diensten";
const FALLBACK_DESCRIPTION =
  "ARS Metals biedt expertise in industriële las- en montagewerken, rook- en warmteafvoer, service & onderhoud en meer. Al meer dan 10 jaar uw betrouwbare partner.";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const site = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
    return {
      title: site?.title ?? FALLBACK_TITLE,
      description: site?.description ?? FALLBACK_DESCRIPTION,
    };
  } catch {
    return { title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="bg-white">{children}</body>
    </html>
  );
}
