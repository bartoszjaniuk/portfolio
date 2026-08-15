import { isLocale, type Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import {
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
} from "@/lib/sanity/queries/services";

const REVALIDATE_SECONDS = 60;

export type ServiceListItem = {
  slug: string;
  sortOrder: number | null;
  title: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  intro: string | null;
};

export type ServiceSlugRow = {
  slug: string;
  _updatedAt: string | null;
};

export type ServiceSlugEntry = {
  slug: string;
  updatedAt: string | null;
};

function assertLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return locale;
}

/**
 * Fetches all services with field-level locale coalesce to EN.
 * Returns an empty array when none exist.
 */
export async function getServices(
  locale: Locale,
): Promise<ServiceListItem[]> {
  const safeLocale = assertLocale(locale);

  const rows = await client.fetch<ServiceListItem[] | null>(
    SERVICES_QUERY,
    { locale: safeLocale },
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  return (rows ?? []).filter((row) => Boolean(row.slug?.trim()));
}

/**
 * Fetches a single service by shared slug. Returns `null` when missing.
 */
export async function getServiceBySlug(
  locale: Locale,
  slug: string,
): Promise<ServiceListItem | null> {
  const safeLocale = assertLocale(locale);
  const safeSlug = slug.trim();
  if (!safeSlug) return null;

  return client.fetch<ServiceListItem | null>(
    SERVICE_BY_SLUG_QUERY,
    { locale: safeLocale, slug: safeSlug },
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
}

/** All service slugs for static params / sitemap (locale-agnostic). */
export async function getServiceSlugs(): Promise<ServiceSlugEntry[]> {
  const rows = await client.fetch<ServiceSlugRow[] | null>(
    SERVICE_SLUGS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  return (rows ?? [])
    .map((row) => {
      const slug = row.slug?.trim();
      if (!slug) return null;
      return {
        slug,
        updatedAt: row._updatedAt ?? null,
      };
    })
    .filter((entry): entry is ServiceSlugEntry => entry !== null);
}
