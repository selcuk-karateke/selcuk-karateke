'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>
      startup?: { promise: Promise<void> }
    }
  }
}

export default function MathJaxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const run = async () => {
      if (window.MathJax?.startup?.promise) {
        await window.MathJax.startup.promise
      }
      await window.MathJax?.typesetPromise?.()
    }
    void run()
  })

  return (
    <>
      <Script id="mathjax-config" strategy="beforeInteractive">
        {`
          window.MathJax = {
            tex: {
              inlineMath: [['\\\\(', '\\\\)']],
              displayMath: [['\\\\[', '\\\\]']],
              processEscapes: true
            },
            options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] }
          };
        `}
      </Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
        strategy="afterInteractive"
        onLoad={() => {
          void window.MathJax?.typesetPromise?.()
        }}
      />
      {children}
    </>
  )
}
