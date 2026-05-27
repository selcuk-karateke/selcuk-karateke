import type { NextConfig } from 'next'

/** Dev und Build getrennt — verhindert Windows-Dateisperren auf `.next/trace`. */
function isNextDevCommand() {
  const lifecycle = process.env.npm_lifecycle_event
  if (lifecycle === 'dev' || lifecycle === 'dev:turbo' || lifecycle === 'dev:clean' || lifecycle === 'dev:fresh') {
    return true
  }
  const devIndex = process.argv.indexOf('dev')
  return devIndex > 0 && String(process.argv[devIndex - 1]).includes('next')
}

const nextConfig: NextConfig = {
  /** Muss relativ zum Projektroot sein — Next.js unterstützt kein absolutes distDir. */
  distDir: isNextDevCommand() ? '.next-dev' : '.next',
  output: 'standalone',
}

export default nextConfig
