# Coolify: Build dauert ~8 Minuten?

## Kurzantwort

| Problem | Anteil | Fix |
|---------|--------|-----|
| **Nixpacks statt Dockerfile** | ~40 % | Coolify → Build Pack **Dockerfile** |
| **`npm ci` (viele Pakete)** | ~30 % | Web3-Stack entfernt; Cache im Dockerfile |
| **`next build` (166 SSG-Seiten)** | ~30 % | Dockerfile-Cache; optional weniger SSG |

## Ursache (aus deinen Logs)

Coolify baut mit **Nixpacks**, nicht mit dem **`Dockerfile`** im Repo:

```
Generating nixpacks configuration with: nixpacks plan ...
$NIXPACKS_PATH
Building docker image started.   ← 13:58:11
Building docker image completed. ← 14:05:20  (~7 min nur Build)
```

Die Optimierungen (Layer-Cache, BuildKit-Cache-Mounts, `standalone`) stecken im **Dockerfile** — solange Nixpacks aktiv ist, **passiert das nicht**.

## Fix in Coolify (einmalig, Pflicht)

1. App **selcuk-karateke** auf cool.kawai-labs.com öffnen  
2. **Configuration** → **Build Pack** (oder „Build“)  
3. Von **Nixpacks** auf **Dockerfile** umstellen  
4. Dockerfile-Pfad: `Dockerfile` (Root)  
5. **Build Cache** aktivieren (Server/Deployment-Einstellung)  
6. Neu deployen  

Start-Befehl kommt aus dem Dockerfile: `node server.js` — Port **3000**.

## Drittanbieter-Bibliotheken (Stand Repo)

### Produktiv genutzt

| Paket | Zweck |
|-------|--------|
| `next`, `react`, `react-dom` | Framework |
| `@prisma/client`, `prisma` | DB + `postinstall generate` |
| `next-auth`, `@next-auth/prisma-adapter`, `bcryptjs` | Admin-Login |
| `framer-motion` | Animationen (About, Hero, …) |
| `@headlessui/react`, `@heroicons/react`, `lucide-react` | UI |
| `tailwindcss`, `postcss`, `autoprefixer` | CSS (Build) |

### Entfernt (waren aus, aber installiert)

| Paket | Problem |
|-------|---------|
| `wagmi`, `viem`, `@rainbow-me/rainbowkit` | Riesiger Baum (WalletConnect, …), UI war auskommentiert |
| `ethers`, `web3` | Nirgends importiert |
| `@tanstack/react-query` | Nur für RainbowKit |

Das spart beim `npm ci` grob **~400–600 MB** und oft **1–3 Minuten** Install-Zeit.

### Build-Last (nicht „böse“, aber zeitintensiv)

- **~166 statische Seiten** beim `next build` (Übungen, Projekte, Education, …)
- **`prisma generate`** bei jedem `npm ci` (`postinstall`)
- **ESLint** läuft während `next build` mit

## Erwartung danach

| Build | Dauer (ca.) |
|-------|-------------|
| Erster Dockerfile-Build | 5–7 min |
| Nur Code geändert (Cache) | **2–4 min** |
| `package-lock.json` geändert | 4–6 min |

## Prüfen ob es geklappt hat

Im Deploy-Log muss stehen:

- ✅ `FROM node:20-alpine` / `syntax=docker/dockerfile`  
- ✅ `RUN --mount=type=cache` (BuildKit)  
- ❌ **nicht** `nixpacks plan` / `Found application type: node`

Details: [docs/DEPLOY-COOLIFY.md](./docs/DEPLOY-COOLIFY.md)
