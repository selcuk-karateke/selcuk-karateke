import type { EducationSubEntry, PracticeTask } from '@/types/education'

export interface FloorEnrichmentConfig {
  hiddenEntryIds?: string[]
  hiddenSectionIds?: string[]
  sectionIntros?: Record<string, string>
  entryPatches?: Record<string, Partial<EducationSubEntry>>
  proseHtmlPatches?: Record<string, string>
  prosePractice?: Record<string, PracticeTask>
  proseFigures?: Record<string, string>
  /** Eingefügte Abschnitte (z. B. Dreisatz-Grundformel). */
  insertSections?: Array<{
    beforeSectionId: string
    section: { id: string; title: string; html: string; practice?: PracticeTask }
  }>
  /** Patch auf Einträge vor Anwendung der Patches (z. B. Primzahlen-Liste). */
  patchEntry?: (entry: EducationSubEntry) => EducationSubEntry
}
