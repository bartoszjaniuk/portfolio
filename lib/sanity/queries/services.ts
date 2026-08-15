import { defineQuery } from "next-sanity";

/** All services ordered for footer + homepage ItemList. */
export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(sortOrder asc) {
    slug,
    sortOrder,
    "title": coalesce(
      title[language == $locale][0].value,
      title[language == "en"][0].value
    ),
    "seoTitle": coalesce(
      seoTitle[language == $locale][0].value,
      seoTitle[language == "en"][0].value
    ),
    "seoDescription": coalesce(
      seoDescription[language == $locale][0].value,
      seoDescription[language == "en"][0].value
    ),
    "intro": coalesce(
      intro[language == $locale][0].value,
      intro[language == "en"][0].value
    )
  }
`);

/** Single service by shared EN/PL slug. */
export const SERVICE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug == $slug][0] {
    slug,
    sortOrder,
    "title": coalesce(
      title[language == $locale][0].value,
      title[language == "en"][0].value
    ),
    "seoTitle": coalesce(
      seoTitle[language == $locale][0].value,
      seoTitle[language == "en"][0].value
    ),
    "seoDescription": coalesce(
      seoDescription[language == $locale][0].value,
      seoDescription[language == "en"][0].value
    ),
    "intro": coalesce(
      intro[language == $locale][0].value,
      intro[language == "en"][0].value
    )
  }
`);

/** Slugs + update timestamps — used by generateStaticParams / sitemap. */
export const SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(slug)] | order(sortOrder asc) {
    "slug": slug,
    _updatedAt
  }
`);
