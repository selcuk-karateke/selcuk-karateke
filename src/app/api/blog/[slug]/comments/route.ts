import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { author, email, content } = await request.json()

        if (!author || !email || !content) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
        }

        // Find the post by slug
        const post = await prisma.post.findUnique({
            where: { slug: params.slug }
        })

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        // Create comment
        const comment = await prisma.comment.create({
            data: {
                author,
                email,
                content,
                postId: post.id,
                approved: false // Comments need approval
            }
        })

        return NextResponse.json({ message: 'Comment submitted successfully', comment })
    } catch (error) {
        console.error('Error creating comment:', error)
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
    }
}
