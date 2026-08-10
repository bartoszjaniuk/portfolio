import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n/config";
import { getNotFoundPage } from "@/lib/sanity/fetchers/get-not-found-page";

const FALLBACK_TITLE = "Page not found";
const FALLBACK_DESCRIPTION =
  "The page you are looking for does not exist or has been moved.";

/**
 * Builds document metadata for 404 surfaces from Sanity SEO fields.
 * Falls back to English defaults when CMS is empty.
 */
export async function getNotFoundMetadata(locale: Locale): Promise<Metadata> {
  const data = await getNotFoundPage(locale);

  return {
    title: data?.seo?.title?.trim() || FALLBACK_TITLE,
    description: data?.seo?.description?.trim() || FALLBACK_DESCRIPTION,
  };
}
