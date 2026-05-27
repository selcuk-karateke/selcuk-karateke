# Legacy-Audit (portfolio + own_website)

Stand: Vergleich `l:/repos/portfolio`, `l:/repos/own_website` mit `selcuk-karateke`.

## Kurzfassung

| Bereich | Status | Kanonische Route |
|--------|--------|------------------|
| **Übungen (exer/)** | Migriert | `/uebungen/{slug}` — 42 React-Builtins |
| **Bildung (educ/ + Stockwerke)** | Migriert | `/education/{floor}` — JSON in `content/education/` |
| **Kontakt** | Migriert | `/contact` (kein Legacy nötig) |
| **Portfolio-Start (index/main/page1/2)** | Ersetzt | `/` — alte Login-Demo obsolet |
| **Schulprojekte (proj/)** | Nur Archiv | `/legacy/.../proj/...` — Mock-APIs, HTML |
| **Spiele (MosaicJS, game/)** | Teilweise | HTML in Legacy, kein modernes Pendant |
| **desi/desi1, desi2** | Nie importiert | — |
| **own_website exercise/** (Duplikate) | → gleiche Slugs | Redirect auf `/uebungen/...` |

**Fazit:** Legacy für Übungen/Bildung kann weg (Redirects + neue App). Legacy nur noch sinnvoll für **proj/**-Archiv und ggf. MosaicJS — oder komplett entfernen, wenn Schulprojekte nicht mehr öffentlich sein sollen.

## Zahlen

- Portfolio PHP: 153 Dateien (viele Klassen/libs, nicht routbar)
- Own website PHP: 61 Dateien
- `exerciseCatalog`: 42 Übungen (alle mit Builtin)
- `content/education`: 10 portfolio + 12 own_website JSON
- `content/exercises`: 42 JSON (Prose/Metadaten)
- `legacyRoutes` (nach Bereinigung): nur noch proj + Einstieg + contacts
- `public/legacy-assets`: ~9 MB — **behalten** (Bilder, Audio piep.mp3, Übungs-Assets)

## Was noch fehlt / Ideen

1. **desi/desi1, desi2** — Design-Übungen im alten Portfolio, nie ins Next-Repo übernommen. Idee: weglassen oder 1 Seite unter `/uebungen` nachziehen.
2. **proj/** (35–45, game) — Nur statisches Archiv + Mock-CRUD. Idee: ZIP/Readme statt Live-SSR; oder 3–5 Highlights unter `/projects` verlinken.
3. **MosaicJS** — Eigene kleine Spiel-Engine. Idee: statischer Export nach `public/games/mosaic` oder Link „nicht mehr verfügbar“.
4. **comhard/fahrrad/ziel** — Einzelseite Own Website. Idee: Redirect `/education` oder ignorieren.
5. **Legacy-APIs** (`/api/legacy/*`) — Nur für LegacyFeaturePanel. Mit Entfernung von `/legacy/.../proj` können APIs weg.
6. **Coolify Timeouts** — `force-dynamic` auf Legacy-Route + PHP/HTML-Parsing. Behoben durch `next.config` Redirects für exer/educ; proj-Routen weiterhin schwer.

## Entfernt / umgeleitet (Implementierung)

- `next.config` 308-Redirects: alle `exerciseCatalog`-Pfade, `educ/*`, `/akademie/*`
- Zusätzliche Aliase: `own_website/exercise/*` → gleiche `/uebungen`-Slugs
- `legacyRoutes`: Einträge für educ + exer entfernt
- `content/legacy/**/educ`, `exer`, Own-Website-Stockwerke: optional gelöscht (nur Archiv; Runtime nutzt JSON/Builtins)

## Behalten bis Entscheidung

- `src/app/legacy/[source]/[[...slug]]` — nur noch für proj + Rest
- `public/legacy-assets` — von Übungen, Pomodoro, Math genutzt
- `content/legacy/**/proj` — HTML-Fallback für Schulprojekte
