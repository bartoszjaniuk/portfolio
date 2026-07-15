export const roles = [
  "modern web applications",
  "high-performance PWAs",
  "cross-platform mobile apps",
  "robust frontend architectures",
  "scalable full-stack solutions",
] as const;

export type IntroRole = (typeof roles)[number];

// "Idea forged into product"

export const introCopy = {
  tagline: "Bartosz Janiuk — Software Engineer",
  headline: "Engineering Digital",
  description: {
    before:
      "Przekuwam pomysły w działające produkty cyfrowe. Projektuję i wdrażam frontend, aplikacje mobilne oraz integracje backendowe",
    // highlight: "Next.js, React Native",
    after:
      "Currently, I’m focused on building accessible, human-centered products at",
  },
  link: { href: "https://tsh.io/", label: "The Software House" },
} as const;

export const introLinks = {
  projects: { href: "#projects", label: "Rozpocznijmy wspólny projekt" },
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
