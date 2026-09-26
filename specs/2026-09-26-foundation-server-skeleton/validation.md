# Validation — Phase 0.1 Foundation Server Skeleton

Merge bar: Build + /healthz 200 (per user choice).

## Must pass

- [ ] `npm install` succeeds on clean checkout (no extra services)
- [ ] `npm run build` succeeds with zero TS errors, emits `dist/index.js`
- [ ] `PORT=3000 node dist/index.js` boots without crash
- [ ] `GET http://localhost:3000/healthz` returns 200 + `{ "status": "ok" }` JSON via curl
- [ ] Same URL loads in current Chrome/Edge/Firefox/Safari showing JSON (Steve: modern browser)
- [ ] Unknown route returns 404 JSON (reliability check, Mary)

## Merge checklist

- [ ] Scope matches `requirements.md` (no DB/UI creep)
- [ ] Plan groups 1-3 complete and demoable in <60s for students/booth devs (mission.md audience)
- [ ] No strict TS violations, no secrets committed
- [ ] Branch `2026-09-26-foundation-server-skeleton` green on above, then merge to `sourav`
