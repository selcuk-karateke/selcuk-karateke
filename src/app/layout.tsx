import { ReactNode } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/providers/AuthProvider'
// import Web3Provider from '@/components/providers/Web3Provider'
import './globals.css'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50 font-inter">
        <AuthProvider>
          {/* <Web3Provider> */}
          <Navbar />
          <main>{children}</main>
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Selçuk Karateke</h3>
                  <p className="text-gray-300 mb-4">
                    IT Specialist for Application Development with a passion for modern web technologies.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-300">Möckernstraße 115</p>
                    <p className="text-gray-300">10963 Berlin</p>
                    <p className="text-gray-300">Tel: 030 12074996</p>
                    <p className="text-gray-300">Mobil: 0177 4616695</p>
                    <p className="text-gray-300">Email: selcuk.karateke@live.de</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Navigation</h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                    <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                    <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
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
          {/* </Web3Provider> */}
        </AuthProvider>
      </body>
    </html>
  )
}