import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { profileContact } from '@/data/profile'

export default async function SiteFooter() {
  const t = await getTranslations('footer')
  const nav = await getTranslations('nav')
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '/', label: nav('home') },
    { href: '/about', label: nav('about') },
    { href: '/projects', label: nav('projects') },
    { href: '/education', label: nav('education') },
    { href: '/uebungen', label: nav('exercises') },
    { href: '/blog', label: nav('blog') },
    { href: '/contact', label: nav('contact') },
  ] as const

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{profileContact.name}</h3>
            <p className="text-gray-300 mb-4">
              {profileContact.title} — {t('tagline')}
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">{profileContact.street}</p>
              <p className="text-gray-300">{profileContact.city}</p>
              <p className="text-gray-300">
                {t('tel')}:{' '}
                <a href={profileContact.phoneHref} className="hover:text-white">
                  {profileContact.phone}
                </a>
              </p>
              <p className="text-gray-300">
                {t('mobile')}:{' '}
                <a href={profileContact.mobileHref} className="hover:text-white">
                  {profileContact.mobile}
                </a>
              </p>
              <p className="text-gray-300">
                {t('email')}:{' '}
                <a href={`mailto:${profileContact.email}`} className="hover:text-white">
                  {profileContact.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('navigation')}</h4>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/imprint" className="text-gray-300 hover:text-white transition-colors">
                  {t('imprint')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="text-gray-300 hover:text-white transition-colors">
                  {t('dataDeletion')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {year} {profileContact.name}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
