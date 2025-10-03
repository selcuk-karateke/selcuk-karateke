import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const project = await ProjectService.getProjectById(params.id)
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
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json()
        const project = await ProjectService.updateProject(params.id, data)
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await ProjectService.deleteProject(params.id)
        return NextResponse.json({ message: 'Project deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
