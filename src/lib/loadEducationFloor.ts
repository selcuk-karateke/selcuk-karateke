import fs from 'fs'
import path from 'path'
import type { EducationFloorData } from '@/types/education'

export function loadEducationFloorData(
  source: 'portfolio' | 'own_website',
  floorId: string
): EducationFloorData | null {
  const jsonPath = path.join(process.cwd(), 'content', 'education', source, `${floorId}.json`)
  if (!fs.existsSync(jsonPath)) return null
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as EducationFloorData
}
