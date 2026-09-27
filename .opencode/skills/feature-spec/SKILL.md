---
name: feature-spec
description: Create a feature spec (plan.md, requirements.md, validation.md) for the next specs/roadmap.md phase on a new branch. Use ONLY when user asks for a feature spec, next-phase spec, or spec-driven feature scaffolding.
---

# Feature Spec

Scaffold a spec-driven feature for the next incomplete phase in `specs/roadmap.md`. Invoke manually when the user asks for a feature spec.

## Workflow

1. Read `specs/roadmap.md` and identify the next incomplete phase (skip `Done` items). Note its number, title, and scope.
2. Create a branch named `YYYY-MM-DD-feature-name` (UTC date, short kebab-case name from the phase), branched from the current default branch.
3. Ask the user with grouped questions on these 3 — BEFORE writing anything to disk:
   - Requirements/scope: what is in/out for this feature.
   - Plan structure: how `plan.md` groups the numbered tasks.
   - Validation bar: what `validation.md` requires to merge.
4. Create `specs/YYYY-MM-DD-feature-name/` (matching the branch) containing:
   - `plan.md` — the task list as numbered task groups, per the agreed structure.
   - `requirements.md` — scope, decisions, and context for the feature.
   - `validation.md` — how to know the implementation succeeded and can be merged (build, tests, smoke, merge checklist).
5. Refer to `specs/mission.md` and `specs/tech-stack.md` (plus existing feature specs under `specs/`) for guidance in all three files.
6. Verify: branch exists, directory matches branch name, all three files present. Report the scope and stop — do not implement unless asked.

## Boundaries

- Only touch the new `specs/YYYY-MM-DD-feature-name/` directory (plus the git branch). Do not edit product code, constitution, or git history.
- Never skip step 3: the grouped questions must come before any disk writes.
- Do not commit, push, merge, or delete branches unless the user explicitly asks.
