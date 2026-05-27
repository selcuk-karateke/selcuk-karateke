export type PomodoroMode = 'interrupt' | 'work'

export type PomodoroStatus = 'idle' | 'running' | 'paused' | 'expired'

export interface PomodoroPersistedState {
  mode: PomodoroMode | null
  status: PomodoroStatus
  /** Unix ms when the timer should finish (running). */
  endAt: number | null
  /** Seconds left when paused. */
  remainingSeconds: number | null
}

export const POMODORO_DURATIONS: Record<PomodoroMode, number> = {
  interrupt: 15 * 60,
  work: 28 * 60,
}

export const POMODORO_STORAGE_KEY = 'pomodoro-state'
