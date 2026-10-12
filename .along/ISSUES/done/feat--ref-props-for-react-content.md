---
protocol: along
protocol_version: "4.4.7"
slug: ref-props-for-react-content
type: feat
status: done
completed: 2026-10-10
priority: high
created: 2026-10-10
updated: 2026-10-10
agent: claude
tags: [react, reactivity, props]
blocked_by: []
related: []
---

# Declare React content props with `prop({ reactive: 'ref' })`

dynstruct now supports `prop({ reactive: 'ref' })` (dynstruct issue `feat--react-values-opaque-and-ref-props`).
Top-level `ReactNode` / `React.FC` props of the wrappers default to `undefined` (or `() => null`), so a value
assigned after creation got deep reactivity: MobX converted the React element and rendering broke with a
debugger attached.

## Requirements

- REQ-1: every top-level `ReactNode` / `React.FC` prop of a wrapper is declared with `prop({ reactive: 'ref' })`
  (keeping existing defaults via `initialValue`).
- REQ-2: AGENTS.md Props Convention: replace the incorrect "MobX handles them as observable refs" with the rule.
- REQ-3: typecheck, tests and build pass.

Out of scope: React values nested in item arrays (`Menu`, `List`, `ToggleButtonGroup`, `Tabs`, `Toast` items).
