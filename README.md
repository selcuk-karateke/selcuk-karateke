# Portfolio Selçuk Karateke

Ein modernes, vollständiges Portfolio mit Next.js, PostgreSQL, Web3-Integration und CMS-Funktionalität.

## 🚀 Features

- **Next.js 15** mit TypeScript und App Router
- **PostgreSQL** Datenbank mit Prisma ORM
- **NextAuth.js** für Authentifizierung
- **Web3-Integration** mit RainbowKit und Wagmi
- **Blog-System** mit Kommentarfunktion
- **CMS-Admin-Panel** für Inhaltsverwaltung
- **Responsive Design** mit Tailwind CSS
- **MVC-Architektur** für saubere Code-Organisation
- **Rechtliche Seiten** (Impressum, Datenschutz, AGB)

## 🛠️ Technologien

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Headless UI

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js
- bcryptjs

### Web3
- RainbowKit
- Wagmi
- Viem
- Ethers.js

### Development
- ESLint
- Prettier
- TypeScript

## 📦 Installation

1. **Repository klonen**
```bash
git clone <repository-url>
cd portfolio-selcuk
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren**
```bash
cp .env.example .env.local
```

Bearbeiten Sie `.env.local` mit Ihren Werten:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_selcuk?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Web3
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
```

4. **Datenbank einrichten**
```bash
npx prisma generate
npx prisma db push
```

5. **Entwicklungsserver starten**
```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:3000` verfügbar.

## 🗄️ Datenbankschema

Das Portfolio verwendet folgende Hauptmodelle:

- **User** - Benutzer für Authentifizierung
- **Project** - Portfolio-Projekte
- **Skill** - Technische Fähigkeiten
- **Experience** - Berufserfahrung
- **Education** - Ausbildung
- **Certification** - Zertifikate
- **Post** - Blog-Artikel
- **Comment** - Blog-Kommentare
- **ContactMessage** - Kontaktformular-Nachrichten
- **Wallet** - Web3-Wallet-Verifizierung

## 🎨 Seitenstruktur

### Öffentliche Seiten
- `/` - Startseite mit Hero, About, Skills, Projects, Experience, Web3, Contact
- `/about` - Detaillierte Informationen über Selçuk Karateke
- `/projects` - Alle Projekte im Detail
- `/blog` - Blog-Übersicht
- `/blog/[slug]` - Einzelne Blog-Artikel
- `/contact` - Kontaktformular
- `/impressum` - Impressum
- `/datenschutz` - Datenschutzerklärung
- `/agb` - Allgemeine Geschäftsbedingungen

### Admin-Bereich
- `/admin` - Dashboard
- `/admin/projects` - Projektverwaltung
- `/admin/blog` - Blog-Verwaltung
- `/admin/skills` - Skills-Verwaltung
- `/admin/messages` - Nachrichtenverwaltung

## 🔐 Authentifizierung

Das System unterstützt verschiedene Authentifizierungsmethoden:

- **Credentials** (E-Mail/Passwort)
- **Google OAuth**
- **GitHub OAuth**

Admin-Zugriff ist nur für authentifizierte Benutzer möglich.

## 🌐 Web3-Features

- **Wallet-Verbindung** mit RainbowKit
- **Multi-Chain-Support** (Ethereum, Polygon, Arbitrum, Optimism)
- **Wallet-Verifizierung** für zusätzliche Funktionen
- **Blockchain-Projekt-Darstellung**

## 📝 Blog-System

- **CRUD-Operationen** für Blog-Posts
- **Kommentar-System** mit Moderation
- **Tag-System** für Kategorisierung
- **SEO-optimierte URLs** mit Slugs
- **Rich-Text-Editor** für Inhalte

## 🎯 CMS-Funktionalität

Das Admin-Panel bietet:

- **Dashboard** mit Statistiken
- **Projektverwaltung** (Hinzufügen, Bearbeiten, Löschen)
- **Blog-Verwaltung** (Posts erstellen, bearbeiten, veröffentlichen)
- **Skills-Verwaltung** (Fähigkeiten hinzufügen, Kategorien verwalten)
- **Nachrichtenverwaltung** (Kontaktformular-Nachrichten anzeigen)
- **Kommentar-Moderation** (Kommentare freigeben/ablehnen)

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Projekt zu Vercel verbinden**
```bash
npx vercel
```

2. **Umgebungsvariablen in Vercel Dashboard setzen**

3. **Datenbank-Migrationen ausführen**
```bash
npx prisma db push
```

### Andere Plattformen

Das Projekt kann auf jeder Plattform deployed werden, die Next.js unterstützt:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
npm run dev          # Entwicklungsserver starten
npm run build        # Produktions-Build erstellen
npm run start        # Produktions-Server starten
npm run lint         # ESLint ausführen
npm run type-check   # TypeScript-Typen prüfen
```

### Datenbank-Migrationen

```bash
npx prisma migrate dev    # Neue Migration erstellen
npx prisma db push        # Schema zur Datenbank pushen
npx prisma studio         # Prisma Studio öffnen
```

## 📱 Responsive Design

Das Portfolio ist vollständig responsive und optimiert für:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Design-System

Das Design verwendet:

- **Tailwind CSS** für Styling
- **Framer Motion** für Animationen
- **Lucide React** für Icons
- **Headless UI** für Komponenten
- **Custom CSS** für spezielle Effekte

## 🔒 Sicherheit

- **NextAuth.js** für sichere Authentifizierung
- **bcryptjs** für Passwort-Hashing
- **CSRF-Schutz** durch NextAuth.js
- **SQL-Injection-Schutz** durch Prisma ORM
- **XSS-Schutz** durch React

## 📊 Performance

- **Next.js App Router** für optimale Performance
- **Image Optimization** durch Next.js
- **Code Splitting** automatisch durch Next.js
- **Static Generation** wo möglich
- **Edge Runtime** für API Routes

## 🤝 Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch
3. Committen Sie Ihre Änderungen
4. Pushen Sie zum Branch
5. Erstellen Sie einen Pull Request

## 📄 Lizenz

Dieses Projekt ist für den persönlichen Gebrauch von Selçuk Karateke bestimmt.

## 📞 Kontakt

**Selçuk Karateke**
- E-Mail: selcuk.karateke@live.de
- Telefon: 030 12074996
- Mobil: 0177 4616695
- Adresse: Möckernstraße 115, 10963 Berlin

---

Erstellt mit ❤️ von Selçuk Karateke