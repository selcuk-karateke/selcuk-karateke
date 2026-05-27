import Link from 'next/link'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  compact?: boolean
}

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="theme-bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className={`p-6 flex flex-col flex-1 ${compact ? '' : ''}`}>
        <Link href={`/projects/${project.id}`} className="group flex-1">
          <h3 className="text-lg font-bold theme-text mb-2 group-hover:theme-primary transition-colors">
            {project.title}
          </h3>
          <p className={`theme-text-secondary mb-4 ${compact ? 'line-clamp-2 text-sm' : 'line-clamp-3'}`}>
            {project.description}
          </p>
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(compact ? project.technologies.slice(0, 3) : project.technologies.slice(0, 5)).map(
            (tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs"
              >
                {tech}
              </span>
            )
          )}
          {project.technologies.length > (compact ? 3 : 5) && (
            <span className="theme-text-secondary text-xs">
              +{project.technologies.length - (compact ? 3 : 5)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm theme-primary hover:opacity-80 font-medium"
          >
            Details →
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm theme-text-secondary hover:theme-text"
            >
              <CodeBracketIcon className="w-4 h-4 mr-1" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm theme-text-secondary hover:theme-text"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
