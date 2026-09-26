# Validation — Phase 0.1 Foundation Server Skeleton

Merge bar: Build + /healthz 200 + / home 200 (per user choice + home page addition).

## Must pass

- [ ] `npm install` succeeds on clean checkout (no extra services)
- [ ] `npm run build` succeeds with zero TS errors, emits `dist/index.js`
- [ ] `PORT=3000 node dist/index.js` boots without crash
- [ ] `GET http://localhost:3000/healthz` returns 200 + `{ "status": "ok" }` JSON via curl
- [ ] `GET http://localhost:3000/` returns 200 HTML containing AgentClinic via curl
- [ ] Same URLs load in current Chrome/Edge/Firefox/Safari showing JSON + home page (Steve: modern browser)
- [ ] Unknown route returns 404 (reliability check, Mary)

## Merge checklist

- [ ] Scope matches `requirements.md` (no DB/full-dashboard creep)
- [ ] Plan groups 1-4 complete and demoable in <60s for students/booth devs (mission.md audience)
- [ ] No strict TS violations, no secrets committed
- [ ] Branch `2026-09-26-foundation-server-skeleton` green on above, then merge to `sourav`
