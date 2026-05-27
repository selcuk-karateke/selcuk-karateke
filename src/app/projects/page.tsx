'use client'

import { type ReactNode, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import ProjectCard from '@/components/projects/ProjectCard'
import {
  professionalProjects,
  featuredProjects,
  guidedProjects,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from '@/data/projects'

const CATEGORY_ORDER: ProjectCategory[] = [
  'platforms',
  'integrations',
  'ecommerce',
  'ml-data',
  'internal-tools',
  'content-media',
  'frontend-perf',
  'data-import',
  'other',
]

export default function ProjectsPage() {
  const t = useTranslations('pages.projects')
  const [filter, setFilter] = useState<ProjectCategory | 'all' | 'featured'>('featured')

  const displayed = useMemo(() => {
    if (filter === 'all') return professionalProjects
    if (filter === 'featured') return featuredProjects
    return professionalProjects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <div className="min-h-page theme-bg">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold theme-text mb-4">{t('title')}</h1>
          <p className="text-xl theme-text-secondary max-w-2xl mx-auto">
            {t('subtitle', { count: professionalProjects.length })}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <FilterBtn active={filter === 'featured'} onClick={() => setFilter('featured')}>
            {t('featured')} ({featuredProjects.length})
          </FilterBtn>
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('all')} ({professionalProjects.length})
          </FilterBtn>
          {CATEGORY_ORDER.map((cat) => {
            const count = professionalProjects.filter((p) => p.category === cat).length
            if (count === 0) return null
            return (
              <FilterBtn key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
                {PROJECT_CATEGORIES[cat].label} ({count})
              </FilterBtn>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayed.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.4) }}
            >
              <ProjectCard project={project} compact />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="theme-bg-card rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold theme-text mb-2 flex items-center gap-2">
                <UserGroupIcon className="w-8 h-8" />
                {t('leadershipTitle')}
              </h2>
              <p className="theme-text-secondary max-w-2xl">
                {t('leadershipDesc', { count: guidedProjects.length })}
              </p>
            </div>
            <Link
              href="/projects/leadership"
              className="inline-flex items-center theme-primary-bg hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold shrink-0"
            >
              {t('viewGuided')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="theme-bg-card rounded-xl border theme-border p-8 mt-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold theme-text">{t('legacyTitle')}</h3>
              <p className="theme-text-secondary">{t('legacyDesc')}</p>
            </div>
            <Link
              href="/legacy"
              className="inline-flex items-center theme-primary-bg hover:opacity-90 text-white px-5 py-2.5 rounded-lg font-medium shrink-0"
            >
              {t('legacyCta')}
            </Link>
          </div>
        </motion.div>

        <div className="text-center mt-16">
          <Link
            href="/contact"
            className="inline-flex theme-primary-bg hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {t('getInTouch')}
          </Link>
        </div>
      </div>
    </div>
  )
}

function FilterBtn({
  children,
  active,
  onClick,
}: {
  children: ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'theme-primary-bg text-white'
          : 'theme-bg-card theme-text-secondary hover:theme-text border border-gray-200 dark:border-gray-700'
      }`}
    >
      {children}
    </button>
  )
}
