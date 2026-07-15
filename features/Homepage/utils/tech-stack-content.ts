const LOGO_BASE = "/logos/tech-stack";

export type TechStackLogo = {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
  /** Wide wordmark vs compact icon/mark layout */
  layout?: "wordmark" | "mark";
  /** Compensates for extra padding inside SVG viewBox */
  scale?: number;
};

export type TechStackItemData = {
  id: string;
  name: string;
  logo: TechStackLogo;
  secondaryLogo?: TechStackLogo;
  description: string;
  tags: string[];
  testimonial: {
    avatarSrc: string;
    quote: string;
    author: string;
    role: string;
  };
  cta: {
    logo: TechStackLogo;
    description: string;
    href: string;
    label: string;
  };
};

const themedLogo = (
  name: string,
  alt: string,
  width: number,
  height: number,
  options?: Pick<TechStackLogo, "layout" | "scale">,
): TechStackLogo => ({
  light: `${LOGO_BASE}/${name}-light.svg`,
  dark: `${LOGO_BASE}/${name}-dark.svg`,
  alt,
  width,
  height,
  layout: options?.layout ?? "wordmark",
  scale: options?.scale,
});

const staticLogo = (
  src: string,
  alt: string,
  width: number,
  height: number,
  options?: Pick<TechStackLogo, "layout" | "scale">,
): TechStackLogo => ({
  light: src,
  dark: src,
  alt,
  width,
  height,
  layout: options?.layout ?? "wordmark",
  scale: options?.scale,
});

export const techStackItems: TechStackItemData[] = [
  {
    id: "nextjs",
    name: "",
    logo: themedLogo("nextjs", "Next.js logo", 394, 80),
    description:
      "Buduję szybkie aplikacje webowe z App Router, SSR i optymalizacją pod Core Web Vitals — od landing page po złożone platformy produktowe.",
    tags: [
      "APP ROUTER",
      "SSR / SSG",
      "PERFORMANCE",
      "SERVER COMPONENTS",
      "EDGE DEPLOYMENT",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "Architektura oparta na Next.js pozwala mi łączyć szybkość renderowania z elastycznym modelem danych — bez kompromisów w UX.",
      author: "Bartosz Janiuk",
      role: "Frontend Engineer",
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/vercel.svg`, "Vercel logo", 1155, 1000),
      description:
        "Deployuję i skaluję projekty Next.js z naciskiem na szybkość ładowania i stabilność w produkcji.",
      href: "#projects",
      label: "Dowiedz się więcej",
    },
  },
  {
    id: "astro",
    name: "",
    logo: themedLogo("astro", "Astro logo", 460, 160, { scale: 1.55 }),
    description:
      "Tworzę lekkie strony contentowe z architekturą islands — minimalny JavaScript, szybki SSR i elastyczna integracja z React, Vue czy Svelte.",
    tags: [
      "ISLANDS ARCHITECTURE",
      "CONTENT SITES",
      "ZERO JS",
      "SSR / SSG",
      "PERFORMANCE",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "Astro to mój wybór dla stron marketingowych i blogów — renderuje tylko to, co potrzebne, a reszta ładuje się na żądanie.",
      author: "Bartosz Janiuk",
      role: "Frontend Engineer",
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/vercel.svg`, "Vercel logo", 1155, 1000),
      description:
        "Wdrażam projekty Astro z naciskiem na wydajność, SEO i prosty pipeline contentowy.",
      href: "#projects",
      label: "Dowiedz się więcej",
    },
  },
  {
    id: "react-native",
    name: "React Native",
    logo: staticLogo(
      `${LOGO_BASE}/react-native.svg`,
      "React Native logo",
      112,
      102,
      { layout: "mark" },
    ),
    description:
      "Tworzę aplikacje mobilne cross-platform z natywnym feel'em — od prototypów po produkcyjne wdrożenia w ekosystemie Expo i React Native.",
    tags: [
      "REACT NATIVE",
      "EXPO",
      "MOBILE",
      "IOS",
      "ANDROID",
      "APP STORE READY",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "Mobilne produkty muszą być szybkie i przewidywalne — React Native daje mi jeden codebase i spójne doświadczenie na iOS i Android.",
      author: "Bartosz Janiuk",
      role: "Mobile Developer",
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/react.svg`, "React logo", 23, 20),
      description:
        "Łączę React Native z nowoczesnym backendem i design systemem, żeby mobile było naturalnym rozszerzeniem produktu webowego.",
      href: "#projects",
      label: "Dowiedz się więcej",
    },
  },
  {
    id: "typescript",
    name: "TypeScript",
    logo: staticLogo(
      `${LOGO_BASE}/typescript.svg`,
      "TypeScript logo",
      512,
      512,
      { layout: "mark" },
    ),
    description:
      "Stawiam na typowanie od pierwszego dnia — bezpieczne API, czytelne kontrakty i mniej regresji w rosnących codebase'ach.",
    tags: [
      "TYPE SAFETY",
      "SHARED TYPES",
      "STRICT MODE",
      "API CONTRACTS",
      "MAINTAINABILITY",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "TypeScript to mój standard w każdym projekcie — typy dokumentują intencje i skracają czas debugowania w zespole.",
      author: "Bartosz Janiuk",
      role: "Full-Stack Engineer",
    },
    cta: {
      logo: staticLogo(
        `${LOGO_BASE}/typescript.svg`,
        "TypeScript logo",
        512,
        512,
      ),
      description:
        "Projektuję modele danych i interfejsy, które skalują się wraz z produktem — od MVP po długoterminowy rozwój.",
      href: "/workbench",
      label: "Dowiedz się więcej",
    },
  },
  {
    id: "nodejs",
    name: "",
    logo: themedLogo("nodejs", "Node.js logo", 267, 80),
    description:
      "Buduję skalowalne backendy w ekosystemie Node.js — REST, GraphQL, autoryzacja i integracje z bazami danych oraz usługami chmurowymi.",
    tags: [
      "REST API",
      "GRAPHQL",
      "EVENT-DRIVEN",
      "AUTH",
      "DATABASES",
      "CLOUD INTEGRATIONS",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "Node.js daje mi jeden język od API po skrypty operacyjne — szybkie iteracje i spójny stack w całym projekcie.",
      author: "Bartosz Janiuk",
      role: "Backend Engineer",
    },
    cta: {
      logo: staticLogo(
        `${LOGO_BASE}/typescript.svg`,
        "TypeScript logo",
        512,
        512,
      ),
      description:
        "Projektuję API pod realne obciążenie — od prostych endpointów po złożone systemy z kolejkami i cache'owaniem.",
      href: "#projects",
      label: "Dowiedz się więcej",
    },
  },
  {
    id: "nestjs",
    name: "",
    logo: staticLogo(`${LOGO_BASE}/nestjs.svg`, "NestJS logo", 595, 212, {
      scale: 1.1,
    }),
    description:
      "Projektuję backendy w Nest.js z modułową architekturą — dependency injection, guardy, pipes i przewidywalna struktura od MVP do produkcji.",
    tags: [
      "NEST MODULES",
      "DEPENDENCY INJECTION",
      "GUARDS & PIPES",
      "REST API",
      "GRAPHQL",
      "MICROSERVICES",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "Nest.js daje mi przewidywalną strukturę backendu — dependency injection, moduły i guardy skracają czas od prototypu do produkcji.",
      author: "Bartosz Janiuk",
      role: "Backend Engineer",
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/nestjs.svg`, "NestJS logo", 1000, 966),
      description:
        "Buduję modułowe API w Nest.js — od autoryzacji i walidacji po integracje z kolejkami i bazami danych.",
      href: "#projects",
      label: "Dowiedz się więcej",
    },
  },
  {
    id: "sanity",
    name: "",
    logo: staticLogo(`${LOGO_BASE}/sanity.svg`, "Sanity logo", 353, 71),
    description:
      "Wdrażam headless CMS z Sanity — modelowanie treści, Sanity Studio, GROQ i preview mode dla content-driven aplikacji.",
    tags: [
      "HEADLESS CMS",
      "CONTENT MODELING",
      "GROQ",
      "SANITY STUDIO",
      "PREVIEW MODE",
      "STRUCTURED CONTENT",
    ],
    testimonial: {
      avatarSrc: "/mando.jpeg",
      quote:
        "Sanity pozwala zespołowi contentowemu pracować niezależnie od developera — strukturalne treści i szybkie iteracje bez deployu kodu.",
      author: "Bartosz Janiuk",
      role: "Full-Stack Engineer",
    },
    cta: {
      logo: staticLogo(`${LOGO_BASE}/sanity.svg`, "Sanity logo", 353, 71),
      description:
        "Łączę Sanity z Next.js — od schematów treści po live preview i optymalne zapytania GROQ w produkcji.",
      href: "#projects",
      label: "Dowiedz się więcej",
    },
  },
];
