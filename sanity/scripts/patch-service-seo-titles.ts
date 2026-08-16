/**
 * Safe patch: service seoTitle fields only (keyword-rich SEO titles).
 *
 * Updates every `service` document matching `servicesSeed` slugs (including
 * duplicate UUID docs) and discards leftover drafts from prior MCP edits.
 *
 * Usage:
 *   bun run patch-service-seo-titles -- --dry-run
 *   bun run patch-service-seo-titles -- --confirm
 *
 * Requires SANITY_API_WRITE_TOKEN.
 */
import {createClient, type SanityClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {join, resolve} from 'node:path'

import {servicesSeed, type LocalizedString} from './seed-content'

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'
const REPO_ROOT = resolve(import.meta.dir, '../..')

type Flags = {
  dryRun: boolean
  confirm: boolean
}

type ServiceSeoRow = {
  _id: string
  slug: string | null
  seoTitleEn: string | null
  seoTitlePl: string | null
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

function publishedId(id: string): string {
  if (id.startsWith('drafts.')) return id.slice('drafts.'.length)
  return id
}

async function fetchServiceSeoRows(client: SanityClient): Promise<ServiceSeoRow[]> {
  const slugs = servicesSeed.map((item) => item.slug)
  return client.fetch<ServiceSeoRow[]>(
    `*[_type == "service" && slug in $slugs] | order(slug asc, _id asc) {
      _id,
      slug,
      "seoTitleEn": seoTitle[language == "en"][0].value,
      "seoTitlePl": seoTitle[language == "pl"][0].value
    }`,
    {slugs},
  )
}

function logSnapshot(label: string, rows: ServiceSeoRow[]): void {
  console.log(`\n${label}:`)
  for (const row of rows) {
    console.log(`  ${row._id} (${row.slug})`)
    console.log(`    en: ${row.seoTitleEn ?? '(null)'}`)
    console.log(`    pl: ${row.seoTitlePl ?? '(null)'}`)
  }
}

async function main(): Promise<void> {
  loadEnvFiles()
  const flags = parseFlags(process.argv.slice(2))

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

  console.log('Safe patch: service seoTitle')
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
    perspective: 'raw',
  })

  const before = await fetchServiceSeoRows(client)
  logSnapshot('Before', before)

  const bySlug = new Map(servicesSeed.map((item) => [item.slug, item.seoTitle]))
  const targets = before.filter((row) => {
    const slug = row.slug?.trim()
    return Boolean(slug && bySlug.has(slug))
  })

  const publishedTargets = [
    ...new Map(
      targets.map((row) => {
        const id = publishedId(row._id)
        return [id, {id, slug: row.slug!.trim()}] as const
      }),
    ).values(),
  ]

  const draftIds = before
    .map((row) => row._id)
    .filter((id) => id.startsWith('drafts.'))

  console.log('\nPlanned mutations (patch.set seoTitle only):')
  for (const target of publishedTargets) {
    const seoTitle = bySlug.get(target.slug)!
    console.log(`  SET ${target.id}.seoTitle`)
    console.log(`    en → ${seoTitle.en}`)
    console.log(`    pl → ${seoTitle.pl}`)
  }
  if (draftIds.length) {
    console.log('\nPlanned draft cleanup (delete):')
    for (const id of draftIds) {
      console.log(`  DELETE ${id}`)
    }
  }

  if (flags.dryRun) {
    console.log('\nDry-run complete — no mutations written. Re-run with --confirm.')
    return
  }

  const tx = client.transaction()
  for (const target of publishedTargets) {
    const seoTitle = bySlug.get(target.slug)!
    tx.patch(target.id, {set: {seoTitle: i18nString(seoTitle)}})
  }
  for (const id of draftIds) {
    tx.delete(id)
  }
  await tx.commit()

  console.log(`\nPatched ${publishedTargets.length} published service doc(s).`)
  if (draftIds.length) {
    console.log(`Deleted ${draftIds.length} draft(s).`)
  }

  const after = await fetchServiceSeoRows(client)
  logSnapshot('After', after)
  console.log('\nSafe patch completed successfully.')
}

main().catch((error) => {
  console.error('\nPatch failed:')
  console.error(error)
  process.exit(1)
})
