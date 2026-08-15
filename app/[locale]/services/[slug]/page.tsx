import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceDocumentPage } from "@/components/services/ServiceDocumentPage";
import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import {
  getServiceBySlug,
  getServiceSlugs,
} from "@/lib/sanity/fetchers/get-services";
import { siteBaseUrl } from "@/lib/site-url";
import { generateServiceStructuredData } from "@/lib/structured-data";

const BACK_HOME_LABEL: Record<Locale, string> = {
  en: "Back to home",
  pl: "Wróć na stronę główną",
};

const CONTACT_CTA_LABEL: Record<Locale, string> = {
  en: "Contact me about this service →",
  pl: "Skontaktuj się w sprawie tej usługi →",
};

function servicePath(locale: Locale, slug: string): string {
  return `/${locale}/services/${slug}`;
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();

  return locales.flatMap((locale) =>
    slugs.map(({ slug }) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale)) {
    return {};
  }
  const locale = rawLocale;

  const slug = rawSlug?.trim();
  if (!slug) {
    return {};
  }

  const service = await getServiceBySlug(locale, slug);
  if (!service?.title) {
    return {};
  }

  const baseUrl = siteBaseUrl();
  const title = service.seoTitle?.trim() || service.title;
  const description = service.seoDescription?.trim() || undefined;
  const pageUrl = `${baseUrl}${servicePath(locale, slug)}`;

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}${servicePath(l, slug)}`]),
  ) as Record<Locale | "x-default", string>;
  languages["x-default"] = `${baseUrl}${servicePath(defaultLocale, slug)}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale;

  const slug = rawSlug?.trim();
  if (!slug) {
    notFound();
  }

  const service = await getServiceBySlug(locale, slug);
  if (!service?.title?.trim()) {
    notFound();
  }

  const baseUrl = siteBaseUrl();
  const pageUrl = `${baseUrl}${servicePath(locale, slug)}`;
  const description =
    service.seoDescription?.trim() || service.intro?.trim() || undefined;

  const serviceStructuredData = generateServiceStructuredData({
    name: service.title,
    description,
    url: pageUrl,
  });

  return (
    <>
      <JsonLd data={serviceStructuredData} />
      <ServiceDocumentPage
        locale={locale}
        title={service.title}
        intro={service.intro}
        contactCtaLabel={CONTACT_CTA_LABEL[locale]}
        backHomeLabel={BACK_HOME_LABEL[locale]}
      />
    </>
  );
}
