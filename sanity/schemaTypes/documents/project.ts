import {ProjectsIcon} from '@sanity/icons/Projects'
import {defineField, defineType} from 'sanity'

import {uniqueKeyAmongType} from '../../lib/unique-key'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Stable identifier (e.g. fitap, umami)',
      validation: (rule) => rule.required().custom(uniqueKeyAmongType('project')),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
    }),
    defineField({
      name: 'tint',
      title: 'Tint',
      type: 'string',
      description: 'Tailwind token (e.g. bg-secondary)',
    }),
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'string',
      description: 'Desktop placement classes',
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
    select: {title: 'key', media: 'image', sortOrder: 'sortOrder'},
    prepare({title, media, sortOrder}) {
      return {
        title: title || 'Untitled project',
        subtitle: typeof sortOrder === 'number' ? `Order: ${sortOrder}` : undefined,
        media,
      }
    },
  },
})
