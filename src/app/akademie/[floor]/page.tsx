import { notFound, redirect } from 'next/navigation'
import { akademieFloorToEducationSlug } from '@/data/educationCatalog'
import { ownWebsiteFloors } from '@/data/educationFloors'

export function generateStaticParams() {
  return ownWebsiteFloors.map((floor) => ({ floor: floor.id }))
}

export default async function AkademieFloorRedirectPage({
  params,
}: {
  params: Promise<{ floor: string }>
}) {
  const { floor } = await params
  if (!ownWebsiteFloors.some((f) => f.id === floor)) notFound()
  redirect(`/education/${akademieFloorToEducationSlug(floor)}`)
}
