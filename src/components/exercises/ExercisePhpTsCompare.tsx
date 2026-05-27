'use client'

import { useMemo, useState } from 'react'

type Tab = 'php' | 'ts' | 'output'

export function ExercisePhpTsCompare({
  phpSource,
  tsSource,
  output,
  highlights,
  note,
}: {
  phpSource: string
  tsSource: string
  output: string
  highlights?: string[]
  note?: string
}) {
  const [tab, setTab] = useState<Tab>('ts')

  const tabs = useMemo(
    () =>
      [
        { id: 'php' as const, label: 'PHP (Original)' },
        { id: 'ts' as const, label: 'TypeScript' },
        { id: 'output' as const, label: 'Ausgabe (live)' },
      ] as const,
    [],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
              tab === t.id
                ? 'theme-primary-bg text-white border-transparent'
                : 'theme-border border theme-text-secondary hover:theme-bg-secondary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {note && <p className="text-sm theme-text-secondary">{note}</p>}

      {tab === 'php' && <CodeBlock lang="php" code={phpSource} />}
      {tab === 'ts' && <CodeBlock lang="typescript" code={tsSource} />}
      {tab === 'output' && (
        <div className="space-y-4">
          <CodeBlock lang="text" code={output} />
          {highlights?.map((line) => (
            <p key={line} className="text-base font-semibold theme-text">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <pre
      className="text-xs overflow-auto theme-bg-secondary p-4 rounded border theme-border whitespace-pre-wrap"
      data-lang={lang}
    >
      <code>{code}</code>
    </pre>
  )
}
