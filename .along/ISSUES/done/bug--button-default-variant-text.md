---
protocol: along
slug: button-default-variant-text
type: bug
status: done
completed: 2026-10-23
priority: high
created: 2026-10-10
updated: 2026-10-23
parent: bug--fix-dynstruct-runtime-errors-and-history-api
tags: [mui, button, textfield]
agent: antigravity
blocked_by: []
related: []
---

# Fix Button default variant to text and support onKeyDown in TextField

Align default Button variant with MUI standard (`text`) instead of `contained` so unspecified button variants render transparent rather than solid contained blocks. Add `onKeyDown` support to TextField.

## Requirements
- REQ-1: `useButton` MUST default `variant` to `'text'` when the caller does not pass a variant.
- REQ-2: `useTextField` MUST accept an optional `onKeyDown` handler and pass it to `MuiTextField`.

## Acceptance Criteria
- [x] `src/Button.tsx` `def.props.variant` is `'text'` (landed in e68b09f)
- [x] `src/TextField.tsx` declares `onKeyDown?: (event: React.KeyboardEvent) => void`, defaults it to `undefined` and renders `onKeyDown={m.onKeyDown}` (landed in e68b09f)
- [x] Typecheck and package tests pass
