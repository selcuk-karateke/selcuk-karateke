import type {
  EducationFloorData,
  EducationSubEntry,
  ProseEducationFloor,
  ProseSection,
  StructuredEducationFloor,
} from '@/types/education'

const SKIP_TITLE = /^(leer|test)$/i

function isBlankHtml(html: string): boolean {
  const t = html.replace(/<[^>]+>/g, '').replace(/\s/g, '')
  return t.length === 0
}

/** Nur sinnvolle SVG-Zuordnung — keine generischen Übungs-Platzhalter. */
function inferFigureId(section: ProseSection): string | undefined {
  if (section.figureId) return section.figureId
  const key = `${section.id} ${section.title}`.toLowerCase()
  if (/\b(bus)\b/.test(key) && !/usb|database/.test(key)) return 'topo-bus'
  if (/\b(stern|star)\b/.test(key)) return 'topo-star'
  if (/\b(ring)\b/.test(key) && !/kreisring|bearing/.test(key)) return 'topo-ring'
  if (/reihen|series/.test(key)) return 'ee-series'
  if (/parallel/.test(key)) return 'ee-parallel'
  if (/ohm/.test(key)) return 'ee-ohm'
  if (/relation|sql|datenbank|tabelle|ddl|dml/.test(key)) return 'db-relation'
  if (/matrix.?org|matrixorganisation/.test(key)) return 'org-matrix'
  if (/flussdiagramm|flussdiagramm|prozessablauf/.test(key)) return 'flow-process'
  if (/osi|schichtenmodell/.test(key) && !/composition/.test(key)) return 'osi-stack'
  const geometry = [
    'quadrat',
    'rechteck',
    'dreieck',
    'parallelogramm',
    'trapez',
    'kreis',
    'kreisring',
    'kreisausschnitt',
    'glschenk',
    'glseit',
  ]
  for (const g of geometry) {
    if (key.includes(g)) return section.id.includes(g) ? section.id : g
  }
  return undefined
}

function enrichProseCleanup(floor: ProseEducationFloor): ProseEducationFloor {
  const sections = floor.sections
    .filter((s) => !SKIP_TITLE.test(s.title.trim()))
    .filter((s) => !isBlankHtml(s.html))
    .map((s) => ({
      ...s,
      figureId: inferFigureId(s),
    }))

  return { ...floor, sections }
}

function enrichStructuredCleanup(floor: StructuredEducationFloor): StructuredEducationFloor {
  return {
    ...floor,
    sections: floor.sections.map((section) => ({
      ...section,
      entries: section.entries.filter((e) => !SKIP_TITLE.test(e.subtitle.trim())),
    })),
  }
}

function enrichEntryCleanup(entry: EducationSubEntry): EducationSubEntry {
  return entry
}

/** Filtert leere Karten und setzt passende Skizzen — ohne Fake-Übungen. */
export function applyAutoEducationEnrichment(data: EducationFloorData): EducationFloorData {
  if (data.kind === 'structured') {
    const floor = enrichStructuredCleanup(data)
    return {
      ...floor,
      sections: floor.sections.map((section) => ({
        ...section,
        entries: section.entries.map(enrichEntryCleanup),
      })),
    }
  }
  return enrichProseCleanup(data)
}
