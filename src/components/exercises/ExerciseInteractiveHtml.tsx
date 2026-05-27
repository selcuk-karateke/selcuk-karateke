'use client'

import { useEffect, useRef } from 'react'
import { prepareMathHtml } from '@/lib/mathHtml'

function prepareExerciseHtml(html: string, source: 'portfolio' | 'own_website') {
  const base = `/legacy-assets/${source}`
  return prepareMathHtml(
    html
      .replace(/src=(["'])\/audio\//gi, `src=$1${base}/audio/`)
      .replace(/href=(["'])index\.php/gi, 'href=$1/uebungen')
      .replace(/href=(["'])\.\.\/index\.php/gi, 'href=$1/uebungen')
      .replace(/src=(["'])(?!https?:|\/|#)([^"']+\.(jpg|jpeg|png|gif))/gi, `src=$1${base}/$2`)
      .replace(/src=(["'])img\//gi, `src=$1${base}/img/`)
  )
}

export default function ExerciseInteractiveHtml({
  html,
  source = 'portfolio',
}: {
  html: string
  source?: 'portfolio' | 'own_website'
}) {
  const ref = useRef<HTMLElement>(null)
  const prepared = prepareExerciseHtml(html, source)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    root.querySelectorAll('script').forEach((old) => {
      const script = document.createElement('script')
      if (old.src) script.src = old.src
      else script.textContent = old.textContent
      old.replaceWith(script)
    })

    root.querySelectorAll('form').forEach((form) => {
      const action = form.getAttribute('action') ?? ''
      if (action.endsWith('.php') || action.includes('menue.php')) {
        form.setAttribute('data-legacy-php-form', '1')
      }
    })
  }, [prepared])

  return (
    <article
      ref={ref}
      className="education-prose legacy-html-body theme-text text-sm leading-relaxed math-content"
      dangerouslySetInnerHTML={{ __html: prepared }}
    />
  )
}
