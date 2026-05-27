import fs from 'fs'
import path from 'path'
import { getEducationFloor } from '@/data/educationFloors'

export function loadEducationRawHtml(
  source: 'portfolio' | 'own_website',
  floorId: string
): string | null {
  const meta = getEducationFloor(source, floorId)
  if (!meta) return null

  const htmlPath = path.join(
    process.cwd(),
    'content',
    'legacy',
    source,
    `${meta.legacyRoute}.html`
  )
  if (!fs.existsSync(htmlPath)) return null
  return fs.readFileSync(htmlPath, 'utf8')
}
