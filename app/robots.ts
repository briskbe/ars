import type { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CMS and the form endpoints are not pages.
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
