'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import DarkModeToggle from './DarkModeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const t = useTranslations('nav')

    const navigation = [
        { name: t('home'), href: '/' },
        { name: t('about'), href: '/about' },
        { name: t('projects'), href: '/projects' },
        { name: t('education'), href: '/education' },
        { name: t('exercises'), href: '/uebungen' },
        { name: t('blog'), href: '/blog' },
        { name: t('contact'), href: '/contact' },
    ]

    return (
        <nav className="theme-bg/95 backdrop-blur-md border-b theme-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
                            <Image
                                src="/logo.png"
                                alt="Selçuk Karateke Logo"
                                width={40}
                                height={40}
                                className="rounded-full object-cover border-2 border-brand-primary/30"
                            />
                            <span className="text-2xl font-bold theme-text">Selçuk Karateke</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="theme-text-secondary hover:theme-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:theme-bg-secondary"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex items-center space-x-3">
                            <LanguageSwitcher compact />
                            <DarkModeToggle />
                            {session ? (
                                <>
                                    <Link
                                        href="/admin"
                                        className="theme-text-secondary hover:theme-primary px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        {t('admin')}
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="theme-primary-bg hover:opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {t('signOut')}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => signIn()}
                                    className="theme-primary-bg hover:opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {t('signIn')}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <LanguageSwitcher compact />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="theme-text-secondary hover:theme-primary focus:outline-none p-2"
                            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden border-t theme-border">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="theme-text-secondary hover:theme-primary block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="pt-3 pb-2">
                                <DarkModeToggle />
                            </div>

                            {session ? (
                                <div className="pt-4 pb-3 border-t theme-border">
                                    <Link
                                        href="/admin"
                                        className="theme-text-secondary hover:theme-primary block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('admin')}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut()
                                            setIsOpen(false)
                                        }}
                                        className="theme-primary-bg hover:opacity-90 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2"
                                    >
                                        {t('signOut')}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        signIn()
                                        setIsOpen(false)
                                    }}
                                    className="theme-primary-bg hover:opacity-90 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2"
                                >
                                    {t('signIn')}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
