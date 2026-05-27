import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function listPhpFiles(repoRoot, skipDirs = new Set(['libs', 'style', '.git', 'node_modules', 'vendor'])) {
  const out = []
  function walk(dir, rel) {
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
  walk(repoRoot, '')
  return out.sort()
}

function isInfrastructurePhp(f) {
  return (
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
    f === 'footer.php' ||
    f.endsWith('/config.php') ||
    f.includes('/PHPMailer/')
  )
}

function routeFromPhp(rel) {
  if (rel === 'index.php') return 'index'
  return rel.replace(/\.php$/, '')
}

function loadTsExport(filePath, exportName) {
  // Read catalog from JSON-like sources instead — use exercise catalog from built data
  return null
}

// Parse exercise slugs from exerciseCatalog.ts manually via regex
function parseExerciseCatalog() {
  const src = fs.readFileSync(path.join(root, 'src/data/exerciseCatalog.ts'), 'utf8')
  const items = []
  const pf = /pf\(\s*'([^']+)',\s*'([^']+)'/g
  const ow = /ow\(\s*'([^']+)',\s*'([^']+)'/g
  let m
  while ((m = pf.exec(src))) items.push({ slug: m[1], legacyRoute: m[2], source: 'portfolio' })
  while ((m = ow.exec(src))) items.push({ slug: m[1], legacyRoute: m[2], source: 'own_website' })
  return items
}

function parseBuiltinSlugs() {
  const src = fs.readFileSync(path.join(root, 'src/lib/exerciseBuiltins.ts'), 'utf8')
  return [...src.matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]).filter((s) => s.includes('-') || s.length > 3 || s === 'oop')
}

function parseLegacyRoutes() {
  const src = fs.readFileSync(path.join(root, 'src/data/legacyRoutes.ts'), 'utf8')
  const routes = []
  const re = /route:\s*'([^']+)',\s*sourcePath:[^,]+,\s*title:\s*'([^']+)'/g
  let m
  const blocks = src.split("source: '")
  for (const block of blocks.slice(1)) {
    const source = block.startsWith('portfolio') ? 'portfolio' : block.startsWith('own_website') ? 'own_website' : null
    if (!source) continue
    const routeRe = /route:\s*'([^']+)'/g
    while ((m = routeRe.exec(block))) {
      routes.push({ source, route: m[1] })
    }
  }
  return routes
}

function listDirRecursive(dir, ext) {
  if (!fs.existsSync(dir)) return []
  const out = []
  function walk(d, rel) {
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name)
      const relPath = rel ? `${rel}/${name}` : name
      if (fs.statSync(full).isDirectory()) walk(full, relPath)
      else if (name.endsWith(ext)) out.push(relPath.replace(/\\/g, '/'))
    }
  }
  walk(dir, '')
  return out.sort()
}

const portfolioRoot = 'l:/repos/portfolio'
const ownRoot = 'l:/repos/own_website'

const portfolioPhp = listPhpFiles(portfolioRoot)
const ownPhp = listPhpFiles(ownRoot)
const exercises = parseExerciseCatalog()
const builtins = new Set(parseBuiltinSlugs())
const legacyRoutes = parseLegacyRoutes()

const legacyRouteSet = {
  portfolio: new Set(legacyRoutes.filter((r) => r.source === 'portfolio').map((r) => r.route)),
  own_website: new Set(legacyRoutes.filter((r) => r.source === 'own_website').map((r) => r.route)),
}

const exerciseRouteSet = {
  portfolio: new Map(exercises.filter((e) => e.source === 'portfolio').map((e) => [e.legacyRoute, e.slug])),
  own_website: new Map(exercises.filter((e) => e.source === 'own_website').map((e) => [e.legacyRoute, e.slug])),
}

const educJsonPf = listDirRecursive(path.join(root, 'content/education/portfolio'), '.json')
const educJsonOw = listDirRecursive(path.join(root, 'content/education/own_website'), '.json')
const legacyHtmlPf = listDirRecursive(path.join(root, 'content/legacy/portfolio'), '.html')
const legacyHtmlOw = listDirRecursive(path.join(root, 'content/legacy/own_website'), '.html')

function categorizePhp(source, files) {
  const missing = []
  const infra = []
  const covered = []
  const partial = []

  for (const f of files) {
    if (isInfrastructurePhp(f)) {
      infra.push(f)
      continue
    }
    const route = routeFromPhp(f)
    const inLegacy = legacyRouteSet[source].has(route)
    const exSlug = exerciseRouteSet[source].get(route)
    const isEduc = /^educ\//.test(route) || /^\d+(st|nd|rd|th)Floor\.php$/.test(f) || /Floor\.php$/.test(f)

    if (exSlug) {
      const builtin = builtins.has(exSlug)
      covered.push({ f, route, target: `/uebungen/${exSlug}`, builtin })
      continue
    }
    if (/^educ\//.test(route) || /^\d+(st|nd|rd|th)Floor$/.test(route)) {
      const floor = route.replace(/^educ\//, '')
      const hasJson =
        source === 'portfolio'
          ? educJsonPf.includes(`${floor}.json`)
          : educJsonOw.includes(`${floor}.json`) || educJsonPf.some((j) => j.replace('.json', '') === floor)
      covered.push({ f, route, target: `/education/${floor}`, hasJson })
      continue
    }
    if (inLegacy) {
      partial.push({ f, route, note: 'legacyRoutes only — no /uebungen|education redirect' })
      continue
    }
    missing.push({ f, route })
  }
  return { missing, infra, covered, partial }
}

const pf = categorizePhp('portfolio', portfolioPhp)
const ow = categorizePhp('own_website', ownPhp)

console.log('=== REPO STATS ===')
console.log('Portfolio PHP (total):', portfolioPhp.length)
console.log('Own website PHP (total):', ownPhp.length)
console.log('Exercise catalog entries:', exercises.length)
console.log('Builtin exercises:', builtins.size)
console.log('legacyRoutes entries:', legacyRoutes.length)
console.log('Education JSON portfolio:', educJsonPf.length)
console.log('Education JSON own_website:', educJsonOw.length)
console.log('Legacy HTML portfolio:', legacyHtmlPf.length)
console.log('Legacy HTML own_website:', legacyHtmlOw.length)

console.log('\n=== PORTFOLIO: NICHT ABGEDECKT (relevante PHP) ===')
for (const x of pf.missing) console.log(`  ${x.f}  →  /${x.route}`)

console.log('\n=== OWN_WEBSITE: NICHT ABGEDECKT (relevante PHP) ===')
for (const x of ow.missing) console.log(`  ${x.f}  →  /${x.route}`)

console.log('\n=== NUR legacyRoutes (kein exercise/education, Redirect fehlt evtl.) ===')
for (const x of [...pf.partial, ...ow.partial]) console.log(`  [${x.f}] ${x.note}`)

console.log('\n=== ÜBUNGEN OHNE BUILTIN (nur HTML/Prose) ===')
for (const ex of exercises) {
  if (!builtins.has(ex.slug)) console.log(`  ${ex.slug} (${ex.source}) legacy=${ex.legacyRoute}`)
}

console.log('\n=== LEGACY ROUTES OHNE HTML IN content/legacy ===')
const htmlPfRoutes = new Set(legacyHtmlPf.map((h) => h.replace(/\.html$/, '')))
const htmlOwRoutes = new Set(legacyHtmlOw.map((h) => h.replace(/\.html$/, '')))
for (const r of legacyRoutes) {
  const htmlSet = r.source === 'portfolio' ? htmlPfRoutes : htmlOwRoutes
  if (!htmlSet.has(r.route) && !r.route.startsWith('educ/') && !r.route.match(/Floor$/)) {
    console.log(`  ${r.source}/${r.route}`)
  }
}

console.log('\n=== PUBLIC legacy-assets (MB) ===')
const laPf = path.join(root, 'public/legacy-assets/portfolio')
const laOw = path.join(root, 'public/legacy-assets/own_website')
function dirSize(d) {
  if (!fs.existsSync(d)) return 0
  let s = 0
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name)
    s += f.isDirectory() ? dirSize(p) : fs.statSync(p).size
  }
  return s
}
console.log('  portfolio:', (dirSize(laPf) / 1024 / 1024).toFixed(1), 'MB')
console.log('  own_website:', (dirSize(laOw) / 1024 / 1024).toFixed(1), 'MB')
