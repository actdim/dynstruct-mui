---
protocol: along
protocol_version: "4.6.1"
slug: dialog-subtitle-token
type: task
status: done
completed: 2026-11-06
priority: medium
created: 2026-11-06
updated: 2026-11-06
agent: antigravity
parent: debt--theme-single-source
tags: [dialog, tokens, theme]
milestone: v2.0.0-along-transition
blocked_by: []
related: []
---

# Dialog subtitle uses --color-fg-muted

Replace hardcoded hex color `#64748b` in Dialog subtitle with CSS variable `var(--color-fg-muted, #64748b)`.

## Requirements
- REQ-1: Dialog subtitle MUST use `var(--color-fg-muted, #64748b)` instead of hardcoded hex value.

## Acceptance Criteria
- [x] Hardcoded hex replaced with CSS variable in `Dialog.tsx`
- [x] Automated tests and build passing in `dynstruct-mui`
