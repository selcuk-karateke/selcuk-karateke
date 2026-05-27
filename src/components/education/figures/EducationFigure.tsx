import GeometryFigure, { hasGeometryFigure } from '@/components/education/geometry/GeometryFigure'
import CircuitFigure from '@/components/education/figures/CircuitFigure'
import DatabaseFigure from '@/components/education/figures/DatabaseFigure'
import { FlowProcessFigure, OrgMatrixFigure, OsiStackFigure } from '@/components/education/figures/OrgFigure'
import TopologyFigure from '@/components/education/figures/TopologyFigure'

const FIGURE_IDS = new Set([
  'ee-series',
  'ee-parallel',
  'ee-ohm',
  'topo-bus',
  'topo-star',
  'topo-ring',
  'db-relation',
  'org-matrix',
  'flow-process',
  'osi-stack',
])

export function hasEducationFigure(figureId: string): boolean {
  return FIGURE_IDS.has(figureId) || hasGeometryFigure(figureId)
}

export default function EducationFigure({
  figureId,
  question,
}: {
  figureId: string
  question?: string
}) {
  if (hasGeometryFigure(figureId)) {
    return <GeometryFigure shapeId={figureId} question={question} />
  }

  switch (figureId) {
    case 'ee-series':
      return <CircuitFigure variant="series" />
    case 'ee-parallel':
      return <CircuitFigure variant="parallel" />
    case 'ee-ohm':
      return <CircuitFigure variant="ohm" />
    case 'topo-bus':
      return <TopologyFigure variant="bus" />
    case 'topo-star':
      return <TopologyFigure variant="star" />
    case 'topo-ring':
      return <TopologyFigure variant="ring" />
    case 'db-relation':
      return <DatabaseFigure />
    case 'org-matrix':
      return <OrgMatrixFigure />
    case 'flow-process':
      return <FlowProcessFigure />
    case 'osi-stack':
      return <OsiStackFigure />
    default:
      return null
  }
}
