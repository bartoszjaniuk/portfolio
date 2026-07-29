import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'network',
      title: 'Network',
      type: 'string',
      options: {
        list: [
          {title: 'GitHub', value: 'github'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'X / Twitter', value: 'x'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'network'},
  },
})
