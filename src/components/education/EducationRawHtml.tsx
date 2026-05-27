'use client'

import { useEffect, useRef } from 'react'
import { prepareMathHtml, rewriteLegacyImagePaths } from '@/lib/mathHtml'

export default function EducationRawHtml({
  html,
  imageSource = 'portfolio',
}: {
  html: string
  imageSource?: 'portfolio' | 'own_website'
}) {
  const ref = useRef<HTMLElement>(null)
  const expanded = html.replace(/class="collapse"/g, 'class="collapse show"')
  const prepared = prepareMathHtml(rewriteLegacyImagePaths(expanded, imageSource))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const typeset = async () => {
      const mj = window.MathJax
      if (!mj?.typesetPromise) return
      if (mj.startup?.promise) await mj.startup.promise
      await mj.typesetPromise([el])
    }
    void typeset()
  }, [prepared])

  return (
    <article
      ref={ref}
      className="education-prose legacy-html-body theme-text text-sm leading-relaxed math-content"
      dangerouslySetInnerHTML={{ __html: prepared }}
    />
  )
}
