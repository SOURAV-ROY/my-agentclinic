---
name: update-changelog
description: Update CHANGELOG.md with date headings before merging. Use ONLY when user asks to update changelog, prepare a merge, or bootstrap a missing changelog from git commits.
---

# Update Changelog

Keep `./CHANGELOG.md` in the project root accurate. This skill is invoked manually before merging.

## File format

```markdown
# Changelog

## YYYY-MM-DD

- Bullet for each change (short imperative, e.g. `Add Vitest route tests`)
```

- One `## YYYY-MM-DD` heading per date, newest date first.
- Bullets under each heading, newest commit first within a date.
- Use UTC date (`YYYY-MM-DD`) for new entries.
- Never rewrite or delete existing entries; only prepend new dates or append bullets to today's heading.

## Workflow

1. Read `./CHANGELOG.md` if it exists. Note which dates are already covered.
2. Inspect work to record:
   - `git log --pretty=format:"%ad %h %s" --date=short -20` for committed but unlogged changes.
   - `git status -uall` and `git diff --stat` for uncommitted work being merged.
3. If no `CHANGELOG.md` exists (bootstrap):
   - Run `git log --pretty=format:"%ad %h %s" --date=short --reverse` (or at least last 50 commits).
   - Group commits by `%ad` date, newest date first.
   - Create `./CHANGELOG.md` with `# Changelog`, one `## YYYY-MM-DD` heading per date, and one bullet per commit: `- <subject> (<hash>)`.
   - Example: `- Split layout into header/main/footer files (4865390)`.
4. If `CHANGELOG.md` exists (pre-merge update):
   - Find commits/dates missing from the file.
   - Add missing `## YYYY-MM-DD` headings in newest-first order at the top (below `# Changelog`).
   - If today's heading already exists, append new bullets there; otherwise create it.
   - Summarize uncommitted merge work as bullets under today's UTC date; keep each bullet to one line.
5. Verify: headings are `## YYYY-MM-DD`, dates descending, no duplicate hashes, markdown renders.

## Boundaries

- Only touch `./CHANGELOG.md`. Do not edit specs, code, or git history.
- Do not commit, push, or merge unless the user explicitly asks; leave the changelog as an uncommitted or staged change per their instruction.
- If commit history is empty or ambiguous, ask the user what changed instead of guessing.
