import { legacyRoutes } from '../src/data/legacyRoutes'
import {
  processLegacyFileContent,
  resolveLegacyPhpPath,
  writeBundledLegacyContent,
} from '../src/lib/legacyContent'
import fs from 'fs'

let extracted = 0
let missing = 0

for (const route of legacyRoutes) {
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
