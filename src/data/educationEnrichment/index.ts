import { ownWebsiteFloorEnrichment } from '@/data/educationEnrichment/ownWebsiteFloors'
import { portfolioFloorEnrichment } from '@/data/educationEnrichment/portfolioFloors'
import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'

export function getEducationEnrichment(
  source: 'portfolio' | 'own_website',
  floorId: string
): FloorEnrichmentConfig | undefined {
  const map = source === 'portfolio' ? portfolioFloorEnrichment : ownWebsiteFloorEnrichment
  return map[floorId]
}
