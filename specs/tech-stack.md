# Tech Stack — AgentClinic

Server-side TypeScript, per stakeholder requirement for reliable site on a popular TypeScript stack.

## Recommendation: Node.js + Express + TypeScript

- **Runtime:** Node.js LTS (server-side TypeScript execution)
- **Framework:** Express.js — most popular, minimal, reliable Node server framework
- **Language:** TypeScript (strict mode, see `tsconfig.json`)
- **Frontend (dashboard):** Server-rendered views + progressive enhancement for dashboard for agents and staff, ensuring modern-browser compatibility with no heavy build requirement in v1
- **Why Express:**
  - Popularity: largest ecosystem, easy hiring/onboarding (Mary: popular stack)
  - Reliability: mature, stable API, extensive middleware for validation/logging/security
  - Productivity: small core, fast to build CRUD for agents/ailments/therapies/appointments (Susan: features)
  - Browser-friendly: serves clean HTML/CSS for attractive modern-browser UI (Steve: attractive + modern browser)

## Alternatives considered

- Next.js full-stack: richer frontend but heavier for v1 reliability goal.
- NestJS: structured enterprise API but more boilerplate than needed for small phases.

## Conventions

- `src/` holds server code, compiled with `tsc` to `dist/` (`package.json:6-8`, `tsconfig.json:1-12`).
- Strict TypeScript, CommonJS modules, ES2016 target per current config.
- REST routes per resource, validated inputs, HTML dashboard + JSON API where useful.
