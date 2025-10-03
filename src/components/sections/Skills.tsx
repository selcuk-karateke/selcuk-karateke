'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill {
    id: string
    name: string
    category: string
    level: number
    icon?: string
}

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        // Mock data - in production, this would come from the API
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

    const categories = ['Frontend', 'Backend', 'Framework', 'Database', 'Programming', 'Architecture', 'Tools', 'System', 'Hardware', 'Language']

    const getSkillsByCategory = (category: string) => {
        return skills.filter(skill => skill.category === category)
    }

    const getLevelStars = (level: number) => {
        return '★'.repeat(level) + '☆'.repeat(5 - level)
    }

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
                        My Skills
                    </h2>
                    <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
                        Technologies and tools I work with to bring ideas to life
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, categoryIndex) => {
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
                                <h3 className="text-xl font-bold theme-text mb-4">{category}</h3>
                                <div className="space-y-3">
                                    {categorySkills.map((skill) => (
                                        <div key={skill.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{skill.icon}</span>
                                                <span className="font-medium theme-text-secondary">{skill.name}</span>
                                            </div>
                                            <div className="theme-primary text-sm">
                                                {getLevelStars(skill.level)}
                                            </div>
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
                        <h3 className="text-2xl font-bold theme-text mb-4">Additional Knowledge</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 theme-text-secondary">
                            <div>
                                <h4 className="font-semibold mb-2 theme-text">Design & Graphics</h4>
                                <p>Inkscape, GIMP, Blender</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 theme-text">3D & Animation</h4>
                                <p>Blender, Unity</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 theme-text">Hardware & IoT</h4>
                                <p>Raspberry Pi, 3D Printing, Drohnenflüge</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 theme-text">Office & Produktivität</h4>
                                <p>Microsoft Office, Microsoft 365, SharePoint</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 theme-text">Branchenwissen</h4>
                                <p>Gesundheitsbranche, Produktmanagement</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 theme-text">Web-APIs</h4>
                                <p>REST APIs, Programmierschnittstellen</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
