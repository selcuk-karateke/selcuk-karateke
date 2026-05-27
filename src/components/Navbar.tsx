'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import DarkModeToggle from './DarkModeToggle'
import LanguageSwitcher from './LanguageSwitcher'

const authConfigured = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

const linkClass =
  'theme-text-secondary hover:theme-primary px-2 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover:theme-bg-secondary'

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('nav')

  const primaryNav = [
    { name: t('about'), href: '/about' },
    { name: t('projects'), href: '/projects' },
    { name: t('contact'), href: '/contact' },
  ]

  const moreNav = [
    { name: t('home'), href: '/' },
    { name: t('education'), href: '/education' },
    { name: t('exercises'), href: '/uebungen' },
    { name: t('blog'), href: '/blog' },
  ]

  const mobileNav = [
    { name: t('home'), href: '/' },
    ...primaryNav,
    ...moreNav.filter((item) => item.href !== '/'),
  ]

  useEffect(() => {
    if (!moreOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [moreOpen])

  return (
    <nav className="theme-bg/95 backdrop-blur-md border-b theme-border sticky top-0 z-50 shadow-sm overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-14 lg:h-16 min-w-0">
          <Link href="/" className="flex items-center gap-2 min-w-0 shrink-0">
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="rounded-full object-cover border-2 border-brand-primary/30 shrink-0"
            />
            <span className="font-bold theme-text truncate hidden sm:block xl:text-xl">
              <span className="xl:hidden">S. Karateke</span>
              <span className="hidden xl:inline">Selçuk Karateke</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 min-w-0 shrink">
            <div className="flex items-center min-w-0">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ))}

              <div ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  className={`${linkClass} inline-flex items-center gap-0.5`}
                  aria-expanded={moreOpen ? 'true' : 'false'}
                  aria-haspopup="true"
                >
                  {t('more')}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {moreOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-1 min-w-[10rem] py-1 rounded-lg theme-bg-card border theme-border shadow-lg z-50"
                  >
                    {moreNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="block px-3 py-2 text-sm theme-text-secondary hover:theme-bg-secondary hover:theme-primary"
                        onClick={() => setMoreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 pl-1 xl:pl-2 border-l theme-border ml-1 shrink-0">
              <LanguageSwitcher compact />
              <DarkModeToggle />
              {authConfigured && session ? (
                <>
                  <Link href="/admin" className={`${linkClass} hidden xl:inline`}>
                    {t('admin')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="theme-primary-bg hover:opacity-90 text-white px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {t('signOut')}
                  </button>
                </>
              ) : authConfigured ? (
                <button
                  type="button"
                  onClick={() => signIn()}
                  className="theme-primary-bg hover:opacity-90 text-white px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {t('signIn')}
                </button>
              ) : null}
            </div>
          </div>

          {/* Mobile / tablet */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            <LanguageSwitcher compact />
            <DarkModeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="theme-text-secondary hover:theme-primary p-2 rounded-md"
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t theme-border pb-3">
            <div className="pt-2 space-y-0.5">
              {mobileNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="theme-text-secondary hover:theme-primary block px-3 py-2.5 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {authConfigured && session ? (
                <div className="pt-2 mt-2 border-t theme-border space-y-0.5">
                  <Link
                    href="/admin"
                    className="theme-text-secondary hover:theme-primary block px-3 py-2.5 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('admin')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    className="theme-primary-bg hover:opacity-90 text-white w-full text-left px-3 py-2.5 rounded-md text-base font-medium"
                  >
                    {t('signOut')}
                  </button>
                </div>
              ) : authConfigured ? (
                <button
                  type="button"
                  onClick={() => {
                    signIn()
                    setIsOpen(false)
                  }}
                  className="theme-primary-bg hover:opacity-90 text-white w-full text-left px-3 py-2.5 rounded-md text-base font-medium mt-2"
                >
                  {t('signIn')}
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
