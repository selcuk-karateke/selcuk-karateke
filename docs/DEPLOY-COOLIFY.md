# Coolify — schnellere Deploys

Typische Webhook-Deploys dauerten **~7–9 Minuten**, weil bei jedem Push fast alles neu gebaut wurde:

| Phase | Dauer (ca.) | Ursache |
|--------|-------------|---------|
| `npm ci` | 2–4 min | Dependencies ohne Cache |
| `prisma generate` | 30–60 s | bei jedem Build |
| `next build` | 3–5 min | viele statische Seiten (Legacy-Routen) |

## Änderungen im Repo

1. **`Dockerfile`** — Layer-Cache: `npm ci` nur bei geändertem `package-lock.json`
2. **`postinstall`** — `prisma generate` läuft beim Install, nicht extra im Build
3. **`output: 'standalone'`** — kleineres Runtime-Image, schnellerer Start
4. **Legacy-Routen dynamisch** — keine ~75 statischen Legacy-Seiten mehr beim Build

## Coolify einrichten

1. **Build Pack:** „Dockerfile“ wählen (nicht Nixpacks), Pfad `Dockerfile`
2. **Build Cache** in Coolify aktivieren (Server-Einstellung / Deployment-Cache)
3. **Start Command:** wird vom Dockerfile übernommen → `node server.js`
4. **Port:** `3000`
5. **Env:** `DATABASE_URL` für Prisma (Production-DB, nicht `file:./dev.db` wenn persistent nötig)

## Erwartung

| Szenario | Dauer (ca.) |
|----------|-------------|
| Erster Build | 6–8 min |
| Nur Code-Änderung (Cache hit) | **3–5 min** |
| `package-lock.json` geändert | 5–7 min |

## Webhook-Tipp

Jeder Push triggert einen vollen Build. Für Work-in-Progress: Feature-Branch ohne Webhook deployen, erst `main` an Coolify hängen.

## Lokal testen

```bash
docker build -t portfolio-selcuk .
docker run -p 3000:3000 -e DATABASE_URL="file:./dev.db" portfolio-selcuk
```
