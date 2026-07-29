import {defineField, defineType} from 'sanity'

export const headlineSegment = defineType({
  name: 'headlineSegment',
  title: 'Headline Segment',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'newLine',
      title: 'New Line',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'text', accent: 'accent', newLine: 'newLine'},
    prepare({title, accent, newLine}) {
      const flags = [accent ? 'accent' : null, newLine ? 'new line' : null]
        .filter(Boolean)
        .join(', ')
      return {
        title: title || 'Empty segment',
        subtitle: flags || undefined,
      }
    },
  },
})
