import { defineQuery } from "next-sanity";

/** Singleton id matches Studio structure + seed (`siteSettings`). */
export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    brandName,
    navItems[]{
      href,
      "label": coalesce(
        label[language == $locale][0].value,
        label[language == "en"][0].value
      )
    },
    socialLinks[]{
      network,
      href,
      label
    },
    "statusLabel": coalesce(
      statusLabel[language == $locale][0].value,
      statusLabel[language == "en"][0].value
    ),
    person {
      name,
      url,
      image,
      sameAs,
      "jobTitle": coalesce(
        jobTitle[language == $locale][0].value,
        jobTitle[language == "en"][0].value
      ),
      worksFor
    },
    "websiteDescription": coalesce(
      websiteDescription[language == $locale][0].value,
      websiteDescription[language == "en"][0].value
    ),
    "footerInnerPagesHeading": coalesce(
      footerInnerPagesHeading[language == $locale][0].value,
      footerInnerPagesHeading[language == "en"][0].value
    ),
    "footerSocialMediaHeading": coalesce(
      footerSocialMediaHeading[language == $locale][0].value,
      footerSocialMediaHeading[language == "en"][0].value
    ),
    "footerCopyrightSuffix": coalesce(
      footerCopyrightSuffix[language == $locale][0].value,
      footerCopyrightSuffix[language == "en"][0].value
    )
  }
`);
