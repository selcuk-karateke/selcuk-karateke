import type { EducationSubEntry } from '@/types/education'
import { rewriteLegacyImagePaths } from '@/lib/mathHtml'

/** Zerlegt Legacy-HTML (ohne list-group) in Formel / Frage / Rechnung / Antwort / Merke. */
export function splitLegacyEducationFields(entry: EducationSubEntry): EducationSubEntry {
  if (entry.question || !entry.formula) return entry

  let html = entry.formula

  const mark = html.match(/<mark[^>]*>[\s\S]*?<\/mark>/i)
  if (mark && !entry.note) {
    entry = { ...entry, note: mark[0] }
    html = html.replace(mark[0], '').trim()
  }

  const img = html.match(/<img[^>]*src="([^"]+)"[^>]*>/i)
  if (img && !/\/img\/math\//i.test(img[1]) && !entry.imageSrc) {
    entry = {
      ...entry,
      imageSrc: rewriteLegacyImagePaths(img[1], 'portfolio'),
      imageAlt: img[0].match(/alt="([^"]*)"/i)?.[1],
    }
    html = html.replace(img[0], '').trim()
  }

  const frage = html.match(/<p[^>]*>\s*Frage:\s*([\s\S]*?)<\/p>/i)
  if (frage) {
    entry = { ...entry, question: frage[1].trim() }
    html = html.replace(frage[0], '').trim()
  }

  const rechnungHeader = html.match(/<p[^>]*>\s*Rechnung:\s*<\/p>\s*/i)
  if (rechnungHeader) {
    html = html.replace(rechnungHeader[0], '').trim()
    const pre = html.match(/<pre[\s\S]*?<\/pre>/i)
    if (pre) {
      entry = { ...entry, calculation: pre[0] }
      html = html.replace(pre[0], '').trim()
    }
  } else {
    const pre = html.match(/<pre[\s\S]*?<\/pre>/i)
    if (pre && /<p[^>]*>\s*Antwort:/i.test(html)) {
      entry = { ...entry, calculation: pre[0] }
      html = html.replace(pre[0], '').trim()
    }
  }

  // Monats-/Tageszins: Erklärung ohne „Antwort:“-Label (letzter Absatz nach der Formel)
  if (!entry.answer && entry.question) {
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    if (paragraphs.length >= 2) {
      const last = paragraphs[paragraphs.length - 1]
      if (last && !/`/.test(last[1])) {
        entry = { ...entry, answer: last[1].trim() }
        html = html.replace(last[0], '').trim()
      }
    }
  }

  const antwort = html.match(/<p[^>]*>\s*Antwort:\s*([\s\S]*?)<\/p>/i)
  if (antwort) {
    entry = { ...entry, answer: antwort[1].trim() }
    html = html.replace(antwort[0], '').trim()
  }

  if (html.trim()) {
    entry = { ...entry, formula: html.trim() }
  } else if (entry.question) {
    entry = { ...entry, formula: undefined }
  }

  return entry
}

export function fixZinsFormelTex(html: string): string {
  return (
    html
      .replace(/`Z = K \* P \/ 100`/gi, '`Z = K * p / 100`')
      .replace(/`Z = K \* P \* t \/ 100 \* 360`/gi, '`Z = K * p * t / (100 * 360)`')
      .replace(/`Z = K \* p \* m \/ 100 \* 12`/gi, '`Z = K * p * m / (100 * 12)`')
      .replace(/`p = Z \* 1200 \/ K \* m`/gi, '`p = Z * 1200 / (K * m)`')
      .replace(/`p = Z \* 36000 \/ K \* t`/gi, '`p = Z * 36000 / (K * t)`')
      .replace(/`K = Z \* 1200 \/ p \* m`/gi, '`K = Z * 1200 / (p * m)`')
      .replace(/`K = Z \* 36000 \/ p \* t`/gi, '`K = Z * 36000 / (p * t)`')
      .replace(/`m = Z \* 1200 \/ K \* p`/gi, '`m = Z * 1200 / (K * p)`')
      .replace(/`t = Z \* 36000 \/ K \* p`/gi, '`t = Z * 36000 / (K * p)`')
      .replace(
        /`p = 100 \* root\(n\)\(\(K_\(VERZINST\) \/ K_\(ANFANG\)\)\) -1`/gi,
        '`p = 100 * (root(n)(K_(VERZINST) / K_(ANFANG)) - 1)`'
      )
      // Legacy-Rechnung Zinseszins-Zinssatz (Klammern)
      .replace(
        /p = 100 \* root\(n\)\(\(K_v \/ K_a\)\) - 100/gi,
        'p = 100 * (root(n)(K_v / K_a) - 1)'
      )
  )
}
