'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowUpIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import { usePomodoro } from '@/components/pomodoro/PomodoroProvider'

const TYPEDEAD_URL = 'https://www.typedead.com/'

function ControlButton({
  label,
  onClick,
  children,
  variant = 'default',
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'danger'
}) {
  const classes =
    variant === 'primary'
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
      : variant === 'danger'
        ? 'bg-red-600 hover:bg-red-500 text-white'
        : 'theme-bg-card border theme-border theme-text hover:theme-bg-secondary'

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`h-11 w-11 rounded-full shadow-lg flex items-center justify-center transition-colors ${classes}`}
    >
      {children}
    </button>
  )
}

export default function PageFloatingControls() {
  const { status, displayTime, mode, start, togglePause, stop } = usePomodoro()
  const t = useTranslations('pomodoro')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const active = status !== 'idle'
  const paused = status === 'paused'
  const running = status === 'running'

  return (
    <>
      <a
        href={TYPEDEAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        title={t('typedeadLink')}
        aria-label={t('typedeadLink')}
        className="fixed bottom-5 left-5 z-[60] block rounded-md shadow-lg ring-1 ring-black/10 dark:ring-white/10 hover:ring-brand-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-shadow"
      >
        <Image
          src="/typedead-favicon-32x32.png"
          alt=""
          width={32}
          height={32}
          className="rounded-md"
          unoptimized
        />
      </a>

      <div
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2"
        aria-live="polite"
      >
      {active && (
        <div className="theme-bg-card border theme-border rounded-full px-3 h-11 flex items-center gap-2 shadow-lg text-sm font-mono theme-text">
          <span
            className={
              status === 'expired'
                ? 'text-red-500 font-semibold'
                : mode === 'interrupt'
                  ? 'text-sky-600'
                  : 'text-emerald-600'
            }
          >
            {displayTime}
          </span>
          {paused && <span className="text-xs theme-text-secondary">{t('paused')}</span>}
        </div>
      )}

      {!active && (
        <>
          <ControlButton label={t('interrupt15')} onClick={() => start('interrupt')} variant="primary">
            <span className="text-xs font-semibold">15</span>
          </ControlButton>
          <ControlButton label={t('work28')} onClick={() => start('work')}>
            <span className="text-xs font-semibold">28</span>
          </ControlButton>
        </>
      )}

      {(running || paused) && (
        <ControlButton
          label={paused ? t('resume') : t('pause')}
          onClick={togglePause}
          variant="primary"
        >
          {paused ? <PlayIcon className="h-5 w-5" /> : <PauseIcon className="h-5 w-5" />}
        </ControlButton>
      )}

      {active && (
        <ControlButton label={t('stop')} onClick={stop} variant="danger">
          <StopIcon className="h-5 w-5" />
        </ControlButton>
      )}

      {showScrollTop && (
        <ControlButton label={t('scrollTop')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUpIcon className="h-5 w-5" />
        </ControlButton>
      )}
      </div>
    </>
  )
}
