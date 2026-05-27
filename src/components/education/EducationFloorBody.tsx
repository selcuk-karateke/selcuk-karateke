import EducationProseView from '@/components/education/EducationProseView'
import EducationRawHtml from '@/components/education/EducationRawHtml'
import EducationStructuredView from '@/components/education/EducationStructuredView'
import ContentWithToc from '@/components/toc/ContentWithToc'
import { buildEducationToc } from '@/lib/toc/buildEducationToc'
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
  const toc = buildEducationToc(data)

  let body: React.ReactNode
  if (data.kind === 'structured') {
    body = <EducationStructuredView floor={data} />
  } else if (data.sections.length > 0) {
    body = <EducationProseView floor={data} imageSource={imageSource} />
  } else if (rawHtml) {
    body = <EducationRawHtml html={rawHtml} imageSource={imageSource} />
  } else {
    body = <p className="theme-text-secondary">Kein Inhalt verfügbar.</p>
  }

  return <ContentWithToc items={toc}>{body}</ContentWithToc>
}
