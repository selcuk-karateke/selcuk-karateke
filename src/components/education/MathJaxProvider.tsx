'use client'

import Script from 'next/script'

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>
      typesetClear?: (elements?: Element[]) => void
      startup?: { promise: Promise<void> }
    }
  }
}

export default function MathJaxProvider({ children }: { children: React.ReactNode }) {
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
            startup: { typeset: false },
            options: {
              skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
              renderActions: { addMenu: [0, '', ''] }
            }
          };
        `}
      </Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
        strategy="lazyOnload"
      />
      {children}
    </>
  )
}
