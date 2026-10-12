---
protocol: along
protocol_version: "4.4.7"
slug: dynstruct-mui-binding-and-wrapper-enhancements
type: feat
status: done
completed: 2026-10-10
parent: debt--refactor-webapp-dynstruct-architecture
priority: high
created: 2026-10-10
updated: 2026-10-10
agent: antigravity
tags: [dynstruct-mui, binding, wrappers]
milestone: v2.0.0-along-transition
blocked_by: []
related: []
---

# Dynstruct MUI Binding and Wrapper Enhancements

## Problem Statement
Inputs in `@actdim/dynstruct-mui` (`TextField`, `Select`, `Autocomplete`, `Tabs`, `Switch`, `Checkbox`) do not assign `m.value` in their internal change handlers, which prevents two-way data binding via `bindProp` from operating automatically. Furthermore, `Autocomplete` only supports `string[]`, `Menu` lacks `icon` support, and `Dialog` lacks subtitle/adaptive styling.

## Requirements
- REQ-1: Update `TextField`, `Select`, `Tabs`, `Switch`, `Checkbox` to mutate `m.value` on change.
- REQ-2: Enhance `Autocomplete` to support generic options `T[]`, `getOptionLabel`, `isOptionEqualToValue`, and `onInputChange`.
- REQ-3: Enhance `Menu` to support `icon` in `MenuItemDef` and `anchorPosition`.
- REQ-4: Enhance `Dialog` to support `subtitle` and fullScreen responsiveness.

## Acceptance Criteria
- [ ] Two-way data binding works automatically without explicit `onChange` handlers.
- [ ] `Autocomplete` handles complex object items.
- [ ] `dynstruct-mui` passes build with zero type errors.
