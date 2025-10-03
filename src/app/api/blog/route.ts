import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/services'

export async function GET() {
    try {
        const posts = await BlogService.getAllPosts()
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const post = await BlogService.createPost(data)
        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
}
