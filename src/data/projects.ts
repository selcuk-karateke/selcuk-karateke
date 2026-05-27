export type ProjectCategory =
  | 'platforms'
  | 'integrations'
  | 'ecommerce'
  | 'ml-data'
  | 'internal-tools'
  | 'content-media'
  | 'frontend-perf'
  | 'data-import'
  | 'other'

export const PROJECT_CATEGORIES: Record<
  ProjectCategory,
  { label: string; labelDe: string }
> = {
  platforms: { label: 'Platforms & Core', labelDe: 'Plattformen & Kernprodukte' },
  integrations: { label: 'Integrations & APIs', labelDe: 'Integrationen & APIs' },
  ecommerce: { label: 'E-Commerce', labelDe: 'E-Commerce & Produkte' },
  'ml-data': { label: 'ML & Data', labelDe: 'ML & Datenverarbeitung' },
  'internal-tools': { label: 'Internal Tools', labelDe: 'Interne Tools' },
  'content-media': { label: 'Content & Media', labelDe: 'Kategorien, Bilder & Content' },
  'frontend-perf': { label: 'Frontend & Performance', labelDe: 'Frontend & Performance' },
  'data-import': { label: 'Data Import', labelDe: 'Datenimport & Konvertierung' },
  other: { label: 'Other', labelDe: 'Sonstige Tools' },
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: ProjectCategory
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  highlights?: string[]
}

export interface GuidedProject {
  id: string
  title: string
  developer: string
  role: string
  description: string
  features: string[]
  technologies: string[]
  useCases: string[]
  rebuildable: string
}

export const professionalProjects: Project[] = [
  // —— 1. Plattformen ——
  {
    id: 'bagobag',
    title: 'Bagobag B2B-E-Commerce',
    description:
      'B2B-Plattform für Tragetaschen und Verpackungsprodukte. Produkte, Kategorien, Kunden, Bestellungen. Mehrsprachig, REST API, dynamisches Filter-System, Product Inquiry, Socket.io.',
    technologies: ['PHP', 'ILance', 'MySQL', 'Bootstrap 5', 'jQuery', 'Node.js', 'Socket.io'],
    category: 'platforms',
    featured: true,
    highlights: [
      'iLance-basiertes Marketplace-Framework',
      'REST API v1 mit OpenAPI/Swagger',
      'Lazy-Loading-Sektionen per IntersectionObserver',
    ],
  },
  {
    id: 'co-health',
    title: 'co.health Plattform',
    description:
      'iLance-Plattform mit REST API v1, Billbee-Integration, Early-Bird-Modul, Store- und Company-Verwaltung.',
    technologies: ['PHP', 'iLance', 'MySQL', 'Bootstrap 5', 'REST API'],
    category: 'platforms',
    featured: false,
  },
  {
    id: 'bagobag-api',
    title: 'Bagobag REST API v1',
    description:
      'Dokumentierte REST-API für Produkte, Kategorien, Bestellungen, Kunden und Suche. OpenAPI/Swagger, ReDoc, Log-Rotation.',
    technologies: ['PHP', 'OpenAPI 3.0', 'Cookie Auth'],
    category: 'platforms',
    featured: false,
  },
  {
    id: 'product-inquiry',
    title: 'Product Inquiry System',
    description:
      'Modul für produktbasierte Anfragen mit Druckdaten-Upload, Admin-Backend und E-Mail-Workflow.',
    technologies: ['PHP', 'reCAPTCHA', 'Queue-System'],
    category: 'platforms',
    featured: false,
  },
  {
    id: 'ajax-lazy',
    title: 'AJAX-Sektionen / Lazy Loading',
    description:
      'Konfigurierbares Lazy-Loading von Content-Blöcken mit IntersectionObserver und Skeleton-States.',
    technologies: ['JavaScript', 'jQuery', 'PHP'],
    category: 'platforms',
    featured: false,
  },
  // —— 2. Integrationen ——
  {
    id: 'billbee-creditsafe',
    title: 'Billbee & Creditsafe',
    description:
      'Batch-Sync von Bestellungen mit Bonitätsprüfung. JWT-Auth, Firmensuche, Credit-Reports, Fuzzy-Matching, JSON-State.',
    technologies: ['PHP', 'Billbee SDK', 'Creditsafe API', 'cURL'],
    category: 'integrations',
    featured: true,
  },
  {
    id: 'creditsafe-archiv',
    title: 'Creditsafe / Archiv Billbee',
    description:
      'Bonitätsprüfung für Bestellungen. JWT, Firmensuche, Credit-Reports, SellerComment-Anreicherung.',
    technologies: ['PHP', 'Creditsafe API', 'cURL'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'bagobag-api-client',
    title: 'Bagobag API Client',
    description:
      'API-Client für Produkte, Kategorien, Bestellungen. Basic Auth → JWT, Environment-Aware (Live/Test).',
    technologies: ['PHP', 'cURL', 'JSON'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'cohealth-api-client',
    title: 'co.health API Client',
    description: 'Kunden- und Store-Erstellung, Company-Profile. Umfangreicher PHP-Client.',
    technologies: ['PHP', 'cURL', 'vlucas/phpdotenv'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'amazon-s3',
    title: 'Amazon S3 Integration',
    description: 'Bootstrap für S3-Operationen (Upload, Download, Listen) über AWS SDK.',
    technologies: ['PHP', 'AWS SDK', 'Composer'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'chatgpt-batch',
    title: 'ChatGPT Batch-Verarbeitung',
    description:
      'Batch-Tool für Firmenprofile: Beschreibungen generieren, Spezialisierungen ableiten. Start/Stop-UI.',
    technologies: ['PHP', 'OpenAI API', 'jQuery', 'MySQL'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'gambio-api',
    title: 'Gambio API',
    description:
      'Feed-Generatoren (Google, Kaufland, Amazon, eBay, Idealo), Kategorien, Preise/Lager, Bestellungen.',
    technologies: ['PHP', 'Gambio REST API'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'creditsafe-payment',
    title: 'Creditsafe Payment/Boni',
    description:
      'Referenzimplementierung für Zahlung, Reservierung, Bonitätsprüfung, Webhooks (MAC-Signatur).',
    technologies: ['PHP', 'cURL', 'OpenSSL'],
    category: 'integrations',
    featured: false,
  },
  {
    id: 'anythingllm',
    title: 'AnythingLLM',
    description: 'Test-/Demo-Script für die AnythingLLM-API.',
    technologies: ['PHP', 'cURL'],
    category: 'integrations',
    featured: false,
  },
  // —— 3. E-Commerce ——
  {
    id: 'papstar',
    title: 'PAPSTAR-Bagobag Integration',
    description:
      'SFTP-Katalog, Produkt-/Lager-Sync, Bestellungen, CSV, Monitoring. Hash-Caching, Live/Test-Umgebungen.',
    technologies: ['PHP', 'phpseclib', 'Bagobag API', 'MySQL', 'SFTP'],
    category: 'ecommerce',
    featured: true,
  },
  {
    id: 'csv-uploader',
    title: 'CSV Uploader (Bagobag)',
    description:
      'Massen-Upload aus CSV. Bulk bis 500, Image-Download, Swagger-Validierung, Echtzeit-Fortschritt.',
    technologies: ['PHP', 'Bagobag API', 'cURL', 'CURLFile'],
    category: 'ecommerce',
    featured: false,
  },
  {
    id: 'csv-rebuild',
    title: 'CSV Rebuild',
    description:
      'CSV-Import für Produktvarianten. SKU-Extraktion, ilance_variants, Preview, Bestätigungs-Workflow.',
    technologies: ['PHP', 'PDO', 'fgetcsv'],
    category: 'ecommerce',
    featured: false,
  },
  {
    id: 'csv-to-db',
    title: 'CSV to DB',
    description:
      'Multi-Tabellen-Import: manufacturers, dimensions, products, stocks, prices, properties. Slugify.',
    technologies: ['PHP', 'PDO', 'MySQL'],
    category: 'ecommerce',
    featured: false,
  },
  {
    id: 'product-to-csv',
    title: 'product_to_csv',
    description:
      'CSV-Generierung für Bagobag-Uploads. 100+ Felder, Varianten, mehrsprachig.',
    technologies: ['PHP', 'MySQL'],
    category: 'ecommerce',
    featured: false,
  },
  {
    id: 'price-editor',
    title: 'Price Editor',
    description: 'Preis-Verwaltung für Produkte.',
    technologies: ['PHP', 'MySQL'],
    category: 'ecommerce',
    featured: false,
  },
  // —— 4. ML & Daten ——
  {
    id: 'ml-calc',
    title: 'ML Preis-Kalkulator',
    description:
      'GradientBoostingRegressor für Taschen/Produkte. 100+ Felder, PHP↔Python-Bridge, scikit-learn.',
    technologies: ['PHP', 'Python', 'scikit-learn', 'pandas', 'joblib'],
    category: 'ml-data',
    featured: true,
  },
  {
    id: 'dataconverter',
    title: 'DataConverter v5.0',
    description:
      'OSM/Overpass-Import medizinischer Einrichtungen. Multi-Threading, Chunk-Processing, Company-Schema.',
    technologies: ['PHP', 'parallel', 'Overpass API', 'MySQL', 'pcntl'],
    category: 'ml-data',
    featured: true,
  },
  {
    id: 'data-converter-old',
    title: 'data_converter_old',
    description:
      'Multi-Source: CSV, Overpass, Google Places. Cache, Deduplizierung, SQL-Generierung.',
    technologies: ['PHP', 'cURL', 'vlucas/phpdotenv'],
    category: 'ml-data',
    featured: false,
  },
  {
    id: 'dlt',
    title: 'dlt ETL-Pipeline',
    description: 'Python ETL: API + CSV + JSON → MySQL. Daten-Matching, Transformation.',
    technologies: ['Python', 'dlt', 'pandas', 'mysql-connector'],
    category: 'ml-data',
    featured: false,
  },
  {
    id: 'poh-di',
    title: 'POH-DI',
    description: 'OSM-Daten-Extraktion über Overpass. CSV-Export pro Land, Web-Interface.',
    technologies: ['PHP', 'cURL', 'Overpass API', 'JavaScript'],
    category: 'ml-data',
    featured: false,
  },
  // —— 5. Interne Tools ——
  {
    id: 'backupper',
    title: 'Backupper',
    description:
      'MySQL-Dumps, Dateisystem-ZIP, SSH/SFTP zu Remote-Servern. SCP-Download, dmYHis-Format.',
    technologies: ['PHP', 'SSH2', 'mysqldump', 'zip', 'SCP'],
    category: 'internal-tools',
    featured: true,
  },
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    description:
      'Domain-Scan (Apache/Vesta), PHP-Version, Software-Erkennung (WP, Magento, Gambio, Atlas), Speicher, Filter.',
    technologies: ['PHP', 'glob', 'disk_free_space'],
    category: 'internal-tools',
    featured: true,
  },
  {
    id: 'company-adder',
    title: 'Company Adder',
    description:
      'Visitenkarten-Scan mit OpenAI Vision, Kunden via co.health API, Google Maps Geocoding.',
    technologies: ['PHP', 'OpenAI API', 'co.health API', 'cURL'],
    category: 'internal-tools',
    featured: false,
  },
  {
    id: 'barebone',
    title: 'Barebone Template',
    description:
      'Starter-Template: MVC, Repository, Service, DI, CRUD, Routing, Login, Design Tokens.',
    technologies: ['PHP 7.4+', 'PDO', 'MySQL', 'vlucas/phpdotenv'],
    category: 'internal-tools',
    featured: true,
  },
  {
    id: 'datatables',
    title: 'DataTables',
    description: 'PEI (Corona), EU COVID-Tests, Preise. ArcGIS/Shopify CDN, jQuery DataTables.',
    technologies: ['PHP', 'jQuery', 'DataTables', 'JSON'],
    category: 'internal-tools',
    featured: false,
  },
  // —— 6. Content & Media ——
  {
    id: 'categorizer',
    title: 'Categorizer',
    description:
      'Kategorien (ilance_categories), Bildverwaltung, Bildnamen-Vergleich, Excel-Export.',
    technologies: ['PHP', 'PDO', 'MySQL'],
    category: 'content-media',
    featured: false,
  },
  {
    id: 'convertor-webp',
    title: 'Convertor (WebP→PNG/JPG)',
    description: 'Bildkonvertierung mit Python PIL. Multi-Upload, ZIP-Download.',
    technologies: ['PHP', 'Python', 'PIL/Pillow', 'ZIPArchive'],
    category: 'content-media',
    featured: false,
  },
  {
    id: 'image-checker',
    title: 'Image Checker',
    description:
      'TinEye-/OCR-Integration, Batch-Analyse von Produktbildern, Kategorie-Zuordnung.',
    technologies: ['PHP', 'TinEye API', 'OCR'],
    category: 'content-media',
    featured: false,
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    description: 'Bildgrößen-Anpassung.',
    technologies: ['PHP', 'GD', 'ImageMagick'],
    category: 'content-media',
    featured: false,
  },
  {
    id: 'keyword-to-link',
    title: 'Keyword to Link',
    description: 'Keyword-zu-Link in HTML. DOMDocument, XPath, mehrsprachig.',
    technologies: ['PHP', 'DOMDocument', 'MySQL'],
    category: 'content-media',
    featured: false,
  },
  {
    id: 'keyworder',
    title: 'Keyworder',
    description: 'Keyword-Extraktion und -Verarbeitung.',
    technologies: ['PHP'],
    category: 'content-media',
    featured: false,
  },
  {
    id: 'tag-adder',
    title: 'tag_adder',
    description: 'Tag-Verwaltung.',
    technologies: ['PHP'],
    category: 'content-media',
    featured: false,
  },
  // —— 7. Frontend & Performance ——
  {
    id: 'critical-css',
    title: 'Critical CSS',
    description: 'Above-the-fold CSS. sabberworm/php-css-parser, cURL.',
    technologies: ['PHP', 'Composer', 'cURL'],
    category: 'frontend-perf',
    featured: false,
  },
  {
    id: 'code-analyzer',
    title: 'Code Analyzer',
    description: 'HTML-Analyse: Scripts, Styles, Links, Iframes. DOMDocument oder Regex.',
    technologies: ['PHP', 'DOMDocument'],
    category: 'frontend-perf',
    featured: false,
  },
  {
    id: 'html-builder',
    title: 'HTML Builder / Combiner / Purifier',
    description: 'HTML-Verarbeitung, Purifier-Integration.',
    technologies: ['PHP', 'HTMLPurifier'],
    category: 'frontend-perf',
    featured: false,
  },
  {
    id: 'html-screenshooter',
    title: 'HTML Screenshooter',
    description: 'Screenshots mit Playwright/Headless Browser.',
    technologies: ['PHP', 'Node.js', 'Playwright'],
    category: 'frontend-perf',
    featured: false,
  },
  // —— 8. Datenimport ——
  {
    id: 'file-to-db',
    title: 'file_to_db',
    description: 'Datei-Import in Datenbank.',
    technologies: ['PHP'],
    category: 'data-import',
    featured: false,
  },
  {
    id: 'json-to-db',
    title: 'json_to_db',
    description: 'JSON-Import in Datenbank.',
    technologies: ['PHP'],
    category: 'data-import',
    featured: false,
  },
  {
    id: 'geocoding',
    title: 'Geocoding',
    description: 'Adress-Geocoding (z.B. Nominatim).',
    technologies: ['PHP', 'cURL'],
    category: 'data-import',
    featured: false,
  },
  {
    id: 'vcf-builder',
    title: 'VCF Builder',
    description: 'vCard-Generierung.',
    technologies: ['PHP'],
    category: 'data-import',
    featured: false,
  },
  {
    id: 'textify',
    title: 'textify',
    description: 'Text-Konvertierung.',
    technologies: ['PHP'],
    category: 'data-import',
    featured: false,
  },
  // —— 9. Sonstige ——
  {
    id: 'shipping-calculator',
    title: 'Shipping Calculator',
    description: 'Versandpreis-Berechnung, CORS, API.',
    technologies: ['PHP', 'JavaScript'],
    category: 'other',
    featured: false,
  },
  {
    id: 'fold-configurator',
    title: 'Fold Configurator',
    description: 'Falt-Konfigurator für Produkte.',
    technologies: ['PHP', 'JavaScript'],
    category: 'other',
    featured: false,
  },
  {
    id: 'holiday-planer',
    title: 'Holiday Planer',
    description: 'Urlaubsplanung.',
    technologies: ['PHP'],
    category: 'other',
    featured: false,
  },
  {
    id: 'drawing-tool-spetzi',
    title: 'Drawing Tool / SPETZI',
    description:
      'Schnittmuster-Generator: Code-Editor, SVG, jsPDF, taschen_types.json.',
    technologies: ['PHP', 'JavaScript', 'jsPDF', 'svg2pdf', 'SVG'],
    category: 'other',
    featured: false,
  },
  {
    id: 'smg-john',
    title: 'smg (Druck-PDFs)',
    description: 'Druck-PDFs und Schnittmuster für Taschen. jspdf, svg2pdf.',
    technologies: ['HTML', 'JavaScript', 'jspdf', 'svg2pdf'],
    category: 'other',
    featured: false,
  },
  {
    id: 'socket-io',
    title: 'Socket.io',
    description: 'Node.js + Socket.io für Echtzeit-Kommunikation.',
    technologies: ['Node.js', 'Socket.io'],
    category: 'other',
    featured: false,
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Anmeldung/Abmeldung, Captcha, IMAP, serialize→JSON-Migration.',
    technologies: ['PHP', 'IMAP', 'GD'],
    category: 'other',
    featured: false,
  },
  {
    id: 'parser',
    title: 'Parser',
    description: 'Link-Extraktion von Webseiten (z.B. medica.de), DOMDocument.',
    technologies: ['PHP', 'Regex', 'DOMDocument'],
    category: 'other',
    featured: false,
  },
  {
    id: 'umdns',
    title: 'umdns',
    description: 'UMDNS-Verarbeitung.',
    technologies: ['PHP'],
    category: 'other',
    featured: false,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'Diese Website: Next.js, TypeScript, Tailwind, Prisma, Blog, Web3, Kontakt.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth.js'],
    githubUrl: 'https://github.com/selcuk-karateke/selcuk-karateke',
    liveUrl: 'https://selcuk.karateke.org',
    category: 'other',
    featured: true,
  },
]

export const guidedProjects: GuidedProject[] = [
  {
    id: 'dc-alex',
    title: 'DataConverter v5.0',
    developer: 'alex',
    role: 'Projektleitung, technische Abnahme, Architektur-Review',
    description:
      'Multi-Threading-Datenkonverter für medizinische Einrichtungen. OSM/Overpass, optional Google Maps und CSV. Company-Schema (COMPANIES, ADDRESSES, CONTACTS, SPECIALISATIONS, TAGS).',
    features: [
      'Parallele Verarbeitung mit PHP parallel (4 Threads, Chunk-basiert)',
      'OSMConverter, GoogleMapsConverter, CSVConverter',
      'ChunkProcessor, ThreadManager, Logger',
      'Timeout-Handling, deduplizierte JSON-Ausgabe pro Land/Amenity',
    ],
    technologies: ['PHP', 'parallel', 'pdo_mysql', 'pcntl', 'Overpass API'],
    useCases: ['Krankenhäuser in DE/FR/IT aus OSM ins Firmen-Universum einspielen'],
    rebuildable: 'Ja – MVP sequentiell, Overpass-Only möglich.',
  },
  {
    id: 'dc-knobloch',
    title: 'DataConverter (Web-UI)',
    developer: 'knobloch',
    role: 'Projektleitung, technische Abnahme',
    description:
      'Web-Converter ohne Multi-Threading. Tabs: Schema Info, CSV, Overpass, Google Places → gemeinsames Company-Schema.',
    features: [
      'CSV-Import aus Verzeichnis',
      'Overpass-Query nach Land + Amenity',
      'Google Places: Type, Location, Radius',
    ],
    technologies: ['PHP', 'pdo_mysql', 'cURL', 'MySQL', 'Google Places API', 'Overpass API'],
    useCases: ['CSV und OSM-Daten in ein Schema bringen'],
    rebuildable: 'Ja – MVP mit CSV + Overpass ohne Google.',
  },
  {
    id: 'prompt-doc',
    title: 'Prompt-Dokumentation',
    developer: 'diane',
    role: 'Projektleitung, technische Abnahme',
    description:
      'Versionierung von Prompts für LLMs. Filter, Version-Dropdown, parent_id.',
    features: [
      'readAll(true) – neueste Version pro Prompt',
      'getVersions, createNewVersion, delete inkl. aller Versionen',
    ],
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'Highlight.js'],
    useCases: ['Sales-Prompts nach Kanal filtern', 'Prompt klonen als neue Version'],
    rebuildable: 'Ja – CRUD + Versionierung, z.B. Laravel + Vue.',
  },
  {
    id: 'workflow-doc',
    title: 'Workflow-Dokumentation',
    developer: 'mathew',
    role: 'Projektleitung, technische Abnahme',
    description:
      'Workflows/Prozesse mit Versionierung. E-Mail-Vorlagen für Taschentypen.',
    features: ['Workflows wie Prompts versioniert', 'Vertrieb, Onboarding'],
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'Markdown'],
    useCases: ['Angebotsprozess dokumentiert nachschlagen'],
    rebuildable: 'Ja',
  },
  {
    id: 'img-chk-scraper',
    title: 'Image Checker & Scraper',
    developer: 'john',
    role: 'Projektleitung, technische Abnahme',
    description:
      'img_chk mit TinEye/OCR. Scraper: medica, DMEA, Gelbeseiten, Taiwan HC. Cronjobs JSON→DB.',
    features: ['TinEye', 'OCR', 'Mehrere Messen-Scraper', 'scraper_to_db'],
    technologies: ['PHP', 'Node.js', 'TinEye API', 'OCR', 'cURL'],
    useCases: ['Produktbilder zuordnen', 'Firmendaten von Messen sammeln'],
    rebuildable: 'Teilweise – TinEye-API nötig für img_chk.',
  },
  {
    id: 'druck-pdf',
    title: 'Druck-PDFs & Schnittmuster',
    developer: 'john',
    role: 'Projektleitung, technische Abnahme',
    description: 'Druck-PDFs und Schnittmuster für Taschen-Typen. jsPDF, svg2pdf, spetzi_generator.',
    features: ['SVG-Schnittmuster', 'taschen_types.json', 'Backups'],
    technologies: ['HTML', 'JavaScript', 'jsPDF', 'svg2pdf', 'SVG'],
    useCases: ['Schnittmuster pro Taschentyp generieren'],
    rebuildable: 'Ja',
  },
  {
    id: 'wsschat',
    title: 'WebSocket-Chat',
    developer: 'john',
    role: 'Projektleitung, technische Abnahme',
    description: 'Node.js-WebSocket-Chat mit SSL/Let\'s Encrypt.',
    features: ['Echtzeit-Chat', 'SSL'],
    technologies: ['Node.js', 'WebSocket', 'SSL'],
    useCases: ['Interner Echtzeit-Chat'],
    rebuildable: 'Ja',
  },
  {
    id: 'aufgabenverwaltung',
    title: 'Aufgabenverwaltung',
    developer: 'levent',
    role: 'Projektleitung, technische Abnahme',
    description:
      'Tasks: Suche, Pagination, Kategorien, Drag & Drop, wiederkehrende Aufgaben, Archiv.',
    features: ['Drag & Drop', 'Wiederholung', 'Erinnerungen', 'Archiv'],
    technologies: ['PHP', 'PDO', 'MySQL', 'Bootstrap', 'AJAX'],
    useCases: ['Team-Tasks organisieren'],
    rebuildable: 'Ja',
  },
  {
    id: 'companies-api',
    title: 'Companies-API',
    developer: 'robin',
    role: 'Projektleitung, technische Abnahme',
    description:
      'JSON-API: Detail per id_company, Volltextsuche, Relevanz-Scoring, Pagination.',
    features: ['Detail-Abruf', 'Volltextsuche', 'Pagination'],
    technologies: ['PHP', 'PDO', 'MySQL'],
    useCases: ['Autocomplete, Admin-UI'],
    rebuildable: 'Ja',
  },
  {
    id: 'db-test',
    title: 'DB-Verbindungstest',
    developer: 'dominik',
    role: 'Projektleitung, technische Abnahme',
    description: 'Lern-Script: PDO mit EXCEPTION-Mode, Beispiel-Query.',
    features: ['getDatabaseConnection()', 'PDO-Beispiel'],
    technologies: ['PHP', 'PDO', 'MySQL'],
    useCases: ['Einstieg PDO'],
    rebuildable: 'Ja',
  },
]

export function getProjectById(id: string): Project | undefined {
  return professionalProjects.find((p) => p.id === id)
}

export function getGuidedProjectById(id: string): GuidedProject | undefined {
  return guidedProjects.find((p) => p.id === id)
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return professionalProjects.filter((p) => p.category === category)
}

export const featuredProjects = professionalProjects.filter((p) => p.featured)
