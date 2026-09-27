# Roadmap — AgentClinic

High-level implementation order in very small phases, domain order.
Note: no `TODO.md` exists in the repo, so this roadmap is based on the stakeholder features in `README.md` (agents, ailments, therapies, booking, dashboard) plus the standing constitution. If a `TODO.md` lands, reconcile it here.

## Phase 0 — Foundation

- 0.1: Express + TypeScript server skeleton with `/healthz` — Done (`2026-09-26-foundation-server-skeleton`: `/healthz` JSON + responsive `/` layout header/main/footer + `/styles.css` + Vitest `npm test`)
- 0.2: Responsive base layout + dashboard shell (agents/staff entry point, 360px mobile to desktop) — Implemented in `mvp`, pending merge
- 0.3: Build (`tsc`) + Vitest (`npm test`) + responsive smoke test in modern browser (narrow + wide viewports)

## Phase 1 — Agents

- 1.1: Agent model + create/list — Implemented in `mvp`, pending merge
- 1.2: Agent detail + edit — Implemented in `mvp`, pending merge
- 1.3: Dashboard agents widget — Implemented in `mvp`, pending merge

## Phase 2 — Care + Polish (Ailments, Therapies, Appointments, Polish)

- 2.1: Ailment model + create/list linked to agent — Implemented in `mvp`, pending merge
- 2.2: Ailment detail + edit — Implemented in `mvp`, pending merge
- 2.3: Dashboard ailments widget — Implemented in `mvp`, pending merge
- 2.4: Therapy catalog model + create/list (was 3.1) — Implemented in `mvp`, pending merge
- 2.5: Therapy detail + edit (was 3.2) — Implemented in `mvp`, pending merge
- 2.6: Map therapies to ailments (was 3.3) — Implemented in `mvp`, pending merge
- 2.7: Appointment booking (agent + ailment + therapy + time) (was 4.1) — Implemented in `mvp`, pending merge
- 2.8: Appointment list / staff view + cancel/reschedule (was 4.2) — Implemented in `mvp`, pending merge
- 2.9: Dashboard upcoming-appointments widget (was 4.3) — Implemented in `mvp`, pending merge
- 2.10: Responsive attractive styling pass for modern browsers (mobile-first, orange/black brand, no horizontal scroll) (was 5.1) — Implemented in `mvp`, pending merge
- 2.11: Validation + error handling hardening (reliability) (was 5.2) — Implemented in `mvp`, pending merge
- 2.12: README demo flow + v1 release check (was 5.3) — README done in `mvp`, release check pending merge
- 2.13: SQLite migration strategy — versioned `data/migrations/` + `schema_migrations` tracking applied at boot (new per constitution interview)
- 2.14: Formatter + CI setup — Prettier + CI running install, build, and tests on every push (new per constitution interview)

Each sub-phase is independently demoable and keeps to one resource + one UI slice.
