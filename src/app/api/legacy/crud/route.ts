import { NextResponse } from 'next/server'

const globalForCrud = globalThis as unknown as { legacyCrudStore?: string[] }
if (!globalForCrud.legacyCrudStore) {
  globalForCrud.legacyCrudStore = ['Initial legacy record', 'Seeded migrated entry']
}
const getStore = () => {
  if (!globalForCrud.legacyCrudStore) {
    globalForCrud.legacyCrudStore = ['Initial legacy record', 'Seeded migrated entry']
  }
  return globalForCrud.legacyCrudStore
}

export async function GET() {
  return NextResponse.json({ items: getStore() })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const value = String(body?.value ?? '').trim()
  if (!value) {
    return NextResponse.json({ error: 'Value required' }, { status: 400 })
  }
  const store = getStore()
  store.push(value)
  return NextResponse.json({ items: store })
}
