export interface TocItem {
  id: string
  label: string
  children?: TocItem[]
}

export function flattenTocItems(items: TocItem[]): TocItem[] {
  const out: TocItem[] = []
  for (const item of items) {
    out.push(item)
    if (item.children?.length) out.push(...flattenTocItems(item.children))
  }
  return out
}
