import type { SanityImageSource } from "@sanity/image-url";

import { JsonLd } from "@/components/seo/JsonLd";
import type { SiteSettingsData } from "@/lib/sanity/fetchers/get-site-settings";
import { urlFor } from "@/lib/sanity/image";
import { siteBaseUrl } from "@/lib/site-url";
import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/structured-data";

export type HomeJsonLdProps = {
  siteSettings: SiteSettingsData;
};

export function HomeJsonLd({ siteSettings }: HomeJsonLdProps) {
  const baseUrl = siteBaseUrl();

  const personImage = siteSettings.person?.image?.asset
    ? urlFor(siteSettings.person.image as SanityImageSource).url()
    : undefined;

  const websiteStructuredData = generateWebsiteStructuredData(baseUrl, {
    name: siteSettings.brandName,
    description: siteSettings.websiteDescription,
    authorName: siteSettings.person?.name,
    authorUrl: siteSettings.person?.url,
  });

  const personStructuredData = generatePersonStructuredData({
    name: siteSettings.person?.name,
    url: siteSettings.person?.url,
    image: personImage,
    sameAs: siteSettings.person?.sameAs,
    jobTitle: siteSettings.person?.jobTitle,
    worksFor: siteSettings.person?.worksFor,
  });

  return (
    <>
      <JsonLd data={websiteStructuredData} />
      <JsonLd data={personStructuredData} />
    </>
  );
}
