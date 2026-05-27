import { getLegacyRoute } from '@/data/legacyRoutes'
import { loadLegacyContent } from '@/lib/legacyContent'
import { parseLegacyHtml } from '@/lib/parseLegacyHtml'

export function loadParsedLegacyPage(source: 'portfolio' | 'own_website', routePath: string) {
  const route = getLegacyRoute(source, routePath.split('/'))
  if (!route) return null

  const { html } = loadLegacyContent(route)
  if (!html) return { route, parsed: null, html: null }

  return {
    route,
    html,
    parsed: parseLegacyHtml(html),
  }
}
