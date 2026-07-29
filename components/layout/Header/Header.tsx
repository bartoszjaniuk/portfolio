import { localePath, localizeHref } from "@/lib/i18n/config";
import { HeaderShell } from "./components/HeaderShell";
import { HeaderProps } from "./Header.types";
import {
  DEFAULT_BRAND_NAME,
  DEFAULT_STATUS_LABEL,
  resolveNavItems,
  resolveSocialLinks,
} from "./Header.utils";

export function Header({
  locale,
  brandName,
  navItems,
  socialLinks,
  statusLabel,
}: HeaderProps) {
  const homeHref = localePath(locale, "/");
  const resolvedBrandName = brandName?.trim() || DEFAULT_BRAND_NAME;
  const resolvedNavItems = resolveNavItems(navItems).map((item) => ({
    label: item.label,
    href: localizeHref(locale, item.href),
    rawHref: item.href,
  }));
  const resolvedSocialLinks = resolveSocialLinks(socialLinks);
  const onlineStatusLabel = statusLabel?.trim() || DEFAULT_STATUS_LABEL;

  return (
    <HeaderShell
      locale={locale}
      brandName={resolvedBrandName}
      homeHref={homeHref}
      navItems={resolvedNavItems}
      socialLinks={resolvedSocialLinks}
      statusLabel={onlineStatusLabel}
    />
  );
}
