import Link from 'next/link'
import { notFound } from 'next/navigation'
import ExerciseRunner from '@/components/exercises/ExerciseRunner'
import ExerciseInteractiveHtml from '@/components/exercises/ExerciseInteractiveHtml'
import { PlaceholderExercise } from '@/components/exercises/builtins'
import { exerciseCatalog, getExercise } from '@/data/exerciseCatalog'
import { hasBuiltinExercise } from '@/lib/exerciseBuiltins'
import { loadExerciseContent, loadExerciseRawHtml } from '@/lib/loadExercise'
import '@/app/legacy/legacy.css'

export function generateStaticParams() {
  return exerciseCatalog.map((ex) => ({ slug: ex.slug }))
}

export default async function UebungPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getExercise(slug)
  if (!meta) notFound()

  if (hasBuiltinExercise(slug)) {
    return (
      <div className="min-h-page theme-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <h1 className="text-4xl font-bold theme-text">{meta.title}</h1>
            <p className="theme-text-secondary mt-1">{meta.description}</p>
          </header>
          <ExerciseRunner meta={meta} />
        </div>
      </div>
    )
  }

  const prose = loadExerciseContent(slug)
  const rawHtml = loadExerciseRawHtml(slug)

  return (
    <div className="min-h-page theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/uebungen" className="text-sm theme-primary hover:opacity-80">
          ← Alle Übungen
        </Link>
        <header className="mt-3 mb-10">
          <h1 className="text-4xl font-bold theme-text">{meta.title}</h1>
          <p className="theme-text-secondary mt-1">{meta.description}</p>
        </header>

        {prose && prose.sections.length > 0 ? (
          <div className="space-y-6">
            {prose.sections.map((s) => (
              <section key={s.id} className="theme-bg-card border theme-border rounded-xl p-6">
                <h2 className="text-lg font-semibold theme-text mb-3">{s.title}</h2>
                <ExerciseInteractiveHtml html={s.html} source={meta.source} />
              </section>
            ))}
          </div>
        ) : rawHtml ? (
          <ExerciseInteractiveHtml html={rawHtml} source={meta.source} />
        ) : (
          <PlaceholderExercise
            title={meta.title}
            body="Inhalt konnte nicht geladen werden. Bitte npm run content:import ausführen."
          />
        )}
      </div>
    </div>
  )
}
