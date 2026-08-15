import {BoltIcon} from '@sanity/icons/Bolt'
import {defineField, defineType} from 'sanity'

import {uniqueFieldAmongType} from '../../lib/unique-key'

/** Field-level i18n document — one doc per service, shared EN/PL slug. */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'URL segment shared by EN and PL (e.g. websites)',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: 'slug',
            invert: false,
          })
          .error('Use lowercase letters, numbers, and hyphens only')
          .custom(uniqueFieldAmongType('service', 'slug', 'Slug must be unique')),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required().min(1).error('Add at least one language title'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'internationalizedArrayString',
      description: 'Overrides the document title in <title> / Open Graph',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'internationalizedArrayText',
      description: 'Short paragraph shown on the thin service landing page',
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
    select: {title: 'slug', sortOrder: 'sortOrder'},
    prepare({title, sortOrder}) {
      return {
        title: title || 'Untitled service',
        subtitle: typeof sortOrder === 'number' ? `Order: ${sortOrder}` : undefined,
      }
    },
  },
})
