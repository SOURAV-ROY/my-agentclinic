# Requirements — Constitution Refresh (Separate Feature)

Branch: `2026-09-27-constitution`
Roadmap ref: constitution itself (`specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`).

## Scope

In scope (per 2026-09-27 interview):
- `mission.md`: Agent-relief core mission; keep both target audiences (course students + booth demo devs).
- `tech-stack.md`: close the ORM/migrations gap — `node:sqlite` repository layer + versioned `data/migrations/` strategy.
- `roadmap.md`: keep very-small-phase order; no `TODO.md` exists, so base it on `README.md` stakeholder features and note that; annotate MVP-covered items as pending merge; add migrations + formatter/CI phases.

Out of scope:
- No implementation (no migrations runner, no Prettier/CI workflow — those are roadmap phases 2.13/2.14).
- No frontend framework switch (no React in v1).
- No `TODO.md` creation.

## Decisions

- Separate feature branch + this spec dir so constitution updates stay reviewable and revertable apart from product code.
- Interview (grouped AskUserQuestion on mission/audience/gaps) is required before writing constitution files.
- Existing staged refresh on this branch already matches the interview answers; this feature verifies and keeps it.

## Context

Guidance from `README.md` stakeholders: Mary (reliable TypeScript + dashboard), Susan (agents/ailments/therapies/booking), Steve (attractive + modern browser).
