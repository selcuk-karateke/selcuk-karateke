'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Experience {
    id: string
    company: string
    position: string
    description: string
    startDate: string
    endDate?: string
    current: boolean
    location?: string
}

export default function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [experiences, setExperiences] = useState<Experience[]>([])

    useEffect(() => {
        // Mock data based on LinkedIn profile
        const mockExperiences: Experience[] = [
            {
                id: '1',
                company: 'Bagobag GmbH',
                position: 'PHP Developer',
                description: 'Development of PHP-based web applications with focus on product management and HTML5. Working with modern frameworks and technologies.',
                startDate: '2020-01',
                current: true,
                location: 'Berlin'
            },
            {
                id: '2',
                company: 'Comhard GmbH',
                position: 'IT Specialist Application Development (Retraining)',
                description: 'Retraining as IT Specialist with IHK certification. Specialization: Application Development. 2,640 training hours in 9 modules: Business and Business Processes, Communication, IT Systems, Networked IT Systems, Application Development (Java, C#, PHP, HTML/CSS, Databases), Project Work and Corporate Internship.',
                startDate: '2017-01',
                endDate: '2019-12',
                current: false,
                location: 'Berlin'
            }
        ]
        setExperiences(mockExperiences)
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })
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
                        Professional Experience
                    </h2>
                    <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
                        My professional journey and career milestones
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-theme-primary to-theme-secondary"></div>

                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={experience.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 theme-primary-bg rounded-full border-4 border-white shadow-lg z-10"></div>

                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                                    }`}>
                                    <div className="theme-bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-bold theme-text">{experience.position}</h3>
                                            {experience.current && (
                                                <span className="theme-secondary-bg text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-lg font-semibold theme-primary mb-2">{experience.company}</h4>

                                        <div className="theme-text-secondary mb-4">
                                            <p className="font-medium">
                                                {formatDate(experience.startDate)} - {
                                                    experience.current ? 'Today' : formatDate(experience.endDate!)
                                                }
                                            </p>
                                            {experience.location && (
                                                <p className="text-sm">📍 {experience.location}</p>
                                            )}
                                        </div>

                                        <p className="theme-text-secondary">{experience.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20"
                >
                    <h3 className="text-3xl font-bold theme-text mb-8 text-center">Education & Training</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="theme-bg-card rounded-lg shadow-lg p-6">
                            <h4 className="text-xl font-bold theme-text mb-3">Professional Training</h4>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold theme-primary">IT Specialist - Application Development</h5>
                                    <p className="theme-text-secondary">Comhard GmbH, Berlin</p>
                                    <p className="text-sm theme-text-secondary">2016 - 2018</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold theme-primary">Specialist in Gastronomy</h5>
                                    <p className="theme-text-secondary">Kiezküchen gGmbH, Berlin</p>
                                    <p className="text-sm theme-text-secondary">2006 - 2009</p>
                                </div>
                            </div>
                        </div>

                        <div className="theme-bg-card rounded-lg shadow-lg p-6">
                            <h4 className="text-xl font-bold theme-text mb-3">Further Training</h4>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold theme-secondary">PHP-Frameworks, UI/UX Design and Agile Management</h5>
                                    <p className="theme-text-secondary">BTA GmbH, Berlin</p>
                                    <p className="text-sm theme-text-secondary">2020</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold theme-secondary">Network Administrator</h5>
                                    <p className="theme-text-secondary">Damago GmbH, Berlin</p>
                                    <p className="text-sm theme-text-secondary">2012</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
