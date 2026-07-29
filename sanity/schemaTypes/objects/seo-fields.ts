import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Overrides the page title if provided',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Image for social sharing (1200×630 recommended)',
    }),
  ],
})
