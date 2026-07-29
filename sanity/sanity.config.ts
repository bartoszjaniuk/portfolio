import {documentInternationalization} from '@sanity/document-internationalization'
import {visionTool} from '@sanity/vision'
import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {sharedLanguages} from './lib/languages'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const languages = [...sharedLanguages]

const homePageTemplates: Template[] = languages.map((locale) => ({
  id: `homePage-${locale.id}`,
  title: `Home Page (${locale.title})`,
  schemaType: 'homePage',
  value: {language: locale.id},
}))

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'pph0cdly',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: ['homePage'],
      // Explicit homePage templates below; disable plugin duplicates with the same IDs.
      addTemplates: false,
    }),
    internationalizedArray({
      languages,
      fieldTypes: ['string', 'text', 'bulletList'],
      defaultLanguages: ['en'],
    }),
  ],

  // Singletons must only be opened via Structure (fixed IDs). Hide orphan templates.
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (item) =>
            item.templateId !== 'siteSettings' &&
            item.templateId !== 'homePage' &&
            !item.templateId?.startsWith('homePage-'),
        )
      }
      return prev
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...homePageTemplates],
  },
})
