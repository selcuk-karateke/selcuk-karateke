'use client'

import { useState } from 'react'
import type { LegacyRoute } from '@/data/legacyRoutes'

export default function LegacyFeaturePanel({ route }: { route: LegacyRoute }) {
  if (route.feature === 'none') {
    return (
      <div className="theme-bg-card border theme-border rounded-xl p-6">
        <h3 className="text-lg font-semibold theme-text mb-2">Rendered Legacy Content</h3>
        <p className="theme-text-secondary">
          Static route migration complete. This page is available and integrated in the Next.js
          routing tree.
        </p>
      </div>
    )
  }

  if (route.feature === 'contact') return <ContactMock />
  if (route.feature === 'login') return <LoginMock />
  if (route.feature === 'search') return <SearchMock />
  if (route.feature === 'crud') return <CrudMock />

  return null
}

function ContactMock() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setError('')
    const payload = Object.fromEntries(formData.entries())
    const res = await fetch('/api/legacy/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) setSent(true)
    else setError('Could not send message.')
  }

  return (
    <div className="theme-bg-card border theme-border rounded-xl p-6">
      <h3 className="text-lg font-semibold theme-text mb-4">Contact Form (Legacy Mock)</h3>
      {sent ? (
        <p className="text-green-600 dark:text-green-400">Message sent successfully.</p>
      ) : (
        <form
          action={async (fd) => {
            await handleSubmit(fd)
          }}
          className="space-y-3"
        >
          <input name="name" placeholder="Name" className="w-full border rounded px-3 py-2 bg-transparent" />
          <input name="email" placeholder="Email" className="w-full border rounded px-3 py-2 bg-transparent" />
          <input name="phone" placeholder="Phone" className="w-full border rounded px-3 py-2 bg-transparent" />
          <textarea name="message" placeholder="Message" className="w-full border rounded px-3 py-2 bg-transparent" rows={4} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="theme-primary-bg text-white px-4 py-2 rounded">Send</button>
        </form>
      )}
    </div>
  )
}

function LoginMock() {
  const [username, setUsername] = useState('demo')
  const [password, setPassword] = useState('demo')
  const [status, setStatus] = useState('')

  async function login() {
    const res = await fetch('/api/legacy/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    setStatus(data.message ?? 'Done')
  }

  async function logout() {
    const res = await fetch('/api/legacy/auth/logout', { method: 'POST' })
    const data = await res.json()
    setStatus(data.message ?? 'Logged out')
  }

  async function session() {
    const res = await fetch('/api/legacy/auth/session')
    const data = await res.json()
    if (data.authenticated) setStatus(`Active session: ${data.user}`)
    else setStatus('No active session')
  }

  return (
    <div className="theme-bg-card border theme-border rounded-xl p-6">
      <h3 className="text-lg font-semibold theme-text mb-4">Login Session (Legacy Mock)</h3>
      <div className="space-y-3">
        <label className="block text-sm theme-text-secondary">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-transparent mt-1"
            placeholder="Username"
          />
        </label>
        <label className="block text-sm theme-text-secondary">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-transparent mt-1"
            type="password"
            placeholder="Password"
          />
        </label>
        <div className="flex gap-2">
          <button onClick={login} className="theme-primary-bg text-white px-4 py-2 rounded">Login</button>
          <button onClick={logout} className="border theme-border px-4 py-2 rounded theme-text">Logout</button>
          <button onClick={session} className="border theme-border px-4 py-2 rounded theme-text">Check Session</button>
        </div>
        {status && <p className="text-sm theme-text-secondary">{status}</p>}
      </div>
    </div>
  )
}

function SearchMock() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  async function doSearch() {
    const res = await fetch(`/api/legacy/search?q=${encodeURIComponent(query)}`)
    const data = (await res.json()) as { results: string[] }
    setResults(data.results)
  }

  return (
    <div className="theme-bg-card border theme-border rounded-xl p-6">
      <h3 className="text-lg font-semibold theme-text mb-4">Live Search (Legacy Mock)</h3>
      <div className="flex gap-2 mb-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="Search..." />
        <button onClick={doSearch} className="theme-primary-bg text-white px-4 py-2 rounded">Search</button>
      </div>
      <ul className="space-y-1">
        {results.map((r) => (
          <li key={r} className="text-sm theme-text-secondary">- {r}</li>
        ))}
      </ul>
    </div>
  )
}

function CrudMock() {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')

  async function load() {
    const res = await fetch('/api/legacy/crud')
    const data = (await res.json()) as { items: string[] }
    setItems(data.items)
  }

  async function add() {
    const res = await fetch('/api/legacy/crud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: input }),
    })
    const data = (await res.json()) as { items: string[] }
    setItems(data.items)
    setInput('')
  }

  return (
    <div className="theme-bg-card border theme-border rounded-xl p-6">
      <h3 className="text-lg font-semibold theme-text mb-4">CRUD Workflow (Legacy Mock)</h3>
      <div className="flex gap-2 mb-4">
        <button onClick={load} className="border theme-border px-4 py-2 rounded theme-text">Load</button>
        <input value={input} onChange={(e) => setInput(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="Add item" />
        <button onClick={add} className="theme-primary-bg text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm theme-text-secondary">- {item}</li>
        ))}
      </ul>
    </div>
  )
}
