import { defineQuery } from "next-sanity";

/**
 * Field-level i18n (internationalized-array v5+) uses `language`, not `_key`.
 * Document-level fallback: prefer `$locale`, then English.
 */
const homePageFields = /* groq */ `{
  language,
  seo {
    title,
    description,
    ogImage
  },
  intro {
    tagline,
    headline,
    roles,
    descriptionBefore,
    descriptionAfter,
    employer { href, label },
    primaryCta { href, label },
    scrollHint
  },
  about {
    eyebrow,
    headline[] { text, accent, newLine },
    badgeText,
    paragraphs,
    portraitImage,
    wideImage
  },
  projectsSection {
    eyebrow,
    headline[] { text, accent, newLine },
    description,
    seeAll { href, label },
    items[]->{
      key,
      image,
      href,
      tint,
      placement,
      "title": coalesce(
        title[language == $locale][0].value,
        title[language == "en"][0].value
      ),
      "category": coalesce(
        category[language == $locale][0].value,
        category[language == "en"][0].value
      )
    }
  },
  experienceSection {
    eyebrow,
    headline[] { text, accent, newLine },
    columnHeaders {
      company,
      role,
      year,
      description,
      ariaLabel
    },
    items[]->{
      key,
      company,
      companyUrl,
      range,
      "companyFull": coalesce(
        companyFull[language == $locale][0].value,
        companyFull[language == "en"][0].value
      ),
      "role": coalesce(
        role[language == $locale][0].value,
        role[language == "en"][0].value
      ),
      "bullets": coalesce(
        bullets[language == $locale][0].value,
        bullets[language == "en"][0].value
      )
    }
  },
  techStackSection {
    eyebrow,
    headline[] { text, accent, newLine },
    items[]->{
      key,
      name,
      logo {
        light,
        dark,
        alt,
        width,
        height,
        layout,
        scale
      },
      secondaryLogo {
        light,
        dark,
        alt,
        width,
        height,
        layout,
        scale
      },
      "description": coalesce(
        description[language == $locale][0].value,
        description[language == "en"][0].value
      ),
      "tags": coalesce(
        tags[language == $locale][0].value,
        tags[language == "en"][0].value
      ),
      "testimonialQuote": coalesce(
        testimonialQuote[language == $locale][0].value,
        testimonialQuote[language == "en"][0].value
      ),
      "testimonialAuthor": coalesce(
        testimonialAuthor[language == $locale][0].value,
        testimonialAuthor[language == "en"][0].value
      ),
      "testimonialRole": coalesce(
        testimonialRole[language == $locale][0].value,
        testimonialRole[language == "en"][0].value
      ),
      testimonialAvatar,
      "ctaDescription": coalesce(
        ctaDescription[language == $locale][0].value,
        ctaDescription[language == "en"][0].value
      ),
      "ctaLabel": coalesce(
        ctaLabel[language == $locale][0].value,
        ctaLabel[language == "en"][0].value
      ),
      ctaLogo {
        light,
        dark,
        alt,
        width,
        height,
        layout,
        scale
      },
      ctaHref
    }
  },
  faqSection {
    eyebrow,
    headline[] { text, accent, newLine },
    items[] {
      question,
      answer
    }
  },
  gotIdea {
    eyebrow,
    headline[] { text, accent, newLine },
    image,
    form {
      emailLabel,
      emailPlaceholder,
      subjectLabel,
      subjectPlaceholder,
      messageLabel,
      messagePlaceholder,
      submitLabel,
      submittingLabel,
      successTitle,
      successBody,
      sendAnotherLabel,
      errorFallback
    }
  }
}`;

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_type == "homePage" && language == $locale][0]${homePageFields},
    *[_type == "homePage" && language == "en"][0]${homePageFields}
  )
`);
