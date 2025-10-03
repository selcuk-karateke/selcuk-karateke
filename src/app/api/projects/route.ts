// API Controllers
import { NextRequest, NextResponse } from 'next/server'
import { ProjectService, SkillService, ExperienceService, BlogService, ContactService } from '@/services'

// Projects API
export async function GET() {
    try {
        const projects = await ProjectService.getAllProjects()
        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const project = await ProjectService.createProject(data)
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}
