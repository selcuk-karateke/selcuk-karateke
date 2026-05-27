import type { Redirect } from 'next/dist/lib/load-custom-routes'
import { exerciseCatalog } from '../data/exerciseCatalog'
import { portfolioEducationFloors } from '../data/educationFloors'

/** own_website/exercise/* — Duplikate der Portfolio-Übungen (gleicher Slug). */
const OWN_WEBSITE_EXERCISE_ALIASES: Record<string, string> = {
  'exercise/OOP': 'oop',
  'exercise/assoArray': 'asso-array',
  'exercise/buecheranzeige': 'buecheranzeige',
  'exercise/buechererfassung': 'buechererfassung',
  'exercise/elementeanzahl': 'elementeanzahl',
  'exercise/erase': 'erase',
  'exercise/multiplikationsfunktion': 'multiplikationsfunktion',
  'exercise/nettoBrutto': 'netto-brutto',
  'exercise/pdotest': 'pdotest',
  'exercise/index': 'index',
}

/** /akademie/:floor → /education/:slug (ohne educationCatalog-Import für next.config). */
const AKADEMIE_FLOOR_TO_EDUCATION: Record<string, string> = {
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

/** Statische 308-Redirects — ohne SSR-Legacy-Route (vermeidet Gateway Timeouts auf Coolify). */
export function buildLegacyRedirects(): Redirect[] {
  const redirects: Redirect[] = [
    { source: '/akademie', destination: '/education', permanent: true },
    { source: '/legacy/portfolio/exer', destination: '/uebungen', permanent: true },
    { source: '/legacy/own_website/exercise', destination: '/uebungen', permanent: true },
  ]

  for (const ex of exerciseCatalog) {
    redirects.push({
      source: `/legacy/${ex.source}/${ex.legacyRoute}`,
      destination: `/uebungen/${ex.slug}`,
      permanent: true,
    })
  }

  for (const [legacyPath, slug] of Object.entries(OWN_WEBSITE_EXERCISE_ALIASES)) {
    redirects.push({
      source: `/legacy/own_website/${legacyPath}`,
      destination: `/uebungen/${slug}`,
      permanent: true,
    })
  }

  for (const floor of portfolioEducationFloors) {
    redirects.push({
      source: `/legacy/portfolio/educ/${floor.id}`,
      destination: `/education/${floor.id}`,
      permanent: true,
    })
  }

  for (const [akademieFloor, educationSlug] of Object.entries(AKADEMIE_FLOOR_TO_EDUCATION)) {
    redirects.push({
      source: `/akademie/${akademieFloor}`,
      destination: `/education/${educationSlug}`,
      permanent: true,
    })
    redirects.push({
      source: `/legacy/own_website/${akademieFloor}`,
      destination: `/education/${educationSlug}`,
      permanent: true,
    })
  }

  return redirects
}
