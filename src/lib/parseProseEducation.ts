import type { ProseEducationFloor } from '@/types/education'
import { parseLegacyHtml } from '@/lib/parseLegacyHtml'
import { stripMathImages } from '@/lib/mathHtml'

export function parseProseEducationHtml(html: string, entryId: number): ProseEducationFloor {
  const parsed = parseLegacyHtml(html)
  return {
    kind: 'prose',
    entryId,
    sections: parsed.sections.map((s) => ({
      id: s.id,
      title: s.title,
      html: stripMathImages(s.html),
    })),
    toc: parsed.toc,
    headings: parsed.headings.filter((h) => h.level === 2).map((h) => h.text),
  }
}
