# Execution plan: feat--field-validation-binding (validation chain step 2 of 3)
Issue: `feat--field-validation-binding` in dynstruct-mui (`.along/ISSUES/`). Spec = issue file; this plan = order and
exact actions; where they differ this plan wins.

Chain: 1) dynstruct `feat--validation-ergonomics` -> 2) this issue -> release (monorepo-wide
`pnpm run version:sync`) -> 3) Mempart `task--forms-dynstruct-validation`.

Execution Mode: Role-Based (more than 3 files; the code change per control is mechanical). Roles: Implementer
(steps 1-4), Reviewer (each control diff against the MUI composition rules in `AGENTS.md`), Tester (step 5).

## Preconditions
- dynstruct `feat--validation-ergonomics` wrapped (in its `ISSUES/done/`); `bindField`, `c.touch`, `c.setValidation`
  exported from `@actdim/dynstruct/componentModel/core` in the workspace copy.
- dynstruct-mui resolves `@actdim/dynstruct` from the workspace (`package.json` declares `>=1.12.2`; check that the pnpm
  workspace links `src/packages/dynstruct`, not the npm build: `ls -l node_modules/@actdim/dynstruct`). If it resolves
  the npm package, stop and ask: the example cannot compile before the release.

## State checked in code (2026-11-08)
- `TextField.tsx`: props have `onChange(value)`, `helperText`, `error`, `onKeyDown`; no `onBlur`; renders `MuiTextField`.
- `Select.tsx`, `Autocomplete.tsx`, `Checkbox.tsx`, `Switch.tsx`, `RadioGroup.tsx`: all have `error` and `helperText`
  (`FormHelperText` / `helperText` prop), none has `onBlur`.
- `Slider`, `Rating`, `ToggleButtonGroup` have no `error` / `helperText`: out of scope.
- Tests run in `environment: 'node'` over `tests/**/*.test.ts` (`vitest.node.config.ts`): no DOM tests. Type checking of
  `src/_stories/**` happens through `tsc -b` (verify the dev project includes `_stories`; if not, the plan's REQ-2 check
  moves to a `tests/types/fieldBinding.test-d.ts` with vitest `typecheck`).

## Steps

### 1. `onBlur` on six controls [agent]
For each of `TextField`, `Select`, `Autocomplete`, `Checkbox`, `Switch`, `RadioGroup`:
- struct props: `onBlur?: (event?: React.FocusEvent) => void;`
- `def.props`: `onBlur: undefined,`
- view: pass `onBlur={m.onBlur}` to the focusable MUI element:
  - `TextField`: `MuiTextField onBlur`;
  - `Select`: the `Select` element (not `FormControl`);
  - `Autocomplete`: `MuiAutocomplete onBlur` (fires when the input loses focus, after the popup closes);
  - `Checkbox` / `Switch`: the inner `Checkbox` / `Switch` (`FormControlLabel` control);
  - `RadioGroup`: `MuiRadioGroup onBlur` (bubbles from the radios).
- Nothing else changes in these files (REQ-3).

### 2. `ContactForm` example (`src/_stories/examples/ContactForm.tsx`) [agent]
Rewrite with the new API:
- props `name`, `email`, `confirmEmail` declared with `prop({ initialValue: '', validator: { onBlur: true, validate } })`;
  `confirmEmail` rule compares with closure `m.email` (cross-field);
- children: `useTextField({ label, fullWidth: true, ...bindField(() => c, 'name') })` etc.; `slug`-style hint via
  `bindField(() => c, 'email', { hint: () => 'We never share it' })`;
- submit button `onClick` -> action `submit`: `if (!(await c.validate())) { return; }` then a fake request that fails
  once for `taken@example.com` -> `c.setValidation({ email: { isValid: false, message: 'Email already registered' } })`;
- a reset button -> `c.resetValidation()` and clear values;
- remove the duplicated `isEmailValid` bindings and the `onChange*` events that toggled the button
  (`m.$.isValid` or `visibleError` now drives it if a disabled state is still wanted).
- Add a `Select` (e.g. topic, required) to exercise a second control kind with `bindField`.

### 3. Docs [agent]
- `AGENTS.md`: under "Consuming Wrappers" add "Form fields and validation": spread `bindField(() => c, path)` into form
  controls; `error` / `helperText` come from the binding; hint via `options.hint`; which controls support `onBlur`.
- `docs/topic--architecture.md`: same in one paragraph with a link to the dynstruct docs section.
- `CHANGELOG.md`: Added `onBlur` on six controls; example updated.

### 4. Self-review [agent]
`git diff --stat`: six controls + example + docs + changelog only.

### 5. Verification [agent]
`/along-test`, `pnpm run typecheck`, `pnpm run lint`, `pnpm run build` in `src/packages/dynstruct-mui`.
Storybook in the browser pane: `ContactForm` story: blur empty name -> error under it; type -> error stays until valid,
then clears; submit with empty fields -> all errors, no request; `taken@example.com` -> error under email, clears on
edit; reset -> clean form. Screenshot as proof.

### 6. Commit and wrap [agent after yes]
`/along-commit` bound to `feat--field-validation-binding`; push after the user's yes; no version bump.
`along wrap field-validation-binding --summary "..." --no-decisions`.

### 7. Release (outside this issue) [agent after yes / user]
After both library issues are wrapped: monorepo-wide release through Mempart `pnpm run version:sync <v>` (from `src/`),
`release: v<v>` commits and annotated tags in every submodule and the root, npm publish by the user. Prefer folding it
into the pending app-core release (`03R--task--release-libraries` in Mempart `task--app-core-extraction`) if that has
not shipped yet; otherwise create a Mempart release issue/milestone for it.
