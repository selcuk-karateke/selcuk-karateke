'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import ProjectCard from '@/components/projects/ProjectCard'
import { featuredProjects, professionalProjects } from '@/data/projects'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const t = useTranslations('projects')
  const homeFeatured = featuredProjects.slice(0, 6)

  return (
    <section ref={ref} className="py-20 theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold theme-text mb-6">{t('title')}</h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {homeFeatured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
            >
              <ProjectCard project={project} compact />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="theme-bg-card rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700 p-8 text-center mb-12"
        >
          <h3 className="text-xl font-bold theme-text mb-3">{t('leadershipTitle')}</h3>
          <p className="theme-text-secondary mb-6 max-w-2xl mx-auto">{t('leadershipDesc')}</p>
          <Link
            href="/projects/leadership"
            className="theme-primary-bg hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            {t('viewGuided')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="theme-primary-bg hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {t('viewAll', { count: professionalProjects.length })}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
