import fs from 'fs'
import path from 'path'
import { enrichExercise } from '@/data/exerciseEnrichment'
import { getExercise } from '@/data/exerciseCatalog'
import type { ProseEducationFloor } from '@/types/education'

export function loadExerciseContent(slug: string): ProseEducationFloor | null {
  const meta = getExercise(slug)
  if (!meta) return null

  const jsonPath = path.join(
    process.cwd(),
    'content',
    'exercises',
    meta.source,
    `${slug}.json`
  )

  const empty: ProseEducationFloor = {
    kind: 'prose',
    entryId: 0,
    sections: [],
    toc: [],
    headings: [],
  }

  if (!fs.existsSync(jsonPath)) {
    return enrichExercise(empty, slug)
  }

  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as ProseEducationFloor
  return enrichExercise(raw, slug)
}

export function loadExerciseRawHtml(slug: string): string | null {
  const meta = getExercise(slug)
  if (!meta) return null

  const file = path.join(
    process.cwd(),
    'content',
    'legacy',
    meta.source,
    `${meta.legacyRoute}.html`
  )
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf8')
}
