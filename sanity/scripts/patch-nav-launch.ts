/**
 * Safe patch: remove #offer nav item and sync person.url to bjaniuk.com.
 *
 * Usage:
 *   bun run scripts/patch-nav-launch.ts -- --dry-run
 *   bun run scripts/patch-nav-launch.ts -- --confirm
 *
 * Requires SANITY_API_WRITE_TOKEN.
 */
import {createClient, type SanityClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {join, resolve} from 'node:path'

import {SITE_SETTINGS_ID, siteSettingsSeed} from './seed-content'

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'
const REPO_ROOT = resolve(import.meta.dir, '../..')

type Flags = {
  dryRun: boolean
  confirm: boolean
}

type NavItem = {
  href?: string
  label?: unknown
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

async function logBefore(client: SanityClient): Promise<NavItem[]> {
  const snapshot = await client.fetch<{
    navItems: NavItem[] | null
    personUrl: string | null
  }>(
    `*[_id == $id][0]{
      navItems,
      "personUrl": person.url
    }`,
    {id: SITE_SETTINGS_ID},
  )

  const items = snapshot?.navItems ?? []
  console.log('\nBefore:')
  console.log(
    `  navItems: ${items.map((item) => item.href ?? '(missing href)').join(', ') || '(none)'}`,
  )
  console.log(`  person.url: ${snapshot?.personUrl ?? '(null)'}`)
  return items
}

async function main(): Promise<void> {
  loadEnvFiles()
  const flags = parseFlags(process.argv.slice(2))

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

  console.log('Safe patch: remove Offer nav + person.url → bjaniuk.com')
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

  const currentItems = await logBefore(client)
  const nextNavItems = currentItems.filter((item) => item.href !== '#offer')

  console.log('\nPlanned mutations (patch.set only):')
  console.log(`  SET ${SITE_SETTINGS_ID}.navItems (remove #offer → ${nextNavItems.length} items)`)
  console.log(`  SET ${SITE_SETTINGS_ID}.person.url = ${siteSettingsSeed.person.url}`)

  if (flags.dryRun) {
    console.log('\nDry-run complete — no mutations written. Re-run with --confirm.')
    return
  }

  await client
    .patch(SITE_SETTINGS_ID)
    .set({
      navItems: nextNavItems,
      'person.url': siteSettingsSeed.person.url,
    })
    .commit()

  console.log(`Patched ${SITE_SETTINGS_ID}`)
  await logBefore(client)
  console.log('\nSafe patch completed successfully.')
}

main().catch((error) => {
  console.error('\nPatch failed:')
  console.error(error)
  process.exit(1)
})
