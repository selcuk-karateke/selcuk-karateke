import fs from 'fs'
import path from 'path'
import { portfolioExercises } from '../src/data/exercises'
import { resolveLegacyPhpPath, processLegacyFileContent } from '../src/lib/legacyContent'
import type { LegacyRoute } from '../src/data/legacyRoutes'
import { parseProseEducationHtml } from '../src/lib/parseProseEducation'

const OUT_DIR = path.join(process.cwd(), 'content', 'exercises', 'portfolio')

for (const ex of portfolioExercises) {
  const route: LegacyRoute = {
    id: `ex-${ex.slug}`,
    source: 'portfolio',
    route: ex.legacyRoute,
    sourcePath: `l:/repos/portfolio/${ex.legacyRoute}.php`,
    title: ex.title,
    feature: ex.feature,
  }

  const phpPath = resolveLegacyPhpPath(route)
  if (!phpPath) {
    console.warn(`[skip] ${ex.slug}`)
    continue
  }

  const raw = fs.readFileSync(phpPath, 'utf8')
  const html = processLegacyFileContent(raw, route)
  const data = parseProseEducationHtml(html, 0)

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(path.join(OUT_DIR, `${ex.slug}.json`), JSON.stringify(data, null, 2), 'utf8')
  console.log(`[ok] ${ex.slug}: ${data.sections.length} sections, ${html.length} chars raw`)
}

console.log('Exercises written to content/exercises/portfolio/')
