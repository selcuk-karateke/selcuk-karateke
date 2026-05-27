import fs from 'fs'
import path from 'path'
import type { ProseEducationFloor } from '@/types/education'

export function loadExerciseContent(slug: string): ProseEducationFloor | null {
  const jsonPath = path.join(process.cwd(), 'content', 'exercises', 'portfolio', `${slug}.json`)
  if (!fs.existsSync(jsonPath)) return null
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as ProseEducationFloor
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
