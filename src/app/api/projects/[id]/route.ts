import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const project = await ProjectService.getProjectById(id)
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const data = await request.json()
        const project = await ProjectService.updateProject(id, data)
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await ProjectService.deleteProject(id)
        return NextResponse.json({ message: 'Project deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
