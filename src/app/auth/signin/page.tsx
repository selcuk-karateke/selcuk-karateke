'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'

function SignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (result?.error) {
      setError('Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.')
      return
    }

    window.location.href = callbackUrl
  }

  return (
    <div className="min-h-screen theme-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md theme-bg-card border theme-border rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold theme-text mb-2">Anmelden</h1>
        <p className="theme-text-secondary text-sm mb-6">Admin-Bereich des Portfolios</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium theme-text-secondary mb-1">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 rounded-lg border theme-border theme-bg theme-text"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium theme-text-secondary mb-1">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 rounded-lg border theme-border theme-bg theme-text"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full theme-primary-bg hover:opacity-90 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
          >
            {loading ? 'Wird angemeldet…' : 'Anmelden'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="theme-primary hover:opacity-80">
            ← Zurück zur Startseite
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen theme-bg" />}>
      <SignInForm />
    </Suspense>
  )
}
