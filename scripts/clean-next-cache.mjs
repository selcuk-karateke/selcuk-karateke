import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const dirs = [path.join(root, '.next'), path.join(root, '.next-dev')]

for (const dir of dirs) {
  try {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 })
    console.log(`Removed ${dir}`)
  } catch (err) {
    console.warn(`Could not remove ${dir}: ${err instanceof Error ? err.message : err}`)
    console.warn('Stop other "next dev" / "next build" processes, then retry.')
  }
}
