# Requirements — Phase 0.1 Foundation Server Skeleton

Branch: `2026-09-26-foundation-server-skeleton`
Roadmap ref: `specs/roadmap.md` Phase 0.1 — Express + TypeScript server skeleton with `/healthz`

## Scope (Minimal skeleton)

In scope:
- Node.js + Express + TypeScript server per `specs/tech-stack.md`
- `GET /healthz` returns 200 JSON e.g. `{ "status": "ok" }`
- `GET /` returns 200 minimal HTML AgentClinic home page (title + relief tagline + link to `/healthz`)
- `src/` -> `dist/` build via `tsc` (`npm run build`)
- `npm start`-able entry (`node dist/index.js`, default port 3000)
- Strict TypeScript, CommonJS, ES2016 per existing `tsconfig.json`
- Layout split: `src/views/header.ts`, `src/views/main.ts`, `src/views/footer.ts` as own files, composed by `src/views/layout.ts`

Out of scope (deferred):
- No DB/SQLite, no agents/ailments/therapies/appointments models (Phases 1-4)
- No full dashboard shell/UI polish (Phase 0.2 / 5.1) — home page is static only
- No auth, billing, or complex validation (mission.md non-goals)

## Decisions

- Framework: Express.js — popular, reliable, minimal (tech-stack.md recommendation).
- Language: server-side TypeScript strict, following `src/` conventions.
- Layout: header/main/footer in own files for course clarity + booth demo reuse; `layout.ts` only composes.
- Transport: JSON over HTTP for `/healthz` + minimal HTML for `/`; full HTML dashboard comes in 0.2.
- Port: 3000 default, overridable via `PORT` env for course/booth flexibility.

## Context

Guidance from `specs/mission.md`:
- AgentClinic is a place for AI agents to get relief; this skeleton unblocks all domain phases.
- Must stay reliable + modern-browser loadable (Mary + Steve).
- Target audience: course students learning spec-driven dev + booth demo devs — keep setup to `npm install && npm run build && node dist/index.js` with zero extra services.

Guidance from `specs/tech-stack.md`:
- Node LTS + Express + TS strict; REST per resource (starting with `/healthz`); `src/` compiled to `dist/`.
