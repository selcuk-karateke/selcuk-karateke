import { defineRouting } from 'next-intl/routing'

export const locales = ['de', 'en', 'tr'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  /** URLs bleiben /about — kein /de/about (bestehende Links & Coolify). */
  localePrefix: 'never',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
  },
})
