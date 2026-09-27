# Requirements — Phase 2.13 SQLite Migration Strategy

Branch: `2026-09-27-sqlite-migrations`
Roadmap ref: `specs/roadmap.md` Phase 2.13 — SQLite migration strategy — versioned `data/migrations/` + `schema_migrations` tracking applied at boot

## Scope (Migrations + boot apply, per user choice)

In scope:
- Versioned SQL migration files in `data/migrations/` (`001-*.sql`, `002-*.sql`, …) capturing the current schema in `src/models.ts` (agents, ailments, therapies, appointments tables as created by the ad-hoc `db.exec` block).
- `schema_migrations` tracking table recording applied versions; migrations applied in filename order at boot before seeding.
- Boot ordering: ensure `data/` directory exists (`fs.mkdirSync` recursive, as today), open `DatabaseSync` at `data/agentclinic.db` (override via `AGENTCLINIC_DB`, `:memory:` under Vitest), run pending migrations, then call existing `seedStore()`.
- Preserve existing dev data: fresh boot on empty DB creates all tables via migrations; restart retains created agents/appointments; existing `data/agentclinic.db` upgrades without data loss (idempotent reruns apply nothing twice).
- Remove ad-hoc DDL from `src/models.ts`; all schema changes go only via new migration files.
- Migration + persistence tests in Vitest (never touching the dev file): ordering, tracking, idempotency, seed-after-migrate.

Out of scope (deferred):
- No seed-content change beyond ordering (same Helper-1/Clerk-2/Scout-3 + therapies/ailments/appointments fixtures).
- No ORM switch (stay on Node built-in `node:sqlite` `DatabaseSync` + typed repository layer in `src/models.ts`, per `specs/tech-stack.md`).
- No formatter/CI work (Prettier + CI workflow is Phase 2.14).
- No new domain resources, routes, dashboard widgets, or brand changes.
- No auth, billing, or complex validation (mission.md non-goals).

## Decisions

- Migration file convention: zero-padded numeric prefix + kebab-case description (`001-create-agents.sql`, …), one logical schema change per file, plain SQL with `CREATE TABLE IF NOT EXISTS` for safe replay during cutover.
- Runner location: small typed module (e.g. `src/migrate.ts`) exporting `applyMigrations(db, migrationsDir)` returning applied versions; `src/models.ts` / `src/index.ts` boot path calls it before `loadAll()`/`seedStore()`.
- Tracking: `CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, appliedAt TEXT NOT NULL)`; each file runs in order inside the existing sync flow; failures abort boot with a clear error.
- Tests use `:memory:` DB + temp migration dir (or inline fixtures) so `npm test` never touches `data/agentclinic.db`.
- `data/agentclinic.db` stays gitignored; `data/migrations/*.sql` is committed.

## Context

Guidance from `specs/mission.md`:
- Staff must onboard an agent, record an ailment, assign therapy, and book an appointment with migrations applied cleanly; every change ships with tests green.
- Audience is course students + booth demo devs — setup stays `npm install && npm run build && npm test && node dist/index.js` with zero extra services.

Guidance from `specs/tech-stack.md` + existing `specs/mvp/` spec:
- Node LTS + Express + TS strict; `src/` -> `dist/`; `npm test` (`vitest run`) gates every slice.
- SQLite file DB (`data/agentclinic.db`, `AGENTCLINIC_DB` override); `:memory:` under Vitest.
- Schema changes only via versioned migrations in `data/migrations/`, never ad-hoc DDL — this phase implements that rule by extracting the current `src/models.ts` DDL.
- Follows `specs/2026-09-26-foundation-server-skeleton/` + `specs/mvp/` file style: `requirements.md` (scope/decisions/context), `plan.md` (numbered groups), `validation.md` (merge bar).
