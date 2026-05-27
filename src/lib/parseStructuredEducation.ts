import type { EducationSection, EducationSubEntry } from '@/types/education'
import { rewriteLegacyImagePaths } from '@/lib/mathHtml'
import { decodeHtmlEntities } from '@/lib/decodeHtmlEntities'
import { normalizeLegacyHtml } from '@/lib/normalizeLegacyHtml'
import { splitLegacyEducationFields } from '@/lib/splitLegacyEducationFields'

const FIELD_LABELS: Record<string, keyof EducationSubEntry> = {
  beschreibung: 'description',
  formel: 'formula',
  zusatz: 'supplement',
  frage: 'question',
  rechnung: 'calculation',
  antwort: 'answer',
  merke: 'note',
  tabelle: 'tableHtml',
}

function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function parseListItem(liHtml: string, entry: EducationSubEntry): void {
  const text = stripTags(liHtml)
  const lower = text.toLowerCase()

  if (lower.startsWith('grafik') || /<img/i.test(liHtml)) {
    const img = liHtml.match(/<img[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?/i)
    if (img && !/\/img\/math\//i.test(img[1])) {
      entry.imageSrc = rewriteLegacyImagePaths(img[1], 'portfolio')
      entry.imageAlt = img[2]
    }
    return
  }

  for (const [label, field] of Object.entries(FIELD_LABELS)) {
    if (lower.startsWith(label + ':') || lower.startsWith(label + ' :')) {
      const content = liHtml
        .replace(/^[\s\S]*?(?:<br\s*\/?>|\n)/i, '')
        .replace(/^(?:<b>)?[^:<]+:(?:<\/b>)?/i, '')
        .trim()

      if (field === 'tableHtml') {
        const table = content.match(/<table[\s\S]*<\/table>/i)
        if (table) entry.tableHtml = table[0]
        return
      }

      entry[field] = content as never
      return
    }
  }

  if (!entry.description) {
    entry.description = liHtml.trim()
  } else {
    entry.description += `<hr/>${liHtml.trim()}`
  }
}

function parseCollapseInner(subtitle: string, id: string, innerHtml: string): EducationSubEntry {
  const entry: EducationSubEntry = { id, subtitle }

  if (/<li class="list-group-item"/i.test(innerHtml)) {
    const liRegex = /<li class="list-group-item"[^>]*>([\s\S]*?)<\/li>/gi
    let match: RegExpExecArray | null
    while ((match = liRegex.exec(innerHtml)) !== null) {
      parseListItem(match[1], entry)
    }
    return entry
  }

  const img = innerHtml.match(/<img[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?/i)
  if (img && !/\/img\/math\//i.test(img[1])) {
    entry.imageSrc = rewriteLegacyImagePaths(img[1], 'portfolio')
    entry.imageAlt = img[2] ?? subtitle
  }

  const withoutImg = innerHtml.replace(/<img[^>]*>/gi, '').trim()
  if (withoutImg) {
    if (/`/.test(withoutImg) || /<pre/i.test(withoutImg) || /Frage:/i.test(withoutImg)) {
      entry.formula = withoutImg
      return splitLegacyEducationFields(entry)
    }
    entry.description = withoutImg
  }

  return entry
}

function extractAfterH2(block: string): string | undefined {
  const m = block.match(/<h2[^>]*>[\s\S]*?<\/h2>\s*([\s\S]*)/i)
  if (!m) return undefined
  const rest = m[1].replace(/<\/div>\s*$/i, '').trim()
  if (!rest || /^<div class="collapse"/i.test(rest)) return undefined
  return rest
}

function extractCollapses(block: string): { id: string; subtitle: string; inner: string }[] {
  const results: { id: string; subtitle: string; inner: string }[] = []

  const cardStyle =
    /<a[^>]*href="#([^"]+)"[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<\/a>[\s\S]*?<div class="collapse"[^>]*id="\1"[^>]*>([\s\S]*?)<\/div>/gi
  let match: RegExpExecArray | null
  while ((match = cardStyle.exec(block)) !== null) {
    results.push({
      id: match[1],
      subtitle: stripTags(match[2]),
      inner: match[3],
    })
  }

  const simpleStyle =
    /<h3[^>]*>\s*<a[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>\s*<div class="collapse"[^>]*id="\1"[^>]*>([\s\S]*?)<\/div>/gi
  while ((match = simpleStyle.exec(block)) !== null) {
    if (!results.some((r) => r.id === match![1])) {
      results.push({
        id: match[1],
        subtitle: stripTags(match[2]),
        inner: match[3],
      })
    }
  }

  return results
}

export function parseStructuredEducationHtml(html: string): {
  sections: EducationSection[]
  introHeadings: string[]
} {
  html = normalizeLegacyHtml(html)
  const introHeadings: string[] = []
  const sections: EducationSection[] = []
  let currentSection: EducationSection | null = null

  const colBlocks = html.split(/<div class="col">/i).slice(1)

  for (const block of colBlocks) {
    const trimmed = block.trim()
    if (!trimmed || trimmed === '</div>') continue

    const h2Match = block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)
    const collapses = extractCollapses(block)

    if (h2Match && collapses.length === 0) {
      const title = stripTags(h2Match[1])
      introHeadings.push(title)
      const introHtml = extractAfterH2(block)
      currentSection = { title, entries: [], introHtml }
      sections.push(currentSection)
      continue
    }

    if (h2Match && collapses.length > 0) {
      currentSection = { title: stripTags(h2Match[1]), entries: [] }
      sections.push(currentSection)
    }

    if (!currentSection) {
      currentSection = { title: 'Inhalt', entries: [] }
      sections.push(currentSection)
    }

    for (const { id, subtitle, inner } of collapses) {
      currentSection.entries.push(parseCollapseInner(subtitle, id, inner))
    }
  }

  return {
    sections: sections.filter((s) => s.entries.length > 0),
    introHeadings,
  }
}
