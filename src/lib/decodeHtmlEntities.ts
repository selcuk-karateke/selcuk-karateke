const NAMED_ENTITIES: Record<string, string> = {
  '&auml;': 'ä',
  '&ouml;': 'ö',
  '&uuml;': 'ü',
  '&Auml;': 'Ä',
  '&Ouml;': 'Ö',
  '&Uuml;': 'Ü',
  '&szlig;': 'ß',
  '&nbsp;': '\u00A0',
  '&hellip;': '…',
  '&ndash;': '–',
  '&mdash;': '—',
  '&middot;': '·',
  '&quot;': '"',
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
}

/** Dekodiert HTML-Entities aus Legacy-PHP (z. B. Bin&auml;rsystem → Binärsystem). */
export function decodeHtmlEntities(text: string): string {
  if (!text.includes('&')) return text

  let result = text.replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  )
  result = result.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))

  for (const [entity, char] of Object.entries(NAMED_ENTITIES)) {
    if (entity === '&amp;') continue
    result = result.split(entity).join(char)
  }
  return result.split('&amp;').join('&')
}
