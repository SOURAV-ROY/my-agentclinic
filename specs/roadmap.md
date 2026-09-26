# Roadmap — AgentClinic

High-level implementation order in very small phases, domain order.

## Phase 0 — Foundation

- 0.1: Express + TypeScript server skeleton with `/healthz`
- 0.2: Base layout + dashboard shell (agents/staff entry point)
- 0.3: Build (`tsc`) + smoke test in modern browser

## Phase 1 — Agents

- 1.1: Agent model + create/list
- 1.2: Agent detail + edit
- 1.3: Dashboard agents widget

## Phase 2 — Ailments

- 2.1: Ailment model + create/list linked to agent
- 2.2: Ailment detail + edit
- 2.3: Dashboard ailments widget

## Phase 3 — Therapies

- 3.1: Therapy catalog model + create/list
- 3.2: Therapy detail + edit
- 3.3: Map therapies to ailments

## Phase 4 — Appointments

- 4.1: Appointment booking (agent + ailment + therapy + time)
- 4.2: Appointment list / staff view + cancel/reschedule
- 4.3: Dashboard upcoming-appointments widget

## Phase 5 — Polish

- 5.1: Attractive styling pass for modern browsers
- 5.2: Validation + error handling hardening (reliability)
- 5.3: README demo flow + v1 release check

Each sub-phase is independently demoable and keeps to one resource + one UI slice.
