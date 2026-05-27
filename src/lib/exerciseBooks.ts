import { prisma } from '@/lib/prisma'

export type BookInput = {
  titel: string
  isbn: string
  autor?: string
  verlag?: string
  ausgabejahr?: number
  auflage?: number
}

const SEED_BOOKS: BookInput[] = [
  {
    titel: 'Der Datenbank-Experte',
    isbn: '9783935042156',
    autor: 'M. Mustermann',
    verlag: 'IT-Verlag',
    ausgabejahr: 2018,
    auflage: 2,
  },
  {
    titel: 'PHP für Einsteiger',
    isbn: '9783446438768',
    autor: 'S. Schmidt',
    verlag: 'Rheinwerk',
    ausgabejahr: 2019,
    auflage: 1,
  },
]

export async function listBooks() {
  return prisma.exerciseBook.findMany({ orderBy: { id: 'asc' } })
}

export async function createBook(data: BookInput) {
  return prisma.exerciseBook.create({ data })
}

export async function seedBooks() {
  for (const book of SEED_BOOKS) {
    await prisma.exerciseBook.upsert({
      where: { isbn: book.isbn },
      create: book,
      update: book,
    })
  }
  return listBooks()
}
