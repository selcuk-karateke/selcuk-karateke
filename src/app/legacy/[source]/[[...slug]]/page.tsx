import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLegacyRoute, getLegacyRoutesBySource, legacyRoutes } from '@/data/legacyRoutes'
import LegacyFeaturePanel from '@/components/legacy/LegacyFeaturePanel'

export function generateStaticParams() {
  return legacyRoutes.map((route) => ({
    source: route.source,
    slug: route.route.split('/'),
  }))
}

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
            {source === 'portfolio' ? 'portfolio' : 'own_website'} Routes
          </h1>
          <p className="theme-text-secondary mb-8">
            Complete mapped routes from the legacy PHP system. Each route opens a migrated page
            with functional mock behavior where required.
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
                <p className="text-xs theme-text-secondary mt-2">Feature: {route.feature}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const route = getLegacyRoute(source, slug)
  if (!route) notFound()

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href={`/legacy/${source}`} className="text-sm theme-primary hover:opacity-80">
            ← Back to {source} routes
          </Link>
          <h1 className="text-4xl font-bold theme-text mt-3">{route.title}</h1>
          <p className="theme-text-secondary mt-2">
            Legacy route: <code>/legacy/{route.source}/{route.route}</code>
          </p>
          <p className="theme-text-secondary text-sm mt-1">Source file: {route.sourcePath}</p>
        </div>

        <div className="theme-bg-card border theme-border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold theme-text mb-3">Migration Status</h2>
          <p className="theme-text-secondary">
            This route is available in the new system and wired to a functional mock
            implementation for its legacy behavior.
          </p>
        </div>

        <LegacyFeaturePanel route={route} />
      </div>
    </div>
  )
}
