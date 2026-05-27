import {
  ownWebsiteFloors,
  portfolioEducationFloors,
  type EducationFloor,
} from '@/data/educationFloors'

export interface EducationCatalogItem {
  slug: string
  title: string
  subtitle: string
  source: 'portfolio' | 'own_website'
  floorId: string
}

/** Nur Inhalte, die es im Portfolio (2019) nicht gibt. */
const OWN_WEBSITE_ONLY_FLOORS = new Set(['11thFloor', '12thFloor'])

/** Alte /akademie/… und /education/website-… → aktueller Portfolio-Slug. */
export const LEGACY_EDUCATION_SLUG_REDIRECTS: Record<string, string> = {
  'website-1stFloor': '1stFloor',
  'website-2ndFloor': '2ndFloor',
  'website-3rdFloor': '3rdFloor',
  'website-4thFloor': '4thFloor',
  'website-5thFloor': '3rdFloor',
  'website-6thFloor': '5thFloor',
  'website-7thFloor': '7thFloor',
  'website-8thFloor': '8thFloor',
  'website-9thFloor': '9thFloor',
  'website-10thFloor': '10thFloor',
}

/** Stockwerk-Nummer der alten Website → Portfolio (Themen vertauscht: OW 5=SWL, 6=Netz). */
export const AKADEMIE_FLOOR_TO_EDUCATION: Record<string, string> = {
  '1stFloor': '1stFloor',
  '2ndFloor': '2ndFloor',
  '3rdFloor': '3rdFloor',
  '4thFloor': '4thFloor',
  '5thFloor': '3rdFloor',
  '6thFloor': '5thFloor',
  '7thFloor': '7thFloor',
  '8thFloor': '8thFloor',
  '9thFloor': '9thFloor',
  '10thFloor': '10thFloor',
  '11thFloor': '11thFloor',
  '12thFloor': '12thFloor',
}

function portfolioCatalogItem(floor: EducationFloor): EducationCatalogItem {
  return {
    slug: floor.id,
    title: floor.title,
    subtitle: floor.subtitle,
    source: 'portfolio',
    floorId: floor.id,
  }
}

function ownWebsiteOnlyItem(floor: EducationFloor): EducationCatalogItem {
  return {
    slug: floor.id,
    title: floor.title,
    subtitle: floor.subtitle,
    source: 'own_website',
    floorId: floor.id,
  }
}

/** Portfolio (Basis) + Website-only Stockwerke 11 & 12. */
export const educationCatalog: EducationCatalogItem[] = [
  ...portfolioEducationFloors.map(portfolioCatalogItem),
  ...ownWebsiteFloors.filter((f) => OWN_WEBSITE_ONLY_FLOORS.has(f.id)).map(ownWebsiteOnlyItem),
]

export function getCatalogItemBySlug(slug: string): EducationCatalogItem | undefined {
  return educationCatalog.find((item) => item.slug === slug)
}

export function resolveEducationSlug(slug: string): string {
  return LEGACY_EDUCATION_SLUG_REDIRECTS[slug] ?? slug
}

export function akademieFloorToEducationSlug(floorId: string): string {
  return AKADEMIE_FLOOR_TO_EDUCATION[floorId] ?? floorId
}
