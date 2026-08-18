export type WebsiteStructuredDataFields = {
  name?: string | null;
  description?: string | null;
  authorName?: string | null;
  authorUrl?: string | null;
};

export type PersonStructuredDataFields = {
  name?: string | null;
  url?: string | null;
  image?: string | null;
  sameAs?: string[] | null;
  jobTitle?: string | null;
  worksFor?: string | null;
};

export type FaqStructuredDataItem = {
  question: string;
  answer: string;
};

const DEFAULT_PERSON_NAME = "Bartosz Janiuk";
const DEFAULT_WEBSITE_DESCRIPTION =
  "Digital workshop where idea meets product. Mobile and web applications for your business.";
const DEFAULT_AUTHOR_URL = "https://github.com/bartoszjaniuk";
const DEFAULT_PERSON_URL = "https://bjaniuk.com";
const DEFAULT_PERSON_IMAGE = "https://bjaniuk.com/developer.webp";
const DEFAULT_SAME_AS = [
  "https://github.com/bartoszjaniuk",
  "https://twitter.com/bartoszjaniuk",
  "https://linkedin.com/in/bartoszjaniuk",
];
const DEFAULT_JOB_TITLE = "Software Engineer";
const DEFAULT_WORKS_FOR = "Freelance";

/**
 * Builds WebSite JSON-LD. Pass CMS fields from `siteSettings` when available;
 * omitted/null fields fall back to the previous hardcoded defaults.
 */
export function generateWebsiteStructuredData(
  url: string,
  fields?: WebsiteStructuredDataFields,
) {
  const name = fields?.name ?? DEFAULT_PERSON_NAME;
  const description = fields?.description ?? DEFAULT_WEBSITE_DESCRIPTION;
  const authorName = fields?.authorName ?? DEFAULT_PERSON_NAME;
  const authorUrl = fields?.authorUrl ?? DEFAULT_AUTHOR_URL;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
  };
}

/**
 * Builds Person JSON-LD. Pass CMS fields from `siteSettings.person` when available;
 * omitted/null fields fall back to the previous hardcoded defaults.
 * Resolve Sanity image assets to absolute URLs before passing `image`.
 */
export function generatePersonStructuredData(
  fields?: PersonStructuredDataFields,
) {
  const name = fields?.name ?? DEFAULT_PERSON_NAME;
  const worksForName = fields?.worksFor ?? DEFAULT_WORKS_FOR;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: fields?.url ?? DEFAULT_PERSON_URL,
    image: fields?.image ?? DEFAULT_PERSON_IMAGE,
    sameAs: fields?.sameAs?.length ? fields.sameAs : DEFAULT_SAME_AS,
    jobTitle: fields?.jobTitle ?? DEFAULT_JOB_TITLE,
    worksFor: {
      "@type": "Organization",
      name: worksForName,
    },
  };
}

type AreaServedStructuredData = string | string[] | null | undefined;

function normalizeAreaServed(areaServed: AreaServedStructuredData) {
  if (Array.isArray(areaServed)) {
    const values = areaServed.map((value) => value.trim()).filter(Boolean);
    if (values.length === 0) return DEFAULT_AREA_SERVED;
    return values.length === 1 ? values[0] : values;
  }

  return areaServed?.trim() || DEFAULT_AREA_SERVED;
}

/**
 * Builds FAQPage JSON-LD from question/answer pairs (e.g. CMS FAQ items).
 * Callers should pass only items with non-empty question and answer.
 */
export function generateFaqPageStructuredData(items: FaqStructuredDataItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type ServiceStructuredDataFields = {
  name: string;
  description?: string | null;
  url: string;
  providerName?: string | null;
  /** Geographic area served (e.g. "Poland"). Defaults to Poland. */
  areaServed?: AreaServedStructuredData;
};

const DEFAULT_AREA_SERVED = "Poland";

/**
 * Builds ProfessionalService JSON-LD for a thin service landing page.
 */
export function generateServiceStructuredData(
  fields: ServiceStructuredDataFields,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: fields.name,
    ...(fields.description ? { description: fields.description } : {}),
    url: fields.url,
    areaServed: normalizeAreaServed(fields.areaServed),
    provider: {
      "@type": "Person",
      name: fields.providerName ?? DEFAULT_PERSON_NAME,
    },
  };
}

export type BreadcrumbStructuredDataItem = {
  name: string;
  url: string;
};

/**
 * Builds BreadcrumbList JSON-LD for SERP breadcrumb trails.
 */
export function generateBreadcrumbStructuredData(
  items: BreadcrumbStructuredDataItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type ServiceListStructuredDataItem = {
  name: string;
  url: string;
  description?: string | null;
};

/**
 * Builds ItemList JSON-LD of offered services (homepage catalog).
 */
export function generateServiceItemListStructuredData(
  items: ServiceListStructuredDataItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}
