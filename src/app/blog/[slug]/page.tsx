'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Post {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    published: boolean
    featured: boolean
    tags: string
    author: {
        name: string
        email: string
    }
    createdAt: string
    comments: Comment[]
}

interface Comment {
    id: string
    content: string
    author: string
    email: string
    approved: boolean
    createdAt: string
}

export default function BlogPost() {
    const params = useParams()
    const slug = params.slug as string
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [commentForm, setCommentForm] = useState({
        author: '',
        email: '',
        content: ''
    })
    const [submittingComment, setSubmittingComment] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/blog/${slug}`)
                if (response.ok) {
                    const data = await response.json()
                    setPost(data)
                } else {
                    setPost(null)
                }
            } catch (error) {
                console.error('Error fetching post:', error)
                setPost(null)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchPost()
        }
    }, [slug])

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittingComment(true)

        try {
            const response = await fetch(`/api/blog/${slug}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentForm),
            })

            if (response.ok) {
                setCommentForm({ author: '', email: '', content: '' })
                alert('Kommentar wurde erfolgreich gesendet und wartet auf Freigabe.')
            } else {
                alert('Fehler beim Senden des Kommentars.')
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
            alert('Fehler beim Senden des Kommentars.')
        } finally {
            setSubmittingComment(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Lade Artikel...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
                        <p className="text-gray-600 mb-8">Der angeforderte Artikel konnte nicht gefunden werden.</p>
                        <Link
                            href="/blog"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Zurück zum Blog
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <Link
                                href="/blog"
                                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                                ← Zurück zum Blog
                            </Link>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                {post.featured ? 'Hervorgehoben' : 'Artikel'}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between text-gray-600">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold">
                                            {post.author.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{post.author.name}</p>
                                        <p className="text-sm">{new Date(post.createdAt).toLocaleDateString('de-DE')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {post.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Comments Section */}
                    <div className="p-8 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Kommentare ({post.comments.length})
                        </h3>

                        {/* Comments List */}
                        <div className="space-y-6 mb-8">
                            {post.comments.length === 0 ? (
                                <p className="text-gray-600 italic">Noch keine Kommentare vorhanden.</p>
                            ) : (
                                post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {comment.author.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{comment.author}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(comment.createdAt).toLocaleDateString('de-DE')}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Comment Form */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Kommentar schreiben</h4>
                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            name="author"
                                            value={commentForm.author}
                                            onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Ihr Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            E-Mail *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={commentForm.email}
                                            onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="ihre@email.de"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                        Kommentar *
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={commentForm.content}
                                        onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Schreiben Sie Ihren Kommentar..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submittingComment}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    {submittingComment ? 'Wird gesendet...' : 'Kommentar senden'}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    )
}
