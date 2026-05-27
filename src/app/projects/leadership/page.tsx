'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { guidedProjects } from '@/data/projects'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function LeadershipPage() {
    return (
        <div className="min-h-page theme-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Link
                    href="/projects"
                    className="inline-flex items-center theme-text-secondary hover:theme-primary mb-8 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold theme-text mb-6">
                        Project Leadership & Technical Acceptance
                    </h1>
                    <p className="text-xl theme-text-secondary max-w-3xl">
                        These projects were technically led, mentored, and finally accepted by me. From conception through implementation to code review and release – part of my previous role as PHP developer and technical lead.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {guidedProjects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="theme-bg-card rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Link
                                        href={`/projects/leadership/${project.id}`}
                                        className="text-2xl font-bold theme-text hover:theme-primary transition-colors"
                                    >
                                        {project.title}
                                    </Link>
                                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                                        {project.developer}
                                    </span>
                                </div>

                                <p className="text-sm font-medium theme-primary mb-2">{project.role}</p>
                                <p className="theme-text-secondary mb-6">{project.description}</p>

                                <div className="space-y-6">
                                    {project.features.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold theme-text mb-2">Features</h4>
                                            <ul className="list-disc list-inside theme-text-secondary space-y-1">
                                                {project.features.map((f, i) => (
                                                    <li key={i}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-semibold theme-text mb-2">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="bg-gray-100 dark:bg-gray-800 theme-text px-3 py-1 rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {project.useCases.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold theme-text mb-2">Use Cases</h4>
                                            <ul className="list-disc list-inside theme-text-secondary space-y-1">
                                                {project.useCases.map((uc, i) => (
                                                    <li key={i}>{uc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                                        <p className="text-sm theme-text-secondary">
                                            <span className="font-medium theme-text">Rebuildable:</span> {project.rebuildable}
                                        </p>
                                        <Link
                                            href={`/projects/leadership/${project.id}`}
                                            className="text-sm theme-primary font-medium hover:opacity-80"
                                        >
                                            Full details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="theme-text-secondary mb-4">
                        Interested in having one of these projects rebuilt or adapted?
                    </p>
                    <Link
                        href="/contact"
                        className="theme-primary-bg hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
