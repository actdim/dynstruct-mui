# Living Plan: contactform-story-lint

## Revision 1 (2026-11-11T15:49:05Z, plan approve --plan-file)

---
protocol: along
protocol_version: "4.8.0"
slug: contactform-story-lint
type: bug
status: open
priority: high
created: 2026-11-11
updated: 2026-11-11
agent: claude-code
tags: [lint, ci, stories]
blocked_by: []
related: []
---

# ContactForm story breaks lint (indent, padding-line)

## Problem Statement
`pnpm lint` in dynstruct-mui exits 1 with 3 errors in
`src/_stories/examples/ContactForm.tsx`, all introduced by `a9b246c` (2026-11-08, onBlur and
declarative validation):
- line 77 and 78: `indent` (30 spaces, expected 32);
- line 117: `@stylistic/padding-line-between-statements` (blank line before `return`).

Mempart `ci:lint` runs dynstruct-mui lint, so Mempart CI lint has been red since that commit.
Found by Mempart `task--app-core-audit-fixes` P7 (not caused by it; filed here per the
out-of-scope rule).

## Requirements
- REQ-1: The 3 errors MUST be fixed with layout-only changes (`eslint --fix --fix-type
  layout` on `ContactForm.tsx`); `git diff -w --ignore-blank-lines` MUST be empty.
- REQ-2: `pnpm lint` in dynstruct-mui MUST exit 0.

## Acceptance Criteria
- [ ] dynstruct-mui `lint` exits 0.
- [ ] Diff is whitespace and blank lines only.
- [ ] Mempart `pnpm run ci:lint` exits 0.
