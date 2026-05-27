'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

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
  const t = useTranslations('pages.blog')
  const tCommon = useTranslations('common')
  const locale = useLocale()
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

  const dateLocale = locale === 'de' ? 'de-DE' : locale === 'tr' ? 'tr-TR' : 'en-US'

  if (loading) {
    return (
      <div className="min-h-page theme-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary)] mx-auto" />
            <p className="mt-4 theme-text-secondary">{tCommon('loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-page theme-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold theme-text mb-6">{t('title')}</h1>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="theme-bg-card rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold theme-text mb-4">{t('noPostsTitle')}</h2>
              <p className="theme-text-secondary mb-6">{t('noPostsDesc')}</p>
              <Link
                href="/contact"
                className="theme-primary-bg hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                {t('getInTouch')}
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
                className="theme-bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="theme-secondary-bg text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.featured ? tCommon('featured') : tCommon('article')}
                    </span>
                    <time className="theme-text-secondary text-sm">
                      {new Date(post.createdAt).toLocaleDateString(dateLocale)}
                    </time>
                  </div>

                  <h2 className="text-xl font-bold theme-text mb-3 line-clamp-2">{post.title}</h2>

                  {post.excerpt && (
                    <p className="theme-text-secondary mb-4 line-clamp-3">{post.excerpt}</p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.split(',').slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="theme-bg-secondary theme-text-secondary px-2 py-1 rounded text-xs"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 theme-primary-bg rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {post.author.name.charAt(0)}
                        </span>
                      </div>
                      <span className="theme-text-secondary text-sm">{post.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="theme-primary hover:opacity-80 font-semibold text-sm transition-colors"
                    >
                      {tCommon('readMore')}
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 theme-primary-bg rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">{t('newsletterTitle')}</h3>
          <p className="text-white/80 mb-6">{t('newsletterDesc')}</p>
          <div className="max-w-md mx-auto flex gap-4 flex-col sm:flex-row">
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="flex-1 px-4 py-3 rounded-lg theme-text focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
            <button
              type="button"
              className="bg-white theme-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              {t('subscribe')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
