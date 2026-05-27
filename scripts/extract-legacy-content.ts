import { legacyRoutes } from '../src/data/legacyRoutes'
import { exerciseCatalogAsLegacyRoutes } from '../src/data/exerciseCatalog'
import {
  processLegacyFileContent,
  resolveLegacyPhpPath,
  writeBundledLegacyContent,
} from '../src/lib/legacyContent'
import fs from 'fs'

const routes = [
  ...legacyRoutes,
  ...exerciseCatalogAsLegacyRoutes().filter(
    (ex) => !legacyRoutes.some((r) => r.source === ex.source && r.route === ex.route)
  ),
]

let extracted = 0
let missing = 0

for (const route of routes) {
  const phpPath = resolveLegacyPhpPath(route)
  if (!phpPath) {
    console.warn(`[skip] ${route.source}/${route.route} — source not found`)
    missing++
    continue
  }

  const raw = fs.readFileSync(phpPath, 'utf8')
  const html = processLegacyFileContent(raw, route)
  writeBundledLegacyContent(route, html)
  console.log(`[ok] ${route.source}/${route.route} (${html.length} chars)`)
  extracted++
}

console.log(`\nDone: ${extracted} extracted, ${missing} missing.`)
