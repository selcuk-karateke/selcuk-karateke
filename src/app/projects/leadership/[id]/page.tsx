import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { getGuidedProjectById, guidedProjects } from '@/data/projects'

export function generateStaticParams() {
  return guidedProjects.map((p) => ({ id: p.id }))
}

export default async function GuidedProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getGuidedProjectById(id)
  if (!project) notFound()

  return (
    <div className="min-h-page theme-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/projects/leadership"
          className="inline-flex items-center theme-text-secondary hover:theme-primary mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Guided Projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold theme-text">{project.title}</h1>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
            {project.developer}
          </span>
        </div>

        <p className="text-sm font-medium theme-primary mb-4">{project.role}</p>
        <p className="text-lg theme-text-secondary mb-8 leading-relaxed">{project.description}</p>

        {project.features.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold theme-text mb-3">Features</h2>
            <ul className="list-disc list-inside theme-text-secondary space-y-2">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
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

        {project.useCases.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold theme-text mb-3">Use Cases</h2>
            <ul className="list-disc list-inside theme-text-secondary space-y-2">
              {project.useCases.map((uc) => (
                <li key={uc}>{uc}</li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-sm theme-text-secondary pt-6 border-t border-gray-200 dark:border-gray-700">
          <span className="font-medium theme-text">Rebuildable:</span> {project.rebuildable}
        </p>

        <Link
          href="/contact"
          className="inline-block mt-8 theme-primary-bg text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
