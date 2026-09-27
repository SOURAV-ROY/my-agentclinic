# Requirements — MVP (Full Domain)

Branch: `mvp`
Roadmap ref: `specs/roadmap.md` — Phase 0 (0.2–0.3), Phase 1 (1.1–1.3), Phase 2 (2.1–2.12). Phase 0.1 is Done.

## Scope (Full domain, per user choice)

In scope — everything needed for the mission success criteria:
- 0.2 Responsive dashboard shell (agents/staff entry point, 360px mobile to desktop, orange/black brand)
- Phase 1 Agents: 1.1 model + create/list, 1.2 detail + edit, 1.3 dashboard agents widget
- Phase 2 Ailments: 2.1 model + create/list linked to agent, 2.2 detail + edit, 2.3 dashboard widget
- Phase 2 Therapies: 2.4 catalog model + create/list, 2.5 detail + edit, 2.6 map therapies to ailments
- Phase 2 Appointments: 2.7 booking (agent + ailment + therapy + time), 2.8 list/staff view + cancel/reschedule, 2.9 upcoming-appointments widget
- Phase 2 Polish: 2.10 responsive brand styling pass, 2.11 validation + error hardening, 2.12 README demo flow + v1 check (incl. 0.3 build + Vitest + smoke)

Out of scope (deferred past MVP):
- No SQLite persistence yet (in-memory store; zero extra services for course/booth); SQLite adoption is a later tech-stack decision
- No auth, billing, or complex validation (mission.md non-goals)
- No native/mobile apps; responsive modern-browser web only

## Decisions

- Framework: Express.js + server-side TypeScript strict, per `specs/tech-stack.md`.
- UI: server-rendered views extending `src/views/layout.ts` (header/main/footer) + `public/styles.css` (mobile-first, orange `#f97316`/`#c2410c`/`#fb923c` on black `#111`); viewport meta required.
- Data: in-memory models first (Agent, Ailment, Therapy, Appointment with ids + timestamps); REST + HTML dashboard per resource, following the testable `src/app.ts` (no listen) + thin `src/index.ts` pattern.
- Testing: Vitest + Supertest gate every slice (`npm test`); tests excluded from `tsc` build; keep slices demoable for students/booth devs.

## Context

Guidance from `specs/mission.md`:
- AgentClinic relieves AI agents from humans; staff must onboard an agent, record an ailment, assign therapy, and book an appointment — that end-to-end flow IS the MVP demo.
- Dashboard for agents + staff (Mary); reliable + responsive + attractive in modern browsers (Mary + Steve).
- Audience: course students + booth demo devs — setup stays `npm install && npm run build && npm test && node dist/index.js`.

Guidance from `specs/tech-stack.md` + existing `specs/2026-09-26-foundation-server-skeleton/` spec:
- Node LTS + Express + TS strict; REST per resource; `src/` -> `dist/`; `npm test` (`vitest run`) required; responsive + brand conventions carry into every new view.
