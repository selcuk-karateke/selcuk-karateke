'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { usePomodoro } from '@/components/pomodoro/PomodoroProvider'
import { ExercisePhpTsCompare } from '@/components/exercises/ExercisePhpTsCompare'
import {
  ASSO_ARRAY_PHP_SOURCE,
  ASSO_ARRAY_TS_SOURCE,
  runAssoArrayDemo,
} from '@/lib/exerciseDemos/assoArrayDemo'
import {
  ELEMENTEANZAHL_PHP_SOURCE,
  ELEMENTEANZAHL_TS_SOURCE,
  runElementeanzahlDemo,
} from '@/lib/exerciseDemos/elementeanzahlDemo'
import {
  OOP_PHP_SOURCE,
  OOP_TS_SOURCE,
  buildPersonFromForm,
  formatOopOutput,
  type OopFormData,
} from '@/lib/exerciseDemos/oopDemo'
import { getExercise } from '@/data/exerciseCatalog'

function exerciseTitle(slug: string, fallback = slug) {
  return getExercise(slug)?.title ?? fallback
}

function Back() {
  return (
    <Link href="/uebungen" className="text-sm theme-primary hover:opacity-80 mb-4 inline-block">
      ← Alle Übungen
    </Link>
  )
}

function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="theme-bg-card border theme-border rounded-xl p-6 space-y-4">
      {title && <h2 className="text-lg font-semibold theme-text">{title}</h2>}
      {children}
    </div>
  )
}

export function PomodoroExercise() {
  const { mode, status, displayTime, isWorkHours, start, togglePause, stop } = usePomodoro()
  const active = status !== 'idle'

  return (
    <>
      <Back />
      <Card title="Pomodoro-Technik">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            className={`border theme-border px-4 py-2 rounded theme-text transition-colors ${
              mode === 'interrupt' && active ? 'bg-sky-100 dark:bg-sky-900/40 border-sky-400' : ''
            }`}
            onClick={() => start('interrupt')}
          >
            Interrupt (15 min)
          </button>
          <button
            type="button"
            className={`border theme-border px-4 py-2 rounded theme-text transition-colors ${
              mode === 'work' && active ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400' : ''
            }`}
            onClick={() => start('work')}
          >
            Work (28 min)
          </button>
          <span className="text-xl font-mono theme-text ml-2 min-w-[5ch]">{displayTime}</span>
        </div>

        {active && (
          <div className="flex flex-wrap gap-2">
            {(status === 'running' || status === 'paused') && (
              <button
                type="button"
                className="border theme-border px-4 py-2 rounded theme-text text-sm"
                onClick={togglePause}
              >
                {status === 'paused' ? 'Fortsetzen' : 'Pause'}
              </button>
            )}
            <button
              type="button"
              className="border border-red-300 text-red-600 dark:text-red-400 px-4 py-2 rounded text-sm"
              onClick={stop}
            >
              Stop
            </button>
          </div>
        )}

        <p className="text-sm theme-text-secondary">
          Timer läuft sitzungsweit weiter — auch beim Wechsel zu anderen Seiten. Steuerung unten
          rechts (Pause/Stop und „Nach oben“).
          {isWorkHours
            ? ' Arbeitszeit (8–16 Uhr): Interrupt = blau, Work = grün markiert.'
            : ' Außerhalb 8–16 Uhr startet der Timer trotzdem (im Original nur Hintergrundfarbe).'}
        </p>
      </Card>
    </>
  )
}

export function NettoBruttoExercise() {
  const [netto, setNetto] = useState('')
  const [prozent, setProzent] = useState('')
  const [submitted, setSubmitted] = useState<{ netto: number; prozent: number } | null>(null)

  const n = submitted ? submitted.netto : 0
  const p = submitted ? submitted.prozent : 0
  const brutto = n * (1 + p / 100)

  return (
    <>
      <Back />
      <Card title="Netto-/Bruttorechner">
        {submitted && (
          <table className="text-sm border theme-border w-full max-w-md">
            <tbody>
              <tr>
                <td className="border theme-border p-2">Nettowert</td>
                <td className="border theme-border p-2">{n}</td>
              </tr>
              <tr>
                <td className="border theme-border p-2">Steuersatz</td>
                <td className="border theme-border p-2">{p}%</td>
              </tr>
              <tr>
                <td className="border theme-border p-2">Bruttowert</td>
                <td className="border theme-border p-2">{brutto.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
        <form
          className="space-y-2 max-w-md"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted({ netto: Number(netto), prozent: Number(prozent) })
          }}
        >
          <p>
            <input
              className="border theme-border rounded px-3 py-2 w-full bg-transparent"
              placeholder="Nettowert"
              value={netto}
              onChange={(e) => setNetto(e.target.value)}
            />
          </p>
          <p>
            <input
              className="border theme-border rounded px-3 py-2 w-full bg-transparent"
              placeholder="Steuersatz (in %)"
              value={prozent}
              onChange={(e) => setProzent(e.target.value)}
            />
          </p>
          <p className="flex gap-2">
            <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
              Berechnen
            </button>
            <button
              type="reset"
              className="border theme-border px-4 py-2 rounded"
              onClick={() => {
                setNetto('')
                setProzent('')
                setSubmitted(null)
              }}
            >
              Reset
            </button>
          </p>
        </form>
      </Card>
    </>
  )
}

const SPEISEN: Record<number, string> = {
  1: 'Himbeereis',
  2: 'Wiener Schnitzel',
  3: 'Gulasch',
  4: 'Salatteller',
  5: 'Schaschlik',
}

export function MenueExercise() {
  const [choice, setChoice] = useState('')
  const [result, setResult] = useState<string | null>(null)

  return (
    <>
      <Back />
      <Card title="Auswahl der Lieblingsspeise">
        {result && (
          <h3 className="text-lg theme-text">
            Sie haben die Speise „{result}“ als Ihre Lieblingsspeise ausgewählt.
          </h3>
        )}
        <form
          className="space-y-3 max-w-sm"
          onSubmit={(e) => {
            e.preventDefault()
            const key = Number(choice)
            setResult(SPEISEN[key] ?? 'Unbekannt')
          }}
        >
          <label className="block text-sm theme-text-secondary">
            Ihre Lieblingsspeise:
            <select
              required
              className="mt-1 w-full border theme-border rounded px-3 py-2 bg-transparent"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            >
              <option value="">-- Ihre Wahl --</option>
              {Object.entries(SPEISEN).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Speichern
          </button>
        </form>
      </Card>
    </>
  )
}

function parseMultiplikationFactor(raw: string): number {
  const trimmed = raw.trim()
  if (trimmed === '') return 0
  const n = Number(trimmed.replace(',', '.'))
  return Number.isFinite(n) ? n : 0
}

function malnehmen(a: number, b: number) {
  return a * b
}

/** Zwei Faktoren multiplizieren (exer/multiplikationsfunktion.php). */
export function MultiplikationFunctionExercise() {
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [factors, setFactors] = useState({ a: 0, b: 0 })

  const ergebnis = malnehmen(factors.a, factors.b)

  return (
    <>
      <Back />
      <Card title="Multiplikation">
        <form
          className="space-y-3 max-w-xs"
          onSubmit={(e) => {
            e.preventDefault()
            setFactors({
              a: parseMultiplikationFactor(p1),
              b: parseMultiplikationFactor(p2),
            })
          }}
        >
          <label className="block text-sm theme-text-secondary">
            Faktor 1
            <input
              name="p1"
              type="text"
              inputMode="decimal"
              placeholder="z. B. 7"
              className="mt-1 border theme-border rounded px-3 py-2 w-full bg-transparent theme-text"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
            />
          </label>
          <label className="block text-sm theme-text-secondary">
            Faktor 2
            <input
              name="p2"
              type="text"
              inputMode="decimal"
              placeholder="z. B. 8"
              className="mt-1 border theme-border rounded px-3 py-2 w-full bg-transparent theme-text"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
            />
          </label>
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Multipliziere!
          </button>
        </form>
        <h2 className="text-xl font-semibold theme-text">
          Ergebnis: {ergebnis}
        </h2>
        {(factors.a !== 0 || factors.b !== 0) && (
          <p className="text-sm theme-text-secondary">
            {factors.a} × {factors.b} = {ergebnis}
          </p>
        )}
      </Card>
    </>
  )
}

/** Kleines Einmaleins bis N (multiplikationstabelle.php). */
export function MultiplikationTableExercise({ defaultBis = 10 }: { defaultBis?: number }) {
  const [bisInput, setBisInput] = useState(String(defaultBis))
  const [bis, setBis] = useState(defaultBis)
  const [error, setError] = useState<string | null>(null)

  const clampBis = (raw: string) => {
    const trimmed = raw.trim()
    if (trimmed === '' || !/^-?\d+([.,]\d+)?$/.test(trimmed.replace(',', '.'))) {
      return { value: 10, error: 'Nicht erlaubt sind Buchstabe(n), nichts mal nichts, weniger als nix und Kommatapunkto!' }
    }
    let n = Math.floor(Number(trimmed.replace(',', '.')))
    if (n < 0) n = 0
    if (n > 30) {
      return { value: 30, error: 'Bitte, nicht mehr als 30!' }
    }
    return { value: n, error: null }
  }

  const buildTable = (n: number) => {
    const rows: React.ReactNode[] = []
    for (let z = 0; z <= n; z++) {
      const cells: React.ReactNode[] = []
      for (let s = 0; s <= n; s++) {
        let cell: string | number = ''
        if (z === 0 && s === 0) cell = '*'
        else if (z === 0) cell = s
        else if (s === 0) cell = z
        else cell = s * z
        cells.push(
          <td
            key={`${z}-${s}`}
            className={`border theme-border p-2 text-center min-w-[2.5rem] ${
              z === 0 || s === 0 ? 'theme-bg-secondary font-medium' : ''
            }`}
          >
            {cell}
          </td>,
        )
      }
      rows.push(
        <tr key={z} className="hover:theme-bg-secondary">
          {cells}
        </tr>,
      )
    }
    return rows
  }

  return (
    <>
      <Back />
      <Card title="Multiplikationstabelle">
        {error && (
          <p className="text-sm bg-red-600/90 text-white rounded-lg px-4 py-3">{error}</p>
        )}
        <form
          className="space-y-3 max-w-sm"
          onSubmit={(e) => {
            e.preventDefault()
            const { value, error: err } = clampBis(bisInput)
            setBis(value)
            setBisInput(String(value))
            setError(err)
          }}
        >
          <label className="block text-sm theme-text-secondary">
            Bis (max. 30)
            <div className="mt-2 flex flex-col gap-2">
              <input
                id="range"
                type="range"
                min={1}
                max={30}
                value={Math.min(30, Math.max(1, Number(bisInput) || defaultBis))}
                onChange={(e) => setBisInput(e.target.value)}
                className="w-full"
              />
              <input
                id="show"
                name="bis"
                className="border theme-border rounded px-3 py-2 w-full bg-transparent theme-text"
                value={bisInput}
                onChange={(e) => setBisInput(e.target.value)}
              />
            </div>
          </label>
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded w-full">
            Lebe!
          </button>
        </form>
        <div className="overflow-auto">
          <table className="border-collapse text-sm">
            <tbody>{buildTable(bis)}</tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

/** @deprecated Use MultiplikationFunctionExercise or MultiplikationTableExercise */
export function MultiplikationExercise() {
  return <MultiplikationFunctionExercise />
}

export function AssoArrayExercise() {
  const demo = runAssoArrayDemo()
  const output = demo.sections.map((s) => `${s.dump}\n\n${s.highlight}`).join('\n\n')
  const highlights = demo.sections.map((s) => s.highlight)

  return (
    <>
      <Back />
      <Card title="Assoziatives Array">
        <ExercisePhpTsCompare
          phpSource={ASSO_ARRAY_PHP_SOURCE}
          tsSource={ASSO_ARRAY_TS_SOURCE}
          output={output}
          highlights={highlights}
          note="PHP-Assoziativarrays entsprechen in TypeScript typisierten Objekten (Record) — verschachtelte Keys wie p.wohnort.strasse."
        />
      </Card>
    </>
  )
}

export function ElementeanzahlExercise() {
  const demo = runElementeanzahlDemo()

  return (
    <>
      <Back />
      <Card title="Anzahl Elemente (FOR vs. FOREACH)">
        <p className="text-sm theme-text-secondary">
          Im Original: <code>$_SERVER</code> — hier im Browser:{' '}
          <strong>{demo.serverCount}</strong> Einträge (simuliert).
        </p>
        <ExercisePhpTsCompare
          phpSource={ELEMENTEANZAHL_PHP_SOURCE}
          tsSource={ELEMENTEANZAHL_TS_SOURCE}
          output={demo.output}
          note={`count($b) = ${demo.count} — in TS entspricht das gezählten definierten Elementen, nicht array.length (${demo.length}).`}
        />
      </Card>
    </>
  )
}

export function FarbcodeExercise({ step = 51, title }: { step?: number; title?: string }) {
  const tables = []
  for (let b = 0; b < 256; b += step) {
    const rows = []
    for (let g = 0; g < 256; g += step) {
      const cells = []
      for (let r = 0; r < 256; r += step) {
        cells.push(
          <td
            key={`${r}-${g}-${b}`}
            className="farbcode-cell"
            ref={(el) => {
              if (el) el.style.backgroundColor = `rgb(${r},${g},${b})`
            }}
          />
        )
      }
      rows.push(<tr key={g}>{cells}</tr>)
    }
    tables.push(
      <table key={b} className="mb-4 border-collapse">
        <caption className="text-left text-sm mb-1">Blauanteil: {b}</caption>
        <tbody>{rows}</tbody>
      </table>
    )
  }
  return (
    <>
      <Back />
      <Card title={title ?? exerciseTitle('farbcode', 'Farbtabelle RGB')}>
        <div className="overflow-auto">{tables}</div>
      </Card>
    </>
  )
}

type Book = {
  id: number
  titel: string
  isbn: string
  autor: string | null
  verlag: string | null
  ausgabejahr: number | null
  auflage: number | null
}

export function BooksTableExercise() {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/exercises/books')
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Fehler')
      return
    }
    setError('')
    setBooks(data.books ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <>
      <Back />
      <Card title="Bücheranzeige">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2 mb-4">
          <button type="button" onClick={() => void load()} className="border theme-border px-3 py-1 rounded text-sm">
            Aktualisieren
          </button>
          <Link href="/uebungen/buechererfassung" className="theme-primary text-sm">
            Neues Buch anlegen →
          </Link>
        </div>
        {books.length === 0 ? (
          <p className="text-sm theme-text-secondary">
            Noch keine Bücher. Zuerst{' '}
            <Link href="/uebungen/pdotest" className="theme-primary">
              PDO Test
            </Link>{' '}
            oder Büchererfassung nutzen.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-sm border theme-border w-full">
              <thead>
                <tr className="theme-bg-secondary">
                  {Object.keys(books[0]).map((k) => (
                    <th key={k} className="border theme-border p-2">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {books.map((row) => (
                  <tr key={row.id}>
                    {Object.values(row).map((v, i) => (
                      <td key={i} className="border theme-border p-2 text-center">
                        {v ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}

export function BooksFormExercise() {
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    titel: '',
    autor: '',
    isbn: '',
    verlag: '',
    ausgabejahr: '',
    auflage: '',
  })

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/exercises/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        ausgabejahr: form.ausgabejahr ? Number(form.ausgabejahr) : undefined,
        auflage: form.auflage ? Number(form.auflage) : undefined,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setMsg('Buch gespeichert.')
      setForm({ titel: '', autor: '', isbn: '', verlag: '', ausgabejahr: '', auflage: '' })
    } else setMsg(data.error ?? 'Fehler')
  }

  return (
    <>
      <Back />
      <Card title="Büchererfassung">
        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        <form onSubmit={(e) => void submit(e)} className="space-y-2 max-w-md">
          {(
            [
              ['titel', 'Buchtitel', true],
              ['autor', 'Buchautor', false],
              ['isbn', 'ISBN', true],
              ['verlag', 'Verlag', false],
              ['ausgabejahr', 'Ausgabejahr', false],
              ['auflage', 'Auflage', false],
            ] as const
          ).map(([name, label, req]) => (
            <p key={name} className="flex flex-row-reverse items-center gap-2 justify-end">
              <input
                id={`book-${name}`}
                name={name}
                required={req}
                className="border theme-border rounded px-3 py-2 flex-1 bg-transparent"
                value={form[name]}
                onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
              />
              <label htmlFor={`book-${name}`} className="text-sm theme-text-secondary w-28 text-right">
                {label}
                {req ? ' *' : ''}
              </label>
            </p>
          ))}
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Speichern
          </button>
        </form>
        <Link href="/uebungen/buecheranzeige" className="text-sm theme-primary mt-4 inline-block">
          Zur Bücherliste →
        </Link>
      </Card>
    </>
  )
}

export function PdotestExercise() {
  const [log, setLog] = useState<string[]>([])

  async function runSeed() {
    setLog(['Verbindung…'])
    const res = await fetch('/api/exercises/books/seed', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setLog([
        'Datenverbindung erfolgreich!',
        'CREATE TABLE buecher — via Prisma/SQLite',
        'SQL-Abarbeitung erfolgreich!',
        `INSERT: ${data.books?.length ?? 0} Bücher`,
      ])
    } else setLog([data.error ?? 'Fehler'])
  }

  return (
    <>
      <Back />
      <Card title="PDO Test">
        <button
          type="button"
          onClick={() => void runSeed()}
          className="theme-primary-bg text-white px-4 py-2 rounded mb-4"
        >
          Tabelle anlegen & Testdaten einfügen
        </button>
        <ul className="text-sm space-y-1 theme-text-secondary">
          {log.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <Link href="/uebungen/buecheranzeige" className="text-sm theme-primary mt-4 inline-block">
          Bücher anzeigen →
        </Link>
      </Card>
    </>
  )
}

export function FileUploadExercise() {
  const [name, setName] = useState('')
  const [preview, setPreview] = useState('')

  return (
    <>
      <Back />
      <Card title="Fileupload">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            setName(preview ? 'Datei empfangen (lokal, kein Server-Upload)' : '')
          }}
        >
          <label htmlFor="file-upload-demo" className="text-sm theme-text-secondary block">
            Datei wählen
          </label>
          <input
            id="file-upload-demo"
            type="file"
            className="text-sm"
            onChange={(e) => {
              const f = e.target.files?.[0]
              setPreview(f?.name ?? '')
            }}
          />
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Hochladen (Demo)
          </button>
        </form>
        {name && <p className="text-sm theme-text">{name}: {preview}</p>}
      </Card>
    </>
  )
}

export function GetPostExercise({ title }: { title?: string }) {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET')
  const [fields, setFields] = useState({ name: '', age: '' })
  const [result, setResult] = useState<Record<string, string> | null>(null)

  return (
    <>
      <Back />
      <Card title={title ?? exerciseTitle('getpostrequest', 'GET / POST Request')}>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            className={`px-3 py-1 rounded border ${method === 'GET' ? 'theme-primary-bg text-white' : 'theme-border'}`}
            onClick={() => setMethod('GET')}
          >
            GET
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded border ${method === 'POST' ? 'theme-primary-bg text-white' : 'theme-border'}`}
            onClick={() => setMethod('POST')}
          >
            POST
          </button>
        </div>
        <form
          className="space-y-2 max-w-sm"
          onSubmit={(e) => {
            e.preventDefault()
            setResult({ ...fields, _method: method })
          }}
        >
          <input
            placeholder="Name"
            className="border theme-border rounded px-3 py-2 w-full bg-transparent"
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            placeholder="Alter"
            className="border theme-border rounded px-3 py-2 w-full bg-transparent"
            value={fields.age}
            onChange={(e) => setFields((f) => ({ ...f, age: e.target.value }))}
          />
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Senden
          </button>
        </form>
        {result && (
          <pre className="mt-4 text-xs theme-bg-secondary p-3 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </Card>
    </>
  )
}

export function NutzerprofilExercise() {
  const [profile, setProfile] = useState({ name: '', email: '' })
  const [saved, setSaved] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('exercise-nutzerprofil')
      if (raw) setProfile(JSON.parse(raw) as typeof profile)
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <>
      <Back />
      <Card title="Nutzerprofil (localStorage)">
        <form
          className="space-y-2 max-w-sm"
          onSubmit={(e) => {
            e.preventDefault()
            localStorage.setItem('exercise-nutzerprofil', JSON.stringify(profile))
            setSaved('Profil in localStorage gespeichert (statt Textdatei).')
          }}
        >
          <input
            placeholder="Name"
            className="border theme-border rounded px-3 py-2 w-full bg-transparent"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            placeholder="E-Mail"
            className="border theme-border rounded px-3 py-2 w-full bg-transparent"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Speichern
          </button>
        </form>
        {saved && <p className="text-sm text-green-600">{saved}</p>}
      </Card>
    </>
  )
}

const GEMUESE = ['Tomaten', 'Gurken', 'Kopfsalat', 'Mohrrüben', 'Spargel', 'Paprika']
const OBST = ['Apfel', 'Birne', 'Pflaume', 'Erdbeeren', 'Himbeeren', 'Brombeeren']

export function ObstgemueseExercise({ abfr = false, title }: { abfr?: boolean; title?: string }) {
  const [selG, setSelG] = useState<string[]>(['Tomaten'])
  const [selO, setSelO] = useState<string[]>(['Apfel'])
  const [sent, setSent] = useState(false)
  const base = '/legacy-assets/own_website/exercise'

  function toggle(list: string[], set: (v: string[]) => void, item: string) {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item])
  }

  return (
    <>
      <Back />
      <Card
        title={
          title ??
          (abfr
            ? exerciseTitle('obstgemuese-abfr', 'Obst / Gemüse Abfrage')
            : exerciseTitle('obstgemuese', 'Obst / Gemüse'))
        }
      >
        {sent && (
          <div className="space-y-4 mb-4">
            {selG.length > 0 && (
              <div>
                <p className="font-medium">Gemüse:</p>
                <ul className="flex flex-wrap gap-2">
                  {selG.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            )}
            {selO.length > 0 && (
              <div>
                <p className="font-medium">Obst:</p>
                <ul className="flex flex-wrap gap-2">
                  {selO.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <h3 className="font-semibold mb-2">Gemüse</h3>
          {GEMUESE.map((g) => (
            <label key={g} className="flex items-center gap-2 mb-2 text-sm">
              <img
                src={`${base}/${encodeURIComponent(g)}.jpg`}
                alt={g}
                width={48}
                height={48}
                className="object-cover rounded"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = `${base}/nopic.jpg`
                }}
              />
              <input
                type="checkbox"
                checked={selG.includes(g)}
                onChange={() => toggle(selG, setSelG, g)}
              />
              {g}
            </label>
          ))}
          <h3 className="font-semibold mb-2 mt-4">Obst</h3>
          {OBST.map((o) => (
            <label key={o} className="flex items-center gap-2 mb-2 text-sm">
              <input
                type="checkbox"
                checked={selO.includes(o)}
                onChange={() => toggle(selO, setSelO, o)}
              />
              {o}
            </label>
          ))}
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded mt-4">
            Daten senden
          </button>
        </form>
      </Card>
    </>
  )
}

export function OopExercise() {
  const empty: OopFormData = {
    vorname: '',
    nachname: '',
    geburtsdatum: '',
    strasse: '',
    hausnr: '',
    plz: '',
    ort: '',
  }
  const [form, setForm] = useState<OopFormData>(empty)
  const [submitted, setSubmitted] = useState<OopFormData | null>(null)

  const output = submitted ? formatOopOutput(buildPersonFromForm(submitted)) : ''

  return (
    <>
      <Back />
      <Card title="OOP — Person / Wohnort">
        <form
          className="space-y-3 text-sm"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted({ ...form })
          }}
        >
          <h3 className="font-semibold theme-text">Personendaten</h3>
          {(
            [
              ['vorname', 'Vorname'],
              ['nachname', 'Nachname'],
              ['geburtsdatum', 'Geburtsdatum'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="sm:w-36 theme-text-secondary">{label}</span>
              <input
                type={key === 'geburtsdatum' ? 'date' : 'text'}
                className="border theme-border rounded px-3 py-2 flex-1 bg-transparent"
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              />
            </label>
          ))}

          <h3 className="font-semibold theme-text pt-2">Wohndaten</h3>
          {(
            [
              ['strasse', 'Strasse'],
              ['hausnr', 'Hausnr.'],
              ['plz', 'PLZ'],
              ['ort', 'Ort'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="sm:w-36 theme-text-secondary">{label}</span>
              <input
                className="border theme-border rounded px-3 py-2 flex-1 bg-transparent"
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              />
            </label>
          ))}

          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded text-sm">
            Daten senden
          </button>
        </form>

        {submitted && (
          <div className="border-t theme-border pt-4">
            <h3 className="font-semibold theme-text mb-3">
              Aus den Klassen (TypeScript, live):
            </h3>
            <ExercisePhpTsCompare
              phpSource={OOP_PHP_SOURCE}
              tsSource={OOP_TS_SOURCE}
              output={output}
              note="Formular wie im PHP-Original — Instanzen von Person und Wohnort statt assoziativer Arrays."
            />
          </div>
        )}
      </Card>
    </>
  )
}

export function EraseExercise() {
  const [items, setItems] = useState(['Apfel', 'Birne', 'Kirsche', 'Banane'])

  return (
    <>
      <Back />
      <Card title={exerciseTitle('erase', 'Array-Element entfernen')}>
        <ul className="text-sm space-y-1 mb-4">
          {items.map((item) => (
            <li key={item} className="flex justify-between items-center border theme-border rounded px-3 py-1">
              {item}
              <button
                type="button"
                className="text-red-500 text-xs"
                onClick={() => setItems((list) => list.filter((x) => x !== item))}
              >
                unset()
              </button>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p className="text-sm theme-text-secondary">Array leer.</p>}
        <button
          type="button"
          className="border theme-border px-3 py-1 rounded text-sm"
          onClick={() => setItems(['Apfel', 'Birne', 'Kirsche', 'Banane'])}
        >
          Reset
        </button>
      </Card>
    </>
  )
}

export function TestentityExercise() {
  const [entities, setEntities] = useState<{ id: number; name: string }[]>([])
  const [name, setName] = useState('')

  return (
    <>
      <Back />
      <Card title={exerciseTitle('testentity', 'Entity-Klasse')}>
        <form
          className="flex gap-2 mb-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!name.trim()) return
            setEntities((list) => [...list, { id: list.length + 1, name: name.trim() }])
            setName('')
          }}
        >
          <input
            className="border theme-border rounded px-3 py-2 flex-1 bg-transparent text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entity-Name"
          />
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded text-sm">
            Anlegen
          </button>
        </form>
        <table className="text-sm border theme-border w-full">
          <thead>
            <tr>
              <th className="border theme-border p-2">id</th>
              <th className="border theme-border p-2">name</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((e) => (
              <tr key={e.id}>
                <td className="border theme-border p-2 text-center">{e.id}</td>
                <td className="border theme-border p-2">{e.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}

export function MultiFileUploadExercise() {
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([])

  return (
    <>
      <Back />
      <Card title={exerciseTitle('exer-16', 'Mehrfach-Dateiupload')}>
        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {previews.map((p) => (
              <figure key={p.name}>
                <img src={p.url} alt={p.name} className="w-full h-24 object-cover rounded border theme-border" />
                <figcaption className="text-xs truncate">{p.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <p key={i} className="mb-2">
              <label htmlFor={`multi-file-${i}`} className="text-sm theme-text-secondary block mb-1">
                Datei {i + 1}
              </label>
              <input
                id={`multi-file-${i}`}
                type="file"
                className="text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => {
                    setPreviews((prev) => {
                      const next = [...prev]
                      next[i] = { name: file.name, url: String(reader.result) }
                      return next.filter(Boolean)
                    })
                  }
                  reader.readAsDataURL(file)
                }}
              />
            </p>
          ))}
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Hochladen
          </button>
        </form>
      </Card>
    </>
  )
}

export function Exer18ProfileExercise() {
  const [form, setForm] = useState({ vorname: '', nachname: '', email: '', gebtag: '' })
  const [dump, setDump] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('exercise-exer18')
      if (raw) {
        const parsed = JSON.parse(raw) as typeof form
        setForm(parsed)
        setDump(JSON.stringify(parsed, null, 2))
      }
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <>
      <Back />
      <Card title={exerciseTitle('exer-18', 'Profil serialisieren')}>
        {dump && (
          <pre className="text-xs theme-bg-secondary p-3 rounded mb-4 overflow-auto">{dump}</pre>
        )}
        <form
          className="space-y-2 max-w-md"
          onSubmit={(e) => {
            e.preventDefault()
            localStorage.setItem('exercise-exer18', JSON.stringify(form))
            setDump(JSON.stringify(form, null, 2))
          }}
        >
          {(['vorname', 'nachname', 'email', 'gebtag'] as const).map((name) => (
            <label key={name} className="block text-sm">
              {name}
              <input
                className="mt-1 w-full border theme-border rounded px-3 py-2 bg-transparent"
                value={form[name]}
                onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
              />
            </label>
          ))}
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Speichern
          </button>
        </form>
      </Card>
    </>
  )
}

function useBrowserServerVars() {
  const [vars, setVars] = useState({
    host: 'localhost',
    userAgent: 'Mozilla/5.0 …',
  })

  useEffect(() => {
    setVars({
      host: window.location.host,
      userAgent: `${navigator.userAgent.slice(0, 60)}…`,
    })
  }, [])

  return vars
}

export function ServerInfoExercise({
  variant,
  title,
}: {
  variant: 'phpinfo' | 'server' | 'exer-13'
  title?: string
}) {
  const [authed, setAuthed] = useState(variant !== 'exer-13')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const browser = useBrowserServerVars()

  if (variant === 'exer-13' && !authed) {
    return (
      <>
        <Back />
        <Card title={title ?? exerciseTitle('exer-13', 'Serverinfo (HTTP Basic Auth)')}>
          <p className="text-sm mb-3">Login: admin / admin</p>
          <form
            className="space-y-2 max-w-xs"
            onSubmit={(e) => {
              e.preventDefault()
              if (user === 'admin' && pass === 'admin') setAuthed(true)
              else alert('Kein Zugriff!')
            }}
          >
            <input
              placeholder="User"
              className="border theme-border rounded px-3 py-2 w-full bg-transparent"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Pass"
              className="border theme-border rounded px-3 py-2 w-full bg-transparent"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
              Anmelden
            </button>
          </form>
        </Card>
      </>
    )
  }

  const serverRows = [
    ['REMOTE_ADDR', '127.0.0.1'],
    ['REQUEST_METHOD', 'GET'],
    ['HTTP_HOST', browser.host],
    ['HTTP_USER_AGENT', browser.userAgent],
  ]

  return (
    <>
      <Back />
      <Card
        title={
          title ??
          (variant === 'exer-13'
            ? exerciseTitle('exer-13', 'Serverinfo (HTTP Basic Auth)')
            : variant === 'phpinfo'
              ? exerciseTitle('phpinfo', 'PHPInfo')
              : exerciseTitle('server', 'Server-Variablen'))
        }
      >
        {variant === 'exer-13' && (
          <h3 className="text-sm mb-3">Ihr PC hat die IP-Adresse: 127.0.0.1</h3>
        )}
        <table className="text-sm border theme-border w-full">
          <tbody>
            {(variant === 'exer-13' ? serverRows : variant === 'server'
              ? [
                  ['REQUEST_METHOD', 'GET'],
                  ['HTTP_HOST', browser.host],
                ]
              : [
                  ['PHP Version', '8.x (Next.js — kein PHP-Runtime)'],
                  ['Server API', 'Node.js'],
                ]
            ).map(([k, v]) => (
              <tr key={k}>
                <td className="border theme-border p-2 font-mono">{k}</td>
                <td className="border theme-border p-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}

export function RegistrationFormExercise() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [ok, setOk] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    const first = String(fd.get('firstname') ?? '').trim()
    const last = String(fd.get('lastname') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    if (!first) next.firstname = 'is required'
    else if (!/^[a-zA-Z ]*$/.test(first)) next.firstname = 'Only letters and white space allowed'
    if (!last) next.lastname = 'is required'
    if (!email) next.email = 'is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Invalid email'
    setErrors(next)
    setOk(Object.keys(next).length === 0)
  }

  return (
    <>
      <Back />
      <Card title={exerciseTitle('exer-11', 'Registrierungsformular mit Validierung')}>
        {ok && <p className="text-green-600 mb-4">Formular gültig — würde in DB gespeichert (Demo).</p>}
        <form onSubmit={submit} className="space-y-3 max-w-md">
          {(['firstname', 'lastname', 'email'] as const).map((name) => (
            <label key={name} className="block text-sm">
              {name}
              <input
                name={name}
                className="mt-1 w-full border theme-border rounded px-3 py-2 bg-transparent"
              />
              {errors[name] && <span className="text-red-500 text-xs"> {errors[name]}</span>}
            </label>
          ))}
          <button type="submit" className="theme-primary-bg text-white px-4 py-2 rounded">
            Absenden
          </button>
        </form>
      </Card>
    </>
  )
}

export function GalleryExercise({ mode }: { mode: 'view' | 'upload' | 'setup' | 'reset' }) {
  const [items, setItems] = useState<{ name: string; url: string }[]>([])

  useEffect(() => {
    if (mode === 'reset') {
      localStorage.removeItem('exercise-galerie')
      setItems([])
      return
    }
    try {
      const raw = localStorage.getItem('exercise-galerie')
      if (raw) setItems(JSON.parse(raw) as typeof items)
    } catch {
      /* ignore */
    }
  }, [mode])

  if (mode === 'setup') {
    return (
      <>
        <Back />
        <Card title="Galerie — DB Setup">
          <p className="text-sm theme-text-secondary">
            Tabellen Besucher, Bilder, Bewertungen — in der Next-Version als localStorage-Galerie.
          </p>
          <button
            type="button"
            className="theme-primary-bg text-white px-4 py-2 rounded"
            onClick={() => {
              localStorage.setItem('exercise-galerie', JSON.stringify([]))
              alert('Galerie initialisiert.')
            }}
          >
            Tabellen anlegen (Demo)
          </button>
        </Card>
      </>
    )
  }

  if (mode === 'reset') {
    return (
      <>
        <Back />
        <Card title="Galerie Reset">
          <p className="text-sm">Galerie wurde geleert.</p>
          <Link href="/uebungen/galerie" className="theme-primary text-sm">
            Zur Galerie →
          </Link>
        </Card>
      </>
    )
  }

  if (mode === 'upload') {
    return (
      <>
        <Back />
        <Card title="Galerie Upload">
          <label htmlFor="galerie-upload" className="text-sm theme-text-secondary block mb-1">
            Bild hochladen
          </label>
          <input
            id="galerie-upload"
            type="file"
            accept="image/*"
            className="text-sm mb-3"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const reader = new FileReader()
              reader.onload = () => {
                const next = [...items, { name: file.name, url: String(reader.result) }]
                setItems(next)
                localStorage.setItem('exercise-galerie', JSON.stringify(next))
              }
              reader.readAsDataURL(file)
            }}
          />
          <Link href="/uebungen/galerie" className="theme-primary text-sm">
            Zur Galerie →
          </Link>
        </Card>
      </>
    )
  }

  return (
    <>
      <Back />
      <Card title="Bildergalerie">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item) => (
            <figure key={item.name} className="border theme-border rounded overflow-hidden">
              <img src={item.url} alt={item.name} className="w-full h-32 object-cover" />
              <figcaption className="text-xs p-1 truncate">{item.name}</figcaption>
            </figure>
          ))}
        </div>
        {items.length === 0 && (
          <p className="text-sm theme-text-secondary">
            Leer —{' '}
            <Link href="/uebungen/galerie-upload" className="theme-primary">
              Bild hochladen
            </Link>
          </p>
        )}
      </Card>
    </>
  )
}

export function NewsAdminExercise({
  page,
}: {
  page: 'test' | 'newdb' | 'sql' | 'kategorien' | 'ereignisse' | 'bilder'
}) {
  const titles: Record<string, string> = {
    test: 'News Test',
    newdb: 'News DB anlegen',
    sql: 'News SQL Reset',
    kategorien: 'Kategorien',
    ereignisse: 'Ereignisse',
    bilder: 'Bilder',
  }
  return (
    <>
      <Back />
      <Card title={titles[page]}>
        <p className="text-sm theme-text-secondary mb-4">
          News-CRUD aus dem PHP-Projekt — hier als funktionsfähige Demo (In-Memory).
        </p>
        <NewsDemoPanel page={page} />
        <nav className="flex flex-wrap gap-2 mt-4 text-sm">
          {(
            [
              ['test', 'news-test'],
              ['newdb', 'news-newdb'],
              ['sql', 'news-sql'],
              ['kategorien', 'news-kategorien'],
              ['ereignisse', 'news-ereignisse'],
              ['bilder', 'news-bilder'],
            ] as const
          ).map(([p, href]) => (
            <Link key={p} href={`/uebungen/${href}`} className="theme-primary">
              {titles[p]}
            </Link>
          ))}
        </nav>
      </Card>
    </>
  )
}

function NewsDemoPanel({ page }: { page: string }) {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')
  const key = `exercise-news-${page}`

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) setItems(JSON.parse(raw) as string[])
    } catch {
      /* ignore */
    }
  }, [key])

  function add() {
    if (!input.trim()) return
    const next = [...items, input.trim()]
    setItems(next)
    localStorage.setItem(key, JSON.stringify(next))
    setInput('')
  }

  if (page === 'sql') {
    return (
      <button
        type="button"
        className="border border-red-500 text-red-500 px-4 py-2 rounded text-sm"
        onClick={() => {
          localStorage.removeItem(key)
          setItems([])
          alert('News-Tabellen zurückgesetzt (localStorage).')
        }}
      >
        SQL Reset (Demo)
      </button>
    )
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          className="border theme-border rounded px-3 py-2 flex-1 bg-transparent text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Eintrag…"
        />
        <button type="button" onClick={add} className="theme-primary-bg text-white px-3 py-2 rounded text-sm">
          Hinzufügen
        </button>
      </div>
      <ul className="text-sm space-y-1">
        {items.map((item) => (
          <li key={item} className="theme-text-secondary">
            — {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function JsonUebungenExercise() {
  return (
    <>
      <Back />
      <Card title="JSON, SOAP, XML und CSV">
        <p className="text-sm theme-text-secondary">
          Diese Übung verweist im Original auf <code>uebung/index.php</code> — Inhalt wird separat
          nachgeliefert. Hier Platzhalter mit Lernzielen:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 theme-text-secondary">
          <li>JSON: Datenstrukturen serialisieren</li>
          <li>XML/SOAP: Webservice-Grundlagen</li>
          <li>CSV: Import/Export von Tabellendaten</li>
        </ul>
      </Card>
    </>
  )
}

export function PlaceholderExercise({ title, body }: { title: string; body: string }) {
  return (
    <>
      <Back />
      <Card title={title}>
        <p className="text-sm theme-text-secondary">{body}</p>
      </Card>
    </>
  )
}
