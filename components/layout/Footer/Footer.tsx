import {
  DEFAULT_BRAND_NAME,
  resolveNavItems,
  resolveSocialLinks,
} from "@/components/layout/Header/Header.utils";
import { localizeHref } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/sanity/fetchers/get-site-settings";

import { FooterLinkList } from "./components/FooterLinkList";
import type { FooterProps } from "./Footer.types";
import { resolveCopyrightName, splitNavItems } from "./Footer.utils";

const DEFAULT_INNER_PAGES_HEADING = "Inner Pages";
const DEFAULT_SOCIAL_MEDIA_HEADING = "Social Media";
const DEFAULT_COPYRIGHT_SUFFIX = "All rights reserved.";

function UpperFooter({
  description,
  navCol1,
  navCol2,
  socialLinks,
  innerPagesHeading,
  socialMediaHeading,
}: {
  description: string | null;
  navCol1: { label: string; href: string }[];
  navCol2: { label: string; href: string }[];
  socialLinks: { label: string; href: string }[];
  innerPagesHeading: string;
  socialMediaHeading: string;
}) {
  return (
    <div className="bg-primary-surface text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-17.5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {description ? (
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {description}
            </p>
          ) : null}

          <FooterLinkList heading={innerPagesHeading} links={navCol1} />
          <FooterLinkList heading={innerPagesHeading} links={navCol2} />
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

  const navItems = resolveNavItems(settings?.navItems ?? null).map((item) => ({
    label: item.label,
    href: localizeHref(locale, item.href),
  }));
  const [navCol1, navCol2] = splitNavItems(navItems);

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
        description={settings?.websiteDescription ?? null}
        navCol1={navCol1}
        navCol2={navCol2}
        socialLinks={socialLinks}
        innerPagesHeading={
          settings?.footerInnerPagesHeading ?? DEFAULT_INNER_PAGES_HEADING
        }
        socialMediaHeading={
          settings?.footerSocialMediaHeading ?? DEFAULT_SOCIAL_MEDIA_HEADING
        }
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
