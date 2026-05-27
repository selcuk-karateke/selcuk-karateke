import { getEducationFloor } from '@/data/educationFloors'
import type {
  EducationFloorData,
  EducationSubEntry,
  PracticeTask,
  ProseEducationFloor,
  ProseSection,
  StructuredEducationFloor,
} from '@/types/education'

const SKIP_TITLE = /^(leer|test)$/i

function isBlankHtml(html: string): boolean {
  const t = html.replace(/<[^>]+>/g, '').replace(/\s/g, '')
  return t.length === 0
}

function autoPracticeForTitle(title: string, context: 'section' | 'entry'): PracticeTask {
  const label = title.trim() || 'dieses Thema'
  if (context === 'entry') {
    return {
      prompt: `Wiederhole die Kernformel oder Definition zu „${label}“ ohne Spickzettel.`,
      hint: 'Nutze die Felder Formel, Merke und Skizze oben.',
      solution: `Stichpunkte zu „${label}“ — wichtigste Formeln und Begriffe aus dem Abschnitt.`,
    }
  }
  return {
    prompt: `Erkläre „${label}“ in eigenen Worten (3–5 Sätze).`,
    hint: 'Lies den Abschnitt, dann schließe ihn und schreibe frei.',
    solution: `Zusammenfassung zu „${label}“ — Kernaussage, ein Beispiel, ein Merksatz.`,
  }
}

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
  if (/fluss|prozess|ablauf/.test(key)) return 'flow-process'
  if (/osi|schichtenmodell|tcp.?ip/.test(key)) return 'osi-stack'
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

function defaultIntroSection(
  floorId: string,
  source: 'portfolio' | 'own_website'
): ProseSection {
  const meta = getEducationFloor(source, floorId)
  const title = meta?.title ?? floorId
  return {
    id: 'lern-einstieg',
    title: `${title} — Lernstart`,
    html: `<p>Dieses Stockwerk wird schrittweise befüllt. Nutze die Übungsaufgabe, um den Stoff aktiv zu wiederholen.</p>`,
    practice: {
      prompt: `Notiere drei Fragen, die du zu „${title}“ noch klären willst.`,
      solution: 'Eigene Fragen — im Unterricht oder mit Quellen beantworten.',
    },
  }
}

function enrichProseAuto(
  floor: ProseEducationFloor,
  floorId: string,
  source: 'portfolio' | 'own_website'
): ProseEducationFloor {
  let sections = floor.sections
    .filter((s) => !SKIP_TITLE.test(s.title.trim()))
    .filter((s) => !isBlankHtml(s.html))

  sections = sections.map((s) => ({
    ...s,
    figureId: inferFigureId(s),
    practice: s.practice ?? autoPracticeForTitle(s.title, 'section'),
  }))

  if (sections.length === 0) {
    const hasInsert = floor.sections.some((s) => s.id === 'bwl-grundlagen' || s.id === 'lern-einstieg')
    if (!hasInsert) sections = [defaultIntroSection(floorId, source)]
  }

  return { ...floor, sections }
}

function enrichStructuredAuto(floor: StructuredEducationFloor): StructuredEducationFloor {
  return {
    ...floor,
    sections: floor.sections.map((section) => ({
      ...section,
      entries: section.entries
        .filter((e) => !SKIP_TITLE.test(e.subtitle.trim()))
        .map((entry) => enrichEntryAuto(entry)),
    })),
  }
}

function enrichEntryAuto(entry: EducationSubEntry): EducationSubEntry {
  const hasContent =
    entry.formula?.replace(/\s/g, '') ||
    entry.description?.replace(/\s/g, '') ||
    entry.question?.replace(/\s/g, '')
  if (!hasContent && !entry.practice) return entry
  return {
    ...entry,
    practice: entry.practice ?? autoPracticeForTitle(entry.subtitle, 'entry'),
  }
}

export function applyAutoEducationEnrichment(
  data: EducationFloorData,
  floorId: string,
  source: 'portfolio' | 'own_website'
): EducationFloorData {
  if (data.kind === 'structured') return enrichStructuredAuto(data)
  return enrichProseAuto(data, floorId, source)
}
