import Link from 'next/link'
import { notFound } from 'next/navigation'
import EducationProseView from '@/components/education/EducationProseView'
import EducationRawHtml from '@/components/education/EducationRawHtml'
import LegacyFeaturePanel from '@/components/legacy/LegacyFeaturePanel'
import { getExercise, portfolioExercises } from '@/data/exercises'
import { loadExerciseContent, loadExerciseRawHtml } from '@/lib/loadExercise'
import { legacyRoutes } from '@/data/legacyRoutes'
import '@/app/legacy/legacy.css'

export function generateStaticParams() {
  return portfolioExercises.map((ex) => ({ slug: ex.slug }))
}

export default async function UebungPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getExercise(slug)
  if (!meta) notFound()

  const prose = loadExerciseContent(slug)
  const rawHtml = loadExerciseRawHtml(slug)
  const legacyRoute = legacyRoutes.find(
    (r) => r.source === 'portfolio' && r.route === meta.legacyRoute
  )

  const useRaw = slug === 'index' || (prose && prose.sections.length === 0 && rawHtml)

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/uebungen" className="text-sm theme-primary hover:opacity-80">
          ← Alle Übungen
        </Link>
        <header className="mt-3 mb-10">
          <h1 className="text-4xl font-bold theme-text">{meta.title}</h1>
          <p className="theme-text-secondary mt-1">{meta.description}</p>
        </header>

        {useRaw && rawHtml ? (
          <EducationRawHtml html={rawHtml} />
        ) : prose && prose.sections.length > 0 ? (
          <EducationProseView floor={prose} />
        ) : rawHtml ? (
          <EducationRawHtml html={rawHtml} />
        ) : (
          <p className="theme-text-secondary">Kein Inhalt verfügbar.</p>
        )}

        {legacyRoute && legacyRoute.feature !== 'none' && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold theme-text mb-3">Interaktive Demo</h2>
            <LegacyFeaturePanel route={legacyRoute} />
          </div>
        )}
      </div>
    </div>
  )
}
