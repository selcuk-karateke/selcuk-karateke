import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { getLocale, getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { profileContact } from '@/data/profile'
import ClientAppShell from '@/components/ClientAppShell'
import SiteFooter from '@/components/SiteFooter'
import type { Locale } from '@/i18n/routing'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')
  return {
    metadataBase: new URL(profileContact.portfolioUrl),
    title: {
      default: profileContact.name,
      template: `%s | ${profileContact.name}`,
    },
    description: t('description'),
  }
}

interface LayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  const locale = (await getLocale()) as Locale
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`min-h-page theme-bg overflow-x-clip ${inter.className}`}>
        <ClientAppShell locale={locale} messages={messages}>
          {children}
        </ClientAppShell>
        <SiteFooter />
      </body>
    </html>
  )
}
