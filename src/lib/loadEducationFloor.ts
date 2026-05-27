import fs from 'fs'
import path from 'path'
import { enrichEducationFloor } from '@/lib/enrichEducationFloor'
import type { EducationFloorData } from '@/types/education'

export function loadEducationFloorData(
  source: 'portfolio' | 'own_website',
  floorId: string
): EducationFloorData | null {
  const jsonPath = path.join(process.cwd(), 'content', 'education', source, `${floorId}.json`)
  if (!fs.existsSync(jsonPath)) return null
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as EducationFloorData
  return enrichEducationFloor(raw, floorId, source)
}
