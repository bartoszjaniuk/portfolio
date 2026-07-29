import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

import {uniqueKeyAmongType} from '../../lib/unique-key'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Stable identifier (e.g. tsh-mid)',
      validation: (rule) => rule.required().custom(uniqueKeyAmongType('experience')),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Short tab label',
    }),
    defineField({
      name: 'companyFull',
      title: 'Company Full',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'companyUrl',
      title: 'Company URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'range',
      title: 'Date Range',
      type: 'string',
    }),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'internationalizedArrayBulletList',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
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
    select: {title: 'company', subtitle: 'key', sortOrder: 'sortOrder'},
    prepare({title, subtitle, sortOrder}) {
      return {
        title: title || subtitle || 'Untitled experience',
        subtitle:
          [subtitle, typeof sortOrder === 'number' ? `Order: ${sortOrder}` : null]
            .filter(Boolean)
            .join(' · ') || undefined,
      }
    },
  },
})
