'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
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

                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="theme-text-secondary hover:theme-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:theme-bg-secondary"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex items-center space-x-4">
                            <DarkModeToggle />
                            {session ? (
                                <>
                                    <Link
                                        href="/admin"
                                        className="theme-text-secondary hover:theme-primary px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Admin
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="theme-primary-bg hover:opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => signIn()}
                                    className="theme-primary-bg hover:opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {session ? (
                                <div className="pt-4 pb-3 border-t border-gray-200">
                                    <Link
                                        href="/admin"
                                        className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut()
                                            setIsOpen(false)
                                        }}
                                        className="bg-red-600 hover:bg-red-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        signIn()
                                        setIsOpen(false)
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
