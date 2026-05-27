import Link from 'next/link'
import { legacyRoutes } from '@/data/legacyRoutes'

export default function LegacyMatrixPage() {
  return (
    <div className="min-h-page theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/legacy" className="text-sm theme-primary hover:opacity-80">
            ← Back to Legacy Overview
          </Link>
          <h1 className="text-4xl font-bold theme-text mt-3">Legacy Route Matrix</h1>
          <p className="theme-text-secondary mt-2">
            1:1 mapped routes from both PHP systems with migration status.
          </p>
        </div>

        <div className="overflow-auto border theme-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="theme-bg-card">
              <tr className="text-left">
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Legacy Route</th>
                <th className="px-3 py-2">New Route</th>
                <th className="px-3 py-2">Feature</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {legacyRoutes.map((route) => (
                <tr key={route.id} className="border-t theme-border">
                  <td className="px-3 py-2">{route.source}</td>
                  <td className="px-3 py-2">{route.sourcePath}</td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/legacy/${route.source}/${route.route}`}
                      className="theme-primary hover:opacity-80"
                    >
                      /legacy/{route.source}/{route.route}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{route.feature}</td>
                  <td className="px-3 py-2 text-green-600 dark:text-green-400">migrated-mock</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
