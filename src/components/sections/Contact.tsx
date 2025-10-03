'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

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
                        Contact
                    </h2>
                    <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
                        Let's talk about your next project
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold theme-text mb-6">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="theme-primary-bg p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold theme-text">Address</h4>
                                    <p className="theme-text-secondary">Möckernstraße 115<br />10963 Berlin, Germany</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="theme-primary-bg p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold theme-text">Phone</h4>
                                    <p className="theme-text-secondary">
                                        <a href="tel:+493012074996" className="hover:theme-primary transition-colors">
                                            030 12074996
                                        </a><br />
                                        <a href="tel:+491774616695" className="hover:theme-primary transition-colors">
                                            0177 4616695
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="theme-primary-bg p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold theme-text">Email</h4>
                                    <p className="theme-text-secondary">
                                        <a href="mailto:selcuk.karateke@live.de" className="hover:theme-primary transition-colors">
                                            selcuk.karateke@live.de
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="theme-primary-bg p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold theme-text">Website</h4>
                                    <p className="theme-text-secondary">
                                        <a href="https://www.sellskitchen.de" target="_blank" rel="noopener noreferrer" className="hover:theme-primary transition-colors">
                                            www.sellskitchen.de
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 theme-bg-secondary rounded-lg">
                            <h4 className="font-semibold theme-text mb-3">Availability</h4>
                            <p className="theme-text-secondary mb-2">
                                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                Available for new projects
                            </p>
                            <p className="theme-text-secondary mb-2">
                                <span className="inline-block w-3 h-3 theme-primary-bg rounded-full mr-2"></span>
                                Remote work possible
                            </p>
                            <p className="theme-text-secondary">
                                <span className="inline-block w-3 h-3 theme-secondary-bg rounded-full mr-2"></span>
                                Ready to travel
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold theme-text mb-6">Send Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium theme-text-secondary mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 theme-border border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-bg theme-text"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium theme-text-secondary mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 theme-border border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-bg theme-text"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium theme-text-secondary mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 theme-border border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-bg theme-text"
                                    placeholder="Subject of your message"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium theme-text-secondary mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 theme-border border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-bg theme-text"
                                    placeholder="Describe your project or inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full theme-primary-bg hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    There was an error sending your message. Please try again.
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
