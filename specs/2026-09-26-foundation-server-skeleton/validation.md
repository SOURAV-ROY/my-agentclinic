# Validation — Phase 0.1 Foundation Server Skeleton

Merge bar: Build + `npm test` green + /healthz 200 + / home 200.

## Must pass

- [ ] `npm install` succeeds on clean checkout (no extra services)
- [ ] `npm run build` succeeds with zero TS errors, emits `dist/index.js` (+ `dist/app.js`, no test files)
- [ ] `npm test` passes: `src/app.test.ts` + `src/views/layout.test.ts` + `src/home.test.ts` (incl. responsive viewport/media-query checks) via Vitest
- [ ] `PORT=3000 node dist/index.js` boots without crash
- [ ] `GET http://localhost:3000/healthz` returns 200 + `{ "status": "ok" }` JSON via curl
- [ ] `GET http://localhost:3000/` returns 200 responsive HTML containing viewport meta + `<header>`, `<main>`, `<footer>` via layout subcomponents
- [ ] `GET http://localhost:3000/styles.css` returns 200 CSS containing media query for responsive layout + orange/black brand colors
- [ ] Layout files exist: `src/views/header.ts`, `src/views/main.ts`, `src/views/footer.ts`, `src/views/layout.ts` imports all three
- [ ] Same URLs load in current Chrome/Edge/Firefox/Safari narrow (360px) + wide (desktop) with no horizontal scroll showing JSON + responsive home page (Steve: modern browser + responsive)
- [ ] Unknown route returns 404 (reliability check, Mary)

## Merge checklist

- [ ] Scope matches `requirements.md` (no DB/full-dashboard creep)
- [ ] Plan groups 1-4 complete and demoable in <60s for students/booth devs (mission.md audience)
- [ ] No strict TS violations, no secrets committed
- [ ] Branch `2026-09-26-foundation-server-skeleton` green on above (merged to `sourav`)
