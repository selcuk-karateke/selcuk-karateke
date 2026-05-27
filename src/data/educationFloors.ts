export interface EducationFloor {
  id: string
  title: string
  subtitle: string
  source: 'portfolio' | 'own_website'
  legacyRoute: string
}

export const portfolioEducationFloors: EducationFloor[] = [
  { id: '1stFloor', title: 'Mathematik', subtitle: 'Zahlen, Flächen, Volumen, Zinsen — mit Formeln', source: 'portfolio', legacyRoute: 'educ/1stFloor' },
  { id: '2ndFloor', title: '2. Stock', subtitle: 'Vokabeln', source: 'portfolio', legacyRoute: 'educ/2ndFloor' },
  { id: '3rdFloor', title: 'Spezielle Wirtschaftslehre', subtitle: 'SWL — Unternehmen, CI, Organisation', source: 'portfolio', legacyRoute: 'educ/3rdFloor' },
  { id: '4thFloor', title: 'Wirtschaftsrecht', subtitle: 'Rechtsordnung, Verträge, Kaufrecht', source: 'portfolio', legacyRoute: 'educ/4thFloor' },
  { id: '5thFloor', title: 'Netzwerke', subtitle: 'LAN, Topologie, Protokolle', source: 'portfolio', legacyRoute: 'educ/5thFloor' },
  { id: '6thFloor', title: 'Elektrotechnik', subtitle: 'Stromkreise, Ohmsches Gesetz', source: 'portfolio', legacyRoute: 'educ/6thFloor' },
  { id: '7thFloor', title: '7. Stock', subtitle: 'Bildungsinhalte', source: 'portfolio', legacyRoute: 'educ/7thFloor' },
  { id: '8thFloor', title: 'Datenbanken', subtitle: 'DBMS, SQL, Normalformen', source: 'portfolio', legacyRoute: 'educ/8thFloor' },
  { id: '9thFloor', title: '9. Stock', subtitle: 'Bildungsinhalte', source: 'portfolio', legacyRoute: 'educ/9thFloor' },
  { id: '10thFloor', title: '10. Stock', subtitle: 'Bildungsinhalte', source: 'portfolio', legacyRoute: 'educ/10thFloor' },
]

export const ownWebsiteFloors: EducationFloor[] = [
  { id: '1stFloor', title: 'Englisch', subtitle: 'Vokabeln & Grammatik', source: 'own_website', legacyRoute: '1stFloor' },
  { id: '2ndFloor', title: 'Allgemeine BWL', subtitle: 'Grundlagen', source: 'own_website', legacyRoute: '2ndFloor' },
  { id: '3rdFloor', title: 'BWL Vertiefung', subtitle: 'Betriebliche Inhalte', source: 'own_website', legacyRoute: '3rdFloor' },
  { id: '4thFloor', title: 'Recht & Verwaltung', subtitle: 'Rechtliche Grundlagen', source: 'own_website', legacyRoute: '4thFloor' },
  { id: '5thFloor', title: 'Spezielle Wirtschaftslehre', subtitle: 'SWL — Unternehmen, CI, Organisation', source: 'own_website', legacyRoute: '5thFloor' },
  { id: '6thFloor', title: 'Netzwerke (LAN)', subtitle: 'Umfangreiche Netzwerk-Dokumentation', source: 'own_website', legacyRoute: '6thFloor' },
  { id: '7thFloor', title: '7. Stock', subtitle: 'Lerninhalte', source: 'own_website', legacyRoute: '7thFloor' },
  { id: '8thFloor', title: '8. Stock', subtitle: 'Lerninhalte', source: 'own_website', legacyRoute: '8thFloor' },
  { id: '9thFloor', title: '9. Stock', subtitle: 'Lerninhalte', source: 'own_website', legacyRoute: '9thFloor' },
  { id: '10thFloor', title: '10. Stock', subtitle: 'Lerninhalte', source: 'own_website', legacyRoute: '10thFloor' },
  { id: '11thFloor', title: '11. Stock', subtitle: 'Lerninhalte', source: 'own_website', legacyRoute: '11thFloor' },
  { id: '12thFloor', title: '12. Stock', subtitle: 'Lerninhalte', source: 'own_website', legacyRoute: '12thFloor' },
]

export function getEducationFloor(source: 'portfolio' | 'own_website', floorId: string) {
  const list = source === 'portfolio' ? portfolioEducationFloors : ownWebsiteFloors
  return list.find((f) => f.id === floorId)
}
