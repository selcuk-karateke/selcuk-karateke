'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import TrainingOverviewStats from '@/components/sections/TrainingOverviewStats'
import { profileContact, profileLanguages, profileSkills } from '@/data/profile'

const CERT_IDS = [
  'php-frameworks',
  'ui-ux',
  'agile',
  'software-dev',
  'database',
  'network-admin',
  'ms-specialist',
  'mcts',
  'mcp',
] as const

const MODULE_KEYS = ['business', 'communication', 'itSystems', 'networks', 'appDev', 'projectWork'] as const

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const t = useTranslations('about')

  return (
    <section ref={ref} className="py-20 theme-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl floating" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl floating-delay-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black theme-text mb-6">{t('title')}</h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="theme-bg-card rounded-3xl p-8">
              <h3 className="text-3xl font-bold theme-text mb-6">{t('storyTitle')}</h3>
              <div className="space-y-4 theme-text-secondary">
                <p>
                  {t.rich('storyP1', {
                    kawai: (chunks) => (
                      <a href={profileContact.companyUrl} className="theme-primary hover:opacity-80">
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
                <p>{t('storyP2')}</p>
                <p>{t('storyP3')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="theme-primary-bg rounded-2xl p-6 text-white card-hover shadow-sm">
              <h4 className="text-xl font-bold mb-3">{t('educationCard.title')}</h4>
              <p className="text-white">
                {t('educationCard.ihk')}
                <br />
                {t('educationCard.comhard')}
                <br />
                <span className="text-sm opacity-90">{t('educationCard.hours')}</span>
              </p>
            </div>

            <div className="theme-secondary-bg rounded-2xl p-6 text-white card-hover shadow-sm">
              <h4 className="text-xl font-bold mb-3">{t('currentPosition')}</h4>
              <p className="text-white">
                {t('selfEmployed')}
                <br />
                {t('since2025')} ·{' '}
                <a href={profileContact.companyUrl} className="underline opacity-90">
                  kawai-labs.com
                </a>
              </p>
            </div>

            <div className="bg-slate-600 rounded-2xl p-6 text-white card-hover shadow-sm">
              <h4 className="text-xl font-bold mb-3">{t('languages')}</h4>
              <p className="text-white">
                {profileLanguages.map((l) => `${l.name} (${l.level})`).join(' · ')}
              </p>
            </div>

            <div className="bg-slate-700 rounded-2xl p-6 text-white card-hover shadow-sm">
              <h4 className="text-xl font-bold mb-3">{t('location')}</h4>
              <p className="text-white">
                {profileContact.street}
                <br />
                {profileContact.city}
                <br />
                {t('telLabel')} {profileContact.phone}
              </p>
            </div>

            <div className="theme-bg-card rounded-2xl p-6 border theme-border">
              <h4 className="text-xl font-bold theme-text mb-3">{t('skills')}</h4>
              <div className="flex flex-wrap gap-2">
                {profileSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full border theme-border theme-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 text-white card-hover shadow-sm">
              <h4 className="text-xl font-bold mb-3">{t('githubTitle')}</h4>
              <p className="text-white whitespace-pre-line">{t('githubStats')}</p>
              <a
                href="https://github.com/selcuk-karateke"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 bg-white/20 px-4 py-2 rounded-full text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-sm border border-white/30"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('githubCta')}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-4xl font-bold theme-text mb-8 text-center">{t('certsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERT_IDS.map((id) => (
              <div key={id} className="theme-bg-card rounded-2xl p-6 card-hover">
                <h4 className="text-lg font-bold theme-text mb-2">{t(`certs.${id}.title`)}</h4>
                <p className="theme-text-secondary mb-2">{t(`certs.${id}.subtitle`)}</p>
                <p className="text-sm theme-text-secondary">{t(`certs.${id}.meta`)}</p>
                {t.has(`certs.${id}.id`) && (
                  <p className="text-xs text-gray-400 mt-1">{t(`certs.${id}.id`)}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold gradient-text mb-8 text-center">{t('detailedEducationTitle')}</h3>

          <div className="glass-dark rounded-lg warm-shadow-lg p-8 border border-warm-dark-brown/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULE_KEYS.map((key) => {
                const items = t.raw(`modules.${key}.items`) as string[]
                const isWide = key === 'appDev'
                return (
                  <div
                    key={key}
                    className={`bg-warm-red/10 rounded-lg p-6 border border-warm-red/20 ${
                      isWide ? 'col-span-1 md:col-span-2' : ''
                    }`}
                  >
                    <h4 className="text-lg font-bold theme-text mb-3">{t(`modules.${key}.title`)}</h4>
                    <p className="text-white text-sm mb-2">{t(`modules.${key}.hours`)}</p>
                    {isWide ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="theme-text-secondary text-sm space-y-1">
                          {items.slice(0, 4).map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                        <ul className="theme-text-secondary text-sm space-y-1">
                          {items.slice(4).map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <ul className="theme-text-secondary text-sm space-y-1">
                        {items.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>

            <TrainingOverviewStats />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
