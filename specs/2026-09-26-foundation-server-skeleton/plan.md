# Plan — Phase 0.1 Foundation Server Skeleton

Structure: Setup -> Routes -> Home -> Build (per user choice + home page addition).

## 1. Setup deps + config

- 1.1 Add `express` dependency + `@types/express`, `@types/node` dev deps
- 1.2 Ensure `package.json` scripts: `build: tsc`, `start: node dist/index.js`
- 1.3 Verify `tsconfig.json` strict + `src/` -> `dist/` still holds

## 2. App + /healthz route

- 2.1 Replace `src/index.ts` placeholder with Express app (PORT env, default 3000)
- 2.2 Implement `GET /healthz` -> 200 `{ status: ok }` JSON
- 2.3 Add minimal 404 + error handler for reliability (Mary)

## 3. Minimal home page

- 3.1 Implement `GET /` -> 200 HTML with AgentClinic title + tagline (place for AI agents to get relief)
- 3.2 Add minimal inline styling + link to `/healthz` for staff/demo check (Steve: attractive)
- 3.3 Ensure no extra deps/services; static string response for course/booth simplicity

## 4. Build + run + smoke

- 4.1 Run `npm install` + `npm run build` with zero TS errors
- 4.2 Boot `node dist/index.js`, curl `http://localhost:3000/healthz` + `http://localhost:3000/`
- 4.3 Load `http://localhost:3000/healthz` + `http://localhost:3000/` in modern browser (Steve), record result in validation
