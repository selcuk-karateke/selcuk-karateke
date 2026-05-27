import type { Redirect } from 'next/dist/lib/load-custom-routes'
import { exerciseCatalog } from '../data/exerciseCatalog'
import { portfolioEducationFloors } from '../data/educationFloors'

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
