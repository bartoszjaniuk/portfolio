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

const DEFAULT_PERSON_NAME = "Bartosz Janiuk";
const DEFAULT_WEBSITE_DESCRIPTION =
  "Digital workshop where idea meets product. Mobile and web applications for your business.";
const DEFAULT_AUTHOR_URL = "https://github.com/bartoszjaniuk";
const DEFAULT_PERSON_URL = "https://bartoszjaniuk.pl";
const DEFAULT_PERSON_IMAGE = "https://bartoszjaniuk.pl/developer-portrait.png";
const DEFAULT_SAME_AS = [
  "https://github.com/bartoszjaniuk",
  "https://twitter.com/bartoszjaniuk",
  "https://linkedin.com/in/bartoszjaniuk",
];
const DEFAULT_JOB_TITLE = "Software Engineer";
const DEFAULT_WORKS_FOR = "Bartosz Janiuk";

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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
