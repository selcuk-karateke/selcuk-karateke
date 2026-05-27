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
      {floor.headings.map((h) => (
        <h2 key={h} className="text-2xl font-semibold theme-text scroll-mt-28">
          {decodeHtmlEntities(h)}
        </h2>
      ))}

      {floor.sections.map((section) => (
        <details
          key={section.id}
          id={section.id}
          className="theme-bg-card border theme-border rounded-xl group scroll-mt-28"
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
