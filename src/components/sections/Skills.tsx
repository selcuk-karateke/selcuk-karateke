'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon?: string
}

const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Framework',
  'Database',
  'Programming',
  'Architecture',
  'Tools',
  'System',
  'Hardware',
  'Language',
] as const

const ADDITIONAL_KEYS = ['design', 'animation', 'hardware', 'office', 'industry', 'apis'] as const

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const t = useTranslations('skills')
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    const mockSkills: Skill[] = [
      { id: '1', name: 'PHP', category: 'Backend', level: 5, icon: '🐘' },
      { id: '2', name: 'JavaScript', category: 'Frontend', level: 5, icon: '⚡' },
      { id: '3', name: 'Laravel', category: 'Framework', level: 5, icon: '🔧' },
      { id: '4', name: 'Vue.js', category: 'Framework', level: 5, icon: '💚' },
      { id: '5', name: 'React', category: 'Framework', level: 4, icon: '⚛️' },
      { id: '6', name: 'Next.js', category: 'Framework', level: 4, icon: '▲' },
      { id: '7', name: 'Node.js', category: 'Backend', level: 4, icon: '🟢' },
      { id: '8', name: 'TypeScript', category: 'Language', level: 3, icon: '📘' },
      { id: '9', name: 'MySQL', category: 'Database', level: 5, icon: '🗄️' },
      { id: '10', name: 'SQL', category: 'Database', level: 5, icon: '🗄️' },
      { id: '11', name: 'HTML5', category: 'Frontend', level: 5, icon: '🌐' },
      { id: '12', name: 'CSS', category: 'Frontend', level: 5, icon: '🎨' },
      { id: '13', name: 'SASS', category: 'Frontend', level: 4, icon: '💅' },
      { id: '14', name: 'REST APIs', category: 'Backend', level: 5, icon: '🔗' },
      { id: '15', name: 'OOP', category: 'Programming', level: 5, icon: '🏗️' },
      { id: '16', name: 'MVC', category: 'Architecture', level: 5, icon: '🏛️' },
      { id: '17', name: 'Git', category: 'Tools', level: 4, icon: '📝' },
      { id: '18', name: 'Linux', category: 'System', level: 4, icon: '🐧' },
      { id: '19', name: 'Raspberry Pi', category: 'Hardware', level: 3, icon: '🍓' },
      { id: '20', name: 'Microsoft Office', category: 'Tools', level: 4, icon: '📊' },
    ]
    setSkills(mockSkills)
  }, [])

  const getSkillsByCategory = (category: string) => skills.filter((skill) => skill.category === category)

  const getLevelStars = (level: number) => '★'.repeat(level) + '☆'.repeat(5 - level)

  const categoryLabel = (category: string) =>
    t.has(`skillCategories.${category}` as 'skillCategories.Frontend')
      ? t(`skillCategories.${category}` as 'skillCategories.Frontend')
      : category

  return (
    <section ref={ref} className="py-20 theme-bg-secondary">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category)
            if (categorySkills.length === 0) return null

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className="theme-bg-card rounded-lg p-6"
              >
                <h3 className="text-xl font-bold theme-text mb-4">{categoryLabel(category)}</h3>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-medium theme-text-secondary">{skill.name}</span>
                      </div>
                      <div className="theme-primary text-sm">{getLevelStars(skill.level)}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="theme-bg-card rounded-lg p-8">
            <h3 className="text-2xl font-bold theme-text mb-4">{t('additionalKnowledge')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 theme-text-secondary">
              {ADDITIONAL_KEYS.map((key) => {
                const items = t.raw(`categories.${key}.items`) as string[]
                return (
                  <div key={key}>
                    <h4 className="font-semibold mb-2 theme-text">{t(`categories.${key}.title`)}</h4>
                    <p>{items.join(', ')}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
