---
protocol: along
protocol_version: "4.6.1"
slug: field-validation-binding
type: feat
status: in-progress
priority: medium
created: 2026-11-08
updated: 2026-11-08
agent: claude
tags: [validation, forms]
blocked_by: []
related: []
plan_status: approved
---

# Field validation binding: onBlur and error/helperText on form fields

## Problem

`@actdim/dynstruct` gets a binding-shaped validation helper, `bindField(() => c, path, options?)`, returning `{ value, error, helperText, onBlur }` (dynstruct issue `feat--validation-ergonomics`). The intended use is a spread into a field component:

```ts
nameField: useTextField({ label: t('name'), ...bindField(() => c, 'name') }),
```

This does not work with the current wrappers:

- None of the form controls declares `onBlur`: `TextField`, `Select`, `Autocomplete`, `Checkbox`, `Switch`, `RadioGroup` (`src/*.tsx`). Spreading `bindField(...)` is a type error, and blur-time validation cannot fire.
- `error` and `helperText` already exist on all six, so only `onBlur` is missing.
- The `ContactForm` example (`src/_stories/examples/ContactForm.tsx`) shows the manual workaround: the email rule is duplicated in `error` and `helperText` bindings and the submit button is toggled from `onChange*` events.

Consumer: Mempart webapp dialogs (`task--forms-dynstruct-validation` in the Mempart root).

## Requirements
- REQ-1: `TextField`, `Select`, `Autocomplete`, `Checkbox`, `Switch` and `RadioGroup` MUST declare `onBlur?: (event?: React.FocusEvent) => void` (default `undefined`) and pass it to the MUI element.
- REQ-2: `useXxx({ ...bindField(() => c, 'path') })` MUST type-check without casts for TextField, Select, Autocomplete and RadioGroup; Checkbox and Switch (prop `checked`) MUST accept `checked`, `error`, `helperText`, `onBlur` taken from one `bindField` result.
- REQ-3: Existing behavior MUST NOT change when `onBlur` is not passed.
- REQ-4: The `ContactForm` example MUST use `prop({ validator })` + `bindField` + `await c.validate()` on submit, a cross-field rule, and a simulated server error through `c.setValidation`; the duplicated rule bindings MUST go away.
- REQ-5: Docs MUST describe the form-validation pattern (`docs/topic--architecture.md` or the forms section it links to) and `CHANGELOG.md` MUST record the new prop.

## Acceptance Criteria
- [ ] REQ-1..REQ-3 verified by `npx tsc -b tsconfig.json --noEmit` (the example spreads `bindField` into each control kind it uses)
- [ ] Storybook `ContactForm`: blur on an empty field shows the error under it, submit is blocked, the simulated server error shows under its field and clears on edit (checked in the browser)
- [ ] `npx tsc -b tsconfig.json --noEmit`, `pnpm run test`, `pnpm run lint`, `pnpm run build` green
- [ ] Released only through the monorepo-wide `pnpm run version:sync` in Mempart, after the dynstruct change
- [ ] Detailed plan: `plans/01--field-validation-binding.md` in this issue's folder
