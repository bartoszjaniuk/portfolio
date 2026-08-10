import { defineQuery } from "next-sanity";

/**
 * Document-level fallback: prefer `$locale`, then English.
 */
const notFoundPageFields = /* groq */ `{
  language,
  seo {
    title,
    description,
    ogImage
  },
  headline,
  primaryCta { href, label }
}`;

export const NOT_FOUND_PAGE_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_type == "notFoundPage" && language == $locale][0]${notFoundPageFields},
    *[_type == "notFoundPage" && language == "en"][0]${notFoundPageFields}
  )
`);
