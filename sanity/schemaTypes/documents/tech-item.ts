import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {defineField, defineType} from 'sanity'

import {uniqueKeyAmongType} from '../../lib/unique-key'

export const techItem = defineType({
  name: 'techItem',
  title: 'Tech Item',
  type: 'document',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Stable identifier (e.g. nextjs, astro)',
      validation: (rule) => rule.required().custom(uniqueKeyAmongType('techItem')),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Optional display name when logo is mark-only',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'themedLogo',
    }),
    defineField({
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      type: 'themedLogo',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'internationalizedArrayBulletList',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Testimonial Author',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'testimonialRole',
      title: 'Testimonial Role',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'testimonialAvatar',
      title: 'Testimonial Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'ctaLogo',
      title: 'CTA Logo',
      type: 'themedLogo',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Href',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'key', media: 'logo.light'},
    prepare({title, subtitle, media}) {
      return {
        title: title || subtitle || 'Untitled tech item',
        subtitle: title && subtitle ? subtitle : undefined,
        media,
      }
    },
  },
})
