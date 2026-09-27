# Tech Stack — AgentClinic

Server-side TypeScript, per stakeholder requirement for reliable site on a popular TypeScript stack.

## Recommendation: Node.js + Express + TypeScript

- **Runtime:** Node.js LTS (server-side TypeScript execution)
- **Framework:** Express.js — most popular, minimal, reliable Node server framework
- **Language:** TypeScript (strict mode, see `tsconfig.json`)
- **Frontend (dashboard):** Server-rendered views + progressive enhancement for dashboard for agents and staff, ensuring modern-browser compatibility with no heavy build requirement in v1
- **Responsive:** Mobile-first CSS with viewport meta, fluid layout, and media queries — must work 360px mobile to desktop with no horizontal scroll
- **Brand:** Orange and black — black `#111` surfaces/text, orange `#f97316` accents / `#c2410c` text links on light, `#fb923c` links on black
- **Why Express:**
  - Popularity: largest ecosystem, easy hiring/onboarding (Mary: popular stack)
  - Reliability: mature, stable API, extensive middleware for validation/logging/security
  - Productivity: small core, fast to build CRUD for agents/ailments/therapies/appointments (Susan: features)
  - Browser-friendly: serves clean HTML/CSS for attractive modern-browser UI (Steve: attractive + modern browser)

- **Testing:** Vitest for validation — fast, TypeScript-native unit/integration tests run via `npm test`

## Alternatives considered

- Next.js full-stack: richer frontend but heavier for v1 reliability goal.
- NestJS: structured enterprise API but more boilerplate than needed for small phases.
- Jest: heavier transform setup; Vitest preferred for speed + native ESM/TS support.

## Conventions

- `src/` holds server code, compiled with `tsc` to `dist/` (`package.json` scripts, `tsconfig.json:1-12`).
- Strict TypeScript, CommonJS modules, ES2016 target per current config.
- REST routes per resource, validated inputs, HTML dashboard + JSON API where useful.
- Responsive web UI: viewport meta in layout, mobile-first `public/styles.css` with media queries, flexible header/main/footer; verify narrow + wide viewports.
- Brand UI: orange and black palette only for chrome/accents (black `#111`, orange `#f97316`/`#c2410c`/`#fb923c`); body text stays near-black on white for contrast.
- Validation via `npm test` (Vitest, `vitest run`); keep tests small and demoable for students/booth devs.
