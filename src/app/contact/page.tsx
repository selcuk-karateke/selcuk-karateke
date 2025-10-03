'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Contact from '@/components/sections/Contact'

export default function ContactPage() {
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
                        Contact
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Let&apos;s talk about your next project.
                        I look forward to hearing from you!
                    </p>
                </motion.div>

                <Contact />
            </div>
        </div>
    )
}
