import { execSync } from 'child_process'

const port = process.argv[2] ?? '3000'

if (process.platform !== 'win32') {
  console.log(`kill-port: skipped (not Windows), port ${port}`)
  process.exit(0)
}

try {
  const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' })
  const pids = new Set(
    out
      .split(/\r?\n/)
      .map((line) => line.trim().split(/\s+/).pop())
      .filter((pid) => pid && /^\d+$/.test(pid) && pid !== '0'),
  )

  if (pids.size === 0) {
    console.log(`No process found on port ${port}`)
    process.exit(0)
  }

  for (const pid of pids) {
    execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
    console.log(`Stopped PID ${pid} (port ${port})`)
  }
} catch {
  console.log(`No process found on port ${port}`)
}
