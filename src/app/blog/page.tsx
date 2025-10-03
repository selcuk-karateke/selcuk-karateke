'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Post {
    id: string
    title: string
    slug: string
    excerpt?: string
    published: boolean
    featured: boolean
    tags: string
    author: {
        name: string
        email: string
    }
    createdAt: string
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog')
                const data = await response.json()
                setPosts(data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading blog posts...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        My Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Thoughts, tutorials and insights into the world of software development
                    </p>
                </motion.div>

                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts available yet</h2>
                            <p className="text-gray-600 mb-6">
                                The blog is still under construction. Soon you will find interesting articles about
                                web development, blockchain technologies and more here.
                            </p>
                            <Link
                                href="/contact"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            {post.featured ? 'Hervorgehoben' : 'Artikel'}
                                        </span>
                                        <time className="text-gray-500 text-sm">
                                            {new Date(post.createdAt).toLocaleDateString('de-DE')}
                                        </time>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>

                                    {post.excerpt && (
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.split(',').slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                            >
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                        {post.tags.split(',').length > 3 && (
                                            <span className="text-gray-500 text-xs">
                                                +{post.tags.split(',').length - 3} mehr
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {post.author.name.charAt(0)}
                                                </span>
                                            </div>
                                            <span className="text-gray-600 text-sm">{post.author.name}</span>
                                        </div>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                                        >
                                            Weiterlesen →
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                {/* Newsletter Signup */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white"
                >
                    <h3 className="text-2xl font-bold mb-4">Newsletter abonnieren</h3>
                    <p className="text-blue-200 mb-6">
                        Erhalten Sie die neuesten Artikel und Updates direkt in Ihr Postfach.
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Ihre E-Mail-Adresse"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                        />
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Abonnieren
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
