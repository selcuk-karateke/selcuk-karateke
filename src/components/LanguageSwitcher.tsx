'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { locales, type Locale } from '@/i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const t = useTranslations('lang')

  const setLocale = (next: Locale) => {
    if (next === locale) return
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
    router.refresh()
  }

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={t('label')}
    >
      {!compact && (
        <span className="text-xs theme-text-secondary mr-1 hidden lg:inline">{t('label')}:</span>
      )}
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          title={t(code)}
          className={`min-w-[2rem] px-2 py-1 rounded-md text-xs font-semibold uppercase transition-colors ${
            locale === code
              ? 'theme-primary-bg text-white'
              : 'theme-text-secondary hover:theme-bg-secondary border theme-border'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
