import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

type FloorPair = {
  topic: string
  portfolio?: string
  own?: string
}

const pairs: FloorPair[] = [
  { topic: 'Mathe / Flächen', portfolio: 'educ/1stFloor.php', own: '1stFloor.php' },
  { topic: '2. Stock', portfolio: 'educ/2ndFloor.php', own: '2ndFloor.php' },
  { topic: '3. Stock / BWL', portfolio: 'educ/3rdFloor.php', own: '3rdFloor.php' },
  { topic: 'Recht', portfolio: 'educ/4thFloor.php', own: '4thFloor.php' },
  { topic: 'SWL vs Netzwerke (Nr.5)', portfolio: 'educ/5thFloor.php', own: '5thFloor.php' },
  { topic: 'Elektro vs LAN (Nr.6)', portfolio: 'educ/6thFloor.php', own: '6thFloor.php' },
  { topic: '7. Stock', portfolio: 'educ/7thFloor.php', own: '7thFloor.php' },
  { topic: '8. Stock / DB', portfolio: 'educ/8thFloor.php', own: '8thFloor.php' },
  { topic: '9. Stock', portfolio: 'educ/9thFloor.php', own: '9thFloor.php' },
  { topic: '10. Stock', portfolio: 'educ/10thFloor.php', own: '10thFloor.php' },
  { topic: '11. Stock (nur Website)', own: '11thFloor.php' },
  { topic: '12. Stock (nur Website)', own: '12thFloor.php' },
]

function statFile(repo: string, rel?: string) {
  if (!rel) return null
  const full = path.join(repo, rel)
  if (!fs.existsSync(full)) return null
  const st = fs.statSync(full)
  let lastGit = ''
  try {
    lastGit = execSync(`git log -1 --format=%ci`, {
      cwd: repo,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim()
    // file-specific last change
    const fileGit = execSync(`git log -1 --format=%ci`, {
      cwd: repo,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    })
    void fileGit
  } catch {
    lastGit = 'n/a'
  }
  let fileLastGit = 'n/a'
  try {
    fileLastGit =
      execSync(`git log -1 --format=%ci -- "${rel.replace(/\\/g, '/')}"`, {
        cwd: repo,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim() || 'untracked'
  } catch {
    fileLastGit = 'n/a'
  }

  const text = fs.readFileSync(full, 'utf8')
  const collapseIds = [...text.matchAll(/id="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((id) => !['navbar', 'footer', 'content'].includes(id))
  const h3 = (text.match(/<h3[^>]*>/gi) || []).length
  const h2 = (text.match(/<h2[^>]*>/gi) || []).length
  const h4 = (text.match(/<h4[^>]*>/gi) || []).length

  return {
    bytes: st.size,
    mtime: st.mtime.toISOString().slice(0, 10),
    git: fileLastGit.slice(0, 10),
    sections: h3 + h4,
    h2,
    collapseIds: collapseIds.length,
  }
}

const pfRepo = 'l:/repos/portfolio'
const owRepo = 'l:/repos/own_website'

console.log('=== Stockwerk-Vergleich: Portfolio vs. frühere Website ===\n')
console.log(
  'Topic'.padEnd(32),
  '| PF bytes'.padStart(9),
  'PF git'.padStart(10),
  'PF §'.padStart(5),
  '| OW bytes'.padStart(9),
  'OW git'.padStart(10),
  'OW §'.padStart(5),
  '| Empfehlung'
)
console.log('-'.repeat(110))

for (const p of pairs) {
  const pf = statFile(pfRepo, p.portfolio)
  const ow = statFile(owRepo, p.own)

  let rec = '—'
  if (pf && ow) {
    const pfScore = pf.bytes + pf.sections * 500
    const owScore = ow.bytes + ow.sections * 500
    if (Math.abs(pfScore - owScore) < 2000) rec = '≈ gleich'
    else if (pfScore > owScore) rec = 'Portfolio neuer/vollständiger'
    else rec = 'Website neuer/vollständiger'
  } else if (pf) rec = 'nur Portfolio'
  else if (ow) rec = 'nur Website'

  console.log(
    p.topic.padEnd(32),
    '|',
    pf ? String(pf.bytes).padStart(8) : '—'.padStart(8),
    pf ? pf.git.padStart(10) : '—'.padStart(10),
    pf ? String(pf.sections).padStart(4) : '—'.padStart(4),
    '|',
    ow ? String(ow.bytes).padStart(8) : '—'.padStart(8),
    ow ? ow.git.padStart(10) : '—'.padStart(10),
    ow ? String(ow.sections).padStart(4) : '—'.padStart(4),
    '|',
    rec
  )
}

// JSON import richness
console.log('\n=== Importierte Abschnitte (Next.js JSON) ===')
for (const [src, dir] of [
  ['portfolio', 'content/education/portfolio'],
  ['own_website', 'content/education/own_website'],
] as const) {
  console.log(`\n${src}:`)
  const d = path.join(process.cwd(), dir)
  if (!fs.existsSync(d)) continue
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json')).sort()) {
    const j = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'))
    const n =
      j.kind === 'structured'
        ? j.sections.reduce((a: number, s: { entries: unknown[] }) => a + s.entries.length, 0)
        : j.sections.length
    console.log(`  ${f.replace('.json', '')}: ${n} ${j.kind === 'structured' ? 'Karten' : 'Abschnitte'}`)
  }
}
