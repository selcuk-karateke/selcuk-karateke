import { NextResponse } from 'next/server'

const LEGACY_INDEX = [
  'project_37_livesearch',
  'project_3_livesearch',
  'mindset_info',
  'gallery_upload',
  'book_registration',
  'portfolio_login',
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') ?? '').toLowerCase()
  const results = !q
    ? LEGACY_INDEX
    : LEGACY_INDEX.filter((item) => item.toLowerCase().includes(q))
  return NextResponse.json({ results })
}
