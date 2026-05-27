import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'
import type { PracticeTask } from '@/types/education'

const eePractice = {
  reihe: {
    prompt:
      'Reihenschaltung: `R_1 = 100 Ω`, `R_2 = 220 Ω`, `U = 12 V`. Berechne `R_(GES)` und `I`.',
    solution: '`R_(GES) = 320 Ω`, `I = U / R_(GES) ≈ 0,0375 A`.',
  },
  parallel: {
    prompt:
      'Parallelschaltung: `R_1 = 100 Ω`, `R_2 = 200 Ω`, `U = 12 V`. Berechne `R_(GES)`.',
    solution: '`R_(GES) ≈ 66,7 Ω`, `I_(GES) ≈ 0,18 A`.',
  },
  ohm: {
    prompt: 'Ohmsches Gesetz: `U = 9 V`, `I = 0,3 A`. Berechne `R`.',
    solution: '`R = U / I = 30 Ω`.',
  },
} as const satisfies Record<string, PracticeTask>

export const networkEnrichment: FloorEnrichmentConfig = {
  proseFigures: {
    col10Content: 'topo-bus',
    col11Content: 'topo-star',
    col12Content: 'topo-ring',
  },
  prosePractice: {
    col6Content: {
      prompt: 'Was bedeutet **LAN**?',
      solution: 'Local Area Network — lokales Netzwerk.',
    },
    col10Content: {
      prompt: 'Nenne je einen Vor- und Nachteil der Bus-Topologie.',
      solution: 'Vorteil: einfache Verkabelung. Nachteil: Kollisionen auf gemeinsamem Medium.',
    },
    col11Content: {
      prompt: 'Warum nutzen moderne LANs oft die Stern-Topologie?',
      solution: 'Zentraler Switch, Störungen oft nur an einem Ast.',
    },
    col12Content: {
      prompt: 'Was passiert beim Ausfall eines Knotens im Ring (ohne Redundanz)?',
      solution: 'Der Ring kann unterbrochen sein — Kommunikation bricht zusammen.',
    },
    col24Content: {
      prompt: 'Erkläre **CSMA/CD** in einem Satz.',
      solution: 'Medium abhören, senden, Kollision erkennen und neu versuchen.',
    },
    col25Content: {
      prompt: 'Erkläre **CSMA/CA** in einem Satz.',
      solution: 'Kollisionen durch Wartezeiten vermeiden (typisch WLAN).',
    },
    col45Content: {
      prompt: 'Nenne die vier Schichten des **TCP/IP**-Modells.',
      solution: 'Link, Internet, Transport, Application.',
    },
    col46Content: {
      prompt: 'Wofür steht eine **IPv4-Adresse** (z. B. 192.168.1.1)?',
      solution: 'Eindeutige Adresse eines Hosts im Netzwerk (Schicht 3).',
    },
  },
}

export const eeEnrichment: FloorEnrichmentConfig = {
  hiddenSectionIds: ['col9Content', 'col10Content'],
  proseFigures: {
    col4Content: 'ee-series',
    col5Content: 'ee-parallel',
    col6Content: 'ee-ohm',
  },
  prosePractice: {
    col4Content: eePractice.reihe,
    col5Content: eePractice.parallel,
    col6Content: eePractice.ohm,
    col7Content: {
      prompt: 'Spannungsteiler: `R_1 = 2 kΩ`, `R_2 = 4 kΩ`, `U = 12 V`. Berechne `U_1`.',
      solution: '`U_1 = 4 V`.',
    },
  },
}

export const dbEnrichment: FloorEnrichmentConfig = {
  proseFigures: {
    col6Content: 'db-relation',
  },
  prosePractice: {
    col5Content: {
      prompt: 'Unterschied **DDL** vs. **DML**?',
      solution: 'DDL: Struktur. DML: Daten manipulieren.',
    },
    col6Content: {
      prompt: 'Was ist ein **Tupel**?',
      solution: 'Eine Zeile in einer relationalen Tabelle.',
    },
    col10Content: {
      prompt: 'SQL: alle Einträge in `books` mit `price &lt; 20`.',
      solution: '`SELECT * FROM books WHERE price &lt; 20;`',
    },
  },
}

export const swlEnrichment: FloorEnrichmentConfig = {
  proseFigures: {
    col8Content: 'org-matrix',
    col15Content: 'flow-process',
  },
  prosePractice: {
    col4Content: {
      prompt: 'Nenne drei Elemente der **Corporate Identity**.',
      solution: 'Design, Kommunikation, Verhalten (Corporate Behaviour).',
    },
    col8Content: {
      prompt: 'Wann ist eine **Matrixorganisation** sinnvoll?',
      solution: 'Bei parallelen Projekt- und Linienstrukturen.',
    },
  },
}

export const lawEnrichment: FloorEnrichmentConfig = {
  prosePractice: {
    col1Content: {
      prompt: 'Unterschied **Gesetz** und **Verordnung**?',
      solution: 'Gesetz: Parlament. Verordnung: auf Gesetz basierend, Exekutive.',
    },
  },
}

export function mergeEnrichment(
  ...configs: (FloorEnrichmentConfig | undefined)[]
): FloorEnrichmentConfig {
  const out: FloorEnrichmentConfig = {}
  for (const c of configs) {
    if (!c) continue
    out.hiddenEntryIds = [...(out.hiddenEntryIds ?? []), ...(c.hiddenEntryIds ?? [])]
    out.hiddenSectionIds = [...(out.hiddenSectionIds ?? []), ...(c.hiddenSectionIds ?? [])]
    out.sectionIntros = { ...out.sectionIntros, ...c.sectionIntros }
    out.entryPatches = { ...out.entryPatches, ...c.entryPatches }
    out.proseHtmlPatches = { ...out.proseHtmlPatches, ...c.proseHtmlPatches }
    out.prosePractice = { ...out.prosePractice, ...c.prosePractice }
    out.proseFigures = { ...out.proseFigures, ...c.proseFigures }
    out.insertSections = [...(out.insertSections ?? []), ...(c.insertSections ?? [])]
    out.patchEntry = c.patchEntry ?? out.patchEntry
  }
  return out
}
