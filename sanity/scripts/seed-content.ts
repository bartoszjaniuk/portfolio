/**
 * Shared seed inventory synced from production CMS (post-restore).
 * Used by seed-homepage.ts, patch-contact-chrome.ts, and patch-faq.ts.
 */

export type HeadlineSegment = {
  text: string
  accent?: boolean
  newLine?: boolean
}

export type LocalizedString = {
  en: string
  pl?: string
}

export type LocalizedStrings = {
  en: readonly string[]
  pl?: readonly string[]
}

export const HOME_PAGE_EN_ID = 'homePage-en'
export const HOME_PAGE_PL_ID = 'homePage-pl'
export const SITE_SETTINGS_ID = 'siteSettings'

// ---------------------------------------------------------------------------
// Contact + chrome (new schema — applied via safe patch)
// ---------------------------------------------------------------------------

export const contactCopy = {
  en: {
    eyebrow: '↳ Contact me',
    headline: [
      {text: 'Have a'},
      {text: ' project', accent: true},
      {text: 'in mind?'},
      {text: "Let's "},
      {text: 'turn your ideas into something'},
      {text: ' meaningful.', accent: true},
    ] satisfies HeadlineSegment[],
    image: '/images/contact.webp',
    form: {
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'What is this about?',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      submitLabel: 'Send message',
      submittingLabel: 'Sending…',
      successTitle: 'Message sent!',
      successBody: "Thanks for reaching out. I'll get back to you soon.",
      sendAnotherLabel: 'Send another message',
      errorFallback: 'Failed to send the message. Please try again.',
    },
  },
  pl: {
    eyebrow: '↳ Kontakt',
    headline: [
      {text: 'Masz'},
      {text: ' projekt', accent: true},
      {text: ' w głowie?'},
      {text: 'Zamieńmy '},
      {text: 'pomysły w coś'},
      {text: ' wartościowego.', accent: true},
    ] satisfies HeadlineSegment[],
    image: '/images/contact.webp',
    form: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'ty@przyklad.pl',
      subjectLabel: 'Temat',
      subjectPlaceholder: 'O czym chcesz napisać?',
      messageLabel: 'Wiadomość',
      messagePlaceholder: 'Opowiedz mi o swoim projekcie...',
      submitLabel: 'Wyślij wiadomość',
      submittingLabel: 'Wysyłanie…',
      successTitle: 'Wiadomość wysłana!',
      successBody: 'Dzięki za kontakt. Odezwę się wkrótce.',
      sendAnotherLabel: 'Wyślij kolejną wiadomość',
      errorFallback: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.',
    },
  },
} as const

export const scrollHintCopy = {
  en: 'scroll',
  pl: 'przewiń',
} as const

export const experienceColumnHeaders = {
  en: {
    company: 'Company / Organization',
    role: 'Role / Position',
    year: 'Year',
    description: 'Description',
    ariaLabel: 'Professional experience',
  },
  pl: {
    company: 'Firma / Organizacja',
    role: 'Rola / Stanowisko',
    year: 'Rok',
    description: 'Opis',
    ariaLabel: 'Doświadczenie zawodowe',
  },
} as const

export const footerChrome = {
  footerInnerPagesHeading: {en: 'Inner Pages', pl: 'Podstrony'} satisfies LocalizedString,
  footerSocialMediaHeading: {en: 'Social Media', pl: 'Social Media'} satisfies LocalizedString,
  footerCopyrightSuffix: {
    en: 'All rights reserved.',
    pl: 'Wszelkie prawa zastrzeżone.',
  } satisfies LocalizedString,
} as const

// ---------------------------------------------------------------------------
// FAQ (Constantine contact FAQ — applied via safe patch)
// ---------------------------------------------------------------------------

export type FaqItemCopy = {
  question: string
  answer: string
}

export type FaqSectionCopy = {
  eyebrow: string
  headline: HeadlineSegment[]
  items: readonly FaqItemCopy[]
}

export const faqCopy = {
  en: {
    eyebrow: 'faq',
    headline: [
      {text: 'Helpful '},
      {text: 'insights', accent: true},
      {text: ' and answers for clients, '},
      {text: 'collaborators', accent: true},
      {text: ', and '},
      {text: 'curious', accent: true},
      {text: ' visitors.'},
    ] satisfies HeadlineSegment[],
    items: [
      {
        question: 'What services do you offer?',
        answer: 'I specialize in UI/UX design, web development, branding, and illustration.',
      },
      {
        question: 'What industries do you work with?',
        answer:
          'I adapt my work across various industries like tech, creative studios, and startups to ensure outcomes are relevant and aligned with the audience.',
      },
      {
        question: 'What is your design process?',
        answer:
          'I start by understanding the problem and setting clear goals, then focus on structure, visuals, and usability, refining through feedback and iteration.',
      },
      {
        question: 'How do you handle client feedback?',
        answer:
          'Client feedback is vital; I review suggestions openly and align them with project goals to refine the work while maintaining clarity.',
      },
      {
        question: 'What tools do you use?',
        answer:
          'I use tools like Figma for design and Adobe Creative Suite for visuals, adapting to project needs while prioritizing efficiency and quality.',
      },
      {
        question: 'How do you handle project timelines?',
        answer:
          'I plan project timelines based on scope, set milestones early, and ensure clear communication for steady progress and flexibility.',
      },
      {
        question: 'Can you help with branding for startups?',
        answer:
          'I collaborate with startups to establish strong brand foundations, focusing on visual identity and a scalable brand system.',
      },
      {
        question: 'Do you offer custom illustrations?',
        answer:
          "I create custom illustrations that enhance storytelling and maintain consistency across the brand's visual touchpoints.",
      },
    ],
  },
  pl: {
    eyebrow: 'faq',
    headline: [
      {text: 'Przydatne '},
      {text: 'wskazówki', accent: true},
      {text: ' i odpowiedzi dla klientów, '},
      {text: 'współpracowników', accent: true},
      {text: ' i '},
      {text: 'ciekawskich', accent: true},
      {text: ' odwiedzających.'},
    ] satisfies HeadlineSegment[],
    items: [
      {
        question: 'Jakie usługi oferujesz?',
        answer:
          'Specjalizuję się w projektowaniu UI/UX, tworzeniu stron i aplikacji, brandingu oraz ilustracji.',
      },
      {
        question: 'Z jakimi branżami pracujesz?',
        answer:
          'Dostosowuję pracę do różnych branż — tech, studia kreatywne i startupy — tak, by efekty były trafne i spójne z odbiorcami.',
      },
      {
        question: 'Jak wygląda Twój proces projektowy?',
        answer:
          'Zaczynam od zrozumienia problemu i jasnych celów, potem skupiam się na strukturze, warstwie wizualnej i użyteczności, dopracowując rozwiązania przez feedback i iteracje.',
      },
      {
        question: 'Jak podchodzisz do feedbacku klientów?',
        answer:
          'Feedback klienta jest kluczowy; otwarcie go analizuję i dopasowuję do celów projektu, dopracowując efekt przy zachowaniu klarowności.',
      },
      {
        question: 'Z jakich narzędzi korzystasz?',
        answer:
          'Korzystam m.in. z Figmy do projektowania i pakietu Adobe Creative Suite do warstwy wizualnej, dobierając narzędzia do potrzeb projektu z naciskiem na efektywność i jakość.',
      },
      {
        question: 'Jak zarządzasz terminami projektów?',
        answer:
          'Planuję terminy na podstawie zakresu, wcześnie ustalam kamienie milowe i dbam o jasną komunikację, by utrzymać tempo i elastyczność.',
      },
      {
        question: 'Czy możesz pomóc ze brandingiem dla startupów?',
        answer:
          'Współpracuję ze startupami przy budowaniu solidnych fundamentów marki — tożsamości wizualnej i skalowalnego systemu brandowego.',
      },
      {
        question: 'Czy oferujesz customowe ilustracje?',
        answer:
          'Tworzę ilustracje na zamówienie, które wzmacniają storytelling i zachowują spójność w punktach styku marki.',
      },
    ],
  },
} as const satisfies Record<'en' | 'pl', FaqSectionCopy>

// ---------------------------------------------------------------------------
// Home page (document-level EN / PL)
// ---------------------------------------------------------------------------

const rolesEn = [
  'modern web applications',
  'high-performance PWAs',
  'cross-platform mobile apps',
  'robust frontend architectures',
  'scalable full-stack solutions',
] as const

const rolesPl = [
  'nowoczesne strony internetowe',
  'wydajne aplikacje progresywne (PWA)',
  'aplikacje mobilne',
  'solidne architektury front-endowe',
  'skalowalne rozwiązania full-stack',
] as const

export const homePageByLocale = {
  en: {
    seo: {
      title: 'Bartosz Janiuk — Software Engineer',
      description:
        'A digital workshop where ideas are transformed into finished products. Websites and mobile apps for you and your business.',
    },
    intro: {
      tagline: 'Bartosz Janiuk — Software Engineer',
      headline: 'Engineering Digital',
      roles: rolesEn,
      descriptionBefore:
        'I transform ideas into working digital products. I design and implement front-end applications, mobile apps, and back-end integrations.',
      descriptionAfter: "Currently, I'm focused on building accessible, human-centered products at",
      employer: {href: 'https://tsh.io/', label: 'The Software House'},
      primaryCta: {href: '#projects', label: "Let's start a project together"},
      scrollHint: scrollHintCopy.en,
    },
    about: {
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
        'Bartosz Janiuk, MSc. I am an experienced programmer who creates digital experiences that leave a lasting impression. I create interactive web applications (websites) and mobile apps. I combine modern technologies with creativity to create valuable products.',
        'I approach every project as a fusion of technology, business, and user experience. I create solutions that not only meet technical requirements but are also intuitive, aesthetically pleasing, and support business goals. I believe that the best products are created when functionality is combined with simplicity and attention to detail.',
        'I have experience in implementing projects at various stages of development – from the first MVP to complex applications developed over the years. I collaborate with clients to help them translate their business vision into scalable and refined digital solutions.',
      ],
      portraitImage: '/developer.webp',
      wideImage: '/developer.webp',
    },
    projectsSection: {
      eyebrow: '↳ SELECTED WORK',
      headline: [
        {text: 'Implementation '},
        {text: ' of projects', accent: true},
        {text: ' with attention'},
        {text: '  to every'},
        {text: ' detail.', accent: true},
      ] satisfies HeadlineSegment[],
      description:
        'A curated selection of product interfaces and platforms — from fitness and culinary tools to clinic experiences — focused on structure, interaction, and clarity.',
      seeAll: {href: '/projects', label: 'SEE ALL WORK'},
    },
    experienceSection: {
      eyebrow: '↳ MY EXPERIENCES',
      headline: [
        {text: 'LEARN ABOUT MY'},
        {text: 'PROFESSIONAL', accent: true},
        {text: ' JOURNEY, '},
        {text: 'COLLABORATIONS', accent: true},
        {text: ' AND PROJECT ROLES'},
      ] satisfies HeadlineSegment[],
      columnHeaders: experienceColumnHeaders.en,
    },
    techStackSection: {
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
    },
    faqSection: faqCopy.en,
    gotIdea: contactCopy.en,
  },
  pl: {
    seo: {
      title: 'Bartosz Janiuk — Software Engineer',
      description:
        'Cyfrowy warsztat, gdzie pomysł zostaje przekuty w gotowy produkt. Strony Internetowe, aplikacje mobilne dla Ciebie i Twojej firmy.',
    },
    intro: {
      tagline: 'Bartosz Janiuk — Software Engineer',
      headline: 'Cyfrowy warsztat',
      roles: rolesPl,
      descriptionBefore:
        'Przekuwam pomysły w działające produkty cyfrowe. Projektuję i wdrażam frontend, aplikacje mobilne oraz integracje backendowe',
      descriptionAfter: "Currently, I'm focused on building accessible, human-centered products at",
      employer: {href: 'https://tsh.io/', label: 'The Software House'},
      primaryCta: {href: '#projects', label: 'Rozpocznijmy wspólny projekt'},
      scrollHint: scrollHintCopy.pl,
    },
    about: {
      eyebrow: '↳ O MNIE',
      badgeText: 'DEVELOPMENT * WEB * MOBILE * PWA * SEO * UI/UX',
      headline: [
        {text: 'ŁĄCZĘ'},
        {text: ' KREATYWNOŚĆ', accent: true},
        {text: 'Z WIEDZĄ DO TWORZENIA', newLine: true},
        {text: 'WEBOWYCH & MOBILNYCH', accent: true},
        {text: ' APLIKACJI'},
        {text: ' KTÓRE MAJĄ'},
        {text: ' WARTOŚĆ', accent: true},
        {text: '.'},
      ] satisfies HeadlineSegment[],
      paragraphs: [
        'mgr inż. Bartosz Janiuk. Jestem doświadczonym programistą który zajmuję się tworzeniem cyfrowych doświadczeń, które pozostawiają trwałe wrażenie. Tworzę interaktywne aplikacje webowe (strony WWW) i aplikacje mobilne. Łączę nowoczesne technologie z kreatywnością, aby tworzyć wartościowe produkty.',
        'Każdy projekt traktuję jako połączenie technologii, biznesu i doświadczeń użytkownika. Tworzę rozwiązania, które nie tylko spełniają wymagania techniczne, ale także są intuicyjne, estetyczne i wspierają realizację celów biznesowych. Wierzę, że najlepsze produkty powstają wtedy, gdy funkcjonalność idzie w parze z prostotą i dbałością o detale.',
        'Posiadam doświadczenie w realizacji projektów na różnych etapach ich rozwoju – od pierwszego MVP po rozbudowane aplikacje rozwijane przez kolejne lata. Współpracuję z klientami, pomagając im przekładać wizję biznesową na skalowalne i dopracowane rozwiązania cyfrowe.',
      ],
      portraitImage: '/developer.webp',
      wideImage: '/developer.webp',
    },
    projectsSection: {
      eyebrow: '↳ WYRÓŻNIONE PROJEKTY',
      headline: [
        {text: 'Realizacja projektów'},
        {text: '  z dbałością', accent: true},
        {text: ' o każdy szczegół.'},
      ] satisfies HeadlineSegment[],
      description:
        'Starannie dobrany wybór interfejsów i platform produktów — od narzędzi fitness i kulinarnych po doświadczenia kliniczne — skupiający się na strukturze, interakcji i przejrzystości.',
      seeAll: {href: '/projects', label: 'ZOBACZ WIĘCEJ'},
    },
    experienceSection: {
      eyebrow: '↳ MOJE DOŚWIADCZENIE',
      headline: [
        {text: 'POZNAJ MOJE '},
        {text: 'DOŚWIADCZENIE', accent: true},
        {text: ' ZAWODOWE, '},
        {text: 'I ROLE'},
        {text: ' W PROJEKTACH', accent: true},
        {text: '.'},
      ] satisfies HeadlineSegment[],
      columnHeaders: experienceColumnHeaders.pl,
    },
    techStackSection: {
      eyebrow: '↳ MÓJ STACK TECHNOLOGICZNY',
      headline: [
        {text: 'PRACUJĘ Z'},
        {text: ' TECHNOLOGIAMI', accent: true},
        {text: ' KTÓRE POMAGAJĄ MI '},
        {text: 'TWORZYĆ', accent: true},
        {text: ' NIESAMOWITE', accent: true},
        {text: ' REZULTATY', accent: true},
        {text: '.'},
      ] satisfies HeadlineSegment[],
    },
    faqSection: faqCopy.pl,
    gotIdea: contactCopy.pl,
  },
} as const

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export const siteSettingsSeed = {
  brandName: 'bjaniuk.dev',
  navItems: [
    {href: '/', label: {en: 'Home'} satisfies LocalizedString},
    {href: '#projects', label: {en: 'Projects', pl: 'Projekty'} satisfies LocalizedString},
    {href: '#about', label: {en: 'About me', pl: 'O mnie'} satisfies LocalizedString},
    {
      href: '#experience',
      label: {en: 'Experience', pl: 'Doświadczenie'} satisfies LocalizedString,
    },
    {href: '#offer', label: {en: 'Offer', pl: 'Oferta'} satisfies LocalizedString},
    {href: '#contact', label: {en: 'Contact', pl: 'Kontakt'} satisfies LocalizedString},
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
  statusLabel: {en: 'open to work', pl: 'otwarty na pracę'} satisfies LocalizedString,
  person: {
    name: 'Bartosz Janiuk',
    url: 'https://bartoszjaniuk.pl',
    image: '/developer.webp',
    sameAs: [
      'https://github.com/bartoszjaniuk',
      'https://twitter.com/bartoszjaniuk',
      'https://linkedin.com/in/bartoszjaniuk',
    ],
    jobTitle: {en: 'Software Engineer'} satisfies LocalizedString,
    worksFor: 'Bartosz Janiuk',
  },
  websiteDescription: {
    en: 'Digital workshop where idea meets product. Mobile and web applications for your business.',
    pl: 'Cyfrowe studio, w którym pomysł staje się produktem. Aplikacje mobilne i webowe dla Twojej firmy.',
  } satisfies LocalizedString,
  ...footerChrome,
} as const

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const listedProjects = [
  {
    key: 'fitap',
    title: {en: 'Fitap'} satisfies LocalizedString,
    category: {
      en: 'Fitness App',
      pl: 'Aplikacja mobilna do wyszukiwania trenerów personalnych',
    } satisfies LocalizedString,
    image: '/projects/fitap.webp',
    href: '/projects',
    tint: 'bg-secondary',
    placement: 'md:top-0 md:left-[4%] lg:left-[0%]',
    sortOrder: 0,
  },
  {
    key: 'umami',
    title: {en: 'Umami'} satisfies LocalizedString,
    category: {en: 'Culinary Platform'} satisfies LocalizedString,
    image: '/projects/umami.webp',
    href: '/projects',
    tint: 'bg-muted',
    placement: 'md:top-[420px] md:right-[4%] lg:right-[0%]',
    sortOrder: 1,
  },
  {
    key: 'cookscale',
    title: {en: 'Cookscale'} satisfies LocalizedString,
    category: {
      en: 'Kitchen Tools with AI',
      pl: 'Aplikacja PWA - kalkulator obróki terminczej z AI',
    } satisfies LocalizedString,
    image: '/projects/cookscale.webp',
    href: '/projects',
    tint: 'bg-secondary',
    placement: 'md:top-[780px] md:left-[10%] lg:left-[0%]',
    sortOrder: 2,
  },
  {
    key: 'physio',
    title: {en: 'trebacz-fizjoterapia', pl: 'trebacz-fizjoterapia'} satisfies LocalizedString,
    category: {
      en: 'Company business card',
      pl: 'Wizytówka firmy',
    } satisfies LocalizedString,
    image: '/projects/physioterapy.webp',
    href: '/projects',
    tint: 'bg-muted',
    placement: 'md:top-[1180px] md:right-[6%] lg:right-[0%]',
    sortOrder: 3,
  },
  {
    key: 'dental',
    title: {en: 'Dental'} satisfies LocalizedString,
    category: {
      en: 'Dental Equipment - Quarterly Publishing House',
      pl: 'Sprzęt stomatologiczny - wydawnictwo kwartalnika',
    } satisfies LocalizedString,
    image: '/projects/stomatology.webp',
    href: '/projects',
    tint: 'bg-secondary',
    placement: 'md:top-[1560px] md:left-[6%] lg:left-0',
    sortOrder: 4,
  },
] as const

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experienceItems = [
  {
    key: 'tsh-mid',
    company: 'TSH',
    companyFull: {
      en: 'The Software House | Gliwice, Poland',
      pl: 'The Software House | Gliwice, Polska',
    } satisfies LocalizedString,
    companyUrl: 'https://tsh.io/',
    role: {en: 'Frontend Developer', pl: 'Frontend Developer'} satisfies LocalizedString,
    range: '09/2023 — PRESENT',
    sortOrder: 0,
    bullets: {
      en: [
        'Developing and maintaining scalable web and mobile applications using React and React Native.',
        'Designing and implementing new product features in collaboration with international, cross-functional teams.',
        'Creating reusable components and shared solutions to ensure consistency across web and mobile platforms.',
        'Participating in architectural discussions and making technical decisions that impact application scalability and maintainability.',
        'Collaboration on internal practices regarding front-end quality, testing, and maintainable component architecture.',
      ],
      pl: [
        'Tworzenie i utrzymywanie skalowalnych aplikacji internetowych i mobilnych przy użyciu React i React Native.',
        'Projektowanie oraz wdrażanie nowych funkcji produktu we współpracy z międzynarodowymi, wielofunkcyjnymi zespołami.',
        'Tworzenie reużywalnych komponentów i współdzielone rozwiązania, aby zapewnić spójność między platformami internetowymi i mobilnymi.',
        'Udział w dyskusjach na temat architektury oraz podejmowanie decyzji techniczne mające wpływ na skalowalność i łatwość utrzymania aplikacji.',
        'Współpraca przy wewnętrznych praktykach dotyczących jakości front-endu, testowania i łatwej w utrzymaniu architektury komponentów.',
      ],
    } satisfies LocalizedStrings,
  },
  {
    key: 'tsh-junior',
    company: 'The Software House',
    companyFull: {
      en: 'The Software House | Gliwice, Poland',
      pl: 'The Software House | Gliwice, Polska',
    } satisfies LocalizedString,
    companyUrl: 'https://tsh.io',
    role: {
      en: 'Junior Frontend Developer',
      pl: 'Junior Frontend Developer',
    } satisfies LocalizedString,
    range: '04/2022 — 09/2023',
    sortOrder: 1,
    bullets: {
      en: [
        'Co-creating a library of reusable UI components and documenting components using Storybook.',
        'Implementing new front-end features based on product and design requirements.',
        'Creating and maintaining unit, integration, and end-to-end tests to enhance application reliability.',
        'Code review and collaboration with other teams to raise standards and code quality.',
        "I received a promotion in recognition of my contribution to the platform's redevelopment.",
      ],
      pl: [
        'Współtworzenie biblioteki komponentów interfejsu użytkownika wielokrotnego użytku i dokumentacja kompnentów przy użyciu Storybook.',
        'Wdrażanie nowych funkcji front-endowych na podstawie wymagań produktu i projektu.',
        'Tworzenie i utrzymywanie testów jednostkowych, integracyjnych i kompleksowych w celu zwiększenia niezawodności aplikacji.',
        'Code review oraz współpraca z innymi zespołami w celu podnoszenia standarów oraz jakości kodu.',
        'Otrzymałem awans w uznaniu mojego wkładu w przebudowę platformy.',
      ],
    } satisfies LocalizedStrings,
  },
  {
    key: 'freelance',
    company: 'Freelance',
    companyFull: {
      en: 'Freelance | Racibórz, Poland',
      pl: 'Freelance | Racibórz, Polska',
    } satisfies LocalizedString,
    companyUrl: 'https://bartoszjaniuk.pl',
    role: {en: 'Frontend Engineer'} satisfies LocalizedString,
    range: '11/2021 — PRESENT',
    sortOrder: 2,
    bullets: {
      en: [
        'Designing and developing web applications for clients in the fields of dietetics, physiotherapy, and publishing.',
        'Building responsive, high-performance websites using Astro, Next.js, and modern front-end technologies.',
        'Creating interactive user experiences and animations using Framer Motion.',
        'Developing mobile applications using Expo and React Native.',
        "Implementing technical SEO improvements to enhance the website's visibility and performance in search engines.",
      ],
      pl: [
        'Projektowanie i tworzenie aplikacji internetowych dla klientów z branży zajmującej się dietetyką, fizjoterapią i wydawnictwem.',
        'Tworzenie responsywnych, wydajnych strony internetowe przy użyciu Astro, Next.js i nowoczesnych technologii front-end.',
        'Tworzenie interaktywnych doświadczeń użytkownika i animacji przy użyciu Framer Motion.',
        'Tworzenie aplikacji mobilnych z wykorzystaniem Expo i React Native.',
        'Wprowadzanie technicznych usprawnień SEO w celu zwiększenia widoczności witryny i jej wydajności w wyszukiwarkach.',
      ],
    } satisfies LocalizedStrings,
  },
  {
    key: 'codelabs',
    company: 'CODELABS',
    companyFull: {
      en: 'CODELABS.ROCKS | Opole, Poland',
      pl: 'CODELABS.ROCKS | Opole, Polska',
    } satisfies LocalizedString,
    companyUrl: 'https://codelabs.rocks',
    role: {
      en: 'Frontend Developer Intern',
      pl: 'Frontend Developer Staż',
    } satisfies LocalizedString,
    range: '08/2021 — 10/2021',
    sortOrder: 3,
    bullets: {
      en: [
        'Developing and enhancing customer-facing application features using Angular and RxJS.',
        'Creating reusable and responsive user interface components based on provided design specifications.',
        'Used Reactive programming patterns to manage asynchronous data flows and user interactions.',
        'Collaborating with developers and designers to deliver consistent and maintainable front-end solutions.',
        'Active participation in daily meetings, sprint planning, code reviews, and other Agile ceremonies.',
      ],
      pl: [
        'Opracowywanie i udoskonalanie funkcji aplikacji skierowanych do klientów przy użyciu Angular i RxJS.',
        'Tworzenie reużywalnych i responsywnych komponentów interfejsu użytkownika w oparciu o dostarczone specyfikacje projektowe.',
        'Wykorzystano wzorce programowania reaktywnego do zarządzania asynchronicznymi przepływami danych i interakcjami użytkowników.',
        'Współpraca z programistami i designerami w celu dostarczenia spójnych i łatwych w utrzymaniu rozwiązań front-end.',
        'Aktywnie uczestnictwo w codziennych spotkaniach, planowaniu sprintów, przeglądach kodu i innych ceremoniach Agile.',
      ],
    } satisfies LocalizedStrings,
  },
  {
    key: 'codefusion',
    company: 'CODEFUSION',
    companyFull: {
      en: 'CODEFUSION | Opole, Poland',
      pl: 'CODEFUSION | Opole, Polska',
    } satisfies LocalizedString,
    companyUrl: 'https://codefusion.pl',
    role: {
      en: 'Software Developer Intern',
      pl: 'Software Developer Staż',
    } satisfies LocalizedString,
    range: '09/2020 — 10/2020',
    sortOrder: 4,
    bullets: {
      en: [
        'Work on a Visual Studio extension that enables reading and displaying project plans (roadmaps).',
        'Implementing functionality using C# and the .NET framework.',
        'Participating in daily meetings, code reviews, and project development activities.',
      ],
      pl: [
        'Praca na rozszerzeniem do Visual Studio umożliwiające odczytywanie i wyświetlanie planów projektu (ROADMAPY).',
        'Wrażanie funkcjonalności przy użyciu języka C# i środowiska .NET',
        'Branie udziału w codziennych spotkaniach, code review i działaniach związanych z rozwojem projektowym',
      ],
    } satisfies LocalizedStrings,
  },
] as const

// ---------------------------------------------------------------------------
// Tech stack copy (logos stay in seed-homepage.ts)
// ---------------------------------------------------------------------------

export const techStackCopyByLocale = {
  en: homePageByLocale.en.techStackSection,
  pl: homePageByLocale.pl.techStackSection,
} as const

export const techItemCopy = {
  nextjs: {
    name: '',
    description: {
      en: 'I build fast web applications using App Router, SSR, and Core Web Vitals optimization—ranging from landing pages to complex product platforms.',
      pl: 'Buduję szybkie aplikacje webowe z App Router, SSR i optymalizacją pod Core Web Vitals — od landing page po złożone platformy produktowe.',
    } satisfies LocalizedString,
    tags: {
      en: ['APP ROUTER', 'SSR / SSG', 'PERFORMANCE', 'SERVER COMPONENTS', 'EDGE DEPLOYMENT'],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'A Next.js-based architecture allows me to combine rendering speed with a flexible data model—without compromising on UX.',
        pl: 'Architektura oparta na Next.js pozwala mi łączyć szybkość renderowania z elastycznym modelem danych — bez kompromisów w UX.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Frontend Engineer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I deploy and scale Next.js projects with a focus on load speed and production stability.',
        pl: 'Deployuję i skaluję projekty Next.js z naciskiem na szybkość ładowania i stabilność w produkcji.',
      } satisfies LocalizedString,
      href: '#projects',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
  astro: {
    name: '',
    description: {
      en: 'I build lightweight content-driven sites using the islands architecture—minimal JavaScript, fast SSR, and flexible integration with React, Vue, or Svelte.',
      pl: 'Tworzę lekkie strony contentowe z architekturą islands — minimalny JavaScript, szybki SSR i elastyczna integracja z React, Vue czy Svelte.',
    } satisfies LocalizedString,
    tags: {
      en: ['ISLANDS ARCHITECTURE', 'CONTENT SITES', 'ZERO JS', 'SSR / SSG', 'PERFORMANCE'],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'Astro is my choice for marketing sites and blogs—it renders only what is necessary, and the rest loads on demand.',
        pl: 'Astro to mój wybór dla stron marketingowych i blogów — renderuje tylko to, co potrzebne, a reszta ładuje się na żądanie.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Frontend Engineer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I implement Astro projects with a focus on performance, SEO, and a simple content pipeline.',
        pl: 'Wdrażam projekty Astro z naciskiem na wydajność, SEO i prosty pipeline contentowy.',
      } satisfies LocalizedString,
      href: '#projects',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
  'react-native': {
    name: 'React Native',
    description: {
      en: 'I build mobile apps with a native feel—from prototypes to production deployments within the Expo and React Native ecosystem.',
      pl: "Tworzę aplikacje mobilne z natywnym feel'em — od prototypów po produkcyjne wdrożenia w ekosystemie Expo i React Native.",
    } satisfies LocalizedString,
    tags: {
      en: ['REACT NATIVE', 'EXPO', 'MOBILE', 'IOS', 'ANDROID', 'APP STORE READY'],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'Mobile products need to be fast and predictable—React Native gives me a single codebase and a consistent experience across iOS and Android.',
        pl: 'Mobilne produkty muszą być szybkie i przewidywalne — React Native daje mi jeden codebase i spójne doświadczenie na iOS i Android.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Mobile Developer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I combine React Native with a modern backend and a design system to make the mobile experience a natural extension of the web product.',
        pl: 'Łączę React Native z nowoczesnym backendem i design systemem, żeby mobile było naturalnym rozszerzeniem produktu webowego.',
      } satisfies LocalizedString,
      href: '#projects',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
  typescript: {
    name: 'TypeScript',
    description: {
      en: 'I prioritize typing from day one—secure APIs, clear contracts, and fewer regressions in growing codebases.',
      pl: "Stawiam na typowanie od pierwszego dnia — bezpieczne API, czytelne kontrakty i mniej regresji w rosnących codebase'ach.",
    } satisfies LocalizedString,
    tags: {
      en: ['TYPE SAFETY', 'SHARED TYPES', 'STRICT MODE', 'API CONTRACTS', 'MAINTAINABILITY'],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'TypeScript is my standard for every project—types document intent and reduce debugging time for the team.',
        pl: 'TypeScript to mój standard w każdym projekcie — typy dokumentują intencje i skracają czas debugowania w zespole.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Full-Stack Engineer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I design data models and interfaces that scale with the product—from MVP to long-term development.',
        pl: 'Projektuję modele danych i interfejsy, które skalują się wraz z produktem — od MVP po długoterminowy rozwój.',
      } satisfies LocalizedString,
      href: '/workbench',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
  nodejs: {
    name: '',
    description: {
      en: 'I build scalable backends within the Node.js ecosystem—REST, GraphQL, authorization, and integrations with databases and cloud services.',
      pl: 'Buduję skalowalne backendy w ekosystemie Node.js — REST, GraphQL, autoryzacja i integracje z bazami danych oraz usługami chmurowymi.',
    } satisfies LocalizedString,
    tags: {
      en: ['REST API', 'GRAPHQL', 'EVENT-DRIVEN', 'AUTH', 'DATABASES', 'CLOUD INTEGRATIONS'],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'Node.js gives me a single language—from the API to operational scripts—enabling rapid iteration and a consistent stack across the entire project.',
        pl: 'Node.js daje mi jeden język od API po skrypty operacyjne — szybkie iteracje i spójny stack w całym projekcie.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Backend Engineer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I design APIs for real-world loads—ranging from simple endpoints to complex systems involving queues and caching.',
        pl: "Projektuję API pod realne obciążenie — od prostych endpointów po złożone systemy z kolejkami i cache'owaniem.",
      } satisfies LocalizedString,
      href: '#projects',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
  nestjs: {
    name: '',
    description: {
      en: 'I design backends in Nest.js using a modular architecture—featuring dependency injection, guards, pipes, and a predictable structure that scales from MVP to production.',
      pl: 'Projektuję backendy w Nest.js z modułową architekturą — dependency injection, guardy, pipes i przewidywalna struktura od MVP do produkcji.',
    } satisfies LocalizedString,
    tags: {
      en: [
        'NEST MODULES',
        'DEPENDENCY INJECTION',
        'GUARDS & PIPES',
        'REST API',
        'GRAPHQL',
        'MICROSERVICES',
      ],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'Nest.js gives me a predictable backend structure—dependency injection, modules, and guards shorten the time from prototype to production.',
        pl: 'Nest.js daje mi przewidywalną strukturę backendu — dependency injection, moduły i guardy skracają czas od prototypu do produkcji.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Backend Engineer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I am building a modular API in Nest.js—from authorization and validation to integrations with queues and databases.',
        pl: 'Buduję modułowe API w Nest.js — od autoryzacji i walidacji po integracje z kolejkami i bazami danych.',
      } satisfies LocalizedString,
      href: '#projects',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
  sanity: {
    name: '',
    description: {
      en: 'I implement headless CMS solutions using Sanity—covering content modeling, Sanity Studio, GROQ, and preview mode for content-driven applications.',
      pl: 'Wdrażam headless CMS z Sanity — modelowanie treści, Sanity Studio, GROQ i preview mode dla content-driven aplikacji.',
    } satisfies LocalizedString,
    tags: {
      en: [
        'HEADLESS CMS',
        'CONTENT MODELING',
        'GROQ',
        'SANITY STUDIO',
        'PREVIEW MODE',
        'STRUCTURED CONTENT',
      ],
    } satisfies LocalizedStrings,
    testimonial: {
      quote: {
        en: 'Sanity allows the content team to work independently of developers—enabling structured content and rapid iterations without code deployments.',
        pl: 'Sanity pozwala zespołowi contentowemu pracować niezależnie od developera — strukturalne treści i szybkie iteracje bez deployu kodu.',
      } satisfies LocalizedString,
      author: {en: 'Bartosz Janiuk'} satisfies LocalizedString,
      role: {en: 'Full-Stack Engineer'} satisfies LocalizedString,
    },
    cta: {
      description: {
        en: 'I integrate Sanity with Next.js—covering everything from content schemas to live preview and optimized GROQ queries for production.',
        pl: 'Łączę Sanity z Next.js — od schematów treści po live preview i optymalne zapytania GROQ w produkcji.',
      } satisfies LocalizedString,
      href: '#projects',
      label: {en: 'Learn more', pl: 'Dowiedz się więcej'} satisfies LocalizedString,
    },
  },
} as const
