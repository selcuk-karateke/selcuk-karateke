'use client'

import { motion } from 'framer-motion'
import About from '@/components/sections/About'

export default function AboutPage() {
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
                        About Me
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Learn more about my professional background,
                        my skills and my passion for programming.
                    </p>
                </motion.div>

                <About />
            </div>
        </div>
    )
}
