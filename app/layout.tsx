import type { Metadata } from "next";
import "./globals.css";
import { sanityFetch } from "../sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "../sanity/lib/queries";
import type { SiteSettings } from "../sanity/lib/types";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "../lib/site";
import WhatsAppWidget from "./components/WhatsAppWidget";

const FALLBACK_WHATSAPP = "+32 (0)89 36 77 87";

const NOSCRIPT_MOTION_RESET = `
  [data-reveal] { opacity: 1 !important; transform: none !important; }
  .char-rise, .animate-fade-in-up { opacity: 1 !important; transform: none !important; animation: none !important; }
`;

export async function generateMetadata(): Promise<Metadata> {
  let site: SiteSettings | null = null;
  try {
    site = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  } catch {
    // Fall through to the defaults below.
  }

  const title = site?.title ?? DEFAULT_TITLE;
  const description = site?.description ?? DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      // Subpages set a plain title and get the brand appended.
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    keywords: [
      "industriële diensten",
      "laswerken",
      "montagewerken",
      "rook- en warmteafvoer",
      "RWA",
      "industrieel onderhoud",
      "machineverhuis",
      "staalconstructies",
      "Genk",
      "Limburg",
    ],
    openGraph: {
      type: "website",
      locale: "nl_BE",
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "ARS Metals — Industrial Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: { telephone: true, email: true, address: true },
  };
}

/**
 * LocalBusiness structured data for Google: address, hours, and contact
 * details come from the CMS when available, with the seeded values as
 * fallback so the markup never ships half-empty.
 */
function localBusinessJsonLd(site: SiteSettings | null): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#bedrijf`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og.jpg`,
    description: site?.description ?? DEFAULT_DESCRIPTION,
    telephone: site?.phone ?? "+32 89 36 77 87",
    email: site?.email ?? "info@ars-metals.be",
    address: {
      "@type": "PostalAddress",
      streetAddress: site?.address ?? "Mondeolaan 2E, Bus 20",
      postalCode: "3600",
      addressLocality: "Genk",
      addressCountry: "BE",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    areaServed: "Benelux",
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);

  // The WhatsApp widget is strictly opt-in from the CMS: only an explicit
  // `true` shows it. A settings document written before the field existed
  // carries no value at all, and the Studio renders that missing value as an
  // off switch — so anything other than `true` has to mean off, otherwise the
  // site contradicts the toggle the editor is looking at.
  return (
    <html lang="nl">
      <body className="bg-white">
        <script
          type="application/ld+json"
          // JSON.stringify output of our own data; nothing user-controlled.
          dangerouslySetInnerHTML={{ __html: localBusinessJsonLd(site) }}
        />
        {/* Scroll-driven reveals hide their content until observed. Without
            JavaScript nothing would ever observe them, so opt out entirely. */}
        <noscript>
          <style>{NOSCRIPT_MOTION_RESET}</style>
        </noscript>
        {children}
        <WhatsAppWidget
          number={site?.whatsappNumber ?? site?.phone ?? FALLBACK_WHATSAPP}
          message={site?.whatsappMessage}
          tagline={site?.whatsappTagline}
          name={site?.title?.split("|")[0].trim()}
          logoUrl={site?.logoUrl ?? "/logo.png"}
          enabled={site?.whatsappEnabled === true}
        />
      </body>
    </html>
  );
}
