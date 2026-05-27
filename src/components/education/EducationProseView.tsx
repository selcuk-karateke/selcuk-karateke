import type { ProseEducationFloor } from '@/types/education'
import { decodeHtmlEntities } from '@/lib/decodeHtmlEntities'
import { prepareMathHtml, rewriteLegacyImagePaths } from '@/lib/mathHtml'
import EducationFigure, { hasEducationFigure } from '@/components/education/figures/EducationFigure'
import MathHtml from '@/components/education/MathHtml'
import PracticeExercise from '@/components/education/PracticeExercise'

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
                  {decodeHtmlEntities(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {floor.headings.map((h) => (
        <h2 key={h} className="text-2xl font-semibold theme-text scroll-mt-24">
          {decodeHtmlEntities(h)}
        </h2>
      ))}

      {floor.sections.map((section) => (
        <details
          key={section.id}
          id={section.id}
          className="theme-bg-card border theme-border rounded-xl group"
        >
          <summary className="cursor-pointer list-none p-4 font-semibold text-lg theme-text [&::-webkit-details-marker]:hidden">
            {decodeHtmlEntities(section.title)}
          </summary>
          <div className="border-t theme-border">
            {(section.figureId || hasEducationFigure(section.id)) && (
              <div className="px-4 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide theme-text-secondary mb-2">
                  Skizze
                </p>
                <EducationFigure
                  figureId={section.figureId ?? section.id}
                />
              </div>
            )}
            {section.html?.replace(/\s/g, '') && (
              <MathHtml
                html={prepareMathHtml(rewriteLegacyImagePaths(section.html, imageSource))}
                className="education-prose px-4 py-4 theme-text text-sm leading-relaxed"
              />
            )}
            {section.practice && (
              <div className="px-4 pb-4">
                <PracticeExercise task={section.practice} />
              </div>
            )}
          </div>
        </details>
      ))}
    </article>
  )
}
