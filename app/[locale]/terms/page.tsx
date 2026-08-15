import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { getLegalContent, legalPagePath } from "@/lib/content/privacy";
import {
  defaultLocale,
  locales,
  resolveLocaleParam,
  type Locale,
} from "@/lib/i18n/config";
import { siteBaseUrl } from "@/lib/site-url";

const pageKey = "terms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  if (!locale) {
    return {};
  }

  const content = getLegalContent(locale, pageKey);
  const baseUrl = siteBaseUrl();
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}${legalPagePath(l, pageKey)}`]),
  ) as Record<Locale | "x-default", string>;
  languages["x-default"] = `${baseUrl}${legalPagePath(defaultLocale, pageKey)}`;

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `${baseUrl}${legalPagePath(locale, pageKey)}`,
      languages,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocaleParam(params);
  if (!locale) {
    notFound();
  }

  return (
    <LegalDocumentPage
      content={getLegalContent(locale, pageKey)}
      locale={locale}
    />
  );
}
