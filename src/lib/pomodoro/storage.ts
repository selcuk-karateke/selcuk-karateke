import {
  POMODORO_STORAGE_KEY,
  type PomodoroPersistedState,
} from '@/lib/pomodoro/types'

export const defaultPomodoroState = (): PomodoroPersistedState => ({
  mode: null,
  status: 'idle',
  endAt: null,
  remainingSeconds: null,
})

export function readPomodoroState(): PomodoroPersistedState {
  if (typeof window === 'undefined') return defaultPomodoroState()
  try {
    const raw = sessionStorage.getItem(POMODORO_STORAGE_KEY)
    if (!raw) return defaultPomodoroState()
    const parsed = JSON.parse(raw) as PomodoroPersistedState
    if (!parsed || typeof parsed !== 'object') return defaultPomodoroState()
    return { ...defaultPomodoroState(), ...parsed }
  } catch {
    return defaultPomodoroState()
  }
}

export function writePomodoroState(state: PomodoroPersistedState) {
  if (typeof window === 'undefined') return
  if (state.status === 'idle') {
    sessionStorage.removeItem(POMODORO_STORAGE_KEY)
    return
  }
  sessionStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(state))
}

export function formatPomodoroTime(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds)
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function remainingSecondsFromState(state: PomodoroPersistedState, now = Date.now()): number {
  if (state.status === 'paused' && state.remainingSeconds != null) {
    return state.remainingSeconds
  }
  if (state.status === 'running' && state.endAt != null) {
    return Math.max(0, Math.ceil((state.endAt - now) / 1000))
  }
  return 0
}
