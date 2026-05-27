'use client'

import { useEffect, useRef } from 'react'

export default function MathHtml({
  html,
  className = '',
}: {
  html: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !html.trim()) return

    const typeset = async () => {
      const mj = window.MathJax
      if (!mj?.typesetPromise) return
      if (mj.startup?.promise) await mj.startup.promise
      try {
        await mj.typesetClear?.([el])
      } catch {
        /* ältere MathJax-Version */
      }
      await mj.typesetPromise([el])
    }

    void typeset()
  }, [html])

  return (
    <div
      ref={ref}
      className={`math-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
