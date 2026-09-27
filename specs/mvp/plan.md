# Plan — MVP (Full Domain, Phase Order)

Structure: Shell -> Agents -> Ailments -> Therapies -> Booking -> Polish (roadmap order, mirroring `specs/2026-09-26-foundation-server-skeleton/plan.md` style).

## 1. Dashboard shell (0.2)

- 1.1 Extend layout nav with Dashboard entry; add `GET /dashboard` shell (agents/staff entry point, responsive + brand)
- 1.2 Add dashboard view + route tests (Vitest + Supertest)
- 1.3 SQLite persistence in `src/models.ts` (Node `node:sqlite`): agents/ailments/therapies/appointments tables, file DB `data/agentclinic.db` (`AGENTCLINIC_DB` override, `/data` gitignored), `:memory:` under Vitest; seed sample data on first boot

## 2. Agents (1.1–1.3)

- 2.1 Agent model (in-memory) + `GET/POST /agents` create/list + tests
- 2.2 Agent detail + edit (`GET /agents/:id`, `POST /agents/:id/edit`) + tests
- 2.3 Dashboard agents widget + tests

## 3. Ailments (2.1–2.3)

- 3.1 Ailment model linked to agent + `GET/POST /ailments` create/list + tests
- 3.2 Ailment detail + edit + tests
- 3.3 Dashboard ailments widget + tests

## 4. Therapies (2.4–2.6)

- 4.1 Therapy catalog model + `GET/POST /therapies` create/list + tests
- 4.2 Therapy detail + edit + tests
- 4.3 Map therapies to ailments (assign therapy) + tests

## 5. Appointments (2.7–2.9)

- 5.1 Booking: `GET/POST /appointments` (agent + ailment + therapy + time) + tests
- 5.2 Appointment list / staff view + cancel/reschedule + tests
- 5.3 Dashboard upcoming-appointments widget + tests

## 6. Polish + release (2.10–2.12 + 0.3)

- 6.1 Responsive brand styling pass (mobile-first, orange/black, 360px no-scroll) + tests
- 6.2 Validation + error hardening (404/500, input validation) + tests
- 6.3 `npm install` + `npm run build` (zero errors) + `npm test` green + browser smoke narrow/wide + README demo flow + CHANGELOG via skill
