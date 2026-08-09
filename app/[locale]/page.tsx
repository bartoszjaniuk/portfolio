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
import { locales, resolveLocaleParam, type Locale } from "@/lib/i18n/config";
import { getHomePage } from "@/lib/sanity/fetchers/get-home-page";
import { getSiteSettings } from "@/lib/sanity/fetchers/get-site-settings";
import { siteBaseUrl } from "@/lib/site-url";

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

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}/${l}`]),
  ) as Record<Locale, string>;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
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

  const [homePage, siteSettings] = await Promise.all([
    getHomePage(locale),
    getSiteSettings(locale),
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

  return (
    <>
      <HomeJsonLd siteSettings={siteSettings} />
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
          {about ? <AboutMeSection about={about} /> : null}
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
