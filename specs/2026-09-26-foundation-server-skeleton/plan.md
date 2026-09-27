# Plan — Phase 0.1 Foundation Server Skeleton

Structure: Setup -> Routes -> Home -> Build (per user choice + home page addition).

## 1. Setup deps + config

- 1.1 Add `express` dependency + `@types/express`, `@types/node` dev deps; add `vitest`, `supertest`, `@types/supertest` dev deps for validation
- 1.2 Ensure `package.json` scripts: `build: tsc`, `start: node dist/index.js`, `test: vitest run`
- 1.3 Verify `tsconfig.json` strict + `src/` -> `dist/` still holds; exclude `**/*.test.ts` from build

## 2. App + /healthz route

- 2.1 Create testable `src/app.ts` (Express app, no `listen`) + thin `src/index.ts` entry (PORT env, default 3000, `listen` only)
- 2.2 Implement `GET /healthz` -> 200 `{ status: ok }` JSON
- 2.3 Add minimal 404 + error handler for reliability (Mary)

## 3. Minimal home page with main layout

- 3.1 Create layout with subcomponents in own files: `src/views/header.ts` (`renderHeader()`), `src/views/main.ts` (`renderMain()`), `src/views/footer.ts` (`renderFooter()`), composed by `src/views/layout.ts` (`renderLayout()` imports the three)
- 3.2 Create responsive `public/styles.css` (mobile-first + media queries, orange/black brand), serve via `express.static`, link with `<link rel="stylesheet" href="/styles.css">` in layout (viewport meta required)
- 3.3 Implement `GET /` -> 200 HTML via layout (AgentClinic title + relief tagline + link to `/healthz`); keep no extra deps/services

## 4. Build + run + smoke

- 4.1 Run `npm install` + `npm run build` with zero TS errors
- 4.2 Run `npm test` (Vitest): `src/app.test.ts` (/healthz, /, 404) + `src/views/layout.test.ts` (header/main/footer) + `src/home.test.ts` (copy, content-types, responsive CSS/viewport) must pass
- 4.3 Boot `node dist/index.js`, curl `http://localhost:3000/healthz` + `http://localhost:3000/` + `http://localhost:3000/styles.css`
- 4.4 Load `http://localhost:3000/healthz` + `http://localhost:3000/` in modern browser narrow (360px) + wide (desktop) viewports, no horizontal scroll (Steve), record result in validation
