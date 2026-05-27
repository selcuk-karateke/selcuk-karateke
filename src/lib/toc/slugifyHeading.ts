/** Stable DOM id from a German heading (Mathe, Netzwerk, …). */
export function slugifyHeading(text: string): string {
  const base = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base || 'abschnitt'
}
