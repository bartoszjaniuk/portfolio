import type { MetadataRoute } from "next";

import { legalPageKeys, legalPagePath } from "@/lib/content/privacy";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { getHomePageUpdatedAtMap } from "@/lib/sanity/fetchers/get-home-page";
import { getServiceSlugs } from "@/lib/sanity/fetchers/get-services";
import { siteBaseUrl } from "@/lib/site-url";

/** Static last-updated date for legal pages (matches lib/content/privacy.ts). */
const LEGAL_LAST_MODIFIED = new Date("2026-08-15");

function servicePath(locale: string, slug: string): string {
  return `/${locale}/services/${slug}`;
}

function withXDefault(
  languages: Record<string, string>,
  defaultUrl: string,
): Record<string, string> {
  return { ...languages, "x-default": defaultUrl };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBaseUrl();
  const [homeUpdatedAtMap, serviceSlugs] = await Promise.all([
    getHomePageUpdatedAtMap(),
    getServiceSlugs(),
  ]);

  const homeLanguages = withXDefault(
    Object.fromEntries(locales.map((locale) => [locale, `${base}/${locale}`])),
    `${base}/${defaultLocale}`,
  );

  const homePages = locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: homeUpdatedAtMap[locale] ?? LEGAL_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: homeLanguages,
    },
  }));

  const legalPages = legalPageKeys.flatMap((pageKey) => {
    const languages = withXDefault(
      Object.fromEntries(
        locales.map((locale) => [
          locale,
          `${base}${legalPagePath(locale, pageKey)}`,
        ]),
      ),
      `${base}${legalPagePath(defaultLocale, pageKey)}`,
    );

    return locales.map((locale) => ({
      url: `${base}${legalPagePath(locale, pageKey)}`,
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: {
        languages,
      },
    }));
  });

  const servicePages = serviceSlugs.flatMap(({ slug, updatedAt }) => {
    const languages = withXDefault(
      Object.fromEntries(
        locales.map((locale) => [locale, `${base}${servicePath(locale, slug)}`]),
      ),
      `${base}${servicePath(defaultLocale, slug)}`,
    );

    return locales.map((locale) => ({
      url: `${base}${servicePath(locale, slug)}`,
      lastModified: updatedAt ? new Date(updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages,
      },
    }));
  });

  return [...homePages, ...legalPages, ...servicePages];
}
