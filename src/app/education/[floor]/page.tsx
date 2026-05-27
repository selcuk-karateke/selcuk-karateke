import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import EducationFloorBody from '@/components/education/EducationFloorBody'
import {
  educationCatalog,
  getCatalogItemBySlug,
  resolveEducationSlug,
} from '@/data/educationCatalog'
import { loadEducationFloorData } from '@/lib/loadEducationFloor'
import { loadEducationRawHtml } from '@/lib/loadEducationRaw'
import '@/app/legacy/legacy.css'

export function generateStaticParams() {
  return educationCatalog.map((item) => ({ floor: item.slug }))
}

export default async function EducationFloorPage({
  params,
}: {
  params: Promise<{ floor: string }>
}) {
  const { floor: rawSlug } = await params
  const slug = resolveEducationSlug(rawSlug)
  if (slug !== rawSlug) redirect(`/education/${slug}`)

  const item = getCatalogItemBySlug(slug)
  if (!item) notFound()

  const data = loadEducationFloorData(item.source, item.floorId)
  if (!data) notFound()

  const rawHtml = loadEducationRawHtml(item.source, item.floorId)
  const hasContent =
    data.kind === 'structured' || data.sections.length > 0 || Boolean(rawHtml)
  if (!hasContent) notFound()

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/education" className="text-sm theme-primary hover:opacity-80">
          ← Alle Stockwerke
        </Link>
        <header className="mt-3 mb-10">
          <p className="text-sm theme-text-secondary">Stockwerk {data.entryId}</p>
          <h1 className="text-4xl font-bold theme-text">{item.title}</h1>
          {item.subtitle && item.subtitle !== item.title && (
            <p className="theme-text-secondary mt-1">{item.subtitle}</p>
          )}
        </header>

        <EducationFloorBody
          data={data}
          rawHtml={rawHtml}
          imageSource={item.source === 'portfolio' ? 'portfolio' : 'own_website'}
        />
      </div>
    </div>
  )
}
