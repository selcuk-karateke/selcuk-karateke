import { ReactNode } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { profileContact } from '@/data/profile'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/providers/AuthProvider'
import { PomodoroProvider } from '@/components/pomodoro/PomodoroProvider'
import PageFloatingControls from '@/components/pomodoro/PageFloatingControls'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${inter.className}`}>
        <AuthProvider>
          <PomodoroProvider>
          <Navbar />
          <main>{children}</main>
          <PageFloatingControls />
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Selçuk Karateke</h3>
                    <p className="text-gray-300 mb-4">
                    {profileContact.title} — Portfolio & Lerninhalte.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-300">{profileContact.street}</p>
                    <p className="text-gray-300">{profileContact.city}</p>
                    <p className="text-gray-300">
                      Tel:{' '}
                      <a href={profileContact.phoneHref} className="hover:text-white">
                        {profileContact.phone}
                      </a>
                    </p>
                    <p className="text-gray-300">
                      Mobil:{' '}
                      <a href={profileContact.mobileHref} className="hover:text-white">
                        {profileContact.mobile}
                      </a>
                    </p>
                    <p className="text-gray-300">
                      Email:{' '}
                      <a href={`mailto:${profileContact.email}`} className="hover:text-white">
                        {profileContact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Navigation</h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                    <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                    <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
                    <li><Link href="/education" className="text-gray-300 hover:text-white transition-colors">Bildung</Link></li>
                    <li><Link href="/uebungen" className="text-gray-300 hover:text-white transition-colors">Übungen</Link></li>
                    <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                    <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><Link href="/imprint" className="text-gray-300 hover:text-white transition-colors">Imprint</Link></li>
                    <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                    <li><Link href="/data-deletion" className="text-gray-300 hover:text-white transition-colors">Data Deletion</Link></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                <p className="text-gray-300">
                  © {new Date().getFullYear()} Selçuk Karateke. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
          </PomodoroProvider>
        </AuthProvider>
      </body>
    </html>
  )
}