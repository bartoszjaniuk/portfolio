import {
  SiteSettingsNavItem,
  SiteSettingsSocialLink,
} from "@/lib/sanity/fetchers/get-site-settings";
import { isExternalHref, type Locale } from "@/lib/i18n/config";
import { ResolvedSocialLink } from "./Header.types";

export const DEFAULT_BRAND_NAME = "bjaniuk.dev";
export const DEFAULT_STATUS_LABEL = "open to work";

export type RawNavItem = {
  label: string;
  href: string;
};

export function resolveNavItems(
  navItems: SiteSettingsNavItem[] | null,
): RawNavItem[] {
  if (!navItems?.length) return [];
  return navItems.flatMap((item) => {
    const label = item.label?.trim();
    const href = item.href?.trim();
    if (!label || !href) return [];
    return [{ label, href }];
  });
}

export function resolveSocialLinks(
  socialLinks: SiteSettingsSocialLink[] | null,
): ResolvedSocialLink[] {
  if (!socialLinks?.length) return [];
  return socialLinks.flatMap((link) => {
    const label = link.label?.trim();
    const href = link.href?.trim();
    if (!label || !href) return [];
    return [{ label, href, network: link.network }];
  });
}

export function isNavItemActive(
  pathname: string,
  locale: Locale,
  rawHref: string,
): boolean {
  if (rawHref === "/") {
    return pathname === `/${locale}` || pathname === `/${locale}/`;
  }
  if (isExternalHref(rawHref) || rawHref.startsWith("#")) {
    return false;
  }
  const localizedPrefix = `/${locale}${rawHref.startsWith("/") ? rawHref : `/${rawHref}`}`;
  return (
    pathname === localizedPrefix || pathname.startsWith(`${localizedPrefix}/`)
  );
}
