export interface TocLink {
  href: string
  label: string
}

export interface PageHeading {
  level: 1 | 2
  text: string
  id?: string
}

export interface ContentSection {
  id: string
  title: string
  html: string
}

export interface ParsedLegacyPage {
  headings: PageHeading[]
  toc: TocLink[]
  sections: ContentSection[]
}

function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

import { decodeHtmlEntities } from '@/lib/decodeHtmlEntities'
import { normalizeLegacyHtml } from '@/lib/normalizeLegacyHtml'

export function parseLegacyHtml(html: string): ParsedLegacyPage {
  html = normalizeLegacyHtml(html)
  const headings: PageHeading[] = []
  const toc: TocLink[] = []
  const sections: ContentSection[] = []
  const seenIds = new Set<string>()

  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi
  let match: RegExpExecArray | null
  while ((match = h1Regex.exec(html)) !== null) {
    headings.push({ level: 1, text: stripTags(match[1]) })
  }

  const h2Regex = /<h2([^>]*)>([\s\S]*?)<\/h2>/gi
  while ((match = h2Regex.exec(html)) !== null) {
    const idMatch = match[1].match(/id="([^"]+)"/)
    headings.push({
      level: 2,
      text: stripTags(match[2]),
      id: idMatch?.[1],
    })
  }

  if (/Inhaltsverzeichnis/i.test(html)) {
    const tocBlock = html.match(
      /Inhaltsverzeichnis[\s\S]*?<div class="collapse"[^>]*>([\s\S]*?)<\/div>/i
    )
    if (tocBlock) {
      const linkRegex = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/gi
      while ((match = linkRegex.exec(tocBlock[1])) !== null) {
        toc.push({ href: match[1], label: match[2].trim() })
      }
    }
  }

  const collapseRegex = /<div class="collapse"[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/div>/gi
  while ((match = collapseRegex.exec(html)) !== null) {
    const id = match[1]
    if (seenIds.has(id)) continue
    seenIds.add(id)

    const before = html.slice(0, match.index)
    const anchorRegex = new RegExp(
      `<a[^>]*href="#${escapeRegExp(id)}"[^>]*>([\\s\\S]*?)</a>`,
      'gi'
    )
    const anchors = [...before.matchAll(anchorRegex)]
    const title =
      anchors.length > 0 ? stripTags(anchors[anchors.length - 1][1]) : id

    if (title === 'Inhaltsverzeichnis') continue

    sections.push({
      id,
      title: title || id,
      html: match[2].trim(),
    })
  }

  if (sections.length === 0) {
    const h4Matches = [...html.matchAll(/<h4([^>]*)>([\s\S]*?)<\/h4>/gi)]
    for (let i = 0; i < h4Matches.length; i++) {
      const m = h4Matches[i]
      const start = m.index! + m[0].length
      const end = i + 1 < h4Matches.length ? h4Matches[i + 1].index! : html.length
      const idMatch = m[1].match(/id=['"]([^'"]+)['"]/i)
      const title = stripTags(m[2])
      const baseId =
        idMatch?.[1] ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') ||
        `section-${i + 1}`
      let id = baseId
      let n = 2
      while (seenIds.has(id)) {
        id = `${baseId}-${n++}`
      }
      seenIds.add(id)
      sections.push({
        id,
        title: title || id,
        html: html.slice(start, end).trim(),
      })
    }
  }

  return { headings, toc, sections }
}
