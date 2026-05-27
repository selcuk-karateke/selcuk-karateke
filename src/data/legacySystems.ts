export interface LegacyModuleGroup {
  title: string
  items: string[]
}

export interface LegacySystem {
  id: string
  name: string
  path: string
  summary: string
  stack: string[]
  groups: LegacyModuleGroup[]
}

export const legacySystems: LegacySystem[] = [
  {
    id: 'portfolio-php',
    name: 'portfolio (Legacy PHP)',
    path: 'l:/repos/portfolio',
    summary:
      'Older PHP platform with template/controller structure, authentication views, education/exercise areas, and many project modules.',
    stack: ['PHP', 'Bootstrap 4', 'jQuery', 'Custom MVC-like templates'],
    groups: [
      {
        title: 'Core Areas',
        items: ['templates', 'classes', 'proj', 'exer', 'educ', 'mail', 'style', 'js', 'img'],
      },
      {
        title: 'Project Modules',
        items: [
          'proj_35',
          'proj_36',
          'proj_37',
          'proj_38',
          'proj_39',
          'proj_40',
          'proj_41',
          'proj_42',
          'proj_43',
          'proj_44',
          'proj_45',
          'game',
          'anim',
        ],
      },
      {
        title: 'Exercise / Learning Areas',
        items: ['exer', 'exer_11', 'exer_12', 'exer_13', 'exer_14', 'exer_15', 'exer_16', 'exer_17', 'exer_18', 'exer_19', 'galerie'],
      },
    ],
  },
  {
    id: 'own-website-php',
    name: 'own_website (Legacy PHP)',
    path: 'l:/repos/own_website',
    summary:
      'Earlier website generation with floor-based education pages, Bootstrap navigation, project mini-apps, and exercise collections.',
    stack: ['PHP', 'Bootstrap 3', 'jQuery', 'Static page includes'],
    groups: [
      {
        title: 'Core Areas',
        items: ['proj', 'exercise', 'comhard', 'css', 'js', 'img', 'fonts', 'audio'],
      },
      {
        title: 'Project Modules',
        items: ['proj0', 'proj1', 'proj2', 'proj3', 'proj4', 'proj5', 'game', 'anim'],
      },
      {
        title: 'Floor Pages',
        items: ['1stFloor', '2ndFloor', '3rdFloor', '4thFloor', '5thFloor', '6thFloor', '7thFloor', '8thFloor', '9thFloor', '10thFloor', '11thFloor', '12thFloor'],
      },
    ],
  },
]
