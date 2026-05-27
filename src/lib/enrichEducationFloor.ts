import { getEducationEnrichment } from '@/data/educationEnrichment'
import { applyAutoEducationEnrichment } from '@/lib/autoEnrichEducation'
import { applyEducationEnrichment } from '@/lib/applyEducationEnrichment'
import type { EducationFloorData } from '@/types/education'

export function enrichEducationFloor(
  data: EducationFloorData,
  floorId: string,
  source: 'portfolio' | 'own_website' = 'portfolio'
): EducationFloorData {
  const config = getEducationEnrichment(source, floorId)
  const manual = applyEducationEnrichment(data, config)
  return applyAutoEducationEnrichment(manual, floorId, source)
}
