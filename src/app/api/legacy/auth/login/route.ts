import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body?.username || !body?.password) {
    return NextResponse.json({ message: 'Username/password required' }, { status: 400 })
  }

  const res = NextResponse.json({ ok: true, message: `Logged in as ${body.username}` })
  res.cookies.set('legacy_session', body.username, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return res
}
