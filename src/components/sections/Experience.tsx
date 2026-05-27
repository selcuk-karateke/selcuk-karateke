'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { profileExperience } from '@/data/profile'

function formatPeriod(exp: (typeof profileExperience)[0]) {
  if (exp.current) {
    return `${formatMonth(exp.startDate)} – heute`
  }
  if (exp.endDate) {
    return `${formatMonth(exp.startDate)} – ${formatMonth(exp.endDate)}`
  }
  return exp.period
}

function formatMonth(dateString: string) {
  const [y, m] = dateString.split('-')
  return `${m}/${y}`
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 theme-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold theme-text mb-6">
            Professional Experience
          </h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
            Berufserfahrung laut Lebenslauf (Stand 05/2026)
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-theme-primary to-theme-secondary" />

          <div className="space-y-12">
            {profileExperience.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 theme-primary-bg rounded-full border-4 border-white shadow-lg z-10" />

                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <div className="theme-bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                      <h3 className="text-xl font-bold theme-text">{experience.position}</h3>
                      {experience.current && (
                        <span className="theme-secondary-bg text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Aktuell
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-semibold theme-primary mb-2">{experience.company}</h4>

                    <div className="theme-text-secondary mb-4">
                      <p className="font-medium">{formatPeriod(experience)}</p>
                      <p className="text-sm">📍 {experience.location}</p>
                    </div>

                    <p className="theme-text-secondary text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold theme-text mb-8 text-center">Education & Training</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="theme-bg-card rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold theme-text mb-3">Ausbildung</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold theme-primary">
                    IHK Fachinformatiker — Anwendungsentwicklung
                  </h5>
                  <p className="theme-text-secondary">Comhard GmbH, Berlin</p>
                  <p className="text-sm theme-text-secondary">11/2016 – 11/2018</p>
                </div>
                <div>
                  <h5 className="font-semibold theme-primary">Fachkraft im Gastgewerbe (IHK)</h5>
                  <p className="theme-text-secondary">Kiezküchen gGmbH, Berlin</p>
                  <p className="text-sm theme-text-secondary">01/2006 – 07/2009</p>
                </div>
              </div>
            </div>

            <div className="theme-bg-card rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold theme-text mb-3">Weiterbildung</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold theme-secondary">
                    PHP-Frameworks, UI/UX Design, Agiles Management
                  </h5>
                  <p className="theme-text-secondary">BTA GmbH, Berlin</p>
                  <p className="text-sm theme-text-secondary">05/2020 – 08/2020</p>
                </div>
                <div>
                  <h5 className="font-semibold theme-secondary">Netzwerkadministrator</h5>
                  <p className="theme-text-secondary">Damago GmbH, Berlin</p>
                  <p className="text-sm theme-text-secondary">03/2012 – 08/2012</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
