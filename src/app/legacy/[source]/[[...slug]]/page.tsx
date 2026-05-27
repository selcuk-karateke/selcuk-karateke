import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getLegacyRoute, getLegacyRoutesBySource, legacyRoutes } from '@/data/legacyRoutes'
import LegacyFeaturePanel from '@/components/legacy/LegacyFeaturePanel'
import LegacyPageContent from '@/components/legacy/LegacyPageContent'
import { loadParsedLegacyPage } from '@/lib/legacyPage'
import { akademieFloorToEducationSlug } from '@/data/educationCatalog'
import { legacyExerciseToSlug } from '@/data/exerciseCatalog'
import { ownWebsiteFloors, portfolioEducationFloors } from '@/data/educationFloors'
import '../../legacy.css'

/** Legacy-Archiv zur Laufzeit — spart ~75 statische Seiten beim Build. */
export const dynamic = 'force-dynamic'

export default async function LegacyRoutePage({
  params,
}: {
  params: Promise<{ source: string; slug?: string[] }>
}) {
  const { source, slug = [] } = await params
  if (source !== 'portfolio' && source !== 'own_website') notFound()

  if (slug.length === 0) {
    const routes = getLegacyRoutesBySource(source)
    return (
      <div className="min-h-screen theme-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold theme-text mb-3">
            {source === 'portfolio' ? 'Portfolio' : 'Own Website'}
          </h1>
          <p className="theme-text-secondary mb-8">
            {source === 'portfolio' ? (
              <>
                Bildungsinhalte findest du unter{' '}
                <Link href="/education" className="theme-primary hover:opacity-80">
                  /education
                </Link>
                .
              </>
            ) : (
              <>
                Stockwerke der alten Website unter{' '}
                <Link href="/education" className="theme-primary hover:opacity-80">
                  /education
                </Link>
                .
              </>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={`/legacy/${route.source}/${route.route}`}
                className="theme-bg-card border theme-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <p className="font-semibold theme-text">{route.title}</p>
                <p className="text-sm theme-text-secondary mt-1">/{route.route}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const route = getLegacyRoute(source, slug)
  if (!route) notFound()

  if (source === 'portfolio' && slug[0] === 'educ' && slug.length === 2) {
    const floorId = slug[1]
    if (portfolioEducationFloors.some((f) => f.id === floorId)) {
      redirect(`/education/${floorId}`)
    }
  }

  if (source === 'own_website' && slug.length === 1) {
    const floorId = slug[0]
    if (ownWebsiteFloors.some((f) => f.id === floorId)) {
      redirect(`/education/${akademieFloorToEducationSlug(floorId)}`)
    }
  }

  if (source === 'portfolio' && slug[0] === 'exer') {
    const exerciseSlug = legacyExerciseToSlug('portfolio', slug.join('/'))
    if (exerciseSlug) redirect(`/uebungen/${exerciseSlug}`)
  }

  if (source === 'own_website' && slug[0] === 'exercise') {
    const exerciseSlug = legacyExerciseToSlug('own_website', slug.join('/'))
    if (exerciseSlug) redirect(`/uebungen/${exerciseSlug}`)
  }

  const page = loadParsedLegacyPage(source, slug.join('/'))

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href={`/legacy/${source}`} className="text-sm theme-primary hover:opacity-80">
            ← Zurück
          </Link>
          <h1 className="text-4xl font-bold theme-text mt-3">{route.title}</h1>
        </div>

        {page?.html && page.parsed ? (
          <LegacyPageContent parsed={page.parsed} fallbackHtml={page.html} />
        ) : (
          <div className="theme-bg-card border theme-border rounded-xl p-6">
            <p className="theme-text">Für diese Seite liegt noch kein Inhalt vor.</p>
          </div>
        )}

        {route.feature !== 'none' && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold theme-text mb-3">Funktion</h2>
            <LegacyFeaturePanel route={route} />
          </div>
        )}
      </div>
    </div>
  )
}
