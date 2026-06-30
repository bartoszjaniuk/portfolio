export const roles = [
  "building interfaces",
  "exploring systems",
  "breaking barriers",
  "forging ideas",
  "crafting code",
] as const;

export type IntroRole = (typeof roles)[number];

export const introCopy = {
  tagline: "Bartosz Janiuk — Idea forged into product",
  headline: "Nowoczesne rozwiązania",
  description: {
    before:
      "Welcome to my digital workshop — a space for experiments, prototypes, and open-source artifacts. Currently building at",
    highlight: "...",
    after:
      "Here, ideas are forged, tested, and refined. Not a portfolio. A laboratory.",
  },
} as const;

export const introLinks = {
  projects: { href: "#projects", label: "explore artifacts" },
  introduction: { href: "/introduction", label: "introduction" },
} as const;

export const terminalArt = {
  mobile: `┌───────────────────────┐
│  ██████╗███████╗      │
│ ██╔════╝██╔════╝      │
│ ██║     █████╗        │
│ ██║     ██╔══╝        │
│ ╚██████╗██║           │
│  ╚═════╝╚═╝           │
│                       │
│  > experiments: 12    │
│  > status: forging    │
└───────────────────────┘`,
  desktop: `┌─────────────────────────────────────┐
│                                     │
│  ██████╗ ██████╗ ██████╗ ███████╗   │
│ ██╔════╝██╔═══██╗██╔══██╗██╔════╝   │
│ ██║     ██║   ██║██║  ██║█████╗     │
│ ██║     ██║   ██║██║  ██║██╔══╝     │
│ ╚██████╗╚██████╔╝██████╔╝███████╗   │
│  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝   │
│           Ein                       │
│                                     │
│   > experiments loaded: 12          │
│   > status: forging                 │
│   > last spark: today               │
│                                     │
└─────────────────────────────────────┘`,
} as const;

export const terminalMeta = {
  title: "terminal://eincode",
  version: "v0.1.0",
  date: "Dec. 2025",
} as const;
