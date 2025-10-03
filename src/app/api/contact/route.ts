import { NextRequest, NextResponse } from 'next/server'
import { ContactService } from '@/services'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const message = await ContactService.createMessage(data)
        return NextResponse.json(message, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const messages = await ContactService.getAllMessages()
        return NextResponse.json(messages)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
}
