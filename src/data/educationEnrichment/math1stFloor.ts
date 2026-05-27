import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'
import {
  MATH_1_ENTRY_PATCHES,
  MATH_1_PROSE_HTML_PATCHES,
  MATH_1_PROSE_PRACTICE,
  MATH_1_SECTION_INTROS,
} from '@/data/education1stFloorEnrichment'
import type { EducationSubEntry } from '@/types/education'

export const math1stFloorEnrichment: FloorEnrichmentConfig = {
  hiddenEntryIds: ['test'],
  hiddenSectionIds: ['test'],
  sectionIntros: MATH_1_SECTION_INTROS,
  entryPatches: MATH_1_ENTRY_PATCHES,
  proseHtmlPatches: MATH_1_PROSE_HTML_PATCHES,
  prosePractice: MATH_1_PROSE_PRACTICE,
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
  patchEntry(entry: EducationSubEntry) {
    if (entry.id !== 'pzahlen' || !entry.description) return entry
    return {
      ...entry,
      description: entry.description
        .replace(/2; 3; 5; 7; 9; 11/, '2; 3; 5; 7; 11')
        .replace(
          /= alle Zahlen, die nur durch sich selbst teilbar sind/,
          '= alle Zahlen &gt; 1, die nur durch 1 und sich selbst teilbar sind'
        ),
    }
  },
}
