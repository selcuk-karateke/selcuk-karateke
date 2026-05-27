import Link from 'next/link'
import { portfolioExercises } from '@/data/exercises'

export default function UebungenIndexPage() {
  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">Übungen</h1>
        <p className="theme-text-secondary mb-10">
          PHP-Übungen aus dem Portfolio — Datenbank, Galerie, Timer und mehr. Seiten mit DB-Funktion
          haben eine lokale Demo-Oberfläche.
        </p>

        <div className="grid gap-3">
          {portfolioExercises.map((ex) => (
            <Link
              key={ex.slug}
              href={`/uebungen/${ex.slug}`}
              className="theme-bg-card border theme-border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold theme-text">{ex.title}</p>
              <p className="text-sm theme-text-secondary mt-1">{ex.description}</p>
              {ex.feature === 'crud' && (
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded border theme-border theme-text-secondary">
                  Interaktiv (Demo)
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
