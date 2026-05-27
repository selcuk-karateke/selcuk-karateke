import type { StructuredEducationFloor } from '@/types/education'
import { decodeHtmlEntities } from '@/lib/decodeHtmlEntities'
import { prepareMathHtml, rewriteLegacyImagePaths } from '@/lib/mathHtml'

function FieldBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="border-t theme-border px-4 py-3 first:border-t-0">
      <p className="text-xs font-semibold uppercase tracking-wide theme-text-secondary mb-1">
        {label}
      </p>
      <div className="education-field theme-text text-sm leading-relaxed">{children}</div>
    </li>
  )
}

function HtmlField({ label, html }: { label: string; html: string }) {
  const prepared = prepareMathHtml(rewriteLegacyImagePaths(html, 'portfolio'))
  return (
    <FieldBlock label={label}>
      <div dangerouslySetInnerHTML={{ __html: prepared }} />
    </FieldBlock>
  )
}

export default function EducationStructuredView({ floor }: { floor: StructuredEducationFloor }) {
  return (
    <div className="space-y-10">
      {floor.introHeadings.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {floor.introHeadings.map((h) => (
            <span
              key={h}
              className="text-xs px-3 py-1 rounded-full border theme-border theme-text-secondary"
            >
              {decodeHtmlEntities(h)}
            </span>
          ))}
        </div>
      )}

      {floor.sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <h2 className="text-2xl font-bold theme-text border-b theme-border pb-2">
            {decodeHtmlEntities(section.title)}
          </h2>

          <div className="space-y-3">
            {section.entries.map((entry) => (
              <details
                key={entry.id}
                id={entry.id}
                className="theme-bg-card border theme-border rounded-xl overflow-hidden group"
                open
              >
                <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg theme-text bg-black/[0.02] dark:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                  {decodeHtmlEntities(entry.subtitle)}
                </summary>
                <ul className="list-none m-0 p-0">
                  {entry.description && (
                    <HtmlField label="Beschreibung" html={entry.description} />
                  )}
                  {entry.tableHtml && (
                    <HtmlField label="Tabelle" html={entry.tableHtml} />
                  )}
                  {entry.imageSrc && (
                    <FieldBlock label="Grafik">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={entry.imageSrc}
                        alt={entry.imageAlt ?? entry.subtitle}
                        className="max-w-full h-auto rounded-md"
                      />
                    </FieldBlock>
                  )}
                  {entry.formula?.replace(/\s/g, '') && (
                    <HtmlField label="Formel" html={entry.formula} />
                  )}
                  {entry.supplement?.replace(/\s/g, '') && (
                    <HtmlField label="Zusatz" html={entry.supplement} />
                  )}
                  {entry.question?.replace(/\s/g, '') && (
                    <HtmlField label="Frage" html={entry.question} />
                  )}
                  {entry.calculation?.replace(/<[^>]+>/g, '').trim() && (
                    <HtmlField label="Rechnung" html={entry.calculation} />
                  )}
                  {entry.answer?.replace(/\s/g, '') && (
                    <HtmlField label="Antwort" html={entry.answer} />
                  )}
                  {entry.note?.replace(/\s/g, '') && <HtmlField label="Merke" html={entry.note} />}
                </ul>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
