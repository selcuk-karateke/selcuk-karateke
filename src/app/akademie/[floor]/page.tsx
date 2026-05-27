import Link from 'next/link'
import { notFound } from 'next/navigation'
import EducationFloorBody from '@/components/education/EducationFloorBody'
import { getEducationFloor, ownWebsiteFloors } from '@/data/educationFloors'
import { loadEducationFloorData } from '@/lib/loadEducationFloor'
import { loadEducationRawHtml } from '@/lib/loadEducationRaw'
import '@/app/legacy/legacy.css'

export function generateStaticParams() {
  return ownWebsiteFloors.map((floor) => ({ floor: floor.id }))
}

export default async function AkademieFloorPage({
  params,
}: {
  params: Promise<{ floor: string }>
}) {
  const { floor } = await params
  const meta = getEducationFloor('own_website', floor)
  if (!meta) notFound()

  const data = loadEducationFloorData('own_website', floor)
  if (!data) notFound()

  const rawHtml = loadEducationRawHtml('own_website', floor)
  const hasContent =
    data.kind === 'structured' || data.sections.length > 0 || Boolean(rawHtml)
  if (!hasContent) notFound()

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/akademie" className="text-sm theme-primary hover:opacity-80">
          ← Alle Stockwerke
        </Link>
        <header className="mt-3 mb-10">
          <p className="text-sm theme-text-secondary">Stockwerk {data.entryId}</p>
          <h1 className="text-4xl font-bold theme-text">{meta.title}</h1>
          <p className="theme-text-secondary mt-1">{meta.subtitle}</p>
        </header>

        <EducationFloorBody data={data} rawHtml={rawHtml} imageSource="own_website" />
      </div>
    </div>
  )
}
