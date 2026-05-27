import { legacySystems } from '@/data/legacySystems'
import Link from 'next/link'
import { getLegacyRoutesBySource } from '@/data/legacyRoutes'

export default function LegacySystemsPage() {
  const totalGroups = legacySystems.reduce((sum, s) => sum + s.groups.length, 0)
  const totalModules = legacySystems.reduce(
    (sum, s) => sum + s.groups.reduce((gSum, g) => gSum + g.items.length, 0),
    0
  )

  return (
    <div className="min-h-page theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold theme-text mb-4">Schulprojekt-Archiv</h1>
          <p className="text-lg theme-text-secondary max-w-3xl">
            Übungen und Bildung sind unter{' '}
            <Link href="/uebungen" className="theme-primary hover:opacity-80">
              /uebungen
            </Link>{' '}
            und{' '}
            <Link href="/education" className="theme-primary hover:opacity-80">
              /education
            </Link>{' '}
            migriert. Hier verbleiben nur alte PHP-Schulprojekte (proj/*) aus Portfolio und
            own_website.
          </p>
          <Link href="/legacy/matrix" className="inline-block mt-4 theme-primary hover:opacity-80">
            Open full migration matrix →
          </Link>
          <Link href="/legacy/assets" className="inline-block mt-4 ml-4 theme-primary hover:opacity-80">
            Open asset scope →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="theme-bg-card rounded-lg p-5 border theme-border">
            <p className="text-sm theme-text-secondary">Legacy Codebases</p>
            <p className="text-2xl font-bold theme-text">{legacySystems.length}</p>
          </div>
          <div className="theme-bg-card rounded-lg p-5 border theme-border">
            <p className="text-sm theme-text-secondary">Module Groups</p>
            <p className="text-2xl font-bold theme-text">{totalGroups}</p>
          </div>
          <div className="theme-bg-card rounded-lg p-5 border theme-border">
            <p className="text-sm theme-text-secondary">Mapped Legacy Modules</p>
            <p className="text-2xl font-bold theme-text">{totalModules}</p>
          </div>
        </div>

        <div className="space-y-8">
          {legacySystems.map((system) => (
            <section key={system.id} className="theme-bg-card rounded-xl border theme-border p-6">
              <div className="mb-5">
                <h2 className="text-2xl font-semibold theme-text">{system.name}</h2>
                <p className="text-sm theme-text-secondary mt-1">Source: {system.path}</p>
                <p className="theme-text-secondary mt-3">{system.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {system.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm theme-text-secondary">
                  Mapped routes:{' '}
                  {system.id === 'portfolio-php'
                    ? getLegacyRoutesBySource('portfolio').length
                    : getLegacyRoutesBySource('own_website').length}
                </p>
                <Link
                  href={
                    system.id === 'portfolio-php'
                      ? '/legacy/portfolio'
                      : '/legacy/own_website'
                  }
                  className="theme-primary text-sm font-medium hover:opacity-80"
                >
                  Open full route tree →
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {system.groups.map((group) => (
                  <div key={group.title} className="rounded-lg border theme-border p-4">
                    <h3 className="font-semibold theme-text mb-3">{group.title}</h3>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm theme-text-secondary">
                          - {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
