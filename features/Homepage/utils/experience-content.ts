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
  newLine?: boolean;
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
    id: "tsh-mid",
    company: "TSH",
    companyFull: "The Software House | Gliwice, Poland",
    companyUrl: "https://tsh.io/",
    role: "Frontend Developer",
    range: "09/2023 — Present",
    bullets: [
      "Develop and maintain scalable web and mobile applications using React and React Native.",
      "Design and deliver new product features in collaboration with international, cross-functional teams.",
      "Build reusable components and shared solutions to ensure consistency across web and mobile platforms.",
      "Participate in architectural discussions and contribute to technical decisions affecting application scalability and maintainability.",
      "Contribute to internal practices around frontend quality, testing, and maintainable component architecture.",
    ],
  },
  {
    id: "tsh-junior",
    company: "The Software House",
    companyFull: "The Software House | Gliwice, Poland",
    companyUrl: "https://tsh.io",
    role: "Junior Frontend Developer",
    range: "04/2022 — 09/2023",
    bullets: [
      "Contributed to the full redesign and modernization of the company’s web platform.",
      "Co-developed a reusable UI component library and documented components using Storybook.",
      "Implemented new frontend features based on product and design requirements.",
      "Created and maintained unit, integration, and end-to-end tests to improve application reliability.",
      "Participated in code reviews and collaborated with the development team to maintain code quality.",
      "Received a promotion in recognition of my contribution to the platform revamp.",
    ],
  },

  {
    id: "freelance",
    company: "Freelance",
    companyFull: "Bartosz Janiuk | Racibórz, Poland",
    companyUrl: "https://bartoszjaniuk.pl",
    role: "Frontend Engineer",
    range: "11/2021 — Present",
    bullets: [
      "Designed and developed web applications for clients in the nutrition, physiotherapy, and dental publishing industries.",
      "Built responsive, high-performance websites using Astro, Next.js, and modern frontend technologies.",
      "Created interactive user experiences and animations with Framer Motion.",
      "Developed cross-platform mobile applications using Expo and React Native.",
      "Implemented technical SEO improvements to increase website visibility and search engine performance.",
    ],
  },
  {
    id: "codelabs",
    company: "CODELABS",
    companyFull: "CODELABS.ROCKS | Opole, Poland",
    companyUrl: "https://codelabs.rocks",
    role: "Frontend Developer Intern",
    range: "08/2021 — 10/2021",
    bullets: [
      "Developed and enhanced client-facing application features using Angular and RxJS.",
      "Built reusable and responsive UI components based on provided design specifications.",
      "Used reactive programming patterns to manage asynchronous data flows and user interactions.",
      "Collaborated with developers and designers to deliver consistent, maintainable frontend solutions.",
      "Actively participated in daily stand-ups, sprint planning, code reviews, and other Agile ceremonies.",
    ],
  },
  {
    id: "codefusion",
    company: "CODEFUSION",
    companyFull: "CODEFUSION | Opole, Poland",
    companyUrl: "https://codefusion.pl",
    role: "Software Developer Intern",
    range: "09/2020 — 10/2020",
    bullets: [
      "Developed a custom Visual Studio extension for reading and displaying project roadmaps.",
      "Implemented features using C# and the .NET framework.",
      "Participated in daily stand-up meetings, code reviews, and team development activities.",
    ],
  },
];

// "Delivered custom web apps and marketing sites for startups and SMBs — scoped, designed in collaboration, and shipped independently.",

// "Built responsive interfaces with React and TypeScript, focusing on Core Web Vitals, SEO, and clean component APIs.",

// "Integrated headless CMS and REST/GraphQL APIs so clients could update content without developer bottlenecks.",

// "Managed timelines, stakeholder communication, and iterative releases from discovery through launch.",
