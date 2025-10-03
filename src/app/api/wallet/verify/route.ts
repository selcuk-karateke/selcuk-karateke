import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const { address } = await request.json()

        if (!address) {
            return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
        }

        // Check if wallet already exists
        const existingWallet = await prisma.wallet.findUnique({
            where: { address }
        })

        if (existingWallet) {
            return NextResponse.json({ error: 'Wallet already verified' }, { status: 400 })
        }

        // Create new wallet verification
        const wallet = await prisma.wallet.create({
            data: {
                address,
                network: 'ethereum', // Default network
                verified: true
            }
        })

        return NextResponse.json({ message: 'Wallet verified successfully', wallet })
    } catch (error) {
        console.error('Error verifying wallet:', error)
        return NextResponse.json({ error: 'Failed to verify wallet' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const wallets = await prisma.wallet.findMany({
            where: { verified: true },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(wallets)
    } catch (error) {
        console.error('Error fetching wallets:', error)
        return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 })
    }
}
