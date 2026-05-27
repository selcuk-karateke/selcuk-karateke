import { convertLegacyTexToLatex } from '@/lib/legacyTex'

/** Entfernt eingebettete Legacy-Mathe-PNGs (ersetzt durch SVG-Skizzen). */
export function stripMathImages(html: string): string {
  return html.replace(/<img[^>]*\/img\/math\/[^>]*>/gi, '').trim()
}

/** Backtick-TeX aus dem Legacy-Portfolio → MathJax-inline. */
export function prepareMathHtml(html: string): string {
  return stripMathImages(html).replace(/`([^`]+)`/g, (_, tex: string) => {
    const latex = convertLegacyTexToLatex(tex)
    return `\\(${latex}\\)`
  })
}

export function rewriteLegacyImagePaths(
  html: string,
  source: 'portfolio' | 'own_website'
): string {
  const base = `/legacy-assets/${source}/img`
  return html
    .replace(/src="(?:\.\.\/)+img\//g, `src="${base}/`)
    .replace(/href="(?:\.\.\/)+img\//g, `href="${base}/`)
    .replace(/src="img\//g, `src="${base}/`)
    .replace(/href="img\//g, `href="${base}/`)
}

/** @deprecated Use rewriteLegacyImagePaths */
export function rewritePortfolioImagePaths(html: string): string {
  return rewriteLegacyImagePaths(html, 'portfolio')
}
