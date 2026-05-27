import { NextResponse } from 'next/server'
import { createBook, listBooks } from '@/lib/exerciseBooks'

export async function GET() {
  try {
    const books = await listBooks()
    return NextResponse.json({ books })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Datenbank nicht bereit. Bitte npm run db:push ausführen.' },
      { status: 503 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const book = await createBook({
      titel: String(body.titel ?? ''),
      isbn: String(body.isbn ?? ''),
      autor: body.autor ? String(body.autor) : undefined,
      verlag: body.verlag ? String(body.verlag) : undefined,
      ausgabejahr: body.ausgabejahr ? Number(body.ausgabejahr) : undefined,
      auflage: body.auflage ? Number(body.auflage) : undefined,
    })
    return NextResponse.json({ book })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 400 })
  }
}
