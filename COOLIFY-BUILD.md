# Coolify: Build dauert ~8 Minuten?

## Ursache (aus deinen Logs)

Coolify baut mit **Nixpacks**, nicht mit dem **`Dockerfile`** im Repo:

```
Generating nixpacks configuration with: nixpacks plan ...
Building docker image started.   ← 13:58:11
Building docker image completed. ← 14:05:20  (~7 min nur Build)
```

Die Optimierungen (Layer-Cache, weniger Static Pages, `standalone`) stecken im **Dockerfile** — solange Nixpacks aktiv ist, **passiert das nicht**.

## Fix in Coolify (einmalig)

1. App **selcuk-karateke** auf cool.kawai-labs.com öffnen  
2. **Configuration** → **Build Pack** (oder „Build“)  
3. Von **Nixpacks** auf **Dockerfile** umstellen  
4. Dockerfile-Pfad: `Dockerfile` (Root)  
5. **Build Cache** aktivieren (Server/Deployment-Einstellung)  
6. Neu deployen  

Start-Befehl kommt aus dem Dockerfile: `node server.js` — Port **3000**.

## Erwartung danach

| Build | Dauer (ca.) |
|-------|-------------|
| Erster Dockerfile-Build | 6–8 min |
| Nur Code geändert (Cache) | **3–5 min** |
| `package-lock.json` geändert | 5–7 min |

## Prüfen ob es geklappt hat

Im Deploy-Log muss stehen:

- ✅ `Step 1/… FROM node:20-alpine` (Dockerfile-Stages)  
- ❌ **nicht** `nixpacks plan` / `Found application type: node`

Details: [docs/DEPLOY-COOLIFY.md](./docs/DEPLOY-COOLIFY.md)
