import { Locale } from "@/lib/i18n/config";
import {
  SiteSettingsNavItem,
  SiteSettingsSocialLink,
} from "@/lib/sanity/fetchers/get-site-settings";

export type HeaderProps = {
  locale: Locale;
  brandName: string | null;
  navItems: SiteSettingsNavItem[] | null;
  socialLinks: SiteSettingsSocialLink[] | null;
  statusLabel: string | null;
};

export type ResolvedNavItem = {
  label: string;
  href: string;
  rawHref: string;
};

export type ResolvedSocialLink = {
  label: string;
  href: string;
  network: string;
};

export type HeaderShellProps = {
  locale: Locale;
  brandName: string;
  homeHref: string;
  navItems: ResolvedNavItem[];
  socialLinks: ResolvedSocialLink[];
  statusLabel: string;
};
