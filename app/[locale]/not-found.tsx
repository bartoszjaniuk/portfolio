import type { Metadata } from "next";

import { NotFoundView } from "@/features/NotFound/NotFoundView";
import { resolveLocaleFromHeaders } from "@/lib/i18n/resolve-locale-from-headers";
import { getNotFoundMetadata } from "@/lib/sanity/fetchers/get-not-found-metadata";
import { getNotFoundPage } from "@/lib/sanity/fetchers/get-not-found-page";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocaleFromHeaders();
  return getNotFoundMetadata(locale);
}

export default async function LocaleNotFound() {
  const locale = await resolveLocaleFromHeaders();
  const data = await getNotFoundPage(locale);

  return <NotFoundView locale={locale} data={data} />;
}
