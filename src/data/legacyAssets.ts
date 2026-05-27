export interface LegacyAssetScope {
  source: 'portfolio' | 'own_website'
  basePath: string
  folders: string[]
}

export const legacyAssetScopes: LegacyAssetScope[] = [
  {
    source: 'portfolio',
    basePath: 'l:/repos/portfolio',
    folders: ['img', 'audio', 'fonts', 'style', 'js', 'exer'],
  },
  {
    source: 'own_website',
    basePath: 'l:/repos/own_website',
    folders: ['img', 'audio', 'fonts', 'css', 'js', 'exercise'],
  },
]
