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
    defineField({
      name: 'footerInnerPagesHeading',
      title: 'Footer Inner Pages Heading',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'footerSocialMediaHeading',
      title: 'Footer Social Media Heading',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'footerServicesHeading',
      title: 'Footer Services Heading',
      type: 'internationalizedArrayString',
      description: 'Column heading for services links (e.g. Services / Usługi)',
    }),
    defineField({
      name: 'footerLegalHeading',
      title: 'Footer Legal Heading',
      type: 'internationalizedArrayString',
      description: 'Column heading for legal links (e.g. Legal / Prawne)',
    }),
    defineField({
      name: 'footerLegalItems',
      title: 'Footer Legal Items',
      type: 'array',
      of: [defineArrayMember({type: 'navItem'})],
      description: 'Privacy / Terms links shown in the footer Legal column',
    }),
    defineField({
      name: 'footerCopyrightSuffix',
      title: 'Footer Copyright Suffix',
      type: 'internationalizedArrayString',
      description: 'Text after the brand name, e.g. "All rights reserved."',
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
