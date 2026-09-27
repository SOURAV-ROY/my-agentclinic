# Plan — Phase 2.13 SQLite Migration Strategy

Structure: Extract -> Runner -> Cutover (per user choice).

## 1. Extract current schema into versioned files

- 1.1 Snapshot the four `CREATE TABLE` statements from `src/models.ts` (`agents`, `ailments`, `therapies`, `appointments`) into `data/migrations/001-*.sql` (one file per table or one baseline file — keep single baseline for reviewability, e.g. `001-baseline-schema.sql`).
- 1.2 Add `002-schema-migrations.sql` (or fold into runner) creating `schema_migrations (version TEXT PRIMARY KEY, appliedAt TEXT NOT NULL)` if not handled by the runner itself.
- 1.3 Verify extracted SQL replays cleanly on an empty `:memory:` DB (no syntax drift from the current `db.exec` block).

## 2. Runner (order, tracking, boot apply)

- 2.1 Create typed runner (e.g. `src/migrate.ts`): list `data/migrations/*.sql` sorted, read `schema_migrations` for applied versions, run pending files in order, record each version with timestamp.
- 2.2 Wire boot order in `src/models.ts` / entry: ensure `data/` dir exists, open `DatabaseSync` (`AGENTCLINIC_DB` or `data/agentclinic.db`, `:memory:` when `VITEST`), call `applyMigrations()` before `loadAll()` and before `seedStore()`.
- 2.3 Handle edge cases: missing `data/migrations/` dir (fail loudly with path), partially applied state (abort on first SQL error, leave tracking consistent), idempotent rerun (zero pending = no-op).

## 3. Cutover src/models.ts + tests + verify

- 3.1 Delete the ad-hoc `db.exec` schema block from `src/models.ts`; keep types, `store`, `loadAll`, `insert*/persist*`, `find*`, `resetStore`, `seedStore` behavior unchanged.
- 3.2 Add Vitest suites (e.g. `src/migrate.test.ts`): fresh `:memory:` migrates to full schema; rerun is idempotent; out-of-order files apply in sorted order; seed after migrate produces the MVP fixtures; `AGENTCLINIC_DB` temp-file boot retains data across reopens.
- 3.3 Run `npm install` + `npm run build` (zero TS errors, no test files in `dist/`) + `npm test` green; boot `node dist/index.js` on empty temp DB and on existing `data/agentclinic.db`, confirming tables + retained rows and `schema_migrations` contents.
