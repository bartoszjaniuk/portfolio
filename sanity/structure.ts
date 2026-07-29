import {CaseIcon} from '@sanity/icons/Case'
import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {CogIcon} from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {ProjectsIcon} from '@sanity/icons/Projects'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import type {ComponentType} from 'react'

import {sharedLanguages} from './lib/languages'

/** Singletons + types given custom list entries — keep them out of the default type list. */
const HIDDEN_DOCUMENT_TYPES = [
  'homePage',
  'siteSettings',
  'project',
  'experience',
  'techItem',
] as const

function createLocalizedSingleton(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          sharedLanguages.map((locale) =>
            S.listItem()
              .title(`${title} (${locale.id.toUpperCase()})`)
              .icon(icon)
              .id(`${typeName}-${locale.id}`)
              .child(
                S.document()
                  .schemaType(typeName)
                  .documentId(`${typeName}-${locale.id}`)
                  .title(`${title} (${locale.id.toUpperCase()})`)
                  .initialValueTemplate(`${typeName}-${locale.id}`),
              ),
          ),
        ),
    )
}

function createSingleton(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      createLocalizedSingleton(S, 'homePage', 'Home Page', HomeIcon),
      createSingleton(S, 'siteSettings', 'Site Settings', CogIcon),
      S.divider(),
      S.documentTypeListItem('project').title('Projects').icon(ProjectsIcon),
      S.documentTypeListItem('experience').title('Experience').icon(CaseIcon),
      S.documentTypeListItem('techItem').title('Tech stack').icon(CodeBlockIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !HIDDEN_DOCUMENT_TYPES.includes(
            listItem.getId() as (typeof HIDDEN_DOCUMENT_TYPES)[number],
          ),
      ),
    ])
