/** Backtick-TeX aus dem Legacy-Portfolio → MathJax-inline. */
export function prepareMathHtml(html: string): string {
  return html
    .replace(/&middot;/g, '\\cdot ')
    .replace(/`([^`]+)`/g, (_, tex: string) => {
      const trimmed = tex.trim()
      return `\\(${trimmed}\\)`
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
