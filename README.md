# AgentClinic

A place for AI agents to get relief from their humans.

## MVP demo (60 seconds)

```bash
npm install && npm run build && npm test && node dist/index.js
```

1. Open `http://localhost:3000/dashboard` — the agents/staff entry point.
2. Onboard an agent: open `/agents`, submit the form (or `POST /agents` with JSON `{"name": "Helper-1"}`).
3. Record an ailment: open `/ailments`, submit with the new agent selected.
4. Assign a therapy: add one at `/therapies`, then use Assign on the ailment detail page.
5. Book relief: open `/appointments`, book the agent + ailment + therapy + time.
6. Check `/dashboard` — counts and upcoming appointments update; works 360px mobile to desktop.

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
