# Tech Stack — AgentClinic

Server-side TypeScript, per stakeholder requirement for reliable site on a popular TypeScript stack.

## Recommendation: Node.js + Express + TypeScript

- **Runtime:** Node.js LTS (server-side TypeScript execution)
- **Framework:** Express.js — most popular, minimal, reliable Node server framework
- **Language:** TypeScript (strict mode, see `tsconfig.json`)
- **Frontend framework:** Server-rendered views in `src/views/` (header/main/footer + `renderLayout`) + progressive enhancement for dashboard for agents and staff, ensuring modern-browser compatibility with no heavy build requirement in v1. No React in v1.
- **Backend API layer:** Express routes serving HTML dashboard pages + JSON API (`201`/`200` JSON for API clients, `302` redirects for browser forms, `400`/`404` JSON errors).
- **Responsive:** Mobile-first CSS with viewport meta, fluid layout, and media queries — must work 360px mobile to desktop with no horizontal scroll
- **Brand:** Orange and black — black `#111` surfaces/text, orange `#f97316` accents / `#c2410c` text links on light, `#fb923c` links on black
- **Why Express:**
  - Popularity: largest ecosystem, easy hiring/onboarding (Mary: popular stack)
  - Reliability: mature, stable API, extensive middleware for validation/logging/security
  - Productivity: small core, fast to build CRUD for agents/ailments/therapies/appointments (Susan: features)
  - Browser-friendly: serves clean HTML/CSS for attractive modern-browser UI (Steve: attractive + modern browser)

- **Data:** SQLite file DB (`data/agentclinic.db`, override via `AGENTCLINIC_DB`) — zero services, single file for course/booth use; `:memory:` under Vitest
- **Database engine + ORM layer:** Node built-in `node:sqlite` (`DatabaseSync`) with a typed repository layer in `src/models.ts` (no external ORM in v1 — zero native-build risk on student/booth machines).
- **Migration strategy:** Versioned SQL migration files in `data/migrations/` (`001-*.sql`, `002-*.sql`, …), tracked in a `schema_migrations` table and applied in order at boot before seeding; every schema change ships with a new migration + tests. (Adopted by this constitution; implementation follows in the migrations phase.)
- **Testing:** Vitest for validation — fast, TypeScript-native unit/integration tests run via `npm test`
- **Tooling:** Formatter (Prettier) + `tsc` strict build; CI runs install, build, and tests on every push.

## Alternatives considered

- Next.js full-stack: richer frontend but heavier for v1 reliability goal.
- React SPA: richer interactivity but heavier build/tooling for v1 course and booth demo goals; revisit only if dashboard needs justify it.
- NestJS: structured enterprise API but more boilerplate than needed for small phases.
- Jest: heavier transform setup; Vitest preferred for speed + native ESM/TS support.
- better-sqlite3 / external ORM (Prisma/Drizzle): native builds or extra services complicate student/booth setup; `node:sqlite` keeps one file, zero services.

## Conventions

- `src/` holds server code, compiled with `tsc` to `dist/` (`package.json` scripts, `tsconfig.json`).
- Strict TypeScript, CommonJS modules, ES2023 target per current config.
- REST routes per resource, validated inputs, HTML dashboard + JSON API where useful.
- SQLite persistence in `src/models.ts` (schema + seed + file DB); tests use `:memory:` and never touch the dev file.
- Schema changes only via versioned migrations in `data/migrations/`, never ad-hoc DDL.
- Responsive web UI: viewport meta in layout, mobile-first `public/styles.css` with media queries, flexible header/main/footer; verify narrow + wide viewports.
- Brand UI: orange and black palette only for chrome/accents (black `#111`, orange `#f97316`/`#c2410c`/`#fb923c`); body text stays near-black on white for contrast.
- Validation via `npm test` (Vitest, `vitest run`); keep tests small and demoable for students/booth devs.
