import fs from 'fs'
import path from 'path'
import { legacyAssetScopes } from '../src/data/legacyAssets'

const REPO_ROOT = process.cwd()
const OUT_ROOT = path.join(REPO_ROOT, 'public', 'legacy-assets')

const SKIP_IMG_SUBDIRS = new Set(['math'])

function copyDir(src: string, dest: string, skipSubdirs = false) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skipSubdirs && entry.isDirectory() && SKIP_IMG_SUBDIRS.has(entry.name)) continue
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to, skipSubdirs)
    else fs.copyFileSync(from, to)
  }
}

for (const scope of legacyAssetScopes) {
  const envBase =
    scope.source === 'portfolio'
      ? process.env.LEGACY_PORTFOLIO_PATH
      : process.env.LEGACY_OWN_WEBSITE_PATH

  const base = envBase ?? scope.basePath
  const destBase = path.join(OUT_ROOT, scope.source)

  for (const folder of scope.folders) {
    const src = path.join(base, folder)
    const dest = path.join(destBase, folder)
    if (!fs.existsSync(src)) {
      console.warn(`[skip] ${scope.source}/${folder} — not found at ${src}`)
      continue
    }
    const skipMath = folder === 'img'
    copyDir(src, dest, skipMath)
    console.log(`[ok] ${scope.source}/${folder}${skipMath ? ' (ohne math/)' : ''}`)
  }
}

console.log('Legacy assets synced to public/legacy-assets/')
