import {
  DEFAULT_BRAND_NAME,
  resolveNavItems,
  resolveSocialLinks,
} from "@/components/layout/Header/Header.utils";
import { localizeHref } from "@/lib/i18n/config";
import { getServices } from "@/lib/sanity/fetchers/get-services";
import { getSiteSettings } from "@/lib/sanity/fetchers/get-site-settings";

import { FooterBrandColumn } from "./components/FooterBrandColumn";
import { FooterLinkList } from "./components/FooterLinkList";
import type { FooterProps } from "./Footer.types";
import { resolveCopyrightName } from "./Footer.utils";

const DEFAULT_MENU_HEADING = "Menu";
const DEFAULT_SOCIAL_MEDIA_HEADING = "Social Media";
const DEFAULT_SERVICES_HEADING = "Services";
const DEFAULT_LEGAL_HEADING = "Legal";
const DEFAULT_COPYRIGHT_SUFFIX = "All rights reserved.";
const DEFAULT_COPYRIGHT_NAME = "Bartosz Janiuk";

function UpperFooter({
  brandName,
  description,
  menuHeading,
  menuLinks,
  socialMediaHeading,
  socialLinks,
  servicesHeading,
  servicesLinks,
  legalHeading,
  legalLinks,
}: {
  brandName: string;
  description: string | null;
  menuHeading: string;
  menuLinks: { label: string; href: string }[];
  socialMediaHeading: string;
  socialLinks: { label: string; href: string }[];
  servicesHeading: string;
  servicesLinks: { label: string; href: string }[];
  legalHeading: string;
  legalLinks: { label: string; href: string }[];
}) {
  return (
    <div className="bg-primary-surface text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-17.5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <FooterBrandColumn
            brandName={brandName}
            description={description}
            className="sm:col-span-2 lg:col-span-1"
          />
          <FooterLinkList heading={menuHeading} links={menuLinks} />
          <FooterLinkList heading={socialMediaHeading} links={socialLinks} />
          <FooterLinkList heading={servicesHeading} links={servicesLinks} />
          <FooterLinkList heading={legalHeading} links={legalLinks} />
        </div>
      </div>
    </div>
  );
}

function LowerFooter({
  copyrightName,
  copyrightSuffix,
}: {
  copyrightName: string;
  copyrightSuffix: string;
}) {
  return (
    <div className="bg-background">
      <div className="text-primary flex flex-col items-center gap-2 px-4 py-4 text-center text-sm sm:flex-row sm:justify-center sm:gap-4">
        <p>
          &copy; {new Date().getFullYear()} {copyrightName}. {copyrightSuffix}
        </p>
      </div>
    </div>
  );
}

export async function Footer({ locale }: FooterProps) {
  const [settings, services] = await Promise.all([
    getSiteSettings(locale),
    getServices(locale),
  ]);

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

  const servicesLinks = services.flatMap((service) => {
    const label = service.title?.trim();
    const slug = service.slug?.trim();
    if (!label || !slug) return [];
    return [{ label, href: localizeHref(locale, `/services/${slug}`) }];
  });

  const legalLinks = (settings?.footerLegalItems ?? []).flatMap((item) => {
    const label = item.label?.trim();
    const href = item.href?.trim();
    if (!label || !href) return [];
    return [{ label, href: localizeHref(locale, href) }];
  });

  const brandName = settings?.brandName?.trim() || DEFAULT_BRAND_NAME;

  const copyrightName = resolveCopyrightName(
    settings?.person?.name,
    DEFAULT_COPYRIGHT_NAME,
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
        servicesHeading={
          settings?.footerServicesHeading ?? DEFAULT_SERVICES_HEADING
        }
        servicesLinks={servicesLinks}
        legalHeading={settings?.footerLegalHeading ?? DEFAULT_LEGAL_HEADING}
        legalLinks={legalLinks}
      />
      <LowerFooter
        copyrightName={copyrightName}
        copyrightSuffix={
          settings?.footerCopyrightSuffix ?? DEFAULT_COPYRIGHT_SUFFIX
        }
      />
    </footer>
  );
}
