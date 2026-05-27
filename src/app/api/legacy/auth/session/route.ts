import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const user = cookieStore.get('legacy_session')?.value
  return NextResponse.json({
    authenticated: Boolean(user),
    user: user ?? null,
  })
}
