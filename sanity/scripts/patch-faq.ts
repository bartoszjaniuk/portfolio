/**
 * Safe patch: FAQ section only (no createOrReplace of whole docs).
 *
 * Usage:
 *   bun run scripts/patch-faq.ts -- --dry-run
 *   bun run scripts/patch-faq.ts -- --confirm
 *
 * Requires SANITY_API_WRITE_TOKEN.
 */
import {createClient, type SanityClient} from '@sanity/client'
import {createHash} from 'node:crypto'
import {existsSync, readFileSync} from 'node:fs'
import {join, resolve} from 'node:path'

import {HOME_PAGE_EN_ID, HOME_PAGE_PL_ID, faqCopy, type HeadlineSegment} from './seed-content'

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'
const REPO_ROOT = resolve(import.meta.dir, '../..')

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

function headlineSegments(segments: readonly HeadlineSegment[]) {
  return segments.map((segment, index) => ({
    _key: stableKey(`headline:${segment.text}:${index}`),
    _type: 'headlineSegment',
    text: segment.text,
    accent: Boolean(segment.accent),
    newLine: Boolean(segment.newLine),
  }))
}

function faqSectionPayload(locale: 'en' | 'pl') {
  const copy = faqCopy[locale]
  return {
    eyebrow: copy.eyebrow,
    headline: headlineSegments(copy.headline),
    items: copy.items.map((item, index) => ({
      _key: stableKey(`faq:${locale}:${item.question}:${index}`),
      _type: 'faqItem',
      question: item.question,
      answer: item.answer,
    })),
  }
}

async function logBefore(client: SanityClient): Promise<void> {
  const snapshot = await client.fetch<{
    en: {faqSection: Record<string, unknown> | null}
    pl: {faqSection: Record<string, unknown> | null}
  }>(
    `{
      "en": *[_id == $enId][0]{
        "faqSection": faqSection
      },
      "pl": *[_id == $plId][0]{
        "faqSection": faqSection
      }
    }`,
    {enId: HOME_PAGE_EN_ID, plId: HOME_PAGE_PL_ID},
  )

  const summarize = (section: Record<string, unknown> | null | undefined) => {
    if (!section) return '(null)'
    const items = Array.isArray(section.items) ? section.items.length : 0
    return `keys=[${Object.keys(section).join(',')}] items=${items}`
  }

  console.log('\nBefore:')
  console.log(`  homePage-en faqSection ${summarize(snapshot.en?.faqSection)}`)
  console.log(`  homePage-pl faqSection ${summarize(snapshot.pl?.faqSection)}`)
}

async function main(): Promise<void> {
  loadEnvFiles()
  const flags = parseFlags(process.argv.slice(2))

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

  console.log('Safe patch: FAQ section')
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
    `SET ${HOME_PAGE_EN_ID}.faqSection (eyebrow,headline,items×${faqCopy.en.items.length})`,
    `SET ${HOME_PAGE_PL_ID}.faqSection (eyebrow,headline,items×${faqCopy.pl.items.length})`,
  ]

  console.log('\nPlanned mutations (patch.set only):')
  for (const line of planned) {
    console.log(`  ${line}`)
  }

  if (flags.dryRun) {
    console.log('\nDry-run complete — no mutations written. Re-run with --confirm.')
    return
  }

  await client
    .patch(HOME_PAGE_EN_ID)
    .set({faqSection: faqSectionPayload('en')})
    .commit()
  console.log(`Patched ${HOME_PAGE_EN_ID}`)

  await client
    .patch(HOME_PAGE_PL_ID)
    .set({faqSection: faqSectionPayload('pl')})
    .commit()
  console.log(`Patched ${HOME_PAGE_PL_ID}`)

  await logBefore(client)
  console.log('\nSafe patch completed successfully.')
}

main().catch((error) => {
  console.error('\nPatch failed:')
  console.error(error)
  process.exit(1)
})
