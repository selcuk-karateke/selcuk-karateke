import { math1stFloorEnrichment } from '@/data/educationEnrichment/math1stFloor'
import { vocab2ndFloorEnrichment } from '@/data/educationEnrichment/vocab2ndFloor'
import {
  dbEnrichment,
  eeEnrichment,
  lawEnrichment,
  mergeEnrichment,
  networkEnrichment,
  swlEnrichment,
} from '@/data/educationEnrichment/shared'
import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'

const vocab2nd = vocab2ndFloorEnrichment

export const portfolioFloorEnrichment: Record<string, FloorEnrichmentConfig> = {
  '1stFloor': math1stFloorEnrichment,
  '2ndFloor': vocab2nd,
  '3rdFloor': mergeEnrichment(swlEnrichment),
  '4thFloor': mergeEnrichment(lawEnrichment),
  '5thFloor': mergeEnrichment(networkEnrichment),
  '6thFloor': mergeEnrichment(eeEnrichment),
  '7thFloor': {},
  '8thFloor': mergeEnrichment(dbEnrichment),
  '9thFloor': {},
  '10thFloor': {},
}
