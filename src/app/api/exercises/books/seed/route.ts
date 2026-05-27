import { NextResponse } from 'next/server'
import { seedBooks } from '@/lib/exerciseBooks'

export async function POST() {
  try {
    const books = await seedBooks()
    return NextResponse.json({ ok: true, books, message: 'Tabelle befüllt (PDO-Testdaten).' })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Seed fehlgeschlagen. Bitte npm run db:push ausführen.' },
      { status: 503 }
    )
  }
}
