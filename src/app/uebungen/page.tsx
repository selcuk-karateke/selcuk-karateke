import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { exerciseCatalog } from '@/data/exerciseCatalog'

export default async function UebungenIndexPage() {
  const t = await getTranslations('pages.exercises')
  const tPages = await getTranslations('pages')
  const portfolio = exerciseCatalog.filter((e) => e.source === 'portfolio')
  const website = exerciseCatalog.filter((e) => e.source === 'own_website')

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold theme-text mb-3">{t('title')}</h1>
        <p className="theme-text-secondary mb-10">{t('subtitle')}</p>

        <Section title={t('portfolioSection')} items={portfolio} openLabel={tPages('educationOpen')} />
        {website.length > 0 && (
          <Section
            title={t('websiteSection')}
            items={website}
            openLabel={tPages('educationOpen')}
            className="mt-10"
          />
        )}
      </div>
    </div>
  )
}

function Section({
  title,
  items,
  openLabel,
  className = '',
}: {
  title: string
  items: typeof exerciseCatalog
  openLabel: string
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
            <span className="text-sm theme-primary shrink-0">{openLabel}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
