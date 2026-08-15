/**
 * Safe patch: Contact section + chrome only (no createOrReplace of whole docs).
 *
 * Usage:
 *   bun run scripts/patch-contact-chrome.ts -- --dry-run
 *   bun run scripts/patch-contact-chrome.ts -- --confirm
 *
 * Requires SANITY_API_WRITE_TOKEN.
 */
import {createClient, type SanityClient} from '@sanity/client'
import {createHash} from 'node:crypto'
import {existsSync, readFileSync} from 'node:fs'
import {basename, extname, join, resolve} from 'node:path'

import {
  HOME_PAGE_EN_ID,
  HOME_PAGE_PL_ID,
  SITE_SETTINGS_ID,
  contactCopy,
  experienceColumnHeaders,
  footerChrome,
  homePageByLocale,
  scrollHintCopy,
  servicesSeed,
  type HeadlineSegment,
  type LocalizedString,
} from './seed-content'

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'
const REPO_ROOT = resolve(import.meta.dir, '../..')
const PUBLIC_DIR = join(REPO_ROOT, 'public')

type Flags = {
  dryRun: boolean
  confirm: boolean
}

function loadEnvFiles(): void {
  const candidates = [
    join(REPO_ROOT, '.env.local'),
    join(REPO_ROOT, '.env'),
    join(import.meta.dir, '../.env.local'),
    join(import.meta.dir, '../.env'),
  ]

  for (const file of candidates) {
    if (!existsSync(file)) continue
    for (const rawLine of readFileSync(file, 'utf8').split('\n')) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq <= 0) continue
      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (process.env[key] === undefined) {
        process.env[key] = value
      }
    }
  }
}

function parseFlags(argv: string[]): Flags {
  return {
    dryRun: !argv.includes('--confirm'),
    confirm: argv.includes('--confirm'),
  }
}

function stableKey(seed: string): string {
  return createHash('sha1').update(seed).digest('hex').slice(0, 12)
}

function publicPath(webPath: string): string {
  const normalized = webPath.startsWith('/') ? webPath.slice(1) : webPath
  return join(PUBLIC_DIR, normalized)
}

function mimeFor(filePath: string): string {
  switch (extname(filePath).toLowerCase()) {
    case '.webp':
      return 'image/webp'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

function headlineSegments(segments: readonly HeadlineSegment[]) {
  return segments.map((segment, index) => ({
    _key: stableKey(`headline:${segment.text}:${index}`),
    _type: 'headlineSegment',
    text: segment.text,
    accent: Boolean(segment.accent),
    newLine: Boolean(segment.newLine),
  }))
}

function i18nString(value: LocalizedString) {
  const entries = [
    {_key: 'en', _type: 'internationalizedArrayStringValue', language: 'en', value: value.en},
  ]
  if (value.pl) {
    entries.push({
      _key: 'pl',
      _type: 'internationalizedArrayStringValue',
      language: 'pl',
      value: value.pl,
    })
  }
  return entries
}

function i18nText(value: LocalizedString) {
  const entries = [
    {_key: 'en', _type: 'internationalizedArrayTextValue', language: 'en', value: value.en},
  ]
  if (value.pl) {
    entries.push({
      _key: 'pl',
      _type: 'internationalizedArrayTextValue',
      language: 'pl',
      value: value.pl,
    })
  }
  return entries
}

function imageRef(assetId: string) {
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: assetId},
  }
}

async function resolveContactAssetId(client: SanityClient): Promise<string> {
  const webPath = contactCopy.en.image
  const absolute = publicPath(webPath)
  if (!existsSync(absolute)) {
    throw new Error(`Missing contact image: ${webPath}`)
  }

  const filename = basename(absolute)
  const existingId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )
  if (existingId) {
    console.log(`  reuse asset ${filename} → ${existingId}`)
    return existingId
  }

  console.log(`  upload ${webPath}`)
  const buffer = readFileSync(absolute)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mimeFor(absolute),
  })
  return asset._id
}

function gotIdeaPayload(locale: 'en' | 'pl', contactAssetId: string) {
  const copy = homePageByLocale[locale].gotIdea
  return {
    eyebrow: copy.eyebrow,
    headline: headlineSegments(copy.headline),
    image: imageRef(contactAssetId),
    form: {...copy.form},
  }
}

async function logBefore(client: SanityClient): Promise<void> {
  const snapshot = await client.fetch<{
    en: {gotIdea: Record<string, unknown> | null; scrollHint: string | null; cols: unknown}
    pl: {gotIdea: Record<string, unknown> | null; scrollHint: string | null; cols: unknown}
    settings: {
      footerInnerPagesHeading: unknown
      footerSocialMediaHeading: unknown
      footerCopyrightSuffix: unknown
    } | null
  }>(
    `{
      "en": *[_id == $enId][0]{
        "gotIdea": gotIdea,
        "scrollHint": intro.scrollHint,
        "cols": experienceSection.columnHeaders
      },
      "pl": *[_id == $plId][0]{
        "gotIdea": gotIdea,
        "scrollHint": intro.scrollHint,
        "cols": experienceSection.columnHeaders
      },
      "settings": *[_id == $settingsId][0]{
        footerInnerPagesHeading,
        footerSocialMediaHeading,
        footerCopyrightSuffix
      }
    }`,
    {enId: HOME_PAGE_EN_ID, plId: HOME_PAGE_PL_ID, settingsId: SITE_SETTINGS_ID},
  )

  console.log('\nBefore:')
  console.log(
    `  homePage-en gotIdea keys=[${Object.keys(snapshot.en?.gotIdea ?? {}).join(',')}] scrollHint=${snapshot.en?.scrollHint ?? '(null)'} cols=${snapshot.en?.cols ? 'yes' : 'no'}`,
  )
  console.log(
    `  homePage-pl gotIdea keys=[${Object.keys(snapshot.pl?.gotIdea ?? {}).join(',')}] scrollHint=${snapshot.pl?.scrollHint ?? '(null)'} cols=${snapshot.pl?.cols ? 'yes' : 'no'}`,
  )
  console.log(`  siteSettings footer=${snapshot.settings?.footerInnerPagesHeading ? 'yes' : 'no'}`)
}

async function main(): Promise<void> {
  loadEnvFiles()
  const flags = parseFlags(process.argv.slice(2))

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

  console.log('Safe patch: Contact + chrome')
  console.log(`  project: ${projectId}`)
  console.log(`  dataset: ${dataset}`)
  console.log(`  dry-run: ${flags.dryRun}`)

  if (!token) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || API_VERSION,
    token,
    useCdn: false,
  })

  await logBefore(client)

  const planned = [
    `SET ${HOME_PAGE_EN_ID}.gotIdea (eyebrow,headline,image,form)`,
    `SET ${HOME_PAGE_EN_ID}.intro.scrollHint = "${scrollHintCopy.en}"`,
    `SET ${HOME_PAGE_EN_ID}.experienceSection.columnHeaders`,
    `SET ${HOME_PAGE_PL_ID}.gotIdea (eyebrow,headline,image,form)`,
    `SET ${HOME_PAGE_PL_ID}.intro.scrollHint = "${scrollHintCopy.pl}"`,
    `SET ${HOME_PAGE_PL_ID}.experienceSection.columnHeaders`,
    `SET ${SITE_SETTINGS_ID}.footerInnerPagesHeading (en+pl)`,
    `SET ${SITE_SETTINGS_ID}.footerSocialMediaHeading (en+pl)`,
    `SET ${SITE_SETTINGS_ID}.footerServicesHeading (en+pl)`,
    `SET ${SITE_SETTINGS_ID}.footerLegalHeading (en+pl)`,
    `SET ${SITE_SETTINGS_ID}.footerLegalItems (privacy + terms)`,
    `SET ${SITE_SETTINGS_ID}.footerCopyrightSuffix (en+pl)`,
    ...servicesSeed.map((item) => `UPSERT service-${item.slug} (${item.slug})`),
  ]

  console.log('\nPlanned mutations (patch.set only):')
  for (const line of planned) {
    console.log(`  ${line}`)
  }

  if (flags.dryRun) {
    console.log('\nDry-run complete — no mutations written. Re-run with --confirm.')
    return
  }

  const contactAssetId = await resolveContactAssetId(client)

  await client
    .patch(HOME_PAGE_EN_ID)
    .set({
      gotIdea: gotIdeaPayload('en', contactAssetId),
      'intro.scrollHint': scrollHintCopy.en,
      'experienceSection.columnHeaders': {...experienceColumnHeaders.en},
    })
    .commit()
  console.log(`Patched ${HOME_PAGE_EN_ID}`)

  await client
    .patch(HOME_PAGE_PL_ID)
    .set({
      gotIdea: gotIdeaPayload('pl', contactAssetId),
      'intro.scrollHint': scrollHintCopy.pl,
      'experienceSection.columnHeaders': {...experienceColumnHeaders.pl},
    })
    .commit()
  console.log(`Patched ${HOME_PAGE_PL_ID}`)

  await client
    .patch(SITE_SETTINGS_ID)
    .set({
      footerInnerPagesHeading: i18nString(footerChrome.footerInnerPagesHeading),
      footerSocialMediaHeading: i18nString(footerChrome.footerSocialMediaHeading),
      footerServicesHeading: i18nString(footerChrome.footerServicesHeading),
      footerLegalHeading: i18nString(footerChrome.footerLegalHeading),
      footerLegalItems: footerChrome.footerLegalItems.map((item) => ({
        _key: stableKey(`legal:${item.href}`),
        _type: 'navItem',
        href: item.href,
        label: i18nString(item.label),
      })),
      footerCopyrightSuffix: i18nString(footerChrome.footerCopyrightSuffix),
    })
    .commit()
  console.log(`Patched ${SITE_SETTINGS_ID}`)

  for (const item of servicesSeed) {
    const id = `service-${item.slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'service',
      slug: item.slug,
      sortOrder: item.sortOrder,
      title: i18nString(item.title),
      seoTitle: i18nString(item.seoTitle),
      seoDescription: i18nText(item.seoDescription),
      intro: i18nText(item.intro),
    })
    console.log(`Upserted ${id}`)
  }

  await logBefore(client)
  console.log('\nSafe patch completed successfully.')
}

main().catch((error) => {
  console.error('\nPatch failed:')
  console.error(error)
  process.exit(1)
})
