---
protocol: along
protocol_version: "4.4.9"
slug: content-props-as-ref
type: task
status: done
completed: 2026-10-11
priority: high
created: 2026-10-11
updated: 2026-10-11
agent: claude-code
tags: [react, dynstruct]
blocked_by: []
related: []
---

# Declare React-content props as ref (dynstruct 1.8.2: React values only in ref props)

## Context

`@actdim/dynstruct` 1.8.2 removed the auto-detection of React values in props: a React value stored in a
deep-reactive prop is a DEV error; React content belongs in `prop({ reactive: 'ref' })` props (dynstruct issue
`feat--react-values-in-ref-props`). Values read through bindings (toReact props, `bind` / `bindProp`) are not stored
and not affected. The dynstruct regType Vite plugin (`feat--regtype-vite-plugin`) is wired into the storybook here.

## Changes

- `ref` for props whose values carry React content: `List.items`, `Table.rows`, `Tabs.tabs`,
  `ToggleButtonGroup.items`, `Menu.items` (`prop({ initialValue: [], reactive: 'ref' })`, replace the array to
  update), `Toast.items` (`prop({ reactive: 'ref' })`; `ToastItem.action` is React content - found by the webapp
  audit, latent: no current caller passes an action) and `TextField.slotProps`, `Autocomplete.slotProps` (`prop({ reactive: 'ref' })`; Autocomplete needs a
  type cast because of its generic option type).
- `.storybook/main.ts`: `dynstructPlugin()` from `@actdim/dynstruct/vite/plugin`.

## Acceptance Criteria
- [x] Content-bearing props declared as ref
- [x] Storybook uses the regType plugin
- [x] `tsc -b`, build and tests pass
