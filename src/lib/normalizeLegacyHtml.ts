/** Repariert häufige Legacy-HTML-Abkürzungen (z. B. 8thFloor: class=col ohne Quotes). */
export function normalizeLegacyHtml(html: string): string {
  return html
    .replace(/\bclass=([^\s>"']+)/gi, 'class="$1"')
    .replace(/\bid=([^\s>"']+)/gi, 'id="$1"')
    .replace(/\bhref=([#\w][^\s>"']*)/gi, 'href="$1"')
}
