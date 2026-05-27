import fs from 'fs'
import path from 'path'
import { legacyRoutes } from '../src/data/legacyRoutes'
import { educationCatalog } from '../src/data/educationCatalog'
import { portfolioExercises } from '../src/data/exercises'

function listPhpFiles(root: string, skipDirs = new Set(['libs', 'style', '.git', 'node_modules'])): string[] {
  const out: string[] = []
  function walk(dir: string, rel: string) {
    if (!fs.existsSync(dir)) return
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name)
      const relPath = rel ? `${rel}/${name}` : name
      const st = fs.statSync(full)
      if (st.isDirectory()) {
        if (!skipDirs.has(name)) walk(full, relPath)
      } else if (name.endsWith('.php')) {
        out.push(relPath.replace(/\\/g, '/'))
      }
    }
  }
  walk(root, '')
  return out.sort()
}

function routeFromPhp(rel: string): string {
  if (rel === 'index.php') return 'index'
  return rel.replace(/\.php$/, '').replace(/\/index$/, '/index')
}

function normalizeRoute(r: string): string {
  return r.replace(/\\/g, '/').replace(/^\//, '')
}

const portfolioRoot = 'l:/repos/portfolio'
const ownRoot = 'l:/repos/own_website'

const portfolioPhp = listPhpFiles(portfolioRoot)
const ownPhp = listPhpFiles(ownRoot)

const registered = {
  portfolio: new Set(legacyRoutes.filter((r) => r.source === 'portfolio').map((r) => r.route)),
  own_website: new Set(legacyRoutes.filter((r) => r.source === 'own_website').map((r) => r.route)),
}

function unregistered(source: 'portfolio' | 'own_website', files: string[]) {
  const reg = registered[source]
  const missing: string[] = []
  for (const f of files) {
    const route = normalizeRoute(routeFromPhp(f))
    const alt = route.endsWith('/index') ? route.slice(0, -6) : route
    if (reg.has(route) || reg.has(alt)) continue
    // skip libs, includes, classes, old/, sessions/, templates partials
    if (
      f.startsWith('libs/') ||
      f.includes('/class/') ||
      f.includes('/classes/') ||
      f.includes('/includes/') ||
      f.includes('/incl/') ||
      f.includes('/old/') ||
      f.includes('/sessions/') ||
      f.startsWith('templates/') ||
      f.startsWith('maintence/') ||
      f.startsWith('mail/') ||
      f === 'header.php' ||
      f === 'footer.php'
    ) {
      continue
    }
    missing.push(f)
  }
  return missing
}

const legacyHtml = {
  portfolio: listPhpFiles('content/legacy/portfolio'.replace('portfolio', '')) ,
}

function listLegacyHtml(source: string): string[] {
  const dir = path.join(process.cwd(), 'content', 'legacy', source)
  if (!fs.existsSync(dir)) return []
  const out: string[] = []
  function walk(d: string, rel: string) {
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name)
      const relPath = rel ? `${rel}/${name}` : name
      if (fs.statSync(full).isDirectory()) walk(full, relPath)
      else if (name.endsWith('.html')) out.push(relPath.replace(/\\/g, '/'))
    }
  }
  walk(dir, '')
  return out.sort()
}

const htmlPf = listLegacyHtml('portfolio')
const htmlOw = listLegacyHtml('own_website')

const educJsonPf = fs.existsSync('content/education/portfolio')
  ? fs.readdirSync('content/education/portfolio').filter((f) => f.endsWith('.json'))
  : []
const educJsonOw = fs.existsSync('content/education/own_website')
  ? fs.readdirSync('content/education/own_website').filter((f) => f.endsWith('.json'))
  : []

const exerciseSlugs = new Set(portfolioExercises.map((e) => e.slug))

console.log('=== PHP nicht in legacyRoutes (relevant) ===')
console.log('\nPortfolio:')
for (const f of unregistered('portfolio', portfolioPhp)) console.log('  ', f)
console.log('\nOwn website:')
for (const f of unregistered('own_website', ownPhp)) console.log('  ', f)

console.log('\n=== Legacy HTML extrahiert vs legacyRoutes ===')
const htmlRoutesPf = new Set(
  htmlPf.map((h) => h.replace(/\.html$/, '').replace(/\/index$/, '/index'))
)
const htmlRoutesOw = new Set(htmlOw.map((h) => h.replace(/\.html$/, '')))

const missingHtmlPf = [...registered.portfolio].filter((r) => !htmlRoutesPf.has(r) && !htmlRoutesPf.has(r + '.html'))
const missingHtmlOw = [...registered.own_website].filter((r) => !htmlRoutesOw.has(r))

console.log('Routes ohne HTML-Extrakt (portfolio):', missingHtmlPf.length ? missingHtmlPf : '(keine)')
console.log('Routes ohne HTML-Extrakt (own_website):', missingHtmlOw.length ? missingHtmlOw : '(keine)')

console.log('\n=== Bildung: Katalog vs alle Stockwerke ===')
console.log('Catalog entries:', educationCatalog.length)
console.log(
  'Own website floors NOT in catalog:',
  educJsonOw
    .map((f) => f.replace('.json', ''))
    .filter((id) => !educationCatalog.some((c) => c.source === 'own_website' && c.floorId === id))
)

console.log('\n=== Übungen portfolio PHP (exer/) ===')
const exerPhp = portfolioPhp.filter((f) => f.startsWith('exer/'))
const exerMigrated = portfolioExercises.map((e) => e.legacyRoute)
console.log('PHP in exer/:', exerPhp.length)
for (const f of exerPhp) {
  const route = f.replace(/\.php$/, '').replace(/\\/g, '/')
  const inRoutes = registered.portfolio.has(route) || registered.portfolio.has(route.replace(/\/index$/, ''))
  const inExercises = exerMigrated.some((r) => route.startsWith(r) || r.startsWith(route))
  if (!inRoutes && !inExercises) console.log('  NICHT migriert:', f)
}

console.log('\n=== Own website exercise/ PHP ===')
const owEx = ownPhp.filter((f) => f.startsWith('exercise/'))
for (const f of owEx) {
  const route = f.replace(/\.php$/, '')
  if (!registered.own_website.has(route)) console.log('  NICHT in legacyRoutes:', f)
}
