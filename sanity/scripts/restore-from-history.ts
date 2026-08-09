/**
 * Restore Sanity documents from History API revisions.
 *
 * Usage:
 *   bun --cwd sanity run scripts/restore-from-history.ts -- --list --id homePage-pl
 *   bun --cwd sanity run scripts/restore-from-history.ts -- --id homePage-pl --revision <rev> --dry-run
 *   bun --cwd sanity run scripts/restore-from-history.ts -- --id homePage-pl --revision <rev> --confirm
 *   bun --cwd sanity run scripts/restore-from-history.ts -- --id homePage-pl --before 2026-07-30T22:00:00.000Z --confirm
 *
 * Requires SANITY_API_WRITE_TOKEN (and project/dataset env).
 */
import {createClient, type SanityClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {join, resolve} from 'node:path'

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'

const REPO_ROOT = resolve(import.meta.dir, '../..')

type Flags = {
  list: boolean
  dryRun: boolean
  confirm: boolean
  id: string | null
  revision: string | null
  before: string | null
  limit: number
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
  const get = (name: string) => {
    const idx = argv.indexOf(`--${name}`)
    if (idx === -1) return null
    return argv[idx + 1] ?? null
  }

  return {
    list: argv.includes('--list'),
    dryRun: argv.includes('--dry-run') || !argv.includes('--confirm'),
    confirm: argv.includes('--confirm'),
    id: get('id'),
    revision: get('revision'),
    before: get('before'),
    limit: Number(get('limit') ?? '30'),
  }
}

async function listTransactions(
  client: SanityClient,
  documentId: string,
  limit: number,
): Promise<Array<{id: string; timestamp: string; author?: string}>> {
  const dataset = client.config().dataset!
  const uri =
    `/data/history/${dataset}/transactions/${encodeURIComponent(documentId)}` +
    `?excludeContent=true&reverse=true&limit=${limit}`

  const body = await client.request<string>({
    uri,
    method: 'GET',
  })

  const lines = String(body)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return lines.map((line) => {
    const tx = JSON.parse(line) as {
      id?: string
      timestamp?: string
      author?: string
    }
    return {
      id: tx.id ?? '(unknown)',
      timestamp: tx.timestamp ?? '(unknown)',
      author: tx.author,
    }
  })
}

async function fetchRevision(
  client: SanityClient,
  documentId: string,
  opts: {revision?: string; time?: string},
): Promise<Record<string, unknown> | null> {
  const dataset = client.config().dataset!

  const params = new URLSearchParams()
  if (opts.revision) params.set('revision', opts.revision)
  if (opts.time) params.set('time', opts.time)

  const uri =
    `/data/history/${dataset}/documents/${encodeURIComponent(documentId)}` + `?${params.toString()}`

  const result = await client.request<{documents?: Record<string, unknown>[]}>({
    uri,
    method: 'GET',
  })

  return result.documents?.[0] ?? null
}

function summarizeDoc(doc: Record<string, unknown>): string {
  const keys = Object.keys(doc).filter((k) => !k.startsWith('_'))
  const gotIdea = doc.gotIdea as Record<string, unknown> | undefined
  const gotIdeaKeys = gotIdea ? Object.keys(gotIdea).join(',') : '(none)'
  return `type=${doc._type} rev=${doc._rev} fields=[${keys.join(',')}] gotIdea=[${gotIdeaKeys}]`
}

async function main(): Promise<void> {
  loadEnvFiles()
  const flags = parseFlags(process.argv.slice(2))

  if (!flags.id) {
    console.error('Missing --id <documentId> (e.g. homePage-pl)')
    process.exit(1)
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

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

  console.log('Sanity history restore')
  console.log(`  project: ${projectId}`)
  console.log(`  dataset: ${dataset}`)
  console.log(`  document: ${flags.id}`)
  console.log(`  dry-run: ${flags.dryRun}`)

  if (flags.list) {
    console.log(`\nRecent transactions (limit=${flags.limit}):`)
    const txs = await listTransactions(client, flags.id, flags.limit)
    for (const tx of txs) {
      console.log(`  ${tx.timestamp}  id=${tx.id}${tx.author ? `  author=${tx.author}` : ''}`)
    }
    if (txs.length === 0) {
      console.log('  (none found)')
    }
    return
  }

  if (!flags.revision && !flags.before) {
    console.error('Provide --revision <id> or --before <ISO timestamp>, or use --list')
    process.exit(1)
  }

  let doc: Record<string, unknown> | null = null

  if (flags.revision) {
    console.log(`\nFetching revision=${flags.revision}`)
    try {
      doc = await fetchRevision(client, flags.id, {revision: flags.revision})
    } catch (error) {
      console.error('Failed to fetch by revision:', error)
    }
  }

  if (!doc && flags.before) {
    console.log(`\nFetching time=${flags.before}`)
    doc = await fetchRevision(client, flags.id, {time: flags.before})
  }

  // If Studio history entry id is a transaction id, try time from that transaction list.
  if (!doc && flags.revision) {
    console.log('\nRevision lookup failed — scanning transactions for matching id…')
    const txs = await listTransactions(client, flags.id, 100)
    const match = txs.find((tx) => tx.id === flags.revision)
    if (match) {
      console.log(`Found transaction ${match.id} at ${match.timestamp}`)
      // Fetch state just after that transaction by using the transaction timestamp.
      doc = await fetchRevision(client, flags.id, {time: match.timestamp})
    } else {
      console.log('No matching transaction id in recent history.')
      console.log('Tip: run with --list to see available transaction ids / timestamps.')
    }
  }

  if (!doc) {
    console.error('\nCould not load a historical document version.')
    process.exit(1)
  }

  console.log(`\nLoaded historical document: ${summarizeDoc(doc)}`)
  console.log(JSON.stringify(doc, null, 2).slice(0, 4000))
  if (JSON.stringify(doc).length > 4000) {
    console.log('…(truncated)')
  }

  if (flags.dryRun) {
    console.log('\nDry-run complete — no mutations written. Re-run with --confirm to restore.')
    return
  }

  const {_id, _type, ...rest} = doc
  if (typeof _id !== 'string' || typeof _type !== 'string') {
    console.error('Historical document missing _id/_type')
    process.exit(1)
  }

  // Keep system fields stable; createOrReplace will assign a new _rev.
  const payload = {
    _id,
    _type,
    ...rest,
  }
  delete (payload as {_rev?: unknown})._rev
  delete (payload as {_updatedAt?: unknown})._updatedAt

  await client.createOrReplace(payload)
  console.log(`\nRestored ${_id} from history successfully.`)
}

main().catch((error) => {
  console.error('\nRestore failed:')
  console.error(error)
  process.exit(1)
})
