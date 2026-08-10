import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";
import { siteBaseUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = siteBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: locales.map((locale) => `/${locale}/workbench`),
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
