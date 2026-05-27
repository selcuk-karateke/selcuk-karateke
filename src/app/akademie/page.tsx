import Link from 'next/link'
import { ownWebsiteFloors } from '@/data/educationFloors'

export default function AkademieIndexPage() {
  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">Akademie</h1>
        <p className="theme-text-secondary mb-10">
          Lerninhalte aus der früheren eigenen Website — jedes Stockwerk mit dem
          Originalinhalt.
        </p>

        <div className="grid gap-3">
          {ownWebsiteFloors.map((floor) => (
            <Link
              key={floor.id}
              href={`/akademie/${floor.id}`}
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
          Portfolio-Bildung:{' '}
          <Link href="/education" className="theme-primary hover:opacity-80">
            Bildung (portfolio)
          </Link>
        </p>
      </div>
    </div>
  )
}
