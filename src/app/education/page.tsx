import Link from 'next/link'
import { portfolioEducationFloors } from '@/data/educationFloors'

export default function EducationIndexPage() {
  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">Bildung</h1>
        <p className="theme-text-secondary mb-10">
          Lerninhalte wie im Portfolio: strukturierte Karten mit Formel, Frage, Rechnung und Antwort —
          inklusive Mathematik-Darstellung (MathJax).
        </p>

        <div className="grid gap-3">
          {portfolioEducationFloors.map((floor) => (
            <Link
              key={floor.id}
              href={`/education/${floor.id}`}
              className="theme-bg-card border theme-border rounded-xl p-5 hover:shadow-md transition-shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold theme-text">{floor.title}</p>
                <p className="text-sm theme-text-secondary">{floor.subtitle}</p>
              </div>
              <span className="text-sm theme-primary">Öffnen →</span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm theme-text-secondary">
          Ältere Website mit anderem Aufbau:{' '}
          <Link href="/akademie" className="theme-primary hover:opacity-80">
            Akademie (own_website)
          </Link>
        </p>
      </div>
    </div>
  )
}
