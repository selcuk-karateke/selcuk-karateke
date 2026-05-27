import { prepareMathHtml, rewriteLegacyImagePaths } from '@/lib/mathHtml'

export default function EducationRawHtml({
  html,
  imageSource = 'portfolio',
}: {
  html: string
  imageSource?: 'portfolio' | 'own_website'
}) {
  const expanded = html.replace(/class="collapse"/g, 'class="collapse show"')
  const prepared = prepareMathHtml(rewriteLegacyImagePaths(expanded, imageSource))

  return (
    <article
      className="education-prose legacy-html-body theme-text text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: prepared }}
    />
  )
}
