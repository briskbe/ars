import type { Metadata } from "next";
import "./globals.css";
import { sanityFetch } from "../sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "../sanity/lib/queries";
import type { SiteSettings } from "../sanity/lib/types";
import WhatsAppWidget from "./components/WhatsAppWidget";

const FALLBACK_TITLE = "ARS Metals | Jouw Partner voor Industriële Diensten";
const FALLBACK_DESCRIPTION =
  "ARS Metals biedt expertise in industriële las- en montagewerken, rook- en warmteafvoer, service & onderhoud en meer. Al meer dan 10 jaar uw betrouwbare partner.";
const FALLBACK_WHATSAPP = "+32 (0)89 36 77 87";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);

  return (
    <html lang="nl">
      <body className="bg-white">
        {children}
        <WhatsAppWidget
          number={site?.whatsappNumber ?? site?.phone ?? FALLBACK_WHATSAPP}
          message={site?.whatsappMessage}
          tagline={site?.whatsappTagline}
          name={site?.title?.split("|")[0].trim()}
          logoUrl={site?.logoUrl ?? "/logo.png"}
          enabled={site?.whatsappEnabled !== false}
        />
      </body>
    </html>
  );
}
