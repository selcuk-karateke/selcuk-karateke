/** Kontakt & Lebenslauf — abgestimmt auf Bewerbungsmappe (Stand 05/2026). */

export const profileContact = {
  name: 'Selçuk Karateke',
  title: 'Fachinformatiker — Anwendungsentwicklung',
  street: 'Möckernstraße 115',
  city: '10963 Berlin',
  phone: '030 91479680',
  phoneHref: 'tel:+493091479680',
  mobile: '0177 4616695',
  mobileHref: 'tel:+491774616695',
  email: 'selcuk.karateke@live.de',
  birthDate: '18.01.1983',
  birthPlace: 'Berlin',
  nationality: 'deutsch / türkisch',
  portfolioUrl: 'https://selcuk.karateke.org/',
  linkedInUrl: 'https://www.linkedin.com/in/selcuk-karateke/',
  companyUrl: 'https://kawai-labs.com/',
} as const

export interface ProfileExperience {
  id: string
  company: string
  position: string
  description: string
  period: string
  startDate: string
  endDate?: string
  current?: boolean
  location: string
}

/** Neueste Station zuerst (wie im Lebenslauf). */
export const profileExperience: ProfileExperience[] = [
  {
    id: 'kawai',
    company: 'Kawai Labs',
    position: 'Freiberuflicher Entwickler / Firmenleistung',
    description:
      'Selbstständige Softwareentwicklung, Beratung und Projektabwicklung. Ergänzend Dienstleistungen für Unternehmen über Kawai Labs.',
    period: '02/2025 – heute',
    startDate: '2025-02',
    current: true,
    location: 'Berlin',
  },
  {
    id: 'bagobag',
    company: 'bagobag GmbH',
    position: 'PHP-Entwickler und Produktmanager',
    description:
      'PHP-Webanwendungen, Produktmanagement, HTML5, Schnittstellen und teamübergreifende Projektarbeit.',
    period: '03/2021 – 02/2026',
    startDate: '2021-03',
    endDate: '2026-02',
    location: 'Berlin',
  },
  {
    id: 'ore',
    company: 'ORE Group',
    position: 'Software-Entwicklung und Netzwerkadministration',
    description: 'Entwicklung und Betrieb von IT-Systemen, Netzwerkadministration.',
    period: '02/2020',
    startDate: '2020-02',
    endDate: '2020-02',
    location: 'Berlin',
  },
  {
    id: 'giata',
    company: 'Giata GmbH',
    position: 'PHP-Entwickler und Projektassistent',
    description: 'PHP-Entwicklung und Unterstützung bei Kundenprojekten.',
    period: '08/2019 – 01/2020',
    startDate: '2019-08',
    endDate: '2020-01',
    location: 'Berlin',
  },
  {
    id: 'comhard',
    company: 'Comhard GmbH',
    position: 'Umschulung Fachinformatiker (Anwendungsentwicklung)',
    description:
      'IHK-Abschluss Fachinformatiker Anwendungsentwicklung. 2.640 Std. in 9 Modulen — Wirtschaft, Kommunikation, IT-Systeme, Netzwerke, Anwendungsentwicklung (Java, C#, PHP, HTML/CSS, Datenbanken), Projektarbeit und Betriebspraktikum.',
    period: '11/2016 – 01/2019',
    startDate: '2016-11',
    endDate: '2019-01',
    location: 'Berlin',
  },
]

export const profileSkills = [
  'PHP',
  'JavaScript',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Laravel',
  'Vue',
  'React',
  'SQL',
  'MySQL',
  'HTML5',
  'CSS',
  'SASS',
  'Java',
  'C#',
  'Python',
  'REST',
  'OOP',
  'MVC',
  'Git',
  'SVN',
  'Linux',
  'Shopware 6',
  'Shopify',
  'Inkscape',
  'GIMP',
  'Blender',
] as const

export const profileLanguages = [
  { name: 'Deutsch', level: 'Muttersprache' },
  { name: 'Türkisch', level: 'Muttersprache' },
  { name: 'Englisch', level: 'Fließend' },
] as const

export const trainingOverview = {
  totalHours: 2640,
  modules: 9,
  years: 3,
  certification: 'IHK',
} as const
