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
      name: 'gotIdea',
      title: 'Got Idea',
      type: 'object',
      fields: [
        defineField({
          name: 'line1',
          title: 'Line 1',
          type: 'string',
        }),
        defineField({
          name: 'line2',
          title: 'Line 2',
          type: 'string',
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
