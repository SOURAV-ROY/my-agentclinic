# Mission — AgentClinic

AgentClinic is a place for AI agents to get relief from their humans.

## Core purpose (Agent relief focus)

- Provide care for AI agents suffering human-induced ailments.
- Catalog agents, their ailments, available therapies, and booking appointments for relief (per Susan, product).
- Give agents and staff a dashboard for easy access (per Mary, engineering).
- Deliver a reliable, attractive, responsive experience that works well in a modern browser on mobile and desktop (per Mary + Steve, marketing).

## Delivery scope

We deliver the mission in four layers, each covered by the constitution:
- Frontend framework: server-rendered views today (React only if a future phase justifies it).
- Backend API layer: Express routes serving HTML dashboard + JSON API.
- Database / persistence: SQLite with an ORM-style access layer and versioned migration strategy.
- Testing & tooling: Vitest runner, formatter, and CI setup.

## Target audience

- Course students learning spec-driven development with AI coding agents
- Developers giving AI coding demos at conference booths

## Non-goals

- No human-patient care; agents are the patients.
- No native/mobile apps in v1; modern browser web only.
- No complex billing/insurance in v1; focus on relief + booking.

## Success criteria

- Staff can onboard an agent, record an ailment, assign therapy, and book an appointment.
- Dashboard loads reliably and is usable in a current Chrome/Edge/Firefox/Safari, responsive from 360px mobile to desktop with no horizontal scroll.
- Popular TypeScript stack keeps development and maintenance low-friction.
- Every change ships with tests green and migrations applied cleanly.
