import fs from 'fs'
import path from 'path'
import { enrichExercise } from '@/data/exerciseEnrichment'
import { applyAutoExerciseEnrichment } from '@/lib/autoEnrichExercise'
import type { ProseEducationFloor } from '@/types/education'

export function loadExerciseContent(slug: string): ProseEducationFloor | null {
  const jsonPath = path.join(process.cwd(), 'content', 'exercises', 'portfolio', `${slug}.json`)
  if (!fs.existsSync(jsonPath)) {
    const empty: ProseEducationFloor = {
      kind: 'prose',
      entryId: 0,
      sections: [],
      toc: [],
      headings: [],
    }
    return applyAutoExerciseEnrichment(enrichExercise(empty, slug), slug)
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as ProseEducationFloor
  return applyAutoExerciseEnrichment(enrichExercise(raw, slug), slug)
}

export function loadExerciseRawHtml(slug: string): string | null {
  const htmlPath = path.join(process.cwd(), 'content', 'legacy', 'portfolio', `${slug.replace(/-/g, '/')}.html`)
  // fallback: read from legacy content path by route
  const legacyPaths: Record<string, string> = {
    index: 'exer/index',
    buecheranzeige: 'exer/buecheranzeige',
    buechererfassung: 'exer/buechererfassung',
    pdotest: 'exer/pdotest',
    'exer-11': 'exer/exer_11/index',
    galerie: 'exer/galerie/index',
    'galerie-upload': 'exer/galerie/upload',
    'news-test': 'exer/news/test',
  }
  const route = legacyPaths[slug]
  if (!route) return null
  const file = path.join(process.cwd(), 'content', 'legacy', 'portfolio', `${route}.html`)
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf8')
}
