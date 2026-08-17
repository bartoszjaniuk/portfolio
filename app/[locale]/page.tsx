import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header/Header";
import { AboutMeSection } from "@/features/Homepage/AboutMeSection";
import { ExperienceSection } from "@/features/Homepage/ExperienceSection";
import { ContactMeSection } from "@/features/Homepage/ContactMe/ContactMe";
import { FaqSection } from "@/features/Homepage/Faq/FaqSection";
import { HomeJsonLd } from "@/features/Homepage/HomeJsonLd";
import { Introduction } from "@/features/Homepage/Introduction";
import { ListedProjectsSection } from "@/features/Homepage/ListedProjectsSection";
import { TechStackSection } from "@/features/Homepage/TechStackSection";
import { cmsImageUrl } from "@/features/Homepage/utils/cms-media";
import {
  defaultLocale,
  locales,
  resolveLocaleParam,
  type Locale,
} from "@/lib/i18n/config";
import { getHomePage } from "@/lib/sanity/fetchers/get-home-page";
import { getServices } from "@/lib/sanity/fetchers/get-services";
import { getSiteSettings } from "@/lib/sanity/fetchers/get-site-settings";
import { siteBaseUrl } from "@/lib/site-url";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  if (!locale) {
    return {};
  }

  const baseUrl = siteBaseUrl();
  const homePage = await getHomePage(locale);

  const title = homePage?.seo?.title ?? undefined;
  const description = homePage?.seo?.description ?? undefined;
  const pageUrl = `${baseUrl}/${locale}`;

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}/${l}`]),
  ) as Record<Locale | "x-default", string>;
  languages["x-default"] = `${baseUrl}/${defaultLocale}`;

  const ogImageUrl = cmsImageUrl(homePage?.seo?.ogImage ?? null, {
    width: 1200,
    height: 630,
  });

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      url: pageUrl,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      title: title ?? undefined,
      description: description ?? undefined,
    },
  };
}

/**
 * Missing data policy (Task 4.4):
 * - homePage null → notFound() (no hardcoded module fallback)
 * - siteSettings null → notFound() (seed guarantees singleton; avoid broken Header)
 * - section null → skip that section only (no silent hardcoded fallback; rest of page renders)
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocaleParam(params);
  if (!locale) {
    notFound();
  }

  const [homePage, siteSettings, services] = await Promise.all([
    getHomePage(locale),
    getSiteSettings(locale),
    getServices(locale),
  ]);

  if (!homePage || !siteSettings) {
    notFound();
  }

  const {
    intro,
    about,
    projectsSection,
    experienceSection,
    techStackSection,
    faqSection,
    gotIdea,
  } = homePage;

  const faqItems = (faqSection?.items ?? [])
    .filter((item): item is { question: string; answer: string } =>
      Boolean(item?.question && item?.answer),
    )
    .map((item) => ({
      question: item.question,
      answer: item.answer,
    }));

  const baseUrl = siteBaseUrl();
  const serviceListItems = services.flatMap((service) => {
    const name = service.title?.trim();
    const slug = service.slug?.trim();
    if (!name || !slug) return [];
    return [
      {
        name,
        url: `${baseUrl}/${locale}/services/${slug}`,
        description: service.seoDescription?.trim() || service.intro?.trim() || null,
      },
    ];
  });

  return (
    <>
      <HomeJsonLd
        siteSettings={siteSettings}
        faqItems={faqItems}
        services={serviceListItems}
      />
      <main className="scanlines relative min-h-screen">
        <div className="relative z-10">
          <Header
            locale={locale}
            brandName={siteSettings.brandName}
            navItems={siteSettings.navItems}
            socialLinks={siteSettings.socialLinks}
            statusLabel={siteSettings.statusLabel}
          />
          {intro ? <Introduction locale={locale} intro={intro} /> : null}
          {about ? (
            <AboutMeSection
              about={about}
              personName={siteSettings.person?.name}
            />
          ) : null}
          {projectsSection ? (
            <ListedProjectsSection
              locale={locale}
              projectsSection={projectsSection}
            />
          ) : null}
          {experienceSection ? (
            <ExperienceSection experienceSection={experienceSection} />
          ) : null}
          {techStackSection ? (
            <TechStackSection techStackSection={techStackSection} />
          ) : null}
          {faqSection ? <FaqSection faqSection={faqSection} /> : null}
          {gotIdea ? (
            <ContactMeSection locale={locale} gotIdea={gotIdea} />
          ) : null}
        </div>
      </main>
    </>
  );
}
