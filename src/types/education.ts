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
}

export interface EducationSection {
  title: string
  entries: EducationSubEntry[]
}

export interface StructuredEducationFloor {
  kind: 'structured'
  entryId: number
  sections: EducationSection[]
  introHeadings: string[]
}

export interface ProseEducationFloor {
  kind: 'prose'
  entryId: number
  sections: { id: string; title: string; html: string }[]
  toc: { href: string; label: string }[]
  headings: string[]
}

export type EducationFloorData = StructuredEducationFloor | ProseEducationFloor
