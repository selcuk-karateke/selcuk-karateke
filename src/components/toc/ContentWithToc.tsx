import TableOfContents from '@/components/toc/TableOfContents'
import type { TocItem } from '@/types/toc'

const MIN_ITEMS = 3

export default function ContentWithToc({
  items,
  children,
  minItems = MIN_ITEMS,
}: {
  items: TocItem[]
  children: React.ReactNode
  minItems?: number
}) {
  if (items.length < minItems) {
    return <>{children}</>
  }

  return (
    <div className="space-y-6">
      <div className="lg:hidden">
        <TableOfContents items={items} mobile />
      </div>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] xl:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 lg:items-start">
        <div className="min-w-0">{children}</div>
        <aside className="hidden lg:block lg:sticky lg:top-[calc(4rem+0.75rem)] lg:self-start lg:z-10 w-full">
          <div
            data-toc-scroll
            className="theme-bg-card rounded-xl border theme-border p-4 max-h-[calc(100vh-5.25rem)] overflow-y-auto toc-scroll"
          >
            <TableOfContents items={items} />
          </div>
        </aside>
      </div>
    </div>
  )
}
