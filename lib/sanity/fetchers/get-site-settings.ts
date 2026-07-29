import { isLocale, type Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries/site-settings";
import type { CmsImage } from "@/lib/sanity/fetchers/get-home-page";

const REVALIDATE_SECONDS = 60;

export type SiteSettingsNavItem = {
  href: string;
  label: string | null;
};

export type SiteSettingsSocialLink = {
  network: string;
  href: string;
  label: string;
};

export type SiteSettingsData = {
  brandName: string | null;
  navItems: SiteSettingsNavItem[] | null;
  socialLinks: SiteSettingsSocialLink[] | null;
  statusLabel: string | null;
  person: {
    name: string | null;
    url: string | null;
    image: CmsImage;
    sameAs: string[] | null;
    jobTitle: string | null;
    worksFor: string | null;
  } | null;
  websiteDescription: string | null;
};

function assertLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return locale;
}

/**
 * Fetches the `siteSettings` singleton with field-level locale coalesce to EN.
 * Returns `null` when the singleton is missing.
 */
export async function getSiteSettings(
  locale: Locale,
): Promise<SiteSettingsData | null> {
  const safeLocale = assertLocale(locale);

  return client.fetch<SiteSettingsData | null>(
    SITE_SETTINGS_QUERY,
    { locale: safeLocale },
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
}
