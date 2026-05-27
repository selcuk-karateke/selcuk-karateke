import fs from 'fs'
import path from 'path'
import type { LegacyRoute } from '@/data/legacyRoutes'

const REPO_ROOT = process.cwd()

const DEFAULT_BASE_PATHS: Record<LegacyRoute['source'], string> = {
  portfolio: 'l:/repos/portfolio',
  own_website: 'l:/repos/own_website',
}

export function bundledLegacyHtmlPath(route: LegacyRoute): string {
  return path.join(REPO_ROOT, 'content', 'legacy', route.source, `${route.route}.html`)
}

export function resolveLegacyPhpPath(route: LegacyRoute): string | null {
  const envBase =
    route.source === 'portfolio'
      ? process.env.LEGACY_PORTFOLIO_PATH
      : process.env.LEGACY_OWN_WEBSITE_PATH

  const match = route.sourcePath.match(/repos\/(?:portfolio|own_website)\/(.+)$/i)
  if (!match) return null

  const relativePhp = match[1]
  const bases = [envBase, DEFAULT_BASE_PATHS[route.source]].filter(Boolean) as string[]

  for (const base of bases) {
    const candidate = path.join(base, relativePhp)
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}

export function stripPhp(source: string): string {
  return source
    .replace(/<\?php[\s\S]*?\?>/gi, '')
    .replace(/<\?=[\s\S]*?\?>/gi, '')
    .trim()
}

export function extractMainHtml(raw: string, _route: LegacyRoute): string {
  const withoutPhp = stripPhp(raw)
  const lower = withoutPhp.toLowerCase()

  if (lower.includes('<html') || lower.includes('<!doctype')) {
    const colMatch = withoutPhp.match(
      /<div[^>]*class="[^"]*col-sm-8[^"]*text-left[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i
    )
    if (colMatch?.[1]) return colMatch[1].trim()

    const bodyMatch = withoutPhp.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch?.[1]) {
      return bodyMatch[1]
        .replace(/<\?php[\s\S]*?\?>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim()
    }
  }

  return withoutPhp
}

export function rewriteLegacyAssetPaths(html: string, route: LegacyRoute): string {
  const assetBase = `/legacy-assets/${route.source}`

  return html
    .replace(/src=(["'])(?:\.\.\/)+img\//gi, `src=$1${assetBase}/img/`)
    .replace(/href=(["'])(?:\.\.\/)+img\//gi, `href=$1${assetBase}/img/`)
    .replace(/src=(["'])img\//gi, `src=$1${assetBase}/img/`)
    .replace(/href=(["'])img\//gi, `href=$1${assetBase}/img/`)
    .replace(/src=(["'])css\//gi, `src=$1${assetBase}/css/`)
    .replace(/href=(["'])css\//gi, `href=$1${assetBase}/css/`)
    .replace(/src=(["'])js\//gi, `src=$1${assetBase}/js/`)
    .replace(/href=(["'])style\//gi, `href=$1${assetBase}/style/`)
    .replace(/src=(["'])style\//gi, `src=$1${assetBase}/style/`)
    .replace(/src=(["'])audio\//gi, `src=$1${assetBase}/audio/`)
    .replace(/href=(["'])fonts\//gi, `href=$1${assetBase}/fonts/`)
}

export function processLegacyFileContent(raw: string, route: LegacyRoute): string {
  return rewriteLegacyAssetPaths(extractMainHtml(raw, route), route)
}

export function loadLegacyContent(route: LegacyRoute): {
  html: string | null
  origin: 'bundled' | 'php' | null
} {
  const bundledPath = bundledLegacyHtmlPath(route)
  if (fs.existsSync(bundledPath)) {
    return { html: fs.readFileSync(bundledPath, 'utf8'), origin: 'bundled' }
  }

  const phpPath = resolveLegacyPhpPath(route)
  if (phpPath) {
    const raw = fs.readFileSync(phpPath, 'utf8')
    return { html: processLegacyFileContent(raw, route), origin: 'php' }
  }

  return { html: null, origin: null }
}

export function writeBundledLegacyContent(route: LegacyRoute, html: string): void {
  const outPath = bundledLegacyHtmlPath(route)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
}
