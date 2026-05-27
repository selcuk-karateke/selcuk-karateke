'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultPomodoroState,
  formatPomodoroTime,
  readPomodoroState,
  remainingSecondsFromState,
  writePomodoroState,
} from '@/lib/pomodoro/storage'
import {
  POMODORO_DURATIONS,
  type PomodoroMode,
  type PomodoroPersistedState,
  type PomodoroStatus,
} from '@/lib/pomodoro/types'

interface PomodoroContextValue {
  mode: PomodoroMode | null
  status: PomodoroStatus
  displayTime: string
  remainingSeconds: number
  isWorkHours: boolean
  start: (mode: PomodoroMode) => void
  pause: () => void
  resume: () => void
  stop: () => void
  togglePause: () => void
}

const PomodoroContext = createContext<PomodoroContextValue | null>(null)

const AUDIO_SRC = '/legacy-assets/portfolio/audio/piep.mp3'

function isWorkHours(now = new Date()) {
  const hour = now.getHours()
  return hour >= 8 && hour <= 16
}

function hydrateRunningState(state: PomodoroPersistedState): PomodoroPersistedState {
  if (state.status !== 'running' || state.endAt == null) return state
  const left = remainingSecondsFromState(state)
  if (left > 0) return state
  return { ...state, status: 'expired', endAt: null, remainingSeconds: 0 }
}

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PomodoroPersistedState>(defaultPomodoroState)
  const [hydrated, setHydrated] = useState(false)
  const [tick, setTick] = useState(0)
  const baseTitleRef = useRef<string>('')
  const prevStatusRef = useRef<PomodoroStatus>('idle')

  const persist = useCallback((next: PomodoroPersistedState) => {
    setState(next)
    writePomodoroState(next)
  }, [])

  useEffect(() => {
    baseTitleRef.current = document.title
    const stored = hydrateRunningState(readPomodoroState())
    prevStatusRef.current = stored.status
    setState(stored)
    writePomodoroState(stored)
    setHydrated(true)
  }, [])

  const remainingSeconds = useMemo(() => {
    void tick
    if (!hydrated) return 0
    return remainingSecondsFromState(state)
  }, [hydrated, state, tick])

  useEffect(() => {
    if (!hydrated || state.status !== 'running') return
    const id = window.setInterval(() => setTick((n) => n + 1), 1000)
    return () => window.clearInterval(id)
  }, [hydrated, state.status])

  useEffect(() => {
    if (!hydrated) return

    if (state.status === 'running' && remainingSeconds <= 0) {
      persist({ ...state, status: 'expired', endAt: null, remainingSeconds: 0 })
      return
    }

    if (state.status === 'running' || state.status === 'paused') {
      document.title = `(${formatPomodoroTime(remainingSeconds)}) ${baseTitleRef.current}`
    } else if (state.status === 'idle' || state.status === 'expired') {
      document.title = baseTitleRef.current
    }
  }, [hydrated, persist, remainingSeconds, state])

  useEffect(() => {
    if (!hydrated) return
    const prev = prevStatusRef.current
    prevStatusRef.current = state.status

    if (prev === 'running' && state.status === 'expired') {
      const audio = new Audio(AUDIO_SRC)
      void audio.play().catch(() => {})
      window.setTimeout(() => {
        if (window.confirm('Pomodoro abgelaufen (EXPIRED). Timer zurücksetzen?')) {
          persist(defaultPomodoroState())
        }
      }, 500)
    }
  }, [hydrated, persist, state.status])

  const start = useCallback(
    (mode: PomodoroMode) => {
      const seconds = POMODORO_DURATIONS[mode]
      persist({
        mode,
        status: 'running',
        endAt: Date.now() + seconds * 1000,
        remainingSeconds: null,
      })
    },
    [persist],
  )

  const pause = useCallback(() => {
    if (state.status !== 'running' || state.mode == null) return
    persist({
      ...state,
      status: 'paused',
      endAt: null,
      remainingSeconds: remainingSecondsFromState(state),
    })
  }, [persist, state])

  const resume = useCallback(() => {
    if (state.status !== 'paused' || state.mode == null || state.remainingSeconds == null) return
    persist({
      ...state,
      status: 'running',
      endAt: Date.now() + state.remainingSeconds * 1000,
      remainingSeconds: null,
    })
  }, [persist, state])

  const stop = useCallback(() => {
    persist(defaultPomodoroState())
    document.title = baseTitleRef.current
  }, [persist])

  const togglePause = useCallback(() => {
    if (state.status === 'running') pause()
    else if (state.status === 'paused') resume()
  }, [pause, resume, state.status])

  const displayTime =
    state.status === 'expired'
      ? 'EXPIRED'
      : state.status === 'idle'
        ? '00:00'
        : formatPomodoroTime(remainingSeconds)

  const value = useMemo(
    () => ({
      mode: state.mode,
      status: state.status,
      displayTime,
      remainingSeconds,
      isWorkHours: isWorkHours(),
      start,
      pause,
      resume,
      stop,
      togglePause,
    }),
    [displayTime, remainingSeconds, start, pause, resume, stop, state.mode, state.status, togglePause],
  )

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  )
}

export function usePomodoro() {
  const ctx = useContext(PomodoroContext)
  if (!ctx) throw new Error('usePomodoro must be used within PomodoroProvider')
  return ctx
}
