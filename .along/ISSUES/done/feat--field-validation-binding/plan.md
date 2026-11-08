# Living Plan: field-validation-binding

## Revision 1 (2026-11-08T21:51:43Z, plan approve --plan-file)

# Execution plan: feat--field-validation-binding (validation chain step 2 of 3)
Issue: `feat--field-validation-binding` in dynstruct-mui (`src/packages/dynstruct-mui/.along/ISSUES/`). Spec = issue
file; this plan = order and exact actions; where they differ this plan wins.

Chain: 1) dynstruct `feat--validation-ergonomics` -> 2) this issue -> release (monorepo-wide
`pnpm run version:sync`) -> 3) Mempart `task--forms-dynstruct-validation`.

Execution Mode: Role-Based (more than 3 files; the change per control is mechanical). Roles: Implementer (steps 1-4),
Reviewer (step 5: diff against REQ list and the MUI composition rules in `AGENTS.md`), Tester (step 6).

This plan is written to be executed without design decisions. Every open point was checked in code on 2026-11-08 and
the answer is written here. If reality differs from a "State" line below, apply the Stop rules.

## Stop rules (binding)
Stop, do not improvise, and report to the user with the exact output when:
- S1. A line under "State checked in code" no longer matches the file.
- S2. After `pnpm --dir ../dynstruct run build`, `grep -c bindField ../dynstruct/dist/componentModel/core.d.ts`
  prints `0` (step 1 of the chain is missing; it landed in dynstruct `main` at `26a4f55`, 2026-11-08).
- S3. A type error needs `as any`, `@ts-ignore` or `@ts-expect-error` to pass.
- S4. Tests, typecheck, lint or build is red at HEAD before you change anything (record the output; not yours to fix).
- S5. You want to change a file not listed in "Files to change".

## Commands (run from `src/packages/dynstruct-mui`)
| Purpose | Command |
|---|---|
| build dynstruct first (dynstruct-mui consumes its `dist/` through package exports) | `pnpm --dir ../dynstruct run build` |
| types | `npx tsc -b tsconfig.json --noEmit` - NOT `pnpm run typecheck`: that script is `tsc -p` over `files: []` and checks nothing |
| tests | `pnpm run test` (node environment, `tests/*.test.ts`, no DOM tests) |
| lint | `pnpm run lint` |
| build | `pnpm run build` (runs `tsc -b` + `vite build`) |
| Storybook | `pnpm run storybook -p 6007 --no-open` (no `--`: pnpm passes it through and storybook rejects it) (long-running: start it in the background; 6007 so it does not clash with dynstruct on 6006), URL `http://localhost:6007/?path=/story/examples-contactform--default`. No agent-vendor config (ADR `no-agent-vendor-dev-tooling`). |

Step 0, in this order:
1. From `src/packages/dynstruct-mui`: `along start field-validation-binding`. Source edits stay locked until the user
   approves this plan; after their explicit yes run
   `along plan approve --plan-file .along/ISSUES/feat--field-validation-binding/plans/01--field-validation-binding.md`.
   If `along start` refuses because of uncommitted changes, stop and show the user the message (do not pass
   `--allow-dirty` yourself).
2. Run the dynstruct build, then types, tests, lint and build here once before editing (S4).
3. Run tests only through `along test` before you finish (the Stop gate does not count a raw `pnpm run test`).

## Files to change
- `src/TextField.tsx`, `src/Select.tsx`, `src/Autocomplete.tsx`, `src/Checkbox.tsx`, `src/Switch.tsx`,
  `src/RadioGroup.tsx`
- `src/_stories/examples/ContactForm.tsx`
- `AGENTS.md` (not the Along managed block at the top), `docs/topic--architecture.md`, `CHANGELOG.md`
- `.along/ISSUES/feat--field-validation-binding.md` (checkboxes only)

## State checked in code (2026-11-08)
- `node_modules/@actdim/dynstruct` is a symlink to `src/packages/dynstruct` (workspace copy). `package.json` peer
  `@actdim/dynstruct: >=1.12.2`.
- `tsconfig.dev.json` includes `src/**/*.tsx`, so stories are type-checked by `tsc -b`.
- `TextField.tsx`: props `value: string`, `onChange?: (value: string) => void`, `helperText`, `error`, `onKeyDown`; view
  renders `<MuiTextField value=... onChange=... onKeyDown={m.onKeyDown} ...>`. No `onBlur`.
- `Select.tsx`: `value: string`, `options: SelectOption[]`; view `<FormControl error>` + `<MuiSelect ...
  inputProps={{ readOnly: m.$.isReadOnly }}>` + `FormHelperText`. No `onBlur`.
- `Autocomplete.tsx`: `value: T | null`; view `<MuiAutocomplete ... renderInput={(inputParams) => <MuiTextField
  {...inputParams} label error helperText variant slotProps />} />`. No `onBlur`.
- `Checkbox.tsx`, `Switch.tsx`: value prop is `checked: boolean` (not `value`); view builds `const checkbox = <MuiCheckbox
  checked onChange color size indeterminate />` (Switch: `const sw = <MuiSwitch ... />`) inside `FormControl`.
- `RadioGroup.tsx`: `value: string`, `onChange: (value: string) => void` (required, default `() => {}`); view
  `<MuiRadioGroup aria-labelledby name value onChange row>`.
- `Button.tsx`: `label: React.ReactNode`, `onClick: (e) => void`, `loading?`, `disabled?`, `fullWidth?`, `variant?`.
- `ContactForm.stories.tsx`: stories `Default` and `Prefilled` (`args: { name, email }`), `argTypes` for `name`, `email`.
  Do not edit it; the new form keeps props `name` and `email` so `Prefilled` keeps working.
- `CHANGELOG.md`: newest section `## [1.8.3]`, no `Unreleased` section.
- dynstruct API used (shipped in dynstruct `main` `26a4f55`; reference: dynstruct `AGENTS.md` section "Forms and
  Validation"): `bindField(getComponent, path, { hint? })` returns
  `{ value: Binding; error: Binding; helperText: Binding; onBlur: () => void }`; `Validator.validate(value, ctx)` may
  return `undefined` (= valid); `c.validate()` -> `Promise<boolean>`; `c.setValidation({ path: result })`;
  `c.resetValidation(path?)`; `c.touch(path)`; `ValidationResult` = `{ isValid; message?: string | (() => string);
  code?; params? }`.

## Verified before handing over (2026-11-08)
- The step 1 edits and the full step 2 `ContactForm` were applied to copies of the six controls in a scratch folder and
  type-checked with this repo's `tsconfig.base.json` against dynstruct `dist/` built from `26a4f55`: 0 errors.
- Without the step 1 edits, the only error is at the Checkbox `onBlur: agree.onBlur` line (`'onBlur' does not exist in
  type 'ComponentParams<...>'`). The spreads `...bindField(...)` compile even without `onBlur` in the control, because
  TypeScript does not check excess keys coming from a spread. Consequence: a green typecheck does NOT prove that blur
  works. The browser check in step 6 (blur shows the error) is the real proof of REQ-1; do not skip it.

## Design decisions (already made)
- D1. `onBlur` type is `(event?: React.FocusEvent) => void`; `bindField`'s `() => void` is assignable to it.
- D2. `bindField` returns key `value`. For value-based controls (TextField, Select, Autocomplete, RadioGroup) spread it.
  Checkbox and Switch use `checked`, so take the parts explicitly:
  `const f = bindField(() => c, 'agree'); useCheckbox({ checked: f.value, error: f.error, helperText: f.helperText, onBlur: f.onBlur })`.
  Never spread `bindField` into Checkbox/Switch (it would pass an unknown `value` param). The issue REQ-2 text already
  says so.
- D3. Select: MUI fires blur when the menu opens (focus moves to the menu), so the field becomes touched at that moment.
  Accepted: the default `onChange` rule re-validates on selection and clears the error. Document it in one line.
- D4. A field-level `onBlur` passed by the caller replaces nothing internal: the wrappers had no blur handling before.

## Common mistakes (read before step 1)
- Putting `onBlur` on `FormControl` or `FormControlLabel` instead of the input element (`MuiSelect`, `MuiCheckbox`,
  `MuiSwitch`, `MuiRadioGroup`), or on `MuiAutocomplete` instead of its inner `MuiTextField`.
- Writing `onBlur={(e) => m.onBlur?.(e)}` or adding a null check: pass `onBlur={m.onBlur}` as is (MUI accepts
  `undefined`).
- Reformatting the touched files or changing quotes or line endings: the diff per control must be exactly 3 added lines.
- Passing `--` to `pnpm run storybook`: pnpm forwards it and storybook fails with `too many arguments for 'dev'`.
- Running `pnpm run typecheck`: it checks nothing here (see Commands).
- Editing `ContactForm.stories.tsx`: not needed and not allowed (S5).
- Calling `c.something` while building `def` (outside a function body): `c` is `undefined` there. `bindField(() => c, ...)`
  is safe because it only stores the getter.

## Steps

### 1. `onBlur` on six controls [agent]
In each file add the struct prop, the default, and the view wiring. Nothing else changes (REQ-3).

Struct props (insert after `error?: boolean;`):
```ts
            onBlur?: (event?: React.FocusEvent) => void;
```
`def.props` (insert after `error: false,`):
```ts
            onBlur: undefined,
```
View wiring:
- `TextField.tsx`: on `<MuiTextField`, after `onKeyDown={m.onKeyDown}` add `onBlur={m.onBlur}`.
- `Select.tsx`: on `<MuiSelect`, after the `onChange={...}` block add `onBlur={m.onBlur}`.
- `Autocomplete.tsx`: in `renderInput`, on `<MuiTextField {...inputParams}`, after `helperText={m.helperText}` add
  `onBlur={m.onBlur}` (InputBase calls both its `onBlur` prop and the `inputProps.onBlur` from `inputParams`, so the
  Autocomplete's own blur handling is kept). Do not put it on `MuiAutocomplete`.
- `Checkbox.tsx`: on `<MuiCheckbox`, after the `onChange={...}` block add `onBlur={m.onBlur}`.
- `Switch.tsx`: on `<MuiSwitch`, after the `onChange={...}` block add `onBlur={m.onBlur}`.
- `RadioGroup.tsx`: on `<MuiRadioGroup`, after `onChange={...}` add `onBlur={m.onBlur}` (focus events bubble from the
  radios in React).
If a file does not import `React` as a value/namespace for the type, check its first line: all six start with
`import React from 'react';` today (S1 if not).

Run types (command table). Expected: green.

### 2. `ContactForm` example [agent]
Replace the whole content of `src/_stories/examples/ContactForm.tsx` with:
```tsx
import React from 'react';
import {
    type ComponentStruct,
    type ComponentDef,
    type ComponentParams,
    type Component,
    type ComponentModel,
} from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { bind, bindField, prop } from '@actdim/dynstruct/componentModel/core';
import { useTextField, type TextFieldStruct } from '../../TextField';
import { useSelect, type SelectStruct } from '../../Select';
import { useCheckbox, type CheckboxStruct } from '../../Checkbox';
import { useButton, type ButtonStruct } from '../../Button';
import { type AppMsgStruct } from '../bootstrap';

type Struct = ComponentStruct<
    AppMsgStruct,
    {
        props: {
            name: string;
            email: string;
            confirmEmail: string;
            topic: string;
            agree: boolean;
            submitting: boolean;
            result: string;
        };
        actions: {
            submit: () => Promise<void>;
            reset: () => void;
        };
        children: {
            nameField: TextFieldStruct;
            emailField: TextFieldStruct;
            confirmEmailField: TextFieldStruct;
            topicField: SelectStruct;
            agreeField: CheckboxStruct;
            submitBtn: ButtonStruct;
            resetBtn: ButtonStruct;
            resultView: React.FC;
        };
    }
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simulated server call: one address is "already registered".
const fakeRegister = (email: string): Promise<{ ok: boolean }> =>
    new Promise((resolve) => setTimeout(() => resolve({ ok: email !== 'taken@example.com' }), 300));

export const useContactForm = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const agree = bindField(() => c, 'agree');

    const def: ComponentDef<Struct> = {
        regType: 'ContactForm',
        props: {
            name: prop({
                initialValue: '',
                validator: {
                    onBlur: true,
                    validate: (v: string) =>
                        v.trim() ? undefined : { isValid: false, message: 'Name is required' },
                },
            }),
            email: prop({
                initialValue: '',
                validator: {
                    onBlur: true,
                    validate: (v: string) =>
                        !v.trim()
                            ? { isValid: false, message: 'Email is required' }
                            : EMAIL_RE.test(v)
                              ? undefined
                              : { isValid: false, message: 'Invalid email address' },
                },
            }),
            // Cross-field rule: reads the closure `m`.
            confirmEmail: prop({
                initialValue: '',
                validator: {
                    onBlur: true,
                    validate: (v: string) =>
                        v === m.email ? undefined : { isValid: false, message: 'Emails do not match' },
                },
            }),
            topic: prop({
                initialValue: '',
                validator: {
                    validate: (v: string) => (v ? undefined : { isValid: false, message: 'Pick a topic' }),
                },
            }),
            agree: prop({
                initialValue: false,
                validator: {
                    validate: (v: boolean) =>
                        v ? undefined : { isValid: false, message: 'You must accept the terms' },
                },
            }),
            submitting: false,
            result: '',
        },
        actions: {
            submit: async () => {
                m.result = '';
                if (!(await c.validate())) {
                    return;
                }
                m.submitting = true;
                try {
                    const res = await fakeRegister(m.email);
                    if (!res.ok) {
                        c.setValidation({ email: { isValid: false, message: 'Email already registered' } });
                        return;
                    }
                    m.result = `Submitted: ${m.name} <${m.email}>, topic ${m.topic}`;
                } finally {
                    m.submitting = false;
                }
            },
            reset: () => {
                m.name = '';
                m.email = '';
                m.confirmEmail = '';
                m.topic = '';
                m.agree = false;
                m.result = '';
                c.resetValidation();
            },
        },
        children: {
            nameField: useTextField({ label: 'Name', fullWidth: true, ...bindField(() => c, 'name') }),
            emailField: useTextField({
                label: 'Email',
                type: 'email',
                fullWidth: true,
                ...bindField(() => c, 'email', { hint: () => 'Try taken@example.com' }),
            }),
            confirmEmailField: useTextField({
                label: 'Confirm email',
                type: 'email',
                fullWidth: true,
                ...bindField(() => c, 'confirmEmail'),
            }),
            topicField: useSelect({
                label: 'Topic',
                fullWidth: true,
                options: [
                    { value: 'sales', label: 'Sales' },
                    { value: 'support', label: 'Support' },
                ],
                ...bindField(() => c, 'topic'),
            }),
            agreeField: useCheckbox({
                label: 'I accept the terms',
                checked: agree.value,
                error: agree.error,
                helperText: agree.helperText,
                onBlur: agree.onBlur,
            }),
            submitBtn: useButton({
                label: 'Submit',
                variant: 'contained',
                fullWidth: true,
                loading: bind(() => m.submitting),
                onClick: () => {
                    void m.submit();
                },
            }),
            resetBtn: useButton({
                label: 'Reset',
                fullWidth: true,
                onClick: () => {
                    m.reset();
                },
            }),
            resultView: () => (m.result ? <div data-testid="contact-result">{m.result}</div> : null),
        },
        view: () => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
                <c.children.NameField />
                <c.children.EmailField />
                <c.children.ConfirmEmailField />
                <c.children.TopicField />
                <c.children.AgreeField />
                <c.children.SubmitBtn />
                <c.children.ResetBtn />
                <c.children.ResultView />
            </div>
        ),
    };

    c = useComponent(def, params);
    m = c.model;

    return c;
};

export type ContactFormStruct = Struct;

export const ContactForm = toReact(useContactForm);
ContactForm.displayName = 'ContactForm';
```
Notes for the implementer:
- `const agree = bindField(() => c, 'agree')` sits before `def` on purpose: `bindField` is lazy (it only stores the
  getter), so calling it while `c` is `undefined` is safe. Never call `c.xxx` there.
- `topic` and `agree` have no `onBlur` flag: their rule runs on change (default) and on submit.
- If `prop({ initialValue: false, ... })` for a boolean or the `validate` parameter annotation does not type-check
  without a cast, that is S3.
- `Prefilled` (`name`, `email` args) still applies: plain params set initial values over the `prop()` defaults.

Run types. Expected: green.

### 3. Docs [agent]
- `AGENTS.md`, after the "Consuming Wrappers (priority)" section, a new section:
  ```markdown
  ## Form Fields and Validation

  Validation rules live in the parent's `def.props` (`prop({ initialValue, validator })`, see the dynstruct AGENTS.md
  validation section). Connect a field with `bindField` from `@actdim/dynstruct/componentModel/core`:

  - value controls (`TextField`, `Select`, `Autocomplete`, `RadioGroup`): spread it,
    `useTextField({ label: 'Name', ...bindField(() => c, 'name') })`;
  - `Checkbox` / `Switch` (prop `checked`): pass the parts, `checked: f.value, error: f.error,
    helperText: f.helperText, onBlur: f.onBlur` with `const f = bindField(() => c, 'agree')`;
  - helper text while there is no error: `bindField(() => c, 'slug', { hint: () => t('slugHint') })`;
  - submit: `if (!(await c.validate())) { return; }`; server field error: `c.setValidation({ email: {...} })`;
    reopen: `c.resetValidation()`.

  All six controls accept `onBlur`. `Select` blurs when its menu opens, so it becomes touched then; its change rule
  re-validates on selection. Example: `src/_stories/examples/ContactForm.tsx`.
  ```
- `docs/topic--architecture.md`: after the component list (line ~22 table), one paragraph "Form validation" with the
  same three bullets in short form and a pointer to `AGENTS.md` "Form Fields and Validation".
- `CHANGELOG.md`: insert above `## [1.8.3]`:
  ```markdown
  ## [Unreleased]

  ### Added
  - `onBlur` on `TextField`, `Select`, `Autocomplete`, `Checkbox`, `Switch` and `RadioGroup`, so `bindField` from
    `@actdim/dynstruct` connects them to declarative validation (`feat--field-validation-binding`).

  ### Changed
  - `ContactForm` example uses `prop({ validator })`, `bindField`, `c.validate()`, a cross-field rule and a simulated
    server error through `c.setValidation`.
  - Requires the `@actdim/dynstruct` release that adds `bindField`.
  ```
Run `along lint` (or the commit-time lint) on the changed docs: ASCII only, fences with a language.

### 4. Issue file [agent]
REQ-2 and the typecheck command in the issue were already corrected while planning (2026-11-08). Only tick the
acceptance checkboxes that are verified, then `along issue sync` (from `src/packages/dynstruct-mui`).

### 5. Self-review [agent]
- `git diff --stat`: only the files listed in "Files to change".
- Per control: the diff is exactly three added lines (struct, default, view). More = S5.
- `grep -n "isEmailValid\|onChangeEmail\|onChangeName" src/_stories/examples/ContactForm.tsx` -> no matches.

### 6. Verification [agent]
1. Types, tests, lint, build (command table). All green; paste the tail of each output in the wrap summary.
2. Start Storybook in the background with the package script (command table, port 6007) and wait until
   `http://localhost:6007` answers.
3. In any browser you can drive, open
   `http://localhost:6007/iframe.html?id=examples-contactform--default&viewMode=story` (iframe URL: no Storybook chrome,
   simpler to click). Check:
   1. click Name, then click Email (Name blurs empty) -> "Name is required" under Name; nothing under Email except the
      hint "Try taken@example.com";
   2. type `a` in Name -> the error disappears;
   3. Reset, then click Submit with everything empty -> errors under Name, Email, Confirm email, Topic, the checkbox;
      no result line;
   4. fill Name `Ann`, Email `taken@example.com`, Confirm `taken@example.com`, Topic Sales, tick the checkbox, Submit
      -> after ~300 ms "Email already registered" under Email;
   5. type one more character in Email -> that error is gone (the format rule may show again only after blur);
   6. set Email and Confirm to `ann@example.com`, Submit -> result line `Submitted: Ann <ann@example.com>, topic sales`;
   7. Confirm `x@example.com`, blur -> "Emails do not match";
   8. Reset -> all fields empty, no errors.
   Screenshot after 3, 4 and 8. Also open `examples-contactform--prefilled`: Name and Email prefilled, no errors.
4. Browser console: no errors from the example.

### 7. Commit and wrap [agent after yes]
1. From `src/packages/dynstruct-mui`: `along commit "feat(forms): onBlur on form controls, ContactForm on declarative validation" -i field-validation-binding --paths <the files of "Files to change">`
   (no version bump; no `-a`). The repo may also hold the uncommitted ADR `no-agent-vendor-dev-tooling` files
   (`.along/DECISIONS/`, `.along/CONSTRAINTS.md`, `.along/DECISIONS.md`, `docs/decisions/`): commit them separately with
   `along commit "docs(adr): dev servers and browser checks via project scripts, no agent-vendor config" -i field-validation-binding --paths <those files>`.
2. Push only after the user's yes.
3. Tick the verified acceptance checkboxes in the issue file (`along wrap` refuses while none is ticked). The
   "Released only through ... version:sync" item means "no isolated version bump": tick it with that note if you made
   none.
4. `along test`, then `along wrap field-validation-binding --summary "..." --no-decisions`.

### 8. Release (outside this issue) [agent after yes / user]
After both library issues are wrapped: monorepo-wide release through Mempart `pnpm run version:sync <v>` (from `src/`),
`release: v<v>` commits and annotated tags in every submodule and the root, npm publish by the user. Prefer folding it
into the pending app-core release (`03R--task--release-libraries` in Mempart `task--app-core-extraction`) if that has
not shipped yet; otherwise create a Mempart release milestone for it. Not part of this plan's execution.
