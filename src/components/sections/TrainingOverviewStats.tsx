'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function formatDe(value: number) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(value)
}

function useCountUp(target: number, active: boolean, durationMs = 1600, delayMs = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    let frame = 0
    let startTime: number | null = null
    const timeout = window.setTimeout(() => {
      const step = (now: number) => {
        if (startTime == null) startTime = now
        const progress = Math.min((now - startTime) / durationMs, 1)
        const eased = 1 - (1 - progress) ** 3
        setValue(Math.round(target * eased))
        if (progress < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }, delayMs)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [active, delayMs, durationMs, target])

  return value
}

function StatBox({
  label,
  children,
  visible,
  className = '',
}: {
  label: string
  children: React.ReactNode
  visible: boolean
  className?: string
}) {
  return (
    <div
      className={`bg-warm-dark-gray/20 rounded-lg p-4 border border-warm-dark-gray/30 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      <div className="text-2xl font-bold theme-text tabular-nums">{children}</div>
      <div className="text-sm theme-text-secondary">{label}</div>
    </div>
  )
}

export default function TrainingOverviewStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })

  const hours = useCountUp(2640, inView, 1800, 0)
  const modules = useCountUp(9, inView, 1200, 120)
  const years = useCountUp(3, inView, 900, 360)

  return (
    <div
      ref={ref}
      className="mt-8 bg-warm-dark-gray/10 rounded-lg p-6 border border-warm-dark-gray/20 scroll-mt-24"
    >
      <h4 className="text-xl font-bold theme-text mb-4">Overview</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <StatBox label="Total Hours" visible={inView}>
          {formatDe(hours)}
        </StatBox>
        <StatBox label="Modules" visible={inView} className="delay-75">
          {modules}
        </StatBox>
        <StatBox label="Certification" visible={inView} className="delay-150">
          IHK
        </StatBox>
        <StatBox label="Years" visible={inView} className="delay-200">
          {years}
        </StatBox>
      </div>
    </div>
  )
}
