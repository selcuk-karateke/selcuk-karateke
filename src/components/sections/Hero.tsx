'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Hero() {
    const [currentText, setCurrentText] = useState(0)
    const texts = [
        'Software Developer',
        'Full-Stack Developer',
        'PHP Specialist',
        'Problem Solver'
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [texts.length])

    return (
        <section className="relative min-h-screen flex items-center justify-center theme-bg-secondary theme-text overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-brand-secondary/10 rounded-full blur-3xl floating"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl floating-delay-2"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row items-center justify-center gap-12"
                >
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <img
                            src="/profile.jpg"
                            alt="Selçuk Karateke"
                            className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-brand-primary/30 shadow-lg"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <motion.h1
                            className="text-5xl md:text-7xl font-black mb-6 theme-text"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Selçuk Karateke
                        </motion.h1>

                        <div className="text-2xl md:text-4xl font-bold mb-8 h-16 flex items-center justify-center">
                            <motion.span
                                key={currentText}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="theme-primary"
                            >
                                {texts[currentText]}
                            </motion.span>
                        </div>

                        <motion.p
                            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed theme-text-secondary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Passionate developer focused on modern web technologies,
                            full-stack development and innovative solutions for complex problems.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <motion.a
                                href="/projects"
                                className="theme-primary-bg hover:opacity-90 px-8 py-3 rounded-full text-lg font-bold text-white transition-all duration-300 card-hover shadow-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Projects
                            </motion.a>
                            <motion.a
                                href="/contact"
                                className="bg-transparent border-2 theme-border px-8 py-3 rounded-full text-lg font-bold theme-primary hover:theme-primary-bg hover:text-white transition-all duration-300 card-hover shadow-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDownIcon className="h-8 w-8 theme-text-secondary opacity-70" />
            </motion.div>
        </section>
    )
}
