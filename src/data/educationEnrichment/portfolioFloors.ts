import { math1stFloorEnrichment } from '@/data/educationEnrichment/math1stFloor'
import {
  dbEnrichment,
  eeEnrichment,
  lawEnrichment,
  mergeEnrichment,
  networkEnrichment,
  swlEnrichment,
} from '@/data/educationEnrichment/shared'
import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'

const vocab2nd: FloorEnrichmentConfig = {
  hiddenSectionIds: ['col1'],
  insertSections: [
    {
      beforeSectionId: 'col1',
      section: {
        id: 'vokabel-lernen',
        title: 'Vokabeln lernen',
        html: '<p>Karteikarten, laut lesen, Beispielsätze, regelmäßige Wiederholung.</p>',
        practice: {
          prompt: 'Bilde einen Satz mit <strong>achieve</strong>.',
          solution: '<em>I want to achieve my goals.</em>',
        },
      },
    },
  ],
}

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
