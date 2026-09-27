# Plan — Constitution Refresh (Separate Feature)

Structure: Interview -> Write -> Verify (no implementation).

## 1. Interview (done 2026-09-27)

- 1.1 Grouped AskUserQuestion on mission, target audience, tech-stack gaps before any disk writes
- 1.2 Answers: Agent relief / Keep both / ORM + migrations

## 2. Write constitution

- 2.1 `specs/mission.md` — relief mission, both audiences, delivery-scope layers
- 2.2 `specs/tech-stack.md` — ORM layer + migration strategy + tooling/CI conventions
- 2.3 `specs/roadmap.md` — phase order kept, TODO.md absence noted, MVP annotations, new 2.13/2.14 phases

## 3. Verify + merge

- 3.1 Constitution files render, cross-references (`README.md`, phases) accurate
- 3.2 `git status` shows only intended files; CHANGELOG updated via skill; merge to `sourav`
