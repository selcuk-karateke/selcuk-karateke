'use client'

import { useEffect, useMemo, useState } from 'react'
import { decodeHtmlEntities } from '@/lib/decodeHtmlEntities'
import { flattenTocItems, type TocItem } from '@/types/toc'

function TocLink({
  item,
  depth,
  activeId,
  onNavigate,
}: {
  item: TocItem
  depth: number
  activeId: string | null
  onNavigate: (id: string) => void
}) {
  const active = activeId === item.id
  const padding = depth === 0 ? '' : depth === 1 ? 'pl-3' : 'pl-5'

  return (
    <li className={padding}>
      <a
        href={`#${item.id}`}
        onClick={(e) => {
          e.preventDefault()
          onNavigate(item.id)
        }}
        className={`block py-1 leading-snug border-l-2 transition-colors ${
          active
            ? 'border-[var(--color-primary)] theme-primary font-medium'
            : 'border-transparent theme-text-secondary hover:theme-primary hover:border-[var(--color-primary)]/40'
        }`}
        aria-current={active ? 'location' : undefined}
      >
        {decodeHtmlEntities(item.label)}
      </a>
      {item.children && item.children.length > 0 && (
        <ul className="mt-0.5 space-y-0.5 border-l theme-border ml-1.5">
          {item.children.map((child) => (
            <TocLink
              key={child.id}
              item={child}
              depth={depth + 1}
              activeId={activeId}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function TableOfContents({
  items,
  mobile = false,
}: {
  items: TocItem[]
  mobile?: boolean
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [open, setOpen] = useState(!mobile)
  const anchors = useMemo(() => flattenTocItems(items), [items])

  useEffect(() => {
    if (anchors.length === 0) return

    const elements = anchors
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: [0, 0.25, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [anchors])

  useEffect(() => {
    if (!activeId || mobile) return
    const container = document.querySelector('[data-toc-scroll]')
    const link = container?.querySelector<HTMLElement>(`a[href="#${CSS.escape(activeId)}"]`)
    link?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeId, mobile])

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
    if (mobile) setOpen(false)
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="Inhaltsverzeichnis" className={mobile ? 'theme-bg-card border theme-border rounded-xl overflow-hidden' : ''}>
      {mobile ? (
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold theme-text"
          {...(open
            ? { 'aria-expanded': 'true' as const }
            : { 'aria-expanded': 'false' as const })}
          onClick={() => setOpen((v) => !v)}
        >
          Inhaltsverzeichnis
          <span className="theme-text-secondary text-xs">{open ? '▲' : '▼'}</span>
        </button>
      ) : (
        <p className="text-xs font-semibold uppercase tracking-wide theme-text-secondary mb-3 px-1">
          Inhaltsverzeichnis
        </p>
      )}

      {(open || !mobile) && (
        <ul
          className={`text-sm space-y-1 ${mobile ? 'px-4 pb-4 border-t theme-border pt-3' : 'pl-1'}`}
        >
          {items.map((item) => (
            <TocLink
              key={item.id}
              item={item}
              depth={0}
              activeId={activeId}
              onNavigate={navigate}
            />
          ))}
        </ul>
      )}
    </nav>
  )
}
