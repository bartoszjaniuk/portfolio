import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const themedLogo = defineType({
  name: 'themedLogo',
  title: 'Themed Logo',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'light',
      title: 'Light Theme Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dark',
      title: 'Dark Theme Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Wordmark', value: 'wordmark'},
          {title: 'Mark', value: 'mark'},
        ],
        layout: 'radio',
      },
      initialValue: 'wordmark',
    }),
    defineField({
      name: 'scale',
      title: 'Scale',
      type: 'number',
      description: 'Optional visual scale compensation (e.g. 1.55)',
      validation: (rule) => rule.positive(),
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'light', layout: 'layout'},
    prepare({title, media, layout}) {
      return {
        title: title || 'Themed logo',
        subtitle: layout || undefined,
        media,
      }
    },
  },
})
