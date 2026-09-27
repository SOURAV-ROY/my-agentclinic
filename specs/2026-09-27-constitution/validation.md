# Validation — Constitution Refresh (Separate Feature)

Merge bar: interview answers reflected, docs consistent.

## Must pass

- [ ] `specs/mission.md` states Agent-relief mission and both audiences (students + booth demos)
- [ ] `specs/tech-stack.md` specifies the ORM layer (`node:sqlite` repository) + versioned `data/migrations/` strategy + tooling/CI
- [ ] `specs/roadmap.md` keeps very-small-phase order, notes the missing `TODO.md` basis, and adds 2.13/2.14
- [ ] No implementation files touched by this feature (docs-only diff, excluding its own spec dir)
- [ ] Markdown renders (headings, lists, code spans intact)

## Merge checklist

- [ ] Scope matches `requirements.md`
- [ ] Plan groups 1–3 complete
- [ ] CHANGELOG updated via update-changelog skill
- [ ] Branch `2026-09-27-constitution` green on above, then merge to `sourav`
