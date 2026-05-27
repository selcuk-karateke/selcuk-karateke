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

const portfolioRoutes: LegacyRoute[] = [
  { id: 'pf-index', source: 'portfolio', route: 'index', sourcePath: 'l:/repos/portfolio/index.php', title: 'Portfolio Entrance', feature: 'login' },
  { id: 'pf-main', source: 'portfolio', route: 'main', sourcePath: 'l:/repos/portfolio/main.php', title: 'Main Controller', feature: 'none' },
  { id: 'pf-page1', source: 'portfolio', route: 'page1', sourcePath: 'l:/repos/portfolio/page1.php', title: 'Legacy Page 1', feature: 'none' },
  { id: 'pf-page2', source: 'portfolio', route: 'page2', sourcePath: 'l:/repos/portfolio/page2.php', title: 'Legacy Page 2', feature: 'none' },
  { id: 'pf-contacts', source: 'portfolio', route: 'contacts', sourcePath: 'l:/repos/portfolio/contacts.php', title: 'Contacts', feature: 'contact' },
  { id: 'pf-educ-1', source: 'portfolio', route: 'educ/1stFloor', sourcePath: 'l:/repos/portfolio/educ/1stFloor.php', title: 'Education 1st Floor', feature: 'none' },
  { id: 'pf-educ-2', source: 'portfolio', route: 'educ/2ndFloor', sourcePath: 'l:/repos/portfolio/educ/2ndFloor.php', title: 'Education 2nd Floor', feature: 'none' },
  { id: 'pf-educ-3', source: 'portfolio', route: 'educ/3rdFloor', sourcePath: 'l:/repos/portfolio/educ/3rdFloor.php', title: 'Education 3rd Floor', feature: 'none' },
  { id: 'pf-educ-4', source: 'portfolio', route: 'educ/4thFloor', sourcePath: 'l:/repos/portfolio/educ/4thFloor.php', title: 'Education 4th Floor', feature: 'none' },
  { id: 'pf-educ-5', source: 'portfolio', route: 'educ/5thFloor', sourcePath: 'l:/repos/portfolio/educ/5thFloor.php', title: 'Education 5th Floor', feature: 'none' },
  { id: 'pf-educ-6', source: 'portfolio', route: 'educ/6thFloor', sourcePath: 'l:/repos/portfolio/educ/6thFloor.php', title: 'Education 6th Floor', feature: 'none' },
  { id: 'pf-educ-7', source: 'portfolio', route: 'educ/7thFloor', sourcePath: 'l:/repos/portfolio/educ/7thFloor.php', title: 'Education 7th Floor', feature: 'none' },
  { id: 'pf-educ-8', source: 'portfolio', route: 'educ/8thFloor', sourcePath: 'l:/repos/portfolio/educ/8thFloor.php', title: 'Education 8th Floor', feature: 'none' },
  { id: 'pf-educ-9', source: 'portfolio', route: 'educ/9thFloor', sourcePath: 'l:/repos/portfolio/educ/9thFloor.php', title: 'Education 9th Floor', feature: 'none' },
  { id: 'pf-educ-10', source: 'portfolio', route: 'educ/10thFloor', sourcePath: 'l:/repos/portfolio/educ/10thFloor.php', title: 'Education 10th Floor', feature: 'none' },
  { id: 'pf-exer-index', source: 'portfolio', route: 'exer/index', sourcePath: 'l:/repos/portfolio/exer/index.php', title: 'Exercises Index', feature: 'none' },
  { id: 'pf-exer-buecheranzeige', source: 'portfolio', route: 'exer/buecheranzeige', sourcePath: 'l:/repos/portfolio/exer/buecheranzeige.php', title: 'Exercise Bücheranzeige', feature: 'crud' },
  { id: 'pf-exer-buechererfassung', source: 'portfolio', route: 'exer/buechererfassung', sourcePath: 'l:/repos/portfolio/exer/buechererfassung.php', title: 'Exercise Büchererfassung', feature: 'crud' },
  { id: 'pf-exer-pdotest', source: 'portfolio', route: 'exer/pdotest', sourcePath: 'l:/repos/portfolio/exer/pdotest.php', title: 'Exercise PDO Test', feature: 'crud' },
  { id: 'pf-exer11-index', source: 'portfolio', route: 'exer/exer_11/index', sourcePath: 'l:/repos/portfolio/exer/exer_11/index.php', title: 'Exercise 11 Index', feature: 'crud' },
  { id: 'pf-gallery-index', source: 'portfolio', route: 'exer/galerie/index', sourcePath: 'l:/repos/portfolio/exer/galerie/index.php', title: 'Gallery Index', feature: 'crud' },
  { id: 'pf-gallery-upload', source: 'portfolio', route: 'exer/galerie/upload', sourcePath: 'l:/repos/portfolio/exer/galerie/upload.php', title: 'Gallery Upload', feature: 'crud' },
  { id: 'pf-news-test', source: 'portfolio', route: 'exer/news/test', sourcePath: 'l:/repos/portfolio/exer/news/test.php', title: 'News Test', feature: 'crud' },
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
  { id: 'ow-floor1', source: 'own_website', route: '1stFloor', sourcePath: 'l:/repos/own_website/1stFloor.php', title: '1st Floor', feature: 'none' },
  { id: 'ow-floor2', source: 'own_website', route: '2ndFloor', sourcePath: 'l:/repos/own_website/2ndFloor.php', title: '2nd Floor', feature: 'none' },
  { id: 'ow-floor3', source: 'own_website', route: '3rdFloor', sourcePath: 'l:/repos/own_website/3rdFloor.php', title: '3rd Floor', feature: 'none' },
  { id: 'ow-floor4', source: 'own_website', route: '4thFloor', sourcePath: 'l:/repos/own_website/4thFloor.php', title: '4th Floor', feature: 'none' },
  { id: 'ow-floor5', source: 'own_website', route: '5thFloor', sourcePath: 'l:/repos/own_website/5thFloor.php', title: '5th Floor', feature: 'none' },
  { id: 'ow-floor6', source: 'own_website', route: '6thFloor', sourcePath: 'l:/repos/own_website/6thFloor.php', title: '6th Floor', feature: 'none' },
  { id: 'ow-floor7', source: 'own_website', route: '7thFloor', sourcePath: 'l:/repos/own_website/7thFloor.php', title: '7th Floor', feature: 'none' },
  { id: 'ow-floor8', source: 'own_website', route: '8thFloor', sourcePath: 'l:/repos/own_website/8thFloor.php', title: '8th Floor', feature: 'none' },
  { id: 'ow-floor9', source: 'own_website', route: '9thFloor', sourcePath: 'l:/repos/own_website/9thFloor.php', title: '9th Floor', feature: 'none' },
  { id: 'ow-floor10', source: 'own_website', route: '10thFloor', sourcePath: 'l:/repos/own_website/10thFloor.php', title: '10th Floor', feature: 'none' },
  { id: 'ow-floor11', source: 'own_website', route: '11thFloor', sourcePath: 'l:/repos/own_website/11thFloor.php', title: '11th Floor', feature: 'none' },
  { id: 'ow-floor12', source: 'own_website', route: '12thFloor', sourcePath: 'l:/repos/own_website/12thFloor.php', title: '12th Floor', feature: 'none' },
  { id: 'ow-ex-index', source: 'own_website', route: 'exercise/index', sourcePath: 'l:/repos/own_website/exercise/index.php', title: 'Exercise Index', feature: 'none' },
  { id: 'ow-ex-fileupload', source: 'own_website', route: 'exercise/fileupload', sourcePath: 'l:/repos/own_website/exercise/fileupload.php', title: 'Exercise File Upload', feature: 'crud' },
  { id: 'ow-ex-pdotest', source: 'own_website', route: 'exercise/pdotest', sourcePath: 'l:/repos/own_website/exercise/pdotest.php', title: 'Exercise PDO Test', feature: 'crud' },
  { id: 'ow-ex-server', source: 'own_website', route: 'exercise/server', sourcePath: 'l:/repos/own_website/exercise/server.php', title: 'Exercise Server', feature: 'none' },
  { id: 'ow-ex-phpinfo', source: 'own_website', route: 'exercise/phpinfo', sourcePath: 'l:/repos/own_website/exercise/phpinfo.php', title: 'Exercise PHPInfo', feature: 'none' },
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
