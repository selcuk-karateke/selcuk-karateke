import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    message: 'Legacy contact mock accepted.',
  })
}
