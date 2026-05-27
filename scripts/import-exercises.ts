import fs from 'fs'
import path from 'path'
import { exerciseCatalog } from '../src/data/exerciseCatalog'
import { resolveLegacyPhpPath, processLegacyFileContent } from '../src/lib/legacyContent'
import type { LegacyRoute } from '../src/data/legacyRoutes'
import { parseProseEducationHtml } from '../src/lib/parseProseEducation'

const OUT_ROOT = path.join(process.cwd(), 'content', 'exercises')

for (const ex of exerciseCatalog) {
  const route: LegacyRoute = {
    id: `ex-${ex.source}-${ex.slug}`,
    source: ex.source,
    route: ex.legacyRoute,
    sourcePath: `l:/repos/${ex.source === 'portfolio' ? 'portfolio' : 'own_website'}/${ex.legacyRoute}.php`,
    title: ex.title,
    feature: ex.feature,
  }

  const phpPath = resolveLegacyPhpPath(route)
  if (!phpPath) {
    console.warn(`[skip] ${ex.slug} — ${ex.legacyRoute}.php not found`)
    continue
  }

  const raw = fs.readFileSync(phpPath, 'utf8')
  const html = processLegacyFileContent(raw, route)
  const data = parseProseEducationHtml(html, 0)

  const outDir = path.join(OUT_ROOT, ex.source)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, `${ex.slug}.json`), JSON.stringify(data, null, 2), 'utf8')
  console.log(`[ok] ${ex.source}/${ex.slug}: ${data.sections.length} sections`)
}

console.log(`Done — ${exerciseCatalog.length} catalog entries, written to content/exercises/`)
