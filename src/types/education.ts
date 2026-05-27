export interface PracticeTask {
  prompt: string
  hint?: string
  solution: string
}

export interface EducationSubEntry {
  id: string
  subtitle: string
  description?: string
  formula?: string
  supplement?: string
  question?: string
  calculation?: string
  answer?: string
  note?: string
  imageSrc?: string
  imageAlt?: string
  tableHtml?: string
  practice?: PracticeTask
}

export interface EducationSection {
  title: string
  entries: EducationSubEntry[]
  /** Absatz direkt unter der Abschnitts-Überschrift (z. B. Dreisatz-Grundformel). */
  introHtml?: string
}

export interface StructuredEducationFloor {
  kind: 'structured'
  entryId: number
  sections: EducationSection[]
  introHeadings: string[]
}

export interface ProseSection {
  id: string
  title: string
  html: string
  practice?: PracticeTask
  /** SVG-Skizze aus Anreicherung (z. B. ee-series, topo-bus). */
  figureId?: string
}

export interface ProseEducationFloor {
  kind: 'prose'
  entryId: number
  sections: ProseSection[]
  toc: { href: string; label: string }[]
  headings: string[]
}

export type EducationFloorData = StructuredEducationFloor | ProseEducationFloor
