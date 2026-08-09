import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'roles',
          title: 'Roles',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
        defineField({
          name: 'descriptionBefore',
          title: 'Description Before',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'descriptionAfter',
          title: 'Description After',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'employer',
          title: 'Employer',
          type: 'link',
        }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'link',
        }),
        defineField({
          name: 'scrollHint',
          title: 'Scroll Hint',
          type: 'string',
          description: 'Label shown above the intro scroll indicator',
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [defineArrayMember({type: 'headlineSegment'})],
        }),
        defineField({
          name: 'badgeText',
          title: 'Badge Text',
          type: 'string',
        }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [defineArrayMember({type: 'text'})],
          validation: (rule) => rule.length(3),
        }),
        defineField({
          name: 'portraitImage',
          title: 'Portrait Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'wideImage',
          title: 'Wide Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'projectsSection',
      title: 'Projects Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [defineArrayMember({type: 'headlineSegment'})],
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'seeAll',
          title: 'See All',
          type: 'link',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
        }),
      ],
    }),
    defineField({
      name: 'experienceSection',
      title: 'Experience Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [defineArrayMember({type: 'headlineSegment'})],
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'experience'}]})],
        }),
        defineField({
          name: 'columnHeaders',
          title: 'Column Headers',
          type: 'object',
          fields: [
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Table Aria Label',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'techStackSection',
      title: 'Tech Stack Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [defineArrayMember({type: 'headlineSegment'})],
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'techItem'}]})],
        }),
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [defineArrayMember({type: 'headlineSegment'})],
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'faqItem',
              title: 'FAQ Item',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {title: 'question'},
                prepare({title}) {
                  return {title: title || 'Untitled question'}
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'gotIdea',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [defineArrayMember({type: 'headlineSegment'})],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'form',
          title: 'Form',
          type: 'object',
          fields: [
            defineField({
              name: 'emailLabel',
              title: 'Email Label',
              type: 'string',
            }),
            defineField({
              name: 'emailPlaceholder',
              title: 'Email Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'subjectLabel',
              title: 'Subject Label',
              type: 'string',
            }),
            defineField({
              name: 'subjectPlaceholder',
              title: 'Subject Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'messageLabel',
              title: 'Message Label',
              type: 'string',
            }),
            defineField({
              name: 'messagePlaceholder',
              title: 'Message Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'submitLabel',
              title: 'Submit Label',
              type: 'string',
            }),
            defineField({
              name: 'submittingLabel',
              title: 'Submitting Label',
              type: 'string',
            }),
            defineField({
              name: 'successTitle',
              title: 'Success Title',
              type: 'string',
            }),
            defineField({
              name: 'successBody',
              title: 'Success Body',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'sendAnotherLabel',
              title: 'Send Another Label',
              type: 'string',
            }),
            defineField({
              name: 'errorFallback',
              title: 'Error Fallback',
              type: 'string',
              description: 'Shown when the server action fails without a specific message',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: 'Home Page',
        subtitle: language?.toUpperCase() || 'No language',
      }
    },
  },
})
