import Link from 'next/link'
import { exerciseCatalog } from '@/data/exerciseCatalog'

export default function UebungenIndexPage() {
  const portfolio = exerciseCatalog.filter((e) => e.source === 'portfolio')
  const website = exerciseCatalog.filter((e) => e.source === 'own_website')

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">Übungen</h1>
        <p className="theme-text-secondary mb-10">
          PHP-Übungen aus Portfolio und früherer Website — interaktive Demos wo möglich.
        </p>

        <Section title="Portfolio" items={portfolio} />
        {website.length > 0 && (
          <Section title="Frühere Website" items={website} className="mt-10" />
        )}
      </div>
    </div>
  )
}

function Section({
  title,
  items,
  className = '',
}: {
  title: string
  items: typeof exerciseCatalog
  className?: string
}) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold theme-text mb-3">{title}</h2>
      <div className="grid gap-3">
        {items.map((ex) => (
          <Link
            key={ex.slug}
            href={`/uebungen/${ex.slug}`}
            className="theme-bg-card border theme-border rounded-xl p-5 hover:shadow-md transition-shadow flex justify-between items-center gap-4"
          >
            <div className="min-w-0">
              <p className="font-semibold theme-text">{ex.title}</p>
              <p className="text-sm theme-text-secondary">{ex.description}</p>
            </div>
            <span className="text-sm theme-primary shrink-0">Öffnen →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
