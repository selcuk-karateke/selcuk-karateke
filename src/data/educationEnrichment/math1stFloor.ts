import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'
import {
  MATH_1_HIDDEN_ENTRY_IDS,
  MATH_1_PROSE_HTML_PATCHES,
  MATH_1_SECTION_INTROS,
  patchMath1Entry,
} from '@/data/education1stFloorEnrichment'
import type { PracticeTask } from '@/types/education'

const MATH_1_PROSE_PRACTICE: Record<string, PracticeTask> = {
  'dreisatz-grund': {
    prompt:
      'Mit 3 Arbeitern dauert eine Aufgabe 8 h. Wie lange brauchen 6 Arbeiter (antiproportional)?',
    solution: '`t = 8 * 3 / 6 = 4 Stunden`.',
  },
}

export const math1stFloorEnrichment: FloorEnrichmentConfig = {
  hiddenEntryIds: [...MATH_1_HIDDEN_ENTRY_IDS],
  hiddenSectionIds: ['test'],
  sectionIntros: MATH_1_SECTION_INTROS,
  proseHtmlPatches: MATH_1_PROSE_HTML_PATCHES,
  prosePractice: MATH_1_PROSE_PRACTICE,
  patchEntry: patchMath1Entry,
  insertSections: [
    {
      beforeSectionId: 'proportional',
      section: {
        id: 'dreisatz-grund',
        title: 'Dreisatz – Grundformel',
        html: MATH_1_SECTION_INTROS.Dreisatz ?? '',
        practice: MATH_1_PROSE_PRACTICE['dreisatz-grund'],
      },
    },
  ],
}
