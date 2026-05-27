export type LegacyFeature = 'none' | 'contact' | 'login' | 'search' | 'crud'

export interface LegacyRoute {
  id: string
  source: 'portfolio' | 'own_website'
  route: string
  sourcePath: string
  title: string
  feature: LegacyFeature
  notes?: string
}

/**
 * Nur noch nicht nach /uebungen oder /education migrierte Archiv-Routen.
 * Übungen (exer/) und Bildung (educ/, *Floor) → next.config redirects.
 */
const portfolioRoutes: LegacyRoute[] = [
  { id: 'pf-index', source: 'portfolio', route: 'index', sourcePath: 'l:/repos/portfolio/index.php', title: 'Portfolio Entrance', feature: 'login' },
  { id: 'pf-main', source: 'portfolio', route: 'main', sourcePath: 'l:/repos/portfolio/main.php', title: 'Main Controller', feature: 'none' },
  { id: 'pf-page1', source: 'portfolio', route: 'page1', sourcePath: 'l:/repos/portfolio/page1.php', title: 'Legacy Page 1', feature: 'none' },
  { id: 'pf-page2', source: 'portfolio', route: 'page2', sourcePath: 'l:/repos/portfolio/page2.php', title: 'Legacy Page 2', feature: 'none' },
  { id: 'pf-contacts', source: 'portfolio', route: 'contacts', sourcePath: 'l:/repos/portfolio/contacts.php', title: 'Contacts', feature: 'contact' },
  { id: 'pf-proj35', source: 'portfolio', route: 'proj/proj_35/index', sourcePath: 'l:/repos/portfolio/proj/proj_35/index.php', title: 'Project 35', feature: 'none' },
  { id: 'pf-proj36', source: 'portfolio', route: 'proj/proj_36/index', sourcePath: 'l:/repos/portfolio/proj/proj_36/index.php', title: 'Project 36', feature: 'none' },
  { id: 'pf-proj37', source: 'portfolio', route: 'proj/proj_37/index', sourcePath: 'l:/repos/portfolio/proj/proj_37/index.php', title: 'Project 37', feature: 'search' },
  { id: 'pf-proj37-live', source: 'portfolio', route: 'proj/proj_37/livesearch', sourcePath: 'l:/repos/portfolio/proj/proj_37/livesearch.php', title: 'Project 37 LiveSearch', feature: 'search' },
  { id: 'pf-proj37-valid', source: 'portfolio', route: 'proj/proj_37/valid', sourcePath: 'l:/repos/portfolio/proj/proj_37/valid.php', title: 'Project 37 Validation', feature: 'search' },
  { id: 'pf-proj38', source: 'portfolio', route: 'proj/proj_38/index', sourcePath: 'l:/repos/portfolio/proj/proj_38/index.php', title: 'Project 38', feature: 'none' },
  { id: 'pf-proj39', source: 'portfolio', route: 'proj/proj_39/index', sourcePath: 'l:/repos/portfolio/proj/proj_39/index.php', title: 'Project 39', feature: 'login' },
  { id: 'pf-proj39-logout', source: 'portfolio', route: 'proj/proj_39/logout', sourcePath: 'l:/repos/portfolio/proj/proj_39/logout.php', title: 'Project 39 Logout', feature: 'login' },
  { id: 'pf-proj40', source: 'portfolio', route: 'proj/proj_40/index', sourcePath: 'l:/repos/portfolio/proj/proj_40/index.php', title: 'Project 40', feature: 'none' },
  { id: 'pf-proj41', source: 'portfolio', route: 'proj/proj_41/index', sourcePath: 'l:/repos/portfolio/proj/proj_41/index.php', title: 'Project 41', feature: 'crud' },
  { id: 'pf-proj41-create', source: 'portfolio', route: 'proj/proj_41/create', sourcePath: 'l:/repos/portfolio/proj/proj_41/create.php', title: 'Project 41 Create', feature: 'crud' },
  { id: 'pf-proj41-read', source: 'portfolio', route: 'proj/proj_41/read', sourcePath: 'l:/repos/portfolio/proj/proj_41/read.php', title: 'Project 41 Read', feature: 'crud' },
  { id: 'pf-proj41-single', source: 'portfolio', route: 'proj/proj_41/single', sourcePath: 'l:/repos/portfolio/proj/proj_41/single.php', title: 'Project 41 Single', feature: 'crud' },
  { id: 'pf-proj41-update', source: 'portfolio', route: 'proj/proj_41/update', sourcePath: 'l:/repos/portfolio/proj/proj_41/update.php', title: 'Project 41 Update', feature: 'crud' },
  { id: 'pf-proj41-mindset', source: 'portfolio', route: 'proj/proj_41/mindsetinfo', sourcePath: 'l:/repos/portfolio/proj/proj_41/mindsetinfo.php', title: 'Project 41 Mindset', feature: 'crud' },
  { id: 'pf-proj42', source: 'portfolio', route: 'proj/proj_42/index', sourcePath: 'l:/repos/portfolio/proj/proj_42/index.php', title: 'Project 42', feature: 'none' },
  { id: 'pf-proj43', source: 'portfolio', route: 'proj/proj_43/index', sourcePath: 'l:/repos/portfolio/proj/proj_43/index.php', title: 'Project 43', feature: 'none' },
  { id: 'pf-proj43-newwin', source: 'portfolio', route: 'proj/proj_43/newWin', sourcePath: 'l:/repos/portfolio/proj/proj_43/newWin.php', title: 'Project 43 New Window', feature: 'none' },
  { id: 'pf-proj45', source: 'portfolio', route: 'proj/proj_45/index', sourcePath: 'l:/repos/portfolio/proj/proj_45/index.php', title: 'Project 45', feature: 'none' },
  { id: 'pf-game-index', source: 'portfolio', route: 'proj/game/index', sourcePath: 'l:/repos/portfolio/proj/game/index.php', title: 'Game Index', feature: 'none' },
  { id: 'pf-game-mapdata', source: 'portfolio', route: 'proj/game/map-fields-data', sourcePath: 'l:/repos/portfolio/proj/game/map-fields-data.php', title: 'Game Map Data', feature: 'crud' },
]

const ownWebsiteRoutes: LegacyRoute[] = [
  { id: 'ow-index', source: 'own_website', route: 'index', sourcePath: 'l:/repos/own_website/index.php', title: 'Own Website Entrance', feature: 'none' },
  { id: 'ow-proj0', source: 'own_website', route: 'proj/proj0/index', sourcePath: 'l:/repos/own_website/proj/proj0/index.php', title: 'Project 0', feature: 'login' },
  { id: 'ow-proj0-v1', source: 'own_website', route: 'proj/proj0/index_v1', sourcePath: 'l:/repos/own_website/proj/proj0/index_v1.php', title: 'Project 0 v1', feature: 'login' },
  { id: 'ow-proj0-test', source: 'own_website', route: 'proj/proj0/test', sourcePath: 'l:/repos/own_website/proj/proj0/test.php', title: 'Project 0 Test', feature: 'crud' },
  { id: 'ow-proj1', source: 'own_website', route: 'proj/proj1/index', sourcePath: 'l:/repos/own_website/proj/proj1/index.php', title: 'Project 1', feature: 'none' },
  { id: 'ow-proj2', source: 'own_website', route: 'proj/proj2/index', sourcePath: 'l:/repos/own_website/proj/proj2/index.php', title: 'Project 2', feature: 'none' },
  { id: 'ow-proj3', source: 'own_website', route: 'proj/proj3/index', sourcePath: 'l:/repos/own_website/proj/proj3/index.php', title: 'Project 3', feature: 'search' },
  { id: 'ow-proj3-live', source: 'own_website', route: 'proj/proj3/livesearch', sourcePath: 'l:/repos/own_website/proj/proj3/livesearch.php', title: 'Project 3 LiveSearch', feature: 'search' },
  { id: 'ow-proj3-valid', source: 'own_website', route: 'proj/proj3/valid', sourcePath: 'l:/repos/own_website/proj/proj3/valid.php', title: 'Project 3 Validation', feature: 'search' },
  { id: 'ow-proj4', source: 'own_website', route: 'proj/proj4/index', sourcePath: 'l:/repos/own_website/proj/proj4/index.php', title: 'Project 4', feature: 'none' },
  { id: 'ow-proj5', source: 'own_website', route: 'proj/proj5/index', sourcePath: 'l:/repos/own_website/proj/proj5/index.php', title: 'Project 5', feature: 'login' },
  { id: 'ow-proj5-logout', source: 'own_website', route: 'proj/proj5/logout', sourcePath: 'l:/repos/own_website/proj/proj5/logout.php', title: 'Project 5 Logout', feature: 'login' },
  { id: 'ow-game-index', source: 'own_website', route: 'proj/game/MosaicJS/index', sourcePath: 'l:/repos/own_website/proj/game/MosaicJS/index.php', title: 'Game MosaicJS', feature: 'none' },
  { id: 'ow-comhard-bike', source: 'own_website', route: 'comhard/fahrrad/ziel', sourcePath: 'l:/repos/own_website/comhard/fahrrad/ziel.php', title: 'Comhard Fahrrad Ziel', feature: 'none' },
]

export const legacyRoutes: LegacyRoute[] = [...portfolioRoutes, ...ownWebsiteRoutes]

export function getLegacyRoute(source: string, slug: string[]) {
  const route = slug.join('/')
  return legacyRoutes.find((r) => r.source === source && r.route === route)
}

export function getLegacyRoutesBySource(source: 'portfolio' | 'own_website') {
  return legacyRoutes.filter((r) => r.source === source)
}
