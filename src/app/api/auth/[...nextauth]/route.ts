import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { buildAuthOptions, isAuthConfigured } from '@/lib/auth'

const handler = isAuthConfigured()
  ? NextAuth(buildAuthOptions())
  : async () => NextResponse.json(null, { status: 200 })

export { handler as GET, handler as POST }
