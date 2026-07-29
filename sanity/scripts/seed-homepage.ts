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

const PROJECT_ID = 'pph0cdly'
const DATASET = 'production'
const API_VERSION = '2026-05-15'

const HOME_PAGE_EN_ID = 'homePage-en'
const HOME_PAGE_PL_ID = 'homePage-pl'
const SITE_SETTINGS_ID = 'siteSettings'
const TRANSLATION_METADATA_ID = 'translation.metadata.homePage'

const REPO_ROOT = resolve(import.meta.dir, '../..')
const PUBLIC_DIR = join(REPO_ROOT, 'public')

type CliFlags = {
  dryRun: boolean
  confirmProduction: boolean
}

type HeadlineSegment = {
  text: string
  accent?: boolean
  newLine?: boolean
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
// Seed inventory (from features/Homepage/** + Header + structured-data)
// Field-level i18n: EN only — PL coalesces to EN at query time.
// ---------------------------------------------------------------------------

const roles = [
  'modern web applications',
  'high-performance PWAs',
  'cross-platform mobile apps',
  'robust frontend architectures',
  'scalable full-stack solutions',
] as const

const introCopy = {
  tagline: 'Bartosz Janiuk — Software Engineer',
  headline: 'Engineering Digital',
  description: {
    before:
      'Przekuwam pomysły w działające produkty cyfrowe. Projektuję i wdrażam frontend, aplikacje mobilne oraz integracje backendowe',
    after: "Currently, I'm focused on building accessible, human-centered products at",
  },
  employer: {href: 'https://tsh.io/', label: 'The Software House'},
  primaryCta: {href: '#projects', label: 'Rozpocznijmy wspólny projekt'},
} as const

const aboutMeCopy = {
  eyebrow: '↳ ABOUT ME',
  badgeText: 'DEVELOPMENT * WEB * MOBILE * PWA * SEO * UI/UX',
  headline: [
    {text: 'BLENDING '},
    {text: 'CREATIVITY', accent: true},
    {text: 'AND TECHNOLOGY TO FORGE ', newLine: true},
    {text: 'MOBILE & WEB'},
    {text: ' APPS', accent: true},
    {text: ' THAT '},
    {text: 'RESONATE', accent: true},
    {text: '.'},
  ] satisfies HeadlineSegment[],
  paragraphs: [
    "I'm Bartosz Janiuk, a battle tested passionate about forging digital experiences that leave a lasting impression. My work spans across web & mobile development, combining creativity and strategy to create meaningful products.",
    'I focus on designing digital products and visuals that are both functional and aesthetically engaging. Every interface, brand identity, or illustration I create is thoughtfully crafted to ensure intuitive interactions, clear visual clarity, and a cohesive, compelling story.',
    "Over the years, I've collaborated with a wide range of clients, delivering more than 50 successful projects globally. From innovative startups to established brands, I help transform ideas into tangible, engaging experiences that communicate effectively and resonate with audiences.",
  ],
  // Source modules reference /mando.jpeg (missing) and remote portrait URL;
  // seed uses the existing public portrait asset.
  portraitImage: '/developer.webp',
  wideImage: '/developer.webp',
} as const

const listedProjectsCopy = {
  eyebrow: '↳ SELECTED WORK',
  headline: [
    {text: 'SELECTED '},
    {text: 'WORKS', accent: true},
    {text: ' EXPLORING STRUCTURE, INTERACTION, AND VISUAL CLARITY ACROSS '},
    {text: 'DIGITAL', accent: true},
    {text: ' PLATFORMS.'},
  ] satisfies HeadlineSegment[],
  description:
    'A curated selection of product interfaces and platforms — from fitness and culinary tools to clinic experiences — focused on structure, interaction, and clarity.',
  seeAll: {href: '/projects', label: 'SEE ALL WORK'},
} as const

const listedProjects = [
  {
    key: 'fitap',
    title: 'Fitap',
    category: 'Fitness App',
    image: '/projects/fitap.webp',
    href: '/projects',
    tint: 'bg-secondary',
    placement: 'md:top-0 md:left-[4%] lg:left-[0%]',
    sortOrder: 0,
  },
  {
    key: 'umami',
    title: 'Umami',
    category: 'Culinary Platform',
    image: '/projects/umami.webp',
    href: '/projects',
    tint: 'bg-muted',
    placement: 'md:top-[420px] md:right-[4%] lg:right-[0%]',
    sortOrder: 1,
  },
  {
    key: 'cookscale',
    title: 'Cookscale',
    category: 'Kitchen Tools',
    image: '/projects/cookscale.webp',
    href: '/projects',
    tint: 'bg-secondary',
    placement: 'md:top-[780px] md:left-[10%] lg:left-[0%]',
    sortOrder: 2,
  },
  {
    key: 'physio',
    title: 'Physio',
    category: 'Clinic Platform',
    image: '/projects/physioterapy.webp',
    href: '/projects',
    tint: 'bg-muted',
    placement: 'md:top-[1180px] md:right-[6%] lg:right-[0%]',
    sortOrder: 3,
  },
  {
    key: 'dental',
    title: 'Dental',
    category: 'Clinic Website',
    image: '/projects/stomatology.webp',
    href: '/projects',
    tint: 'bg-secondary',
    placement: 'md:top-[1560px] md:left-[6%] lg:left-0',
    sortOrder: 4,
  },
] as const

const experienceCopy = {
  eyebrow: '↳ MY EXPERIENCES',
  headline: [
    {text: 'A LOOK AT MY '},
    {text: 'PROFESSIONAL', accent: true},
    {text: ' JOURNEY, '},
    {text: 'COLLABORATIONS', accent: true},
    {text: ', AND ROLES ACROSS DESIGN AND DIGITAL '},
    {text: 'PROJECTS', accent: true},
    {text: '.'},
  ] satisfies HeadlineSegment[],
} as const

const experienceItems = [
  {
    key: 'tsh-mid',
    company: 'TSH',
    companyFull: 'The Software House | Gliwice, Poland',
    companyUrl: 'https://tsh.io/',
    role: 'Frontend Developer',
    range: '09/2023 — Present',
    sortOrder: 0,
    bullets: [
      'Develop and maintain scalable web and mobile applications using React and React Native.',
      'Design and deliver new product features in collaboration with international, cross-functional teams.',
      'Build reusable components and shared solutions to ensure consistency across web and mobile platforms.',
      'Participate in architectural discussions and contribute to technical decisions affecting application scalability and maintainability.',
      'Contribute to internal practices around frontend quality, testing, and maintainable component architecture.',
    ],
  },
  {
    key: 'tsh-junior',
    company: 'The Software House',
    companyFull: 'The Software House | Gliwice, Poland',
    companyUrl: 'https://tsh.io',
    role: 'Junior Frontend Developer',
    range: '04/2022 — 09/2023',
    sortOrder: 1,
    bullets: [
      "Contributed to the full redesign and modernization of the company's web platform.",
      'Co-developed a reusable UI component library and documented components using Storybook.',
      'Implemented new frontend features based on product and design requirements.',
      'Created and maintained unit, integration, and end-to-end tests to improve application reliability.',
      'Participated in code reviews and collaborated with the development team to maintain code quality.',
      'Received a promotion in recognition of my contribution to the platform revamp.',
    ],
  },
  {
    key: 'freelance',
    company: 'Freelance',
    companyFull: 'Bartosz Janiuk | Racibórz, Poland',
    companyUrl: 'https://bartoszjaniuk.pl',
    role: 'Frontend Engineer',
    range: '11/2021 — Present',
    sortOrder: 2,
    bullets: [
      'Designed and developed web applications for clients in the nutrition, physiotherapy, and dental publishing industries.',
      'Built responsive, high-performance websites using Astro, Next.js, and modern frontend technologies.',
      'Created interactive user experiences and animations with Framer Motion.',
      'Developed cross-platform mobile applications using Expo and React Native.',
      'Implemented technical SEO improvements to increase website visibility and search engine performance.',
    ],
  },
  {
    key: 'codelabs',
    company: 'CODELABS',
    companyFull: 'CODELABS.ROCKS | Opole, Poland',
    companyUrl: 'https://codelabs.rocks',
    role: 'Frontend Developer Intern',
    range: '08/2021 — 10/2021',
    sortOrder: 3,
    bullets: [
      'Developed and enhanced client-facing application features using Angular and RxJS.',
      'Built reusable and responsive UI components based on provided design specifications.',
      'Used reactive programming patterns to manage asynchronous data flows and user interactions.',
      'Collaborated with developers and designers to deliver consistent, maintainable frontend solutions.',
      'Actively participated in daily stand-ups, sprint planning, code reviews, and other Agile ceremonies.',
    ],
  },
  {
    key: 'codefusion',
    company: 'CODEFUSION',
    companyFull: 'CODEFUSION | Opole, Poland',
    companyUrl: 'https://codefusion.pl',
    role: 'Software Developer Intern',
    range: '09/2020 — 10/2020',
    sortOrder: 4,
    bullets: [
      'Developed a custom Visual Studio extension for reading and displaying project roadmaps.',
      'Implemented features using C# and the .NET framework.',
      'Participated in daily stand-up meetings, code reviews, and team development activities.',
    ],
  },
] as const

const techStackCopy = {
  eyebrow: '↳ MY TECH STACK',
  headline: [
    {text: 'I WORK WITH '},
    {text: 'TECHNOLOGIES', accent: true},
    {text: ' THAT HELP ME '},
    {text: 'CREATE', accent: true},
    {text: ' AMAZING', accent: true},
    {text: ' RESULTS', accent: true},
    {text: '.'},
  ] satisfies HeadlineSegment[],
} as const

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
    key: 'nextjs',
    name: '',
    logo: themedLogo('nextjs', 'Next.js logo', 394, 80),
    description:
      'Buduję szybkie aplikacje webowe z App Router, SSR i optymalizacją pod Core Web Vitals — od landing page po złożone platformy produktowe.',
    tags: ['APP ROUTER', 'SSR / SSG', 'PERFORMANCE', 'SERVER COMPONENTS', 'EDGE DEPLOYMENT'],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'Architektura oparta na Next.js pozwala mi łączyć szybkość renderowania z elastycznym modelem danych — bez kompromisów w UX.',
      author: 'Bartosz Janiuk',
      role: 'Frontend Engineer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/vercel.svg`, 'Vercel logo', 1155, 1000),
      description:
        'Deployuję i skaluję projekty Next.js z naciskiem na szybkość ładowania i stabilność w produkcji.',
      href: '#projects',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 0,
  },
  {
    key: 'astro',
    name: '',
    logo: themedLogo('astro', 'Astro logo', 460, 160, {scale: 1.55}),
    description:
      'Tworzę lekkie strony contentowe z architekturą islands — minimalny JavaScript, szybki SSR i elastyczna integracja z React, Vue czy Svelte.',
    tags: ['ISLANDS ARCHITECTURE', 'CONTENT SITES', 'ZERO JS', 'SSR / SSG', 'PERFORMANCE'],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'Astro to mój wybór dla stron marketingowych i blogów — renderuje tylko to, co potrzebne, a reszta ładuje się na żądanie.',
      author: 'Bartosz Janiuk',
      role: 'Frontend Engineer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/vercel.svg`, 'Vercel logo', 1155, 1000),
      description:
        'Wdrażam projekty Astro z naciskiem na wydajność, SEO i prosty pipeline contentowy.',
      href: '#projects',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 1,
  },
  {
    key: 'react-native',
    name: 'React Native',
    logo: staticLogo(`${LOGO_BASE}/react-native.svg`, 'React Native logo', 112, 102, {
      layout: 'mark',
    }),
    description:
      "Tworzę aplikacje mobilne cross-platform z natywnym feel'em — od prototypów po produkcyjne wdrożenia w ekosystemie Expo i React Native.",
    tags: ['REACT NATIVE', 'EXPO', 'MOBILE', 'IOS', 'ANDROID', 'APP STORE READY'],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'Mobilne produkty muszą być szybkie i przewidywalne — React Native daje mi jeden codebase i spójne doświadczenie na iOS i Android.',
      author: 'Bartosz Janiuk',
      role: 'Mobile Developer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/react.svg`, 'React logo', 23, 20),
      description:
        'Łączę React Native z nowoczesnym backendem i design systemem, żeby mobile było naturalnym rozszerzeniem produktu webowego.',
      href: '#projects',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 2,
  },
  {
    key: 'typescript',
    name: 'TypeScript',
    logo: staticLogo(`${LOGO_BASE}/typescript.svg`, 'TypeScript logo', 512, 512, {
      layout: 'mark',
    }),
    description:
      "Stawiam na typowanie od pierwszego dnia — bezpieczne API, czytelne kontrakty i mniej regresji w rosnących codebase'ach.",
    tags: ['TYPE SAFETY', 'SHARED TYPES', 'STRICT MODE', 'API CONTRACTS', 'MAINTAINABILITY'],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'TypeScript to mój standard w każdym projekcie — typy dokumentują intencje i skracają czas debugowania w zespole.',
      author: 'Bartosz Janiuk',
      role: 'Full-Stack Engineer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/typescript.svg`, 'TypeScript logo', 512, 512),
      description:
        'Projektuję modele danych i interfejsy, które skalują się wraz z produktem — od MVP po długoterminowy rozwój.',
      href: '/workbench',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 3,
  },
  {
    key: 'nodejs',
    name: '',
    logo: themedLogo('nodejs', 'Node.js logo', 267, 80),
    description:
      'Buduję skalowalne backendy w ekosystemie Node.js — REST, GraphQL, autoryzacja i integracje z bazami danych oraz usługami chmurowymi.',
    tags: ['REST API', 'GRAPHQL', 'EVENT-DRIVEN', 'AUTH', 'DATABASES', 'CLOUD INTEGRATIONS'],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'Node.js daje mi jeden język od API po skrypty operacyjne — szybkie iteracje i spójny stack w całym projekcie.',
      author: 'Bartosz Janiuk',
      role: 'Backend Engineer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/typescript.svg`, 'TypeScript logo', 512, 512),
      description:
        "Projektuję API pod realne obciążenie — od prostych endpointów po złożone systemy z kolejkami i cache'owaniem.",
      href: '#projects',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 4,
  },
  {
    key: 'nestjs',
    name: '',
    logo: staticLogo(`${LOGO_BASE}/nestjs.svg`, 'NestJS logo', 595, 212, {scale: 1.1}),
    description:
      'Projektuję backendy w Nest.js z modułową architekturą — dependency injection, guardy, pipes i przewidywalna struktura od MVP do produkcji.',
    tags: [
      'NEST MODULES',
      'DEPENDENCY INJECTION',
      'GUARDS & PIPES',
      'REST API',
      'GRAPHQL',
      'MICROSERVICES',
    ],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'Nest.js daje mi przewidywalną strukturę backendu — dependency injection, moduły i guardy skracają czas od prototypu do produkcji.',
      author: 'Bartosz Janiuk',
      role: 'Backend Engineer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/nestjs.svg`, 'NestJS logo', 1000, 966),
      description:
        'Buduję modułowe API w Nest.js — od autoryzacji i walidacji po integracje z kolejkami i bazami danych.',
      href: '#projects',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 5,
  },
  {
    key: 'sanity',
    name: '',
    logo: staticLogo(`${LOGO_BASE}/sanity.svg`, 'Sanity logo', 353, 71),
    description:
      'Wdrażam headless CMS z Sanity — modelowanie treści, Sanity Studio, GROQ i preview mode dla content-driven aplikacji.',
    tags: [
      'HEADLESS CMS',
      'CONTENT MODELING',
      'GROQ',
      'SANITY STUDIO',
      'PREVIEW MODE',
      'STRUCTURED CONTENT',
    ],
    testimonial: {
      avatarSrc: '/developer.webp',
      quote:
        'Sanity pozwala zespołowi contentowemu pracować niezależnie od developera — strukturalne treści i szybkie iteracje bez deployu kodu.',
      author: 'Bartosz Janiuk',
      role: 'Full-Stack Engineer',
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/sanity.svg`, 'Sanity logo', 353, 71),
      description:
        'Łączę Sanity z Next.js — od schematów treści po live preview i optymalne zapytania GROQ w produkcji.',
      href: '#projects',
      label: 'Dowiedz się więcej',
    },
    sortOrder: 6,
  },
] as const

const gotIdea = {
  line1: 'Got an idea?',
  line2: "Let's talk.",
} as const

const siteSettingsSeed = {
  brandName: 'bjaniuk.dev',
  navItems: [
    {href: '/', label: 'Home'},
    {href: '/projects', label: 'Projects'},
    {href: '/notes', label: 'Notes'},
    {href: '/workbench', label: 'Workbench'},
    {href: '/blog', label: 'Blog'},
  ],
  socialLinks: [
    {
      network: 'github' as const,
      href: 'https://github.com/bartoszjaniuk',
      label: 'GitHub',
    },
    {
      network: 'linkedin' as const,
      href: 'https://www.linkedin.com/in/bartosz-janiuk-89265717b',
      label: 'LinkedIn',
    },
  ],
  statusLabel: 'open to work',
  person: {
    name: 'Bartosz Janiuk',
    url: 'https://bartoszjaniuk.pl',
    image: '/developer.webp',
    sameAs: [
      'https://github.com/bartoszjaniuk',
      'https://twitter.com/bartoszjaniuk',
      'https://linkedin.com/in/bartoszjaniuk',
    ],
    jobTitle: 'Software Engineer',
    worksFor: 'Bartosz Janiuk',
  },
  websiteDescription:
    'Digital workshop where idea meets product. Mobile and web applications for your business.',
} as const

const homePageSeo = {
  title: 'Bartosz Janiuk — Software Engineer',
  description:
    'Digital workshop where idea meets product. Mobile and web applications for your business.',
} as const

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

  paths.add(aboutMeCopy.portraitImage)
  paths.add(aboutMeCopy.wideImage)
  paths.add(siteSettingsSeed.person.image)

  for (const project of listedProjects) {
    paths.add(project.image)
  }

  for (const item of techStackItems) {
    paths.add(item.logo.light)
    paths.add(item.logo.dark)
    paths.add(item.cta.logo.light)
    paths.add(item.cta.logo.dark)
    paths.add(item.testimonial.avatarSrc)
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

function i18nString(value: string, language = 'en') {
  return [
    {
      _key: language,
      _type: 'internationalizedArrayStringValue',
      language,
      value,
    },
  ]
}

function i18nText(value: string, language = 'en') {
  return [
    {
      _key: language,
      _type: 'internationalizedArrayTextValue',
      language,
      value,
    },
  ]
}

function i18nBulletList(value: readonly string[], language = 'en') {
  return [
    {
      _key: language,
      _type: 'internationalizedArrayBulletListValue',
      language,
      value: [...value],
    },
  ]
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
    const logo = await ctx.buildThemedLogo(item.logo)
    const ctaLogo = await ctx.buildThemedLogo(item.cta.logo)
    const avatarId = await ctx.resolveAssetId(item.testimonial.avatarSrc)

    const id = await ctx.upsertByKey('techItem', item.key, {
      key: item.key,
      name: item.name || undefined,
      logo,
      description: i18nText(item.description),
      tags: i18nBulletList(item.tags),
      sortOrder: item.sortOrder,
      testimonialQuote: i18nText(item.testimonial.quote),
      testimonialAuthor: i18nString(item.testimonial.author),
      testimonialRole: i18nString(item.testimonial.role),
      testimonialAvatar: imageRef(avatarId),
      ctaDescription: i18nText(item.cta.description),
      ctaLabel: i18nString(item.cta.label),
      ctaLogo,
      ctaHref: item.cta.href,
    })
    ids.push(id)
  }
  return ids
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
  })
}

function buildHomePageDoc(args: {
  language: 'en' | 'pl'
  projectIds: string[]
  experienceIds: string[]
  techItemIds: string[]
  portraitAssetId: string
  wideAssetId: string
}) {
  return {
    language: args.language,
    seo: {
      _type: 'seoFields',
      title: homePageSeo.title,
      description: homePageSeo.description,
    },
    intro: {
      tagline: introCopy.tagline,
      headline: introCopy.headline,
      roles: [...roles],
      descriptionBefore: introCopy.description.before,
      descriptionAfter: introCopy.description.after,
      employer: linkField(introCopy.employer),
      primaryCta: linkField(introCopy.primaryCta),
    },
    about: {
      eyebrow: aboutMeCopy.eyebrow,
      headline: headlineSegments(aboutMeCopy.headline),
      badgeText: aboutMeCopy.badgeText,
      paragraphs: [...aboutMeCopy.paragraphs],
      portraitImage: imageRef(args.portraitAssetId),
      wideImage: imageRef(args.wideAssetId),
    },
    projectsSection: {
      eyebrow: listedProjectsCopy.eyebrow,
      headline: headlineSegments(listedProjectsCopy.headline),
      description: listedProjectsCopy.description,
      seeAll: linkField(listedProjectsCopy.seeAll),
      items: refs(args.projectIds),
    },
    experienceSection: {
      eyebrow: experienceCopy.eyebrow,
      headline: headlineSegments(experienceCopy.headline),
      items: refs(args.experienceIds),
    },
    techStackSection: {
      eyebrow: techStackCopy.eyebrow,
      headline: headlineSegments(techStackCopy.headline),
      items: refs(args.techItemIds),
    },
    gotIdea: {
      line1: gotIdea.line1,
      line2: gotIdea.line2,
    },
  }
}

async function seedHomePages(
  ctx: SeedContext,
  projectIds: string[],
  experienceIds: string[],
  techItemIds: string[],
): Promise<void> {
  const portraitAssetId = await ctx.resolveAssetId(aboutMeCopy.portraitImage)
  const wideAssetId = await ctx.resolveAssetId(aboutMeCopy.wideImage)

  const shared = {
    projectIds,
    experienceIds,
    techItemIds,
    portraitAssetId,
    wideAssetId,
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
