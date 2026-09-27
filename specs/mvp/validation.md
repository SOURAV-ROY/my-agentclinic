# Validation — MVP (Mission Demo)

Merge bar: mission demo green (per user choice).

## Must pass

- [ ] `npm install` succeeds on clean checkout (no extra services)
- [ ] `npm run build` succeeds with zero TS errors, emits `dist/` with no test files
- [ ] `npm test` passes (all Vitest suites: routes, views, responsive, brand, per-resource CRUD) via `vitest run` against `:memory:` DB (dev file untouched)
- [ ] Boot creates `data/agentclinic.db`; restart retains created agents/appointments; `AGENTCLINIC_DB` override respected
- [ ] Mission demo end-to-end in <60s on responsive dashboard: onboard agent -> record ailment -> assign therapy -> book appointment, all visible on `/dashboard`
- [ ] Dashboard + resource pages load in current Chrome/Edge/Firefox/Safari narrow (360px) + wide (desktop) with no horizontal scroll (orange/black brand intact)
- [ ] Unknown routes return 404 JSON; invalid inputs rejected with 400 + friendly message (Mary: reliability)
- [ ] No strict TS violations, no secrets committed

## Merge checklist

- [ ] Scope matches `requirements.md` (full domain: shell + agents + ailments + therapies + booking + polish)
- [ ] Plan groups 1–6 complete, each demoable for students/booth devs (mission.md audience)
- [ ] README demo flow updated; CHANGELOG updated via update-changelog skill
- [ ] Branch `mvp` green on above, then merge to `sourav`
