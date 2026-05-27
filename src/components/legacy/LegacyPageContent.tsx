import type { ParsedLegacyPage } from '@/lib/parseLegacyHtml'

export default function LegacyPageContent({
  parsed,
  fallbackHtml,
}: {
  parsed: ParsedLegacyPage
  fallbackHtml?: string
}) {
  const mainTitle = parsed.headings.find((h) => h.level === 1)?.text
  const sectionHeadings = parsed.headings.filter((h) => h.level === 2)

  if (parsed.sections.length === 0 && fallbackHtml) {
    const expanded = fallbackHtml.replace(/class="collapse"/g, 'class="collapse show"')
    return (
      <article
        className="legacy-page legacy-html-body theme-text"
        dangerouslySetInnerHTML={{ __html: expanded }}
      />
    )
  }

  return (
    <article className="legacy-page space-y-6">
      {mainTitle && <h1 className="text-3xl font-bold theme-text">{mainTitle}</h1>}

      {sectionHeadings.map((h) => (
        <h2
          key={h.id ?? h.text}
          id={h.id}
          className="text-2xl font-semibold theme-text scroll-mt-24"
        >
          {h.text}
        </h2>
      ))}

      {parsed.toc.length > 0 && (
        <nav className="theme-bg-card border theme-border rounded-xl p-5">
          <h2 className="text-lg font-semibold theme-text mb-3">Inhaltsverzeichnis</h2>
          <ul className="space-y-1 text-sm">
            {parsed.toc.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="theme-primary hover:opacity-80">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {parsed.sections.map((section) => (
        <details
          key={section.id}
          id={section.id}
          className="theme-bg-card border theme-border rounded-xl group"
          open
        >
          <summary className="cursor-pointer list-none p-4 font-semibold text-lg theme-text [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              {section.title}
              <span className="text-xs font-normal theme-text-secondary group-open:rotate-180 transition-transform">
                ▼
              </span>
            </span>
          </summary>
          <div
            className="legacy-section-content px-4 pb-5 theme-text border-t theme-border prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        </details>
      ))}

      {parsed.sections.length === 0 && !fallbackHtml && (
        <p className="theme-text-secondary">Kein Inhalt auf dieser Seite.</p>
      )}
    </article>
  )
}
