'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const pathname = usePathname()

    // Auto-generate breadcrumbs from pathname if no items provided
    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const pathSegments = pathname.split('/').filter(Boolean)
        const breadcrumbs: BreadcrumbItem[] = [
            { label: 'Home', href: '/' }
        ]

        let currentPath = ''
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`
            const isLast = index === pathSegments.length - 1

            // Convert segment to readable label
            const label = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

            breadcrumbs.push({
                label,
                href: isLast ? undefined : currentPath
            })
        })

        return breadcrumbs
    }

    const breadcrumbItems = items || generateBreadcrumbs()

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <svg
                            className="w-4 h-4 mx-2 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}
