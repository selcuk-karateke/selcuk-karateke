import fs from 'fs'
import path from 'path'
import { ownWebsiteFloors, portfolioEducationFloors } from '../src/data/educationFloors'
import { resolveLegacyPhpPath, processLegacyFileContent } from '../src/lib/legacyContent'
import type { LegacyRoute } from '../src/data/legacyRoutes'
import { parseStructuredEducationHtml } from '../src/lib/parseStructuredEducation'
import { parseProseEducationHtml } from '../src/lib/parseProseEducation'
import type { EducationFloorData } from '../src/types/education'

const STRUCTURED_FLOORS = new Set(['1stFloor'])

function importFloors(
  source: 'portfolio' | 'own_website',
  floors: typeof portfolioEducationFloors
) {
  const outDir = path.join(process.cwd(), 'content', 'education', source)
  const basePath = source === 'portfolio' ? 'l:/repos/portfolio' : 'l:/repos/own_website'

  for (let i = 0; i < floors.length; i++) {
    const floor = floors[i]
    const entryId = i + 1
    const route: LegacyRoute = {
      id: `import-${floor.id}`,
      source,
      route: floor.legacyRoute,
      sourcePath: `${basePath}/${floor.legacyRoute}.php`,
      title: floor.title,
      feature: 'none',
    }

    const phpPath = resolveLegacyPhpPath(route)
    if (!phpPath) {
      console.warn(`[skip] ${source}/${floor.id} — PHP not found`)
      continue
    }

    const raw = fs.readFileSync(phpPath, 'utf8')
    const html = processLegacyFileContent(raw, route)

    let data: EducationFloorData

    if (STRUCTURED_FLOORS.has(floor.id) && source === 'portfolio') {
      const { sections, introHeadings } = parseStructuredEducationHtml(html)
      data = { kind: 'structured', entryId, sections, introHeadings }
      console.log(
        `[structured] ${source}/${floor.id}: ${sections.length} sections, ${sections.reduce((n, s) => n + s.entries.length, 0)} cards`
      )
    } else {
      data = parseProseEducationHtml(html, entryId)
      console.log(`[prose] ${source}/${floor.id}: ${data.sections.length} sections`)
    }

    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, `${floor.id}.json`), JSON.stringify(data, null, 2), 'utf8')
  }
}

importFloors('portfolio', portfolioEducationFloors)
importFloors('own_website', ownWebsiteFloors)

console.log('Done — content/education/{portfolio,own_website}/')
