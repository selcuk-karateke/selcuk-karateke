import Link from 'next/link'
import ContentWithToc from '@/components/toc/ContentWithToc'
import { educationCatalog } from '@/data/educationCatalog'
import { buildEducationCatalogToc } from '@/lib/toc/buildEducationToc'

export default function EducationIndexPage() {
  const toc = buildEducationCatalogToc()

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">Bildung</h1>
        <p className="theme-text-secondary mb-10">
          Lerninhalte aus dem Portfolio (Stand 2019) — plus JavaScript und WISO von der früheren Website.
          Alte Links unter <code className="text-sm">/akademie</code> leiten automatisch um.
        </p>

        <ContentWithToc items={toc} minItems={2}>
          <div className="grid gap-3">
            {educationCatalog.map((item) => (
              <Link
                key={item.slug}
                id={`topic-${item.slug}`}
                href={`/education/${item.slug}`}
                className="theme-bg-card border theme-border rounded-xl p-5 hover:shadow-md transition-shadow flex justify-between items-center gap-4 scroll-mt-28"
              >
                <div className="min-w-0">
                  <p className="font-semibold theme-text">{item.title}</p>
                  <p className="text-sm theme-text-secondary">{item.subtitle}</p>
                </div>
                <span className="text-sm theme-primary shrink-0">Öffnen →</span>
              </Link>
            ))}
          </div>
        </ContentWithToc>
      </div>
    </div>
  )
}
