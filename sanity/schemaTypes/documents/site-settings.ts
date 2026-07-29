import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'navItems',
      title: 'Nav Items',
      type: 'array',
      of: [defineArrayMember({type: 'navItem'})],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'statusLabel',
      title: 'Status Label',
      type: 'internationalizedArrayString',
      description: 'Optional status text (e.g. open to work)',
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'object',
      description: 'JSON-LD Person fields',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'sameAs',
          title: 'Same As',
          type: 'array',
          of: [defineArrayMember({type: 'url'})],
        }),
        defineField({
          name: 'jobTitle',
          title: 'Job Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'worksFor',
          title: 'Works For',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'websiteDescription',
      title: 'Website Description',
      type: 'internationalizedArrayText',
      description: 'WebSite JSON-LD description',
    }),
  ],
  preview: {
    select: {title: 'brandName'},
    prepare({title}) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})
