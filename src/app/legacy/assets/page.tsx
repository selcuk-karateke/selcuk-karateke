import Link from 'next/link'
import { legacyAssetScopes } from '@/data/legacyAssets'

export default function LegacyAssetsPage() {
  return (
    <div className="min-h-page theme-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/legacy" className="text-sm theme-primary hover:opacity-80">
            ← Back to Legacy Overview
          </Link>
          <h1 className="text-4xl font-bold theme-text mt-3">Legacy Assets Scope</h1>
          <p className="theme-text-secondary mt-2">
            Asset folders from both legacy codebases included in migration scope.
          </p>
        </div>

        <div className="space-y-6">
          {legacyAssetScopes.map((scope) => (
            <section key={scope.source} className="theme-bg-card border theme-border rounded-xl p-6">
              <h2 className="text-2xl font-semibold theme-text mb-1">{scope.source}</h2>
              <p className="text-sm theme-text-secondary mb-4">Base: {scope.basePath}</p>
              <div className="flex flex-wrap gap-2">
                {scope.folders.map((folder) => (
                  <span
                    key={folder}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs"
                  >
                    {folder}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
