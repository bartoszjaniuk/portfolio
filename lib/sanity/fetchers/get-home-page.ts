import { isLocale, type Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries/home-page";

const REVALIDATE_SECONDS = 60;

/** Minimal Sanity image object — pass to `urlFor` in UI tasks. */
export type CmsImage = {
  asset?: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  } | null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null;
} | null;

export type CmsLink = {
  href: string;
  label: string;
} | null;

export type HeadlineSegment = {
  text: string;
  accent?: boolean | null;
  newLine?: boolean | null;
};

export type ThemedLogo = {
  light: CmsImage;
  dark: CmsImage;
  alt: string;
  width: number;
  height: number;
  layout?: "wordmark" | "mark" | string | null;
  scale?: number | null;
} | null;

export type HomePageProject = {
  key: string;
  title: string | null;
  category: string | null;
  image: CmsImage;
  href: string | null;
  tint: string | null;
  placement: string | null;
};

export type HomePageExperience = {
  key: string;
  company: string | null;
  companyFull: string | null;
  companyUrl: string | null;
  role: string | null;
  range: string | null;
  bullets: string[] | null;
};

export type HomePageTechItem = {
  key: string;
  name: string | null;
  logo: ThemedLogo;
  secondaryLogo: ThemedLogo;
  description: string | null;
  tags: string[] | null;
  testimonialQuote: string | null;
  testimonialAuthor: string | null;
  testimonialRole: string | null;
  testimonialAvatar: CmsImage;
  ctaDescription: string | null;
  ctaLabel: string | null;
  ctaLogo: ThemedLogo;
  ctaHref: string | null;
};

export type HomePageData = {
  language: string | null;
  seo: {
    title: string | null;
    description: string | null;
    ogImage: CmsImage;
  } | null;
  intro: {
    tagline: string | null;
    headline: string | null;
    roles: string[] | null;
    descriptionBefore: string | null;
    descriptionAfter: string | null;
    employer: CmsLink;
    primaryCta: CmsLink;
  } | null;
  about: {
    eyebrow: string | null;
    headline: HeadlineSegment[] | null;
    badgeText: string | null;
    paragraphs: string[] | null;
    portraitImage: CmsImage;
    wideImage: CmsImage;
  } | null;
  projectsSection: {
    eyebrow: string | null;
    headline: HeadlineSegment[] | null;
    description: string | null;
    seeAll: CmsLink;
    items: HomePageProject[] | null;
  } | null;
  experienceSection: {
    eyebrow: string | null;
    headline: HeadlineSegment[] | null;
    items: HomePageExperience[] | null;
  } | null;
  techStackSection: {
    eyebrow: string | null;
    headline: HeadlineSegment[] | null;
    items: HomePageTechItem[] | null;
  } | null;
  gotIdea: {
    line1: string | null;
    line2: string | null;
  } | null;
};

function assertLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return locale;
}

/**
 * Fetches localized homePage with EN document fallback.
 * Returns `null` when neither `$locale` nor `en` documents exist.
 * Does not call `notFound()` — that belongs to the page layer (Task 4.4).
 */
export async function getHomePage(
  locale: Locale,
): Promise<HomePageData | null> {
  const safeLocale = assertLocale(locale);

  return client.fetch<HomePageData | null>(
    HOME_PAGE_QUERY,
    { locale: safeLocale },
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
}
