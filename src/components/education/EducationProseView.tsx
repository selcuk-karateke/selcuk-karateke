import type { ProseEducationFloor } from '@/types/education'
import { prepareMathHtml, rewriteLegacyImagePaths } from '@/lib/mathHtml'

export default function EducationProseView({
  floor,
  imageSource = 'portfolio',
}: {
  floor: ProseEducationFloor
  imageSource?: 'portfolio' | 'own_website'
}) {
  return (
    <article className="space-y-6">
      {floor.toc.length > 0 && (
        <nav className="theme-bg-card border theme-border rounded-xl p-5">
          <h2 className="text-lg font-semibold theme-text mb-3">Inhaltsverzeichnis</h2>
          <ul className="columns-1 sm:columns-2 gap-x-6 text-sm space-y-1">
            {floor.toc.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="theme-primary hover:opacity-80">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {floor.headings.map((h) => (
        <h2 key={h} className="text-2xl font-semibold theme-text scroll-mt-24">
          {h}
        </h2>
      ))}

      {floor.sections.map((section) => (
        <details
          key={section.id}
          id={section.id}
          className="theme-bg-card border theme-border rounded-xl group"
          open
        >
          <summary className="cursor-pointer list-none p-4 font-semibold text-lg theme-text [&::-webkit-details-marker]:hidden">
            {section.title}
          </summary>
          <div
            className="education-prose px-4 pb-5 pt-0 theme-text border-t theme-border text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: prepareMathHtml(rewriteLegacyImagePaths(section.html, imageSource)),
            }}
          />
        </details>
      ))}
    </article>
  )
}
