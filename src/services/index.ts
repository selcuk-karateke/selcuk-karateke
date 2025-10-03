// Services Layer - Business Logic

interface ProjectInput {
    title: string
    description: string
    image?: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
    featured?: boolean
}

export class ProjectService {
    static async getAllProjects() {
        const { prisma } = await import('@/lib/prisma')
        return prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }

    static async getFeaturedProjects() {
        const { prisma } = await import('@/lib/prisma')
        return prisma.project.findMany({
            where: { featured: true },
            orderBy: { createdAt: 'desc' }
        })
    }

    static async getProjectById(id: string) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.project.findUnique({
            where: { id }
        })
    }

    static async createProject(data: ProjectInput) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.project.create({
            data: {
                ...data,
                technologies: data.technologies.join(', ')
            }
        })
    }

    static async updateProject(id: string, data: Partial<ProjectInput>) {
        const { prisma } = await import('@/lib/prisma')
        const updateData: Record<string, unknown> = { ...data }
        if (data.technologies) {
            updateData.technologies = data.technologies.join(', ')
        }
        return prisma.project.update({
            where: { id },
            data: updateData
        })
    }

    static async deleteProject(id: string) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.project.delete({
            where: { id }
        })
    }
}

export class SkillService {
    static async getAllSkills() {
        const { prisma } = await import('@/lib/prisma')
        return prisma.skill.findMany({
            orderBy: { name: 'asc' }
        })
    }

    static async getSkillsByCategory(category: string) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.skill.findMany({
            where: { category },
            orderBy: { level: 'desc' }
        })
    }

    static async createSkill(data: {
        name: string
        category: string
        level: number
        icon?: string
    }) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.skill.create({
            data
        })
    }
}

export class ExperienceService {
    static async getAllExperiences() {
        const { prisma } = await import('@/lib/prisma')
        return prisma.experience.findMany({
            orderBy: { startDate: 'desc' }
        })
    }

    static async createExperience(data: {
        company: string
        position: string
        description: string
        startDate: Date
        endDate?: Date
        current?: boolean
        location?: string
    }) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.experience.create({
            data
        })
    }
}

export class BlogService {
    static async getAllPosts() {
        const { prisma } = await import('@/lib/prisma')
        return prisma.post.findMany({
            where: { published: true },
            include: { author: true },
            orderBy: { createdAt: 'desc' }
        })
    }

    static async getPostBySlug(slug: string) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.post.findUnique({
            where: { slug },
            include: {
                author: true,
                comments: {
                    where: { approved: true },
                    orderBy: { createdAt: 'desc' }
                }
            }
        })
    }

    static async createPost(data: {
        title: string
        slug: string
        content: string
        excerpt?: string
        published?: boolean
        featured?: boolean
        tags: string
        authorId: string
    }) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.post.create({
            data
        })
    }
}

export class ContactService {
    static async createMessage(data: {
        name: string
        email: string
        subject: string
        message: string
    }) {
        const { prisma } = await import('@/lib/prisma')
        return prisma.contactMessage.create({
            data
        })
    }

    static async getAllMessages() {
        const { prisma } = await import('@/lib/prisma')
        return prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }
}
