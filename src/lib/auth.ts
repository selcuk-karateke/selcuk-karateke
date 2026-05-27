import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.NEXTAUTH_SECRET?.trim())
}

function buildProviders(): NextAuthOptions['providers'] {
  const providers: NextAuthOptions['providers'] = []

  const googleId = process.env.GOOGLE_CLIENT_ID?.trim()
  const googleSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()
  if (googleId && googleSecret) {
    providers.push(
      GoogleProvider({
        clientId: googleId,
        clientSecret: googleSecret,
      })
    )
  }

  const githubId = process.env.GITHUB_CLIENT_ID?.trim()
  const githubSecret = process.env.GITHUB_CLIENT_SECRET?.trim()
  if (githubId && githubSecret) {
    providers.push(
      GitHubProvider({
        clientId: githubId,
        clientSecret: githubSecret,
      })
    )
  }

  providers.push(
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const adminEmail = process.env.ADMIN_EMAIL?.trim()
        const adminPassword = process.env.ADMIN_PASSWORD?.trim()
        if (adminEmail && adminPassword) {
          if (
            credentials.email === adminEmail &&
            credentials.password === adminPassword
          ) {
            return {
              id: 'admin',
              email: adminEmail,
              name: 'Admin',
            }
          }
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user?.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error('[auth] Database login failed:', error)
          return null
        }
      },
    })
  )

  return providers
}

export function buildAuthOptions(): NextAuthOptions {
  if (!isAuthConfigured()) {
    throw new Error('NEXTAUTH_SECRET is required to build auth options')
  }

  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: buildProviders(),
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
        }
        return token
      },
      async session({ session, token }) {
        if (token && session.user) {
          session.user.id = token.id as string
        }
        return session
      },
    },
  }
}

