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

const bwlIntro: FloorEnrichmentConfig = {
  insertSections: [
    {
      beforeSectionId: '__none__',
      section: {
        id: 'bwl-grundlagen',
        title: 'BWL — Überblick',
        html: '<p>Grundbegriffe: Bedarf, Angebot, Kosten, Erlöse, Gewinn. Nutze die Abschnitte unten oder die Übungsaufgabe zum Einstieg.</p>',
        practice: {
          prompt: 'Erkläre den Unterschied zwischen <strong>fixen</strong> und <strong>variablen</strong> Kosten.',
          solution:
            'Fix: unabhängig von der Menge (z. B. Miete). Variabel: hängen von der Produktionsmenge ab (z. B. Material).',
        },
      },
    },
  ],
}

export const ownWebsiteFloorEnrichment: Record<string, FloorEnrichmentConfig> = {
  '1stFloor': math1stFloorEnrichment,
  '2ndFloor': bwlIntro,
  '3rdFloor': mergeEnrichment(bwlIntro, swlEnrichment),
  '4thFloor': mergeEnrichment(lawEnrichment),
  '5thFloor': mergeEnrichment(swlEnrichment),
  '6thFloor': mergeEnrichment(networkEnrichment),
  '7thFloor': mergeEnrichment(eeEnrichment),
  '8thFloor': mergeEnrichment(dbEnrichment),
  '9thFloor': bwlIntro,
  '10thFloor': {},
  '11thFloor': bwlIntro,
  '12thFloor': {},
}
