'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

interface Project {
    id: string
    title: string
    description: string
    image?: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
    featured: boolean
}

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        // Mock data - in production, this would come from the API
        const mockProjects: Project[] = [
            {
                id: '1',
                title: 'Laravel Backend',
                description: 'Robust Laravel Backend with API development and database integration. Complete REST API with authentication and authorization.',
                technologies: ['Laravel', 'PHP', 'MySQL', 'API', 'Authentication'],
                githubUrl: 'https://github.com/selcuk-karateke/laravel-backend',
                liveUrl: undefined,
                featured: true
            },
            {
                id: '2',
                title: 'Counter App',
                description: 'Interactive Counter application with modern UI/UX design. Demonstrates state management and responsive design principles.',
                technologies: ['PHP', 'JavaScript', 'HTML5', 'CSS3'],
                githubUrl: 'https://github.com/selcuk-karateke/counter',
                liveUrl: undefined,
                featured: true
            },
            {
                id: '3',
                title: 'Event Einladung',
                description: 'Event Management System for invitations and events. Features include RSVP tracking and guest management.',
                technologies: ['JavaScript', 'HTML5', 'CSS3', 'Event Management'],
                githubUrl: 'https://github.com/selcuk-karateke/event-einladung',
                liveUrl: undefined,
                featured: true
            },
            {
                id: '4',
                title: 'Dev Environment',
                description: 'Local development environment with Docker and automated deployment scripts. Optimized for PHP development.',
                technologies: ['PHP', 'Docker', 'Development Environment', 'Automation'],
                githubUrl: 'https://github.com/selcuk-karateke/dev.karafinds.local',
                liveUrl: undefined,
                featured: false
            },
            {
                id: '5',
                title: 'GitHub Profile',
                description: 'Configuration files for GitHub profile with automated README updates and contribution graph.',
                technologies: ['GitHub Actions', 'Markdown', 'Automation', 'Profile'],
                githubUrl: 'https://github.com/selcuk-karateke/selcuk-karateke',
                liveUrl: 'https://github.com/selcuk-karateke',
                featured: false
            },
            {
                id: '6',
                title: 'Portfolio Website',
                description: 'Modern portfolio website with Next.js, TypeScript and Tailwind CSS. Features: CMS, Blog, Contact form and responsive design.',
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth.js'],
                githubUrl: 'https://github.com/selcuk-karateke/portfolio-selcuk',
                liveUrl: 'https://selcuk-karateke.dev',
                featured: true
            }
        ]
        setProjects(mockProjects)
    }, [])

    const featuredProjects = projects.filter(project => project.featured)
    const otherProjects = projects.filter(project => !project.featured)

    return (
        <section ref={ref} className="py-20 theme-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold theme-text mb-6">
                        My Projects
                    </h2>
                    <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
                        A selection of my work and projects
                    </p>
                </motion.div>

                {/* Featured Projects */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold theme-text mb-8 text-center">Featured Projects</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="theme-bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="p-6">
                                    <h4 className="text-xl font-bold theme-text mb-3">{project.title}</h4>
                                    <p className="theme-text-secondary mb-4">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex space-x-4">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="theme-text-secondary hover:theme-primary transition-colors"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="theme-primary hover:opacity-80 transition-colors"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Other Projects */}
                <div>
                    <h3 className="text-2xl font-bold theme-text mb-8 text-center">Other Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.8, delay: (featuredProjects.length + index) * 0.1 }}
                                className="theme-bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                            >
                                <h4 className="text-lg font-bold theme-text mb-3">{project.title}</h4>
                                <p className="theme-text-secondary mb-4 text-sm">{project.description}</p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="theme-primary-bg text-white px-2 py-1 rounded text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="theme-text-secondary text-xs">+{project.technologies.length - 3} more</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/projects"
                        className="theme-primary-bg hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View All Projects
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
