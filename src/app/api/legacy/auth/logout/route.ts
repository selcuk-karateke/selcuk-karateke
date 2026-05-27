import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true, message: 'Logged out' })
  res.cookies.set('legacy_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
