/**
 * Idempotent homepage seed for Sanity Content Lake.
 *
 * Usage:
 *   bun --cwd sanity run seed -- --dry-run
 *   bun --cwd sanity run seed -- --confirm-production
 *
 * Requires SANITY_API_WRITE_TOKEN (and project/dataset env) for non-dry-run writes.
 * Never commit tokens.
 */
import {createClient, type SanityClient} from '@sanity/client'
import {createHash} from 'node:crypto'
import {existsSync, readFileSync} from 'node:fs'
import {basename, extname, join, resolve} from 'node:path'

import {
  HOME_PAGE_EN_ID,
  HOME_PAGE_PL_ID,
  SITE_SETTINGS_ID,
  experienceItems,
  homePageByLocale,
  listedProjects,
  servicesSeed,
  siteSettingsSeed,
  techItemCopy,
  type HeadlineSegment,
  type LocalizedString,
  type LocalizedStrings,
} from './seed-content'

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'

const TRANSLATION_METADATA_ID = 'translation.metadata.homePage'

const REPO_ROOT = resolve(import.meta.dir, '../..')
const PUBLIC_DIR = join(REPO_ROOT, 'public')

type CliFlags = {
  dryRun: boolean
  confirmProduction: boolean
}

type ThemedLogoSource = {
  light: string
  dark: string
  alt: string
  width: number
  height: number
  layout?: 'wordmark' | 'mark'
  scale?: number
}

type PlannedAction =
  | {kind: 'create'; type: string; key?: string; id?: string}
  | {kind: 'patch'; type: string; key?: string; id: string}
  | {kind: 'upload'; path: string}
  | {kind: 'reuse-asset'; path: string; assetId: string}

// ---------------------------------------------------------------------------
// Seed inventory — shared content lives in ./seed-content.ts (synced from CMS)
// Logos / assets stay here.
// ---------------------------------------------------------------------------

const LOGO_BASE = '/logos/tech-stack'

const themedLogo = (
  name: string,
  alt: string,
  width: number,
  height: number,
  options?: Pick<ThemedLogoSource, 'layout' | 'scale'>,
): ThemedLogoSource => ({
  light: `${LOGO_BASE}/${name}-light.svg`,
  dark: `${LOGO_BASE}/${name}-dark.svg`,
  alt,
  width,
  height,
  layout: options?.layout ?? 'wordmark',
  scale: options?.scale,
})

const staticLogo = (
  src: string,
  alt: string,
  width: number,
  height: number,
  options?: Pick<ThemedLogoSource, 'layout' | 'scale'>,
): ThemedLogoSource => ({
  light: src,
  dark: src,
  alt,
  width,
  height,
  layout: options?.layout ?? 'wordmark',
  scale: options?.scale,
})

const techStackItems = [
  {
    key: 'nextjs' as const,
    logo: themedLogo('nextjs', 'Next.js logo', 394, 80),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/vercel.svg`, 'Vercel logo', 1155, 1000),
    sortOrder: 0,
  },
  {
    key: 'astro' as const,
    logo: themedLogo('astro', 'Astro logo', 460, 160, {scale: 1.55}),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/vercel.svg`, 'Vercel logo', 1155, 1000),
    sortOrder: 1,
  },
  {
    key: 'react-native' as const,
    logo: staticLogo(`${LOGO_BASE}/react-native.svg`, 'React Native logo', 112, 102, {
      layout: 'mark',
    }),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/react.svg`, 'React logo', 23, 20),
    sortOrder: 2,
  },
  {
    key: 'typescript' as const,
    logo: staticLogo(`${LOGO_BASE}/typescript.svg`, 'TypeScript logo', 512, 512, {
      layout: 'mark',
    }),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/typescript.svg`, 'TypeScript logo', 512, 512),
    sortOrder: 3,
  },
  {
    key: 'nodejs' as const,
    logo: themedLogo('nodejs', 'Node.js logo', 267, 80),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/typescript.svg`, 'TypeScript logo', 512, 512),
    sortOrder: 4,
  },
  {
    key: 'nestjs' as const,
    logo: staticLogo(`${LOGO_BASE}/nestjs.svg`, 'NestJS logo', 595, 212, {scale: 1.1}),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/nestjs.svg`, 'NestJS logo', 1000, 966),
    sortOrder: 5,
  },
  {
    key: 'sanity' as const,
    logo: staticLogo(`${LOGO_BASE}/sanity.svg`, 'Sanity logo', 353, 71),
    testimonialAvatar: '/developer.webp',
    ctaLogo: staticLogo(`${LOGO_BASE}/sanity.svg`, 'Sanity logo', 353, 71),
    sortOrder: 6,
  },
] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseFlags(argv: string[]): CliFlags {
  return {
    dryRun: argv.includes('--dry-run'),
    confirmProduction: argv.includes('--confirm-production'),
  }
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

function stableKey(seed: string): string {
  return createHash('sha1').update(seed).digest('hex').slice(0, 12)
}

function publicPath(webPath: string): string {
  const normalized = webPath.startsWith('/') ? webPath.slice(1) : webPath
  return join(PUBLIC_DIR, normalized)
}

function mimeFor(filePath: string): string {
  switch (extname(filePath).toLowerCase()) {
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    default:
      return 'application/octet-stream'
  }
}

function collectRequiredImagePaths(): string[] {
  const paths = new Set<string>()

  paths.add(homePageByLocale.en.about.portraitImage)
  paths.add(homePageByLocale.en.about.wideImage)
  paths.add(homePageByLocale.en.gotIdea.image)
  paths.add(siteSettingsSeed.person.image)

  for (const project of listedProjects) {
    paths.add(project.image)
  }

  for (const item of techStackItems) {
    paths.add(item.logo.light)
    paths.add(item.logo.dark)
    paths.add(item.ctaLogo.light)
    paths.add(item.ctaLogo.dark)
    paths.add(item.testimonialAvatar)
  }

  return [...paths].sort()
}

function assertLocalImagesExist(): void {
  const missing = collectRequiredImagePaths().filter((webPath) => !existsSync(publicPath(webPath)))
  if (missing.length > 0) {
    console.error('Missing image files under public/ (refusing to seed):')
    for (const path of missing) {
      console.error(`  - ${path}`)
    }
    console.error(
      'Note: homepage source referenced /mando.jpeg (absent); seed inventory uses /developer.webp for avatars.',
    )
    process.exit(1)
  }
}

function i18nString(value: string | LocalizedString) {
  if (typeof value === 'string') {
    return [
      {
        _key: 'en',
        _type: 'internationalizedArrayStringValue',
        language: 'en',
        value,
      },
    ]
  }

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

function i18nText(value: string | LocalizedString) {
  if (typeof value === 'string') {
    return [
      {
        _key: 'en',
        _type: 'internationalizedArrayTextValue',
        language: 'en',
        value,
      },
    ]
  }

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

function i18nBulletList(value: readonly string[] | LocalizedStrings) {
  if (Array.isArray(value)) {
    return [
      {
        _key: 'en',
        _type: 'internationalizedArrayBulletListValue',
        language: 'en',
        value: [...value],
      },
    ]
  }

  const localized = value as LocalizedStrings
  const entries = [
    {
      _key: 'en',
      _type: 'internationalizedArrayBulletListValue',
      language: 'en',
      value: [...localized.en],
    },
  ]
  if (localized.pl) {
    entries.push({
      _key: 'pl',
      _type: 'internationalizedArrayBulletListValue',
      language: 'pl',
      value: [...localized.pl],
    })
  }
  return entries
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

function linkField(link: {href: string; label: string}) {
  return {
    _type: 'link',
    href: link.href,
    label: link.label,
  }
}

function imageRef(assetId: string) {
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: assetId},
  }
}

function translationRef(language: string, documentId: string, schemaType: string) {
  return {
    _key: language,
    _type: 'internationalizedArrayReferenceValue',
    language,
    value: {
      _type: 'reference',
      _ref: documentId,
      _weak: true,
      _strengthenOnPublish: {type: schemaType},
    },
  }
}

function refs(ids: string[]) {
  return ids.map((id, index) => ({
    _key: stableKey(`ref:${id}:${index}`),
    _type: 'reference',
    _ref: id,
  }))
}

// ---------------------------------------------------------------------------
// Asset + document upserts
// ---------------------------------------------------------------------------

class SeedContext {
  readonly planned: PlannedAction[] = []
  private readonly assetCache = new Map<string, string>()

  constructor(
    readonly client: SanityClient | null,
    readonly dryRun: boolean,
  ) {}

  logPlan(): void {
    console.log('\nPlanned actions:')
    for (const action of this.planned) {
      switch (action.kind) {
        case 'create':
          console.log(
            `  CREATE ${action.type}${action.id ? ` id=${action.id}` : ''}${action.key ? ` key=${action.key}` : ''}`,
          )
          break
        case 'patch':
          console.log(
            `  PATCH  ${action.type} id=${action.id}${action.key ? ` key=${action.key}` : ''}`,
          )
          break
        case 'upload':
          console.log(`  UPLOAD ${action.path}`)
          break
        case 'reuse-asset':
          console.log(`  REUSE  ${action.path} → ${action.assetId}`)
          break
      }
    }
    console.log(`Total: ${this.planned.length}`)
  }

  async resolveAssetId(webPath: string): Promise<string> {
    const cached = this.assetCache.get(webPath)
    if (cached) return cached

    const absolute = publicPath(webPath)
    const filename = basename(absolute)

    if (this.client) {
      const existingId = await this.client.fetch<string | null>(
        `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
        {filename},
      )
      if (existingId) {
        this.planned.push({kind: 'reuse-asset', path: webPath, assetId: existingId})
        this.assetCache.set(webPath, existingId)
        return existingId
      }
    }

    this.planned.push({kind: 'upload', path: webPath})

    if (this.dryRun || !this.client) {
      const placeholder = `dry-run-asset:${webPath}`
      this.assetCache.set(webPath, placeholder)
      return placeholder
    }

    const buffer = readFileSync(absolute)
    const asset = await this.client.assets.upload('image', buffer, {
      filename,
      contentType: mimeFor(absolute),
    })
    this.assetCache.set(webPath, asset._id)
    return asset._id
  }

  async buildThemedLogo(logo: ThemedLogoSource) {
    const lightId = await this.resolveAssetId(logo.light)
    const darkId = await this.resolveAssetId(logo.dark)
    return {
      _type: 'themedLogo',
      light: imageRef(lightId),
      dark: imageRef(darkId),
      alt: logo.alt,
      width: logo.width,
      height: logo.height,
      layout: logo.layout ?? 'wordmark',
      ...(typeof logo.scale === 'number' ? {scale: logo.scale} : {}),
    }
  }

  async upsertByKey(
    type: 'project' | 'experience' | 'techItem',
    key: string,
    doc: Record<string, unknown>,
  ): Promise<string> {
    let existingId: string | null = null
    if (this.client) {
      existingId = await this.client.fetch<string | null>(
        `*[_type == $type && key == $key][0]._id`,
        {type, key},
      )
    }

    if (existingId) {
      this.planned.push({kind: 'patch', type, key, id: existingId})
      if (!this.dryRun && this.client) {
        await this.client.createOrReplace({_id: existingId, _type: type, ...doc})
      }
      return existingId
    }

    this.planned.push({kind: 'create', type, key})
    if (this.dryRun || !this.client) {
      return `dry-run-${type}-${key}`
    }

    const created = await this.client.create({_type: type, ...doc})
    return created._id
  }

  async upsertFixedId(id: string, type: string, doc: Record<string, unknown>): Promise<void> {
    let exists = false
    if (this.client) {
      exists = Boolean(await this.client.fetch<string | null>(`*[_id == $id][0]._id`, {id}))
    }

    this.planned.push(exists ? {kind: 'patch', type, id} : {kind: 'create', type, id})

    if (this.dryRun || !this.client) return
    await this.client.createOrReplace({_id: id, _type: type, ...doc})
  }
}

async function seedProjects(ctx: SeedContext): Promise<string[]> {
  const ids: string[] = []
  for (const project of listedProjects) {
    const imageAssetId = await ctx.resolveAssetId(project.image)
    const id = await ctx.upsertByKey('project', project.key, {
      key: project.key,
      title: i18nString(project.title),
      category: i18nString(project.category),
      image: imageRef(imageAssetId),
      href: project.href,
      tint: project.tint,
      placement: project.placement,
      sortOrder: project.sortOrder,
    })
    ids.push(id)
  }
  return ids
}

async function seedExperiences(ctx: SeedContext): Promise<string[]> {
  const ids: string[] = []
  for (const item of experienceItems) {
    const id = await ctx.upsertByKey('experience', item.key, {
      key: item.key,
      company: item.company,
      companyFull: i18nString(item.companyFull),
      companyUrl: item.companyUrl,
      role: i18nString(item.role),
      range: item.range,
      bullets: i18nBulletList(item.bullets),
      sortOrder: item.sortOrder,
    })
    ids.push(id)
  }
  return ids
}

async function seedTechItems(ctx: SeedContext): Promise<string[]> {
  const ids: string[] = []
  for (const item of techStackItems) {
    const copy = techItemCopy[item.key]
    const logo = await ctx.buildThemedLogo(item.logo)
    const ctaLogo = await ctx.buildThemedLogo(item.ctaLogo)
    const avatarId = await ctx.resolveAssetId(item.testimonialAvatar)

    const id = await ctx.upsertByKey('techItem', item.key, {
      key: item.key,
      name: copy.name || undefined,
      logo,
      description: i18nText(copy.description),
      tags: i18nBulletList(copy.tags),
      sortOrder: item.sortOrder,
      testimonialQuote: i18nText(copy.testimonial.quote),
      testimonialAuthor: i18nString(copy.testimonial.author),
      testimonialRole: i18nString(copy.testimonial.role),
      testimonialAvatar: imageRef(avatarId),
      ctaDescription: i18nText(copy.cta.description),
      ctaLabel: i18nString(copy.cta.label),
      ctaLogo,
      ctaHref: copy.cta.href,
    })
    ids.push(id)
  }
  return ids
}

async function seedServices(ctx: SeedContext): Promise<void> {
  for (const item of servicesSeed) {
    await ctx.upsertFixedId(`service-${item.slug}`, 'service', {
      slug: item.slug,
      sortOrder: item.sortOrder,
      title: i18nString(item.title),
      seoTitle: i18nString(item.seoTitle),
      seoDescription: i18nText(item.seoDescription),
      intro: i18nText(item.intro),
    })
  }
}

async function seedSiteSettings(ctx: SeedContext): Promise<void> {
  const personImageId = await ctx.resolveAssetId(siteSettingsSeed.person.image)

  await ctx.upsertFixedId(SITE_SETTINGS_ID, 'siteSettings', {
    brandName: siteSettingsSeed.brandName,
    navItems: siteSettingsSeed.navItems.map((item) => ({
      _key: stableKey(`nav:${item.href}`),
      _type: 'navItem',
      href: item.href,
      label: i18nString(item.label),
    })),
    socialLinks: siteSettingsSeed.socialLinks.map((item) => ({
      _key: stableKey(`social:${item.network}`),
      _type: 'socialLink',
      network: item.network,
      href: item.href,
      label: item.label,
    })),
    statusLabel: i18nString(siteSettingsSeed.statusLabel),
    person: {
      name: siteSettingsSeed.person.name,
      url: siteSettingsSeed.person.url,
      image: imageRef(personImageId),
      sameAs: [...siteSettingsSeed.person.sameAs],
      jobTitle: i18nString(siteSettingsSeed.person.jobTitle),
      worksFor: siteSettingsSeed.person.worksFor,
    },
    websiteDescription: i18nText(siteSettingsSeed.websiteDescription),
    footerInnerPagesHeading: i18nString(siteSettingsSeed.footerInnerPagesHeading),
    footerSocialMediaHeading: i18nString(siteSettingsSeed.footerSocialMediaHeading),
    footerServicesHeading: i18nString(siteSettingsSeed.footerServicesHeading),
    footerLegalHeading: i18nString(siteSettingsSeed.footerLegalHeading),
    footerLegalItems: siteSettingsSeed.footerLegalItems.map((item) => ({
      _key: stableKey(`legal:${item.href}`),
      _type: 'navItem',
      href: item.href,
      label: i18nString(item.label),
    })),
    footerCopyrightSuffix: i18nString(siteSettingsSeed.footerCopyrightSuffix),
  })
}

function buildHomePageDoc(args: {
  language: 'en' | 'pl'
  projectIds: string[]
  experienceIds: string[]
  techItemIds: string[]
  portraitAssetId: string
  wideAssetId: string
  contactAssetId: string
}) {
  const copy = homePageByLocale[args.language]

  return {
    language: args.language,
    seo: {
      _type: 'seoFields',
      title: copy.seo.title,
      description: copy.seo.description,
    },
    intro: {
      tagline: copy.intro.tagline,
      headline: copy.intro.headline,
      roles: [...copy.intro.roles],
      descriptionBefore: copy.intro.descriptionBefore,
      descriptionAfter: copy.intro.descriptionAfter,
      employer: linkField(copy.intro.employer),
      primaryCta: linkField(copy.intro.primaryCta),
      scrollHint: copy.intro.scrollHint,
    },
    about: {
      eyebrow: copy.about.eyebrow,
      headline: headlineSegments(copy.about.headline),
      badgeText: copy.about.badgeText,
      paragraphs: [...copy.about.paragraphs],
      portraitImage: imageRef(args.portraitAssetId),
      wideImage: imageRef(args.wideAssetId),
    },
    projectsSection: {
      eyebrow: copy.projectsSection.eyebrow,
      headline: headlineSegments(copy.projectsSection.headline),
      description: copy.projectsSection.description,
      seeAll: linkField(copy.projectsSection.seeAll),
      items: refs(args.projectIds),
    },
    experienceSection: {
      eyebrow: copy.experienceSection.eyebrow,
      headline: headlineSegments(copy.experienceSection.headline),
      columnHeaders: {...copy.experienceSection.columnHeaders},
      items: refs(args.experienceIds),
    },
    techStackSection: {
      eyebrow: copy.techStackSection.eyebrow,
      headline: headlineSegments(copy.techStackSection.headline),
      items: refs(args.techItemIds),
    },
    faqSection: {
      eyebrow: copy.faqSection.eyebrow,
      headline: headlineSegments(copy.faqSection.headline),
      items: copy.faqSection.items.map((item, index) => ({
        _key: stableKey(`faq:${args.language}:${item.question}:${index}`),
        _type: 'faqItem',
        question: item.question,
        answer: item.answer,
      })),
    },
    gotIdea: {
      eyebrow: copy.gotIdea.eyebrow,
      headline: headlineSegments(copy.gotIdea.headline),
      image: imageRef(args.contactAssetId),
      form: {...copy.gotIdea.form},
    },
  }
}

async function seedHomePages(
  ctx: SeedContext,
  projectIds: string[],
  experienceIds: string[],
  techItemIds: string[],
): Promise<void> {
  const portraitAssetId = await ctx.resolveAssetId(homePageByLocale.en.about.portraitImage)
  const wideAssetId = await ctx.resolveAssetId(homePageByLocale.en.about.wideImage)
  const contactAssetId = await ctx.resolveAssetId(homePageByLocale.en.gotIdea.image)

  const shared = {
    projectIds,
    experienceIds,
    techItemIds,
    portraitAssetId,
    wideAssetId,
    contactAssetId,
  }

  await ctx.upsertFixedId(
    HOME_PAGE_EN_ID,
    'homePage',
    buildHomePageDoc({language: 'en', ...shared}),
  )
  await ctx.upsertFixedId(
    HOME_PAGE_PL_ID,
    'homePage',
    buildHomePageDoc({language: 'pl', ...shared}),
  )
}

async function seedTranslationMetadata(ctx: SeedContext): Promise<void> {
  await ctx.upsertFixedId(TRANSLATION_METADATA_ID, 'translation.metadata', {
    schemaTypes: ['homePage'],
    translations: [
      translationRef('en', HOME_PAGE_EN_ID, 'homePage'),
      translationRef('pl', HOME_PAGE_PL_ID, 'homePage'),
    ],
  })
}

async function verifySeed(client: SanityClient): Promise<void> {
  const result = await client.fetch<{
    projects: number
    experiences: number
    techItems: number
    metadata: {_id: string; languages: string[]} | null
  }>(
    `{
      "projects": count(*[_id == $enId][0].projectsSection.items),
      "experiences": count(*[_id == $enId][0].experienceSection.items),
      "techItems": count(*[_id == $enId][0].techStackSection.items),
      "metadata": *[_id == $metaId][0]{
        _id,
        "languages": translations[].language
      }
    }`,
    {enId: HOME_PAGE_EN_ID, metaId: TRANSLATION_METADATA_ID},
  )

  console.log('\nVerification:')
  console.log(`  homePage-en projects: ${result.projects}`)
  console.log(`  homePage-en experiences: ${result.experiences}`)
  console.log(`  homePage-en techItems: ${result.techItems}`)
  console.log(
    `  translation.metadata: ${result.metadata?._id ?? 'missing'} languages=${(result.metadata?.languages ?? []).join(',')}`,
  )

  if (result.projects !== 5 || result.experiences !== 5 || result.techItems !== 7) {
    throw new Error(
      `Unexpected ref counts (expected 5/5/7, got ${result.projects}/${result.experiences}/${result.techItems})`,
    )
  }
  if (!result.metadata?._id) {
    throw new Error('translation.metadata.homePage missing after seed')
  }
}

async function main(): Promise<void> {
  loadEnvFiles()
  const flags = parseFlags(process.argv.slice(2))

  console.log('Sanity homepage seed')
  console.log(`  project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID}`)
  console.log(`  dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET}`)
  console.log(`  dry-run: ${flags.dryRun}`)
  console.log(`  confirm-production: ${flags.confirmProduction}`)
  console.log(
    '  note: tech avatars / person image use /developer.webp (source /mando.jpeg absent in public/)',
  )

  assertLocalImagesExist()

  if (!flags.dryRun && !flags.confirmProduction) {
    console.error(
      '\nRefusing to write to production without --confirm-production.\n' +
        'Run with --dry-run first, then:\n' +
        '  bun --cwd sanity run seed -- --confirm-production',
    )
    process.exit(1)
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (dataset !== 'production' && !flags.dryRun) {
    console.error(`Unexpected dataset "${dataset}". This seed targets production only.`)
    process.exit(1)
  }

  let client: SanityClient | null = null
  if (!flags.dryRun) {
    if (!token) {
      console.error('Missing SANITY_API_WRITE_TOKEN (required for non-dry-run writes).')
      process.exit(1)
    }
    client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || API_VERSION,
      token,
      useCdn: false,
    })
  } else if (token) {
    // Optional: resolve existing IDs/assets during dry-run for accurate PATCH vs CREATE logs.
    client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || API_VERSION,
      token,
      useCdn: false,
    })
  }

  const ctx = new SeedContext(client, flags.dryRun)

  const projectIds = await seedProjects(ctx)
  const experienceIds = await seedExperiences(ctx)
  const techItemIds = await seedTechItems(ctx)
  await seedServices(ctx)
  await seedSiteSettings(ctx)
  await seedHomePages(ctx, projectIds, experienceIds, techItemIds)
  await seedTranslationMetadata(ctx)

  ctx.logPlan()

  if (flags.dryRun) {
    console.log('\nDry-run complete — no mutations written.')
    return
  }

  if (!client) {
    throw new Error('Write client was not initialized')
  }

  await verifySeed(client)
  console.log('\nSeed completed successfully.')
}

main().catch((error) => {
  console.error('\nSeed failed:')
  console.error(error)
  process.exit(1)
})
