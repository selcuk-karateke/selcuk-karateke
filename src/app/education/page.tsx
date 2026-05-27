import Link from 'next/link'
import { educationCatalog } from '@/data/educationCatalog'

export default function EducationIndexPage() {
  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">Bildung</h1>
        <p className="theme-text-secondary mb-10">
          Lerninhalte aus dem Portfolio (Stand 2019) — plus JavaScript und WISO von der früheren Website.
          Alte Links unter <code className="text-sm">/akademie</code> leiten automatisch um.
        </p>

        <div className="grid gap-3">
          {educationCatalog.map((item) => (
            <Link
              key={item.slug}
              href={`/education/${item.slug}`}
              className="theme-bg-card border theme-border rounded-xl p-5 hover:shadow-md transition-shadow flex justify-between items-center gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold theme-text">{item.title}</p>
                <p className="text-sm theme-text-secondary">{item.subtitle}</p>
              </div>
              <span className="text-sm theme-primary shrink-0">Öffnen →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
