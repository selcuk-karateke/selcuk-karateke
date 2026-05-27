import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import {
  getProjectById,
  professionalProjects,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from '@/data/projects'

export function generateStaticParams() {
  return professionalProjects.map((p) => ({ id: p.id }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const category = PROJECT_CATEGORIES[project.category as ProjectCategory]

  return (
    <div className="min-h-screen theme-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/projects"
          className="inline-flex items-center theme-text-secondary hover:theme-primary mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          All Projects
        </Link>

        <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm mb-4">
          {category.label}
        </span>

        <h1 className="text-4xl font-bold theme-text mb-6">{project.title}</h1>
        <p className="text-lg theme-text-secondary mb-8 leading-relaxed">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold theme-text mb-3">Highlights</h2>
            <ul className="list-disc list-inside theme-text-secondary space-y-2">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-semibold theme-text mb-3">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 dark:bg-gray-800 theme-text px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-primary-bg text-white px-6 py-2 rounded-lg font-medium hover:opacity-90"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Live Demo
            </a>
          )}
          <Link
            href="/contact"
            className="theme-text-secondary hover:theme-primary px-6 py-2 font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
