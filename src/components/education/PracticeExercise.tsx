'use client'

import { useState } from 'react'
import MathHtml from '@/components/education/MathHtml'
import { prepareMathHtml } from '@/lib/mathHtml'
import type { PracticeTask } from '@/types/education'

export default function PracticeExercise({ task }: { task: PracticeTask }) {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div className="rounded-lg border border-dashed theme-border bg-black/[0.02] dark:bg-white/[0.02] p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide theme-text-secondary">
        Übungsaufgabe
      </p>
      <MathHtml
        html={prepareMathHtml(task.prompt)}
        className="text-sm theme-text leading-relaxed"
      />
      {task.hint && (
        <p className="text-xs theme-text-secondary italic">{task.hint}</p>
      )}
      <button
        type="button"
        onClick={() => setShowSolution((v) => !v)}
        className="text-sm theme-primary hover:opacity-80 font-medium"
      >
        {showSolution ? 'Lösung ausblenden' : 'Lösung anzeigen'}
      </button>
      {showSolution && (
        <div className="pt-2 border-t theme-border">
          <p className="text-xs font-semibold uppercase tracking-wide theme-text-secondary mb-2">
            Lösung
          </p>
          <MathHtml
            html={prepareMathHtml(task.solution)}
            className="text-sm theme-text leading-relaxed"
          />
        </div>
      )}
    </div>
  )
}
