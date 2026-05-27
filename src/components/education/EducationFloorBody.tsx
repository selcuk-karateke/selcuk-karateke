import EducationProseView from '@/components/education/EducationProseView'
import EducationRawHtml from '@/components/education/EducationRawHtml'
import EducationStructuredView from '@/components/education/EducationStructuredView'
import type { EducationFloorData } from '@/types/education'

export default function EducationFloorBody({
  data,
  rawHtml,
  imageSource,
}: {
  data: EducationFloorData
  rawHtml: string | null
  imageSource: 'portfolio' | 'own_website'
}) {
  if (data.kind === 'structured') {
    return <EducationStructuredView floor={data} />
  }

  if (data.sections.length > 0) {
    return <EducationProseView floor={data} imageSource={imageSource} />
  }

  if (rawHtml) {
    return <EducationRawHtml html={rawHtml} imageSource={imageSource} />
  }

  return <p className="theme-text-secondary">Kein Inhalt verfügbar.</p>
}
