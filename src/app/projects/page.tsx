'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface Project {
    id: string
    title: string
    description: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
    featured: boolean
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        // Mock data - in production, this would come from the API
        const mockProjects: Project[] = [
            {
                id: '1',
                title: 'Laravel Backend',
                description: 'Robustes Laravel Backend mit API-Entwicklung und Datenbankintegration. Vollständige REST API mit Authentifizierung und Autorisierung.',
                technologies: ['Laravel', 'PHP', 'MySQL', 'API', 'Authentication'],
                githubUrl: 'https://github.com/selcuk-karateke/laravel-backend',
                liveUrl: undefined,
                featured: true
            },
            {
                id: '2',
                title: 'Counter App',
                description: 'Interaktive Counter-Anwendung mit modernem UI/UX Design. Demonstrates state management und responsive design principles.',
                technologies: ['PHP', 'JavaScript', 'HTML5', 'CSS3'],
                githubUrl: 'https://github.com/selcuk-karateke/counter',
                liveUrl: undefined,
                featured: true
            },
            {
                id: '3',
                title: 'Event Einladung',
                description: 'Event Management System für Einladungen und Veranstaltungen. Features include RSVP tracking und guest management.',
                technologies: ['JavaScript', 'HTML5', 'CSS3', 'Event Management'],
                githubUrl: 'https://github.com/selcuk-karateke/event-einladung',
                liveUrl: undefined,
                featured: true
            },
            {
                id: '4',
                title: 'Dev Environment',
                description: 'Lokale Entwicklungsumgebung mit Docker und automatisierten Deployment-Skripten. Optimiert für PHP-Entwicklung.',
                technologies: ['PHP', 'Docker', 'Development Environment', 'Automation'],
                githubUrl: 'https://github.com/selcuk-karateke/dev.karafinds.local',
                liveUrl: undefined,
                featured: false
            },
            {
                id: '5',
                title: 'GitHub Profile',
                description: 'Konfigurationsdateien für GitHub-Profil mit automatisierten README-Updates und Contribution-Graph.',
                technologies: ['GitHub Actions', 'Markdown', 'Automation', 'Profile'],
                githubUrl: 'https://github.com/selcuk-karateke/selcuk-karateke',
                liveUrl: 'https://github.com/selcuk-karateke',
                featured: false
            },
            {
                id: '6',
                title: 'Portfolio Website',
                description: 'Moderne Portfolio-Website mit Next.js, TypeScript und Tailwind CSS. Features: CMS, Blog, Kontaktformular und responsive Design.',
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth.js'],
                githubUrl: 'https://github.com/selcuk-karateke/portfolio-selcuk',
                liveUrl: 'https://selcuk-karateke.dev',
                featured: true
            }
        ]
        setProjects(mockProjects)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        My Projects
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A collection of my work and projects.
                        From web development to backend systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex space-x-3">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                                        >
                                            <CodeBracketIcon className="w-4 h-4 mr-2" />
                                            Code
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                        >
                                            <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-4">
                        Interested in a project or have questions?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
