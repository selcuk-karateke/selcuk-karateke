import type { NextConfig } from 'next'

/** Dev und Build getrennt — verhindert Windows-Dateisperren auf `.next/trace`. */
const isDevServer = process.argv.includes('dev')

const nextConfig: NextConfig = {
  distDir: isDevServer ? '.next-dev' : '.next',
  output: 'standalone',
}

export default nextConfig
