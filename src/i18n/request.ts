import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { defaultTimeZone } from './config'
import { routing, type Locale } from './routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function resolveLocale(candidate: string | undefined): Locale {
  if (candidate && routing.locales.includes(candidate as Locale)) {
    return candidate as Locale
  }
  return routing.defaultLocale
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const cookieStore = await cookies()
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value

  const locale = resolveLocale(requested ?? fromCookie)

  return {
    locale,
    timeZone: defaultTimeZone,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
