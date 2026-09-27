# Validation — Phase 2.13 SQLite Migration Strategy

Merge bar: Full gate + persistence (per user choice) — build + tests + migration idempotency + restart persistence.

## Must pass

- [ ] `npm install` succeeds on clean checkout (no extra services)
- [ ] `npm run build` succeeds with zero TS errors, emits `dist/` with no test files
- [ ] `npm test` passes (all Vitest suites including new migrate/persistence suites) via `vitest run` against `:memory:` / temp DBs (dev `data/agentclinic.db` untouched)
- [ ] Fresh boot on empty DB (temp `AGENTCLINIC_DB`) creates `agents`, `ailments`, `therapies`, `appointments` plus `schema_migrations` via `data/migrations/*.sql` only (no ad-hoc DDL in `src/models.ts`)
- [ ] Rerun / restart is idempotent: second boot applies zero migrations, retains created agents/appointments, `schema_migrations` unchanged
- [ ] Existing `data/agentclinic.db` boots and upgrades without data loss (pre-migration rows still present after cutover)
- [ ] `AGENTCLINIC_DB` override respected; `VITEST=:memory:` path still migrates + seeds in tests
- [ ] Migration failure (bad SQL) aborts boot with a clear error and does not record a version
- [ ] Mission demo still end-to-end in <60s: onboard agent -> record ailment -> assign therapy -> book appointment, visible on `/dashboard`
- [ ] No strict TS violations, no secrets committed, `data/*.db` untracked while `data/migrations/*.sql` committed

## Merge checklist

- [ ] Scope matches `requirements.md` (migrations + boot apply only; no seed-content, ORM, CI/formatter, or UI creep)
- [ ] Plan groups 1–3 complete, each demoable for students/booth devs (mission.md audience)
- [ ] `data/migrations/` files ordered + tracked; `src/models.ts` contains no `CREATE TABLE` DDL
- [ ] Branch `2026-09-27-sqlite-migrations` green on above, then merge to `sourav`
