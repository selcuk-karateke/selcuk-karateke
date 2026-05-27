'use client'

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'
import type { ReactNode } from 'react'
import { defaultTimeZone } from '@/i18n/config'
import type { Locale } from '@/i18n/routing'
import Navbar from '@/components/Navbar'
import PageFloatingControls from '@/components/pomodoro/PageFloatingControls'
import AuthProvider from '@/components/providers/AuthProvider'
import { PomodoroProvider } from '@/components/pomodoro/PomodoroProvider'

interface ClientAppShellProps {
  children: ReactNode
  locale: Locale
  messages: AbstractIntlMessages
}

/**
 * Navbar and other useTranslations() consumers must render inside this shell —
 * not as RSC children passed into a separate client wrapper (avoids missing intl context).
 */
export default function ClientAppShell({ children, locale, messages }: ClientAppShellProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={defaultTimeZone}>
      <AuthProvider>
        <PomodoroProvider>
          <Navbar />
          <main className="pt-[var(--nav-height)]">{children}</main>
          <PageFloatingControls />
        </PomodoroProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
