import {
  DEFAULT_BRAND_NAME,
  resolveNavItems,
  resolveSocialLinks,
} from "@/components/layout/Header/Header.utils";
import { localizeHref } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/sanity/fetchers/get-site-settings";

import { FooterBrandColumn } from "./components/FooterBrandColumn";
import { FooterLinkList } from "./components/FooterLinkList";
import type { FooterProps } from "./Footer.types";
import { resolveCopyrightName } from "./Footer.utils";

const DEFAULT_MENU_HEADING = "Menu";
const DEFAULT_SOCIAL_MEDIA_HEADING = "Social Media";
const DEFAULT_COPYRIGHT_SUFFIX = "All rights reserved.";

function UpperFooter({
  brandName,
  description,
  menuHeading,
  menuLinks,
  socialMediaHeading,
  socialLinks,
}: {
  brandName: string;
  description: string | null;
  menuHeading: string;
  menuLinks: { label: string; href: string }[];
  socialMediaHeading: string;
  socialLinks: { label: string; href: string }[];
}) {
  return (
    <div className="bg-primary-surface text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-17.5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <FooterBrandColumn
            brandName={brandName}
            description={description}
            className="sm:col-span-2 lg:col-span-1"
          />
          <FooterLinkList heading={menuHeading} links={menuLinks} />
          <FooterLinkList heading={socialMediaHeading} links={socialLinks} />
        </div>
      </div>
    </div>
  );
}

function LowerFooter({
  brandName,
  copyrightSuffix,
}: {
  brandName: string;
  copyrightSuffix: string;
}) {
  return (
    <div className="bg-background">
      <p className="text-primary py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} {brandName}. {copyrightSuffix}
      </p>
    </div>
  );
}

export async function Footer({ locale }: FooterProps) {
  const settings = await getSiteSettings(locale);

  const menuLinks = resolveNavItems(settings?.navItems ?? null).map((item) => ({
    label: item.label,
    href: localizeHref(locale, item.href),
  }));

  const socialLinks = resolveSocialLinks(settings?.socialLinks ?? null).map(
    (link) => ({
      label: link.label,
      href: link.href,
    }),
  );

  const brandName = resolveCopyrightName(
    settings?.brandName,
    settings?.person?.name,
    DEFAULT_BRAND_NAME,
  );

  return (
    <footer>
      <UpperFooter
        brandName={brandName}
        description={settings?.websiteDescription ?? null}
        menuHeading={settings?.footerInnerPagesHeading ?? DEFAULT_MENU_HEADING}
        menuLinks={menuLinks}
        socialMediaHeading={
          settings?.footerSocialMediaHeading ?? DEFAULT_SOCIAL_MEDIA_HEADING
        }
        socialLinks={socialLinks}
      />
      <LowerFooter
        brandName={brandName}
        copyrightSuffix={
          settings?.footerCopyrightSuffix ?? DEFAULT_COPYRIGHT_SUFFIX
        }
      />
    </footer>
  );
}
