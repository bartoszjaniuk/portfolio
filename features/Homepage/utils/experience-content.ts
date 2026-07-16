export type ExperienceItem = {
  id: string;
  /** Short label shown in the tab list */
  company: string;
  /** Full company name used in the panel heading link */
  companyFull: string;
  companyUrl: string;
  role: string;
  range: string;
  bullets: string[];
};

export type ExperienceHeadlineSegment = {
  text: string;
  accent?: boolean;
};

export const experienceCopy = {
  title: "Where I've Worked",
  eyebrow: "↳ MY EXPERIENCES",
  headline: [
    { text: "A LOOK AT MY " },
    { text: "PROFESSIONAL", accent: true },
    { text: " JOURNEY, " },
    { text: "COLLABORATIONS", accent: true },
    { text: ", AND ROLES ACROSS DESIGN AND DIGITAL " },
    { text: "PROJECTS", accent: true },
    { text: "." },
  ] satisfies ExperienceHeadlineSegment[],
} as const;

export const experienceItems: ExperienceItem[] = [
  {
    id: "tsh",
    company: "TSH",
    companyFull: "The Software House",
    companyUrl: "https://tsh.io/",
    role: "Software Engineer",
    range: "2023 — Present",
    bullets: [
      "Build and ship production frontends with Next.js, React, and TypeScript for product and agency clients across web and mobile.",
      "Collaborate with designers and backend engineers to deliver accessible, performant UI — from design systems to feature delivery.",
      "Own end-to-end feature work: architecture decisions, code review, and iterative improvements grounded in real user feedback.",
      "Contribute to internal practices around frontend quality, testing, and maintainable component architecture.",
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    companyFull: "Freelance",
    companyUrl: "https://bartoszjaniuk.pl",
    role: "Frontend Engineer",
    range: "2021 — 2023",
    bullets: [
      "Delivered custom web apps and marketing sites for startups and SMBs — scoped, designed in collaboration, and shipped independently.",
      "Built responsive interfaces with React and TypeScript, focusing on Core Web Vitals, SEO, and clean component APIs.",
      "Integrated headless CMS and REST/GraphQL APIs so clients could update content without developer bottlenecks.",
      "Managed timelines, stakeholder communication, and iterative releases from discovery through launch.",
    ],
  },
  {
    id: "nova",
    company: "Nova Labs",
    companyFull: "Nova Labs",
    companyUrl: "https://bartoszjaniuk.pl",
    role: "Frontend Developer",
    range: "2019 — 2021",
    bullets: [
      "Developed SPA dashboards and client portals used daily by internal teams and external customers.",
      "Partnered with UX to refine interaction patterns, empty states, and form flows that reduced support tickets.",
      "Improved page load and interaction responsiveness through code-splitting, caching strategies, and lean UI state.",
      "Mentored juniors on React fundamentals, accessibility basics, and pragmatic TypeScript usage.",
    ],
  },
  {
    id: "campus",
    company: "Campus Soft",
    companyFull: "Campus Soft",
    companyUrl: "https://bartoszjaniuk.pl",
    role: "Junior Web Developer",
    range: "2018 — 2019",
    bullets: [
      "Implemented UI screens and interactive components for early-stage SaaS products in a small product team.",
      "Translated wireframes into semantic HTML/CSS and modern JavaScript with a growing React adoption.",
      "Fixed bugs, wrote small features, and learned production workflows: PRs, staging deploys, and feedback loops.",
      "Supported QA by reproducing issues, documenting edge cases, and verifying fixes across browsers.",
    ],
  },
];
