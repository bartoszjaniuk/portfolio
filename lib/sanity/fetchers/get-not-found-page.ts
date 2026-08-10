import { isLocale, type Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import type { CmsImage, CmsLink } from "@/lib/sanity/fetchers/get-home-page";
import { NOT_FOUND_PAGE_QUERY } from "@/lib/sanity/queries/not-found-page";

const REVALIDATE_SECONDS = 60;

export type NotFoundPageData = {
  language: string | null;
  seo: {
    title: string | null;
    description: string | null;
    ogImage: CmsImage;
  } | null;
  headline: string | null;
  primaryCta: CmsLink;
};

function assertLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return locale;
}

/**
 * Fetches localized notFoundPage with EN document fallback.
 * Returns `null` when neither `$locale` nor `en` documents exist.
 * Does not call `notFound()` — the 404 UI must always render (use a fallback).
 */
export async function getNotFoundPage(
  locale: Locale,
): Promise<NotFoundPageData | null> {
  const safeLocale = assertLocale(locale);

  return client.fetch<NotFoundPageData | null>(
    NOT_FOUND_PAGE_QUERY,
    { locale: safeLocale },
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
}
