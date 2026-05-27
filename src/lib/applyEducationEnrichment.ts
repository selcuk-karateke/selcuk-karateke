import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'
import type {
  EducationFloorData,
  EducationSubEntry,
  ProseEducationFloor,
  StructuredEducationFloor,
} from '@/types/education'

function applyEntryPatch(
  entry: EducationSubEntry,
  config: FloorEnrichmentConfig
): EducationSubEntry {
  let next = config.patchEntry ? config.patchEntry(entry) : { ...entry }
  const patch = config.entryPatches?.[entry.id]
  if (patch) next = { ...next, ...patch }
  return next
}

function enrichStructured(
  floor: StructuredEducationFloor,
  config: FloorEnrichmentConfig
): StructuredEducationFloor {
  const hidden = new Set(config.hiddenEntryIds ?? [])
  return {
    ...floor,
    sections: floor.sections.map((section) => ({
      ...section,
      introHtml: config.sectionIntros?.[section.title] ?? section.introHtml,
      entries: section.entries
        .filter((e) => !hidden.has(e.id))
        .map((e) => applyEntryPatch(e, config)),
    })),
  }
}

function enrichProse(floor: ProseEducationFloor, config: FloorEnrichmentConfig): ProseEducationFloor {
  const hidden = new Set(config.hiddenSectionIds ?? config.hiddenEntryIds ?? [])
  let sections = floor.sections.filter((s) => !hidden.has(s.id)).map((s) => {
    const next = { ...s }
    if (config.proseHtmlPatches?.[s.id]) next.html = config.proseHtmlPatches[s.id]
    if (config.prosePractice?.[s.id]) next.practice = config.prosePractice[s.id]
    if (config.proseFigures?.[s.id]) next.figureId = config.proseFigures[s.id]
    return next
  })

  for (const ins of config.insertSections ?? []) {
    if (sections.some((s) => s.id === ins.section.id)) continue
    const idx =
      ins.beforeSectionId === '__none__'
        ? -1
        : sections.findIndex((s) => s.id === ins.beforeSectionId)
    const insertAt = idx >= 0 ? idx : sections.length
    sections = [
      ...sections.slice(0, insertAt),
      {
        ...ins.section,
        figureId: config.proseFigures?.[ins.section.id],
      },
      ...sections.slice(insertAt),
    ]
  }

  return { ...floor, sections }
}

export function applyEducationEnrichment(
  data: EducationFloorData,
  config: FloorEnrichmentConfig | undefined
): EducationFloorData {
  if (!config) return data
  if (data.kind === 'structured') return enrichStructured(data, config)
  return enrichProse(data, config)
}
