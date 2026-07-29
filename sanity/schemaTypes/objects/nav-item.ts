import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required().min(1).error('Add at least one language label'),
    }),
  ],
  preview: {
    select: {subtitle: 'href'},
    prepare({subtitle}) {
      return {
        title: 'Nav item',
        subtitle,
      }
    },
  },
})
