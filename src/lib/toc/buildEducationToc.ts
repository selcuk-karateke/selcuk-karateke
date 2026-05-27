import { slugifyHeading } from '@/lib/toc/slugifyHeading'
import { educationCatalog } from '@/data/educationCatalog'
import type { EducationFloorData } from '@/types/education'
import type { TocItem } from '@/types/toc'

export function buildEducationCatalogToc(): TocItem[] {
  return educationCatalog.map((item) => ({
    id: `topic-${item.slug}`,
    label: item.title,
  }))
}

export function buildEducationToc(data: EducationFloorData): TocItem[] {
  if (data.kind === 'structured') {
    return data.sections.map((section) => ({
      id: slugifyHeading(section.title),
      label: section.title,
      children: section.entries.map((entry) => ({
        id: entry.id,
        label: entry.subtitle,
      })),
    }))
  }

  const headingItems: TocItem[] = data.headings.map((heading) => ({
    id: slugifyHeading(heading),
    label: heading,
  }))

  const fromSections = data.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }))

  if (fromSections.length > 0) {
    return headingItems.length > 0 ? [...headingItems, ...fromSections] : fromSections
  }

  if (headingItems.length > 0) return headingItems

  return data.toc
    .map((link) => {
      const id = link.href.replace(/^#/, '')
      if (!id) return null
      return { id, label: link.label }
    })
    .filter((item): item is TocItem => item != null)
}
