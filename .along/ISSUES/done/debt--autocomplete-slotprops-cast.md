---
protocol: along
protocol_version: "4.4.10"
slug: autocomplete-slotprops-cast
type: debt
status: cancelled
completed: 2026-10-12
priority: low
created: 2026-10-12
updated: 2026-10-12
agent: claude-code
parent: task--leftovers-after-params-semantics
tags: []
blocked_by: []
related: []
---

# Autocomplete.slotProps declared without type cast

`useAutocomplete` declares `slotProps: prop({ reactive: 'ref' }) as unknown as MuiTextFieldProps['slotProps']`
(review nit: avoid the cast).

## Outcome (2026-10-12): not fixable in this package

Autocomplete is the only generic wrapper (`useAutocomplete = <T>(...)`). With a struct that depends on `T`,
TypeScript defers the mapped `ComponentProps<P>` type (`P[K] | ComponentProp<P[K]>` plus the `KeyPath` part) and
cannot relate any `ComponentProp<X>` value to it. Tried without the cast:

- `prop<MuiTextFieldProps['slotProps']>({ reactive: 'ref' })` - TS2322 on `def.props`;
- getter form `get slotProps() { return prop<...>(...) }` - same TS2322.

The cast stays, with the comment updated to list the tried forms. A real fix belongs to `@actdim/dynstruct` typing
(e.g. a `ComponentProps` variant or `prop` overload usable with generic structs).

## Acceptance Criteria
- [x] Cast-free forms tried; documented why the cast is required
- [x] Automated tests passing
