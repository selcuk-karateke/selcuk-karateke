'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TrainingOverviewStats from '@/components/sections/TrainingOverviewStats'

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-20 theme-bg relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl floating"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl floating-delay-3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-black theme-text mb-6">
                        About Me
                    </h2>
                    <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
                        Learn more about my professional background,
                        my skills and my passion for programming.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="theme-bg-card rounded-3xl p-8">
                            <h3 className="text-3xl font-bold theme-text mb-6">My Story</h3>
                            <div className="space-y-4 theme-text-secondary">
                                <p>
                                    👋 Hi, I&apos;m Selçuk! As a software developer, I am motivated, ready and open to any
                                    programming language and environment. My journey began with training as a
                                    computer science specialist at Comhard GmbH in Berlin. I worked as a PHP developer
                                    at Bagobag GmbH until 2025 and am now self-employed at Kawai Labs.
                                </p>
                                <p>
                                    👀 I&apos;m interested in coding - I passionately work with technologies like PHP, JavaScript,
                                    Laravel, Vue.js, React and Node.js. My expertise includes both backend
                                    and frontend development with a focus on product management, HTML5,
                                    REST APIs, MVC architecture and object-oriented programming.
                                </p>
                                <p>
                                    🌱 I&apos;m currently learning the fundamentals of life of a coding guy - My motto: &quot;Create a world beyond our mind&quot;.
                                    I am constantly motivated to develop innovative solutions and evolve ideas.
                                    👯 I&apos;m looking to collaborate on good stuff!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="theme-primary-bg rounded-2xl p-6 text-white card-hover shadow-sm">
                            <h4 className="text-xl font-bold mb-3">Education</h4>
                            <p className="text-white">
                                IHK Certification: IT Specialist - Application Development<br />
                                Comhard GmbH, Berlin (2017-2019)<br />
                                <span className="text-sm opacity-90">2,640 training hours • 9 modules</span>
                            </p>
                        </div>

                        <div className="theme-secondary-bg rounded-2xl p-6 text-white card-hover shadow-sm">
                            <h4 className="text-xl font-bold mb-3">Current Position</h4>
                            <p className="text-white">
                                Self-employed<br />
                                Kawai Labs (since Feb 2025)
                            </p>
                        </div>

                        <div className="bg-slate-600 rounded-2xl p-6 text-white card-hover shadow-sm">
                            <h4 className="text-xl font-bold mb-3">Languages</h4>
                            <p className="text-white">
                                German (native), Turkish (native), English (fluent)
                            </p>
                        </div>

                        <div className="bg-slate-700 rounded-2xl p-6 text-white card-hover shadow-sm">
                            <h4 className="text-xl font-bold mb-3">Location</h4>
                            <p className="text-white">
                                Berlin, Germany<br />
                                Ready for remote work and travel
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-6 text-white card-hover shadow-sm">
                            <h4 className="text-xl font-bold mb-3">GitHub Activity</h4>
                            <p className="text-white">
                                399 contributions in the last year<br />
                                31 Repositories • 2 Followers • 4 Following
                            </p>
                            <a
                                href="https://github.com/selcuk-karateke"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center mt-3 bg-white/20 px-4 py-2 rounded-full text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-sm border border-white/30"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                                View GitHub Profile
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Certifications Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16"
                >
                    <h3 className="text-4xl font-bold theme-text mb-8 text-center">Certifications & Certificates</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">PHP Frameworks</h4>
                            <p className="theme-text-secondary mb-2">Laravel, Vue, React</p>
                            <p className="text-sm theme-text-secondary">BTA GmbH • August 2020</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">UI/UX Design</h4>
                            <p className="theme-text-secondary mb-2">User Interface & Experience Design</p>
                            <p className="text-sm theme-text-secondary">BTA GmbH • July 2020</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">Agile Management</h4>
                            <p className="theme-text-secondary mb-2">Agile Consulting & Management</p>
                            <p className="text-sm theme-text-secondary">BTA GmbH • June 2020</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">Software Development</h4>
                            <p className="theme-text-secondary mb-2">Fundamentals</p>
                            <p className="text-sm theme-text-secondary">Certiport • October 2018</p>
                            <p className="text-xs text-gray-400">ID: v8dm-XVN9</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">Database Administration</h4>
                            <p className="theme-text-secondary mb-2">Fundamentals</p>
                            <p className="text-sm theme-text-secondary">Certiport • March 2018</p>
                            <p className="text-xs text-gray-400">ID: wdeU5-HaMm</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">Network Administrator</h4>
                            <p className="theme-text-secondary mb-2">Network Administration</p>
                            <p className="text-sm theme-text-secondary">dama.go GmbH • August 2012</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">Microsoft Specialist</h4>
                            <p className="theme-text-secondary mb-2">Windows 7 Configuration</p>
                            <p className="text-sm theme-text-secondary">Microsoft • December 2015</p>
                            <p className="text-xs text-gray-400">ID: F503-5040</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">MCTS Windows Server 2008</h4>
                            <p className="theme-text-secondary mb-2">Applications Infrastructure</p>
                            <p className="text-sm theme-text-secondary">Microsoft • July 2012</p>
                            <p className="text-xs text-gray-400">ID: D952-3585</p>
                        </div>

                        <div className="theme-bg-card rounded-2xl p-6 card-hover">
                            <h4 className="text-lg font-bold theme-text mb-2">Microsoft Certified Professional</h4>
                            <p className="theme-text-secondary mb-2">MCP Certification</p>
                            <p className="text-sm theme-text-secondary">Microsoft • May 2012</p>
                            <p className="text-xs text-gray-400">ID: E924-7529</p>
                        </div>
                    </div>
                </motion.div>

                {/* Detailed Education Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16"
                >
                    <h3 className="text-3xl font-bold gradient-text mb-8 text-center">Detailed Education</h3>

                    <div className="glass-dark rounded-lg warm-shadow-lg p-8 border border-warm-dark-brown/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-warm-red/10 rounded-lg p-6 border border-warm-red/20">
                                <h4 className="text-lg font-bold theme-text mb-3">Business and Business Processes</h4>
                                <p className="text-white text-sm mb-2">500 hours</p>
                                <ul className="theme-text-secondary text-sm space-y-1">
                                    <li>• General Business Studies</li>
                                    <li>• Legal and Social Studies</li>
                                    <li>• MS Office for IT Business Processes</li>
                                    <li>• Mathematics for Computer Scientists</li>
                                </ul>
                            </div>

                            <div className="bg-warm-brown/10 rounded-lg p-6 border border-warm-brown/20">
                                <h4 className="text-lg font-bold theme-text mb-3">Communication</h4>
                                <p className="text-white text-sm mb-2">168 hours</p>
                                <ul className="theme-text-secondary text-sm space-y-1">
                                    <li>• Communication Policy</li>
                                    <li>• Self-Marketing</li>
                                    <li>• Technical English</li>
                                </ul>
                            </div>

                            <div className="bg-warm-orange/10 rounded-lg p-6 border border-warm-orange/20">
                                <h4 className="text-lg font-bold theme-text mb-3">IT Systems</h4>
                                <p className="text-white text-sm mb-2">396 hours</p>
                                <ul className="theme-text-secondary text-sm space-y-1">
                                    <li>• Data Processing Fundamentals</li>
                                    <li>• PC System Hardware Architecture</li>
                                    <li>• Basic Electrical Engineering</li>
                                    <li>• Practical Training</li>
                                </ul>
                            </div>

                            <div className="bg-warm-dark-brown/10 rounded-lg p-6 border border-warm-dark-brown/20">
                                <h4 className="text-lg font-bold theme-text mb-3">Networked IT Systems</h4>
                                <p className="text-white text-sm mb-2">348 hours</p>
                                <ul className="theme-text-secondary text-sm space-y-1">
                                    <li>• Network Fundamentals</li>
                                    <li>• Linux Operating System</li>
                                    <li>• Practical Training</li>
                                </ul>
                            </div>

                            <div className="bg-warm-red/10 rounded-lg p-6 border border-warm-red/20 col-span-1 md:col-span-2">
                                <h4 className="text-lg font-bold theme-text mb-3">Application Development</h4>
                                <p className="text-white text-sm mb-2">908 hours</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ul className="theme-text-secondary text-sm space-y-1">
                                        <li>• HTML, CSS (40h)</li>
                                        <li>• Datenbankentwicklung (144h)</li>
                                        <li>• Java SE OOP (260h)</li>
                                        <li>• .NET Framework C# (220h)</li>
                                    </ul>
                                    <ul className="theme-text-secondary text-sm space-y-1">
                                        <li>• JavaScript und PHP (120h)</li>
                                        <li>• Application System Design</li>
                                        <li>• Microsoft Exam Preparation</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-warm-dark-gray/10 rounded-lg p-6 border border-warm-dark-gray/20">
                                <h4 className="text-lg font-bold theme-text mb-3">Project Work & Internship</h4>
                                <p className="text-white text-sm mb-2">1,200 hours</p>
                                <ul className="theme-text-secondary text-sm space-y-1">
                                    <li>• Java SE Project (80h)</li>
                                    <li>• IHK Specialization (80h)</li>
                                    <li>• Professional Tasks (80h)</li>
                                    <li>• Corporate Internship (960h)</li>
                                </ul>
                            </div>
                        </div>

                        <TrainingOverviewStats />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
