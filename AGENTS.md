<!-- BEGIN ALONG-PROTOCOL root (managed by along-init - do not edit by hand) -->
# ALONG-PROTOCOL v4.5.4

This repo carries its own agent context, provider-agnostically. Follow it every session, whatever tool you are. This is the core; procedures (completion checklist, doc routing, merges, along-team, tool-use rules) live in `docs/topic--along-protocol.md` - pull the section you need via `/along-kb-search`. A gate's error message carries its detail.

## Where state lives
- **Nearest wins**: any folder may carry its own `AGENTS.md` + `.along/`; use the NEAREST for the area you work in. Nearest `.along/` > higher-level `.along/` > global config. Only a nested `.git` or a user-run `along init` makes a subproject.
- **Read at session start** (not auto-loaded): `.along/ISSUES.md`, `.along/CONSTRAINTS.md`, your issue `.along/ISSUES/<type>--<slug>.md`; when relevant `.along/VISION.md`, `.along/GLOSSARY.md`. They reflect the state WHEN WRITTEN - verify named files/APIs/flags against the code.
- **Entities**: issues (`feat|bug|debt|task|docs|spike`), ADRs (`.along/DECISIONS/`, never edited - superseded), milestones, sessions. Keys `<type>--<slug>`, referenced by key, never by path; schemas in `docs/topic--domain-model.md`. Create them from intent unprompted (build/fix -> issue, blocked -> issue tagged `risk`, compare -> `spike` issue, release -> milestone).
- **Projections** (`ISSUES.md`, `DECISIONS.md`, `CONSTRAINTS.md`, `docs/INDEX.md`) are compiled: on conflict take either side and re-run the sync.

## Anchor work to an issue
1. Find or create the issue with `status: in-progress`; `along start <slug>` binds this session.
2. Source edits unlock after the user approves the plan (`EnterPlanMode` -> `ExitPlanMode`, or `along plan approve --plan-file <path>` after their explicit yes). Questions get read-only answers; 1-line typo/comment edits are exempt.
3. Commit via `/along-commit`: bound to the slug, no AI `Co-Authored-By:` trailers.
4. Finish with the completion checklist, ending in `along wrap <slug> --summary "..." (--decisions <ADR...> | --no-decisions)`.

## Gates
Runtime hooks enforce these where installed; elsewhere (`along doctor` shows the level) self-apply every one and use the `along` CLI instead of raw tools.
- [gate: require-active-issue] [gate: require-plan-approval] - no source edit without an in-progress issue and an approved plan.
- [gate: subproject-boundary] - a subproject's entities go in ITS `.along/`; cross-subproject work needs an issue in each, or a root umbrella with `parent:` children.
- [gate: workspace-containment] - read/write inside the workspace (plus temp); other roots need `allowed_roots`; never credential stores.
- [gate: projection-protection] - never hand-edit or hand-merge projections.
- [gate: commit-issue-binding] - every commit names the active issue.
- [gate: issue-lifecycle] [gate: entity-reference-integrity] [gate: entity-deletion-protection] - close via `along wrap` / `along issue done`; rename or supersede, never delete a referenced entity.
- [gate: doc-manual-lock] - `write_policy: manual` docs change only under a `docs--<slug>` issue.
- [gate: rule-pack-protection] - never edit `.along/rules/**/*.md` (`along rules attach` owns them).
- [gate: doc-routing-compliance] - ADR vs `README.md` vs `docs/topic--*.md` routing tree.
- [gate: untracked-exports] - dashboards and `.along/diagnostics/` stay out of Git.
- [gate: cli_safety] - file content via file tools, never heredocs or `python -c`; no global installs.
- [gate: team-step-active] [gate: team-reviews-before-stop] - an `along-team` blackboard holds you to its step loop.
- [gate: test_before_stop] [gate: wrap_before_stop] [gate: projection_sync_before_stop] - before stopping: tests green, session wrapped, projections synced.
- [gate: unresolved_gate_denial] - a denied tool call is redone within the gate's rules or told to the user (`along gates ack`), never dropped silently; closing waits for their reply.
- Commit-time (`along lint`, pre-commit + CI): ASCII typography, fence languages, relative links, no `docs/` -> `.along/` links, Windows-safe names, no secrets, no stubs.
- Bypass is the user's call: `-n`, `--force-reason`, `scratch fallback` need `--reason` after their reply; recorded in `along gates stats`.

## Judgment rules
- Ground facts in code, `README.md` and `docs/`; no generic placeholders. Query `/along-kb-search` before reading whole docs; update affected `docs/topic--*.md` after non-trivial changes.
- Use `/along-test`, `/along-build`, `/along-dev` before raw commands, with quiet flags. Review your diff and blast radius (`along graph-impact`).
- Never delete or truncate docs, comments or code unless told; no stubs; check `git diff --stat` after batch edits. Verify written files parse. Tests stay hermetic.
- Scope > 3 files, crossing subsystems or refactoring core engines: route to `along-team`; plans MUST declare `Execution Mode: Direct` or `Role-Based`.
- Treat the `along` CLI as a black box (`along <cmd> --help`, no engine source outside the Along repo); report its errors verbatim.
<!-- END ALONG-PROTOCOL -->

# AI Agent Guide for `@actdim/dynstruct-mui`

MUI wrappers for `@actdim/dynstruct`. Each file wraps one MUI component into a dynstruct hook-constructor.

## Tech Stack

- TypeScript · React · MobX · `@actdim/dynstruct` · `@mui/material` · Vite

## Component Authoring Pattern

Every component follows this exact structure (see `src/Button.tsx` as the reference):

```tsx
import { type ComponentStruct, type ComponentDef, type ComponentParams,
         type Component, type ComponentModel } from '@actdim/dynstruct/componentModel/contracts';
import { useComponent, toReact } from '@actdim/dynstruct/componentModel/react/hooks';
import { type BaseAppMsgStruct } from '@actdim/dynstruct/appDomain/appContracts';

// 1. Local Struct type - generic but private to file, default = BaseAppMsgStruct
type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: { /* ... */ };
    }
>;

// 2. Hook-constructor - NOT generic, uses Struct with default
export const useXxx = (params: ComponentParams<Struct>): Component<Struct> => {
    let c: Component<Struct>;
    let m: ComponentModel<Struct>;

    const def: ComponentDef<Struct> = {
        regType: 'Xxx',
        props: { /* defaults */ },
        view: () => ( /* JSX using m.* and m.$.* */ ),
    };

    c = useComponent(def, params);
    m = c.model;
    return c;
};

// 3. Exported type - concrete (non-generic) alias
export type XxxStruct = Struct;

// 4. React adapter - no explicit type params needed
export const Xxx = toReact(useXxx);
Xxx.displayName = 'Xxx';
```

### Rules

- **`Struct` stays local** - generic with `TMsgStruct` default, never exported directly.
- **Hook-constructor is non-generic** - `useXxx(params: ComponentParams<Struct>): Component<Struct>`.
- **`XxxStruct` export is non-generic** - `export type XxxStruct = Struct`.
- **`toReact` needs no type params** - `toReact(useXxx)` works because the hook is non-generic.
- **`displayName`** - always set `Xxx.displayName = 'Xxx'` after `toReact(...)` so Storybook and React DevTools show the correct name.
- **Disabled state** - use `m.$.isDisabled` (from `ComponentState`), not a dedicated `disabled` prop.
- **Loading state** - use explicit `loading?: boolean` prop or wire to `m.$.pendingRequestCount > 0`.
- **`m.$.isVisible`** - hide/show via component state, not a prop.

## Consuming Wrappers (priority)

Inside a dynstruct component, use a wrapper as a **child**, not as inline JSX:

```tsx
import { useDialog, type DialogStruct } from '@actdim/dynstruct-mui/Dialog';
import { bindProp } from '@actdim/dynstruct/componentModel/core';

// struct: children: { addDialog: DialogStruct }
children: {
    addDialog: useDialog({
        open: bindProp(() => m, 'addDialogOpen'),
    }),
},
view: () => <c.children.AddDialog />,
```

- Import the hook-constructor and struct (`useXxx`, `XxxStruct`), declare the child in `children`, render `<c.children.Xxx />`.
- Bind values with `bindProp(() => m, 'prop')` first; use `bind(get, set)` only when the getter/setter needs specific logic.
- The `toReact` export (`Xxx`) is for plain React code and backward compatibility only - do not render `<Xxx prop={m.value} ... />` inline in a dynstruct `view`.
- Full rules: `@actdim/dynstruct` AGENTS.md, "Composition and Performance Rules" and "Binding priority".

## Import Paths

```ts
// Contracts (types only)
import { ... } from '@actdim/dynstruct/componentModel/contracts';

// React utilities (useComponent, toReact)
import { ... } from '@actdim/dynstruct/componentModel/react/hooks';
//                                                     ^^^^^^^^^^^
// Note: the file lives at dist/componentModel/react/react.d.ts
// NOT dist/componentModel/react.d.ts - that file does not exist

// App domain
import { ... } from '@actdim/dynstruct/appDomain/appContracts';
import { ... } from '@actdim/dynstruct/appDomain/commonContracts';
```

## MUI Composition Rules

Always follow the **official MUI website patterns** - use composable building blocks, not convenience shorthands:

| Component | Correct pattern |
|---|---|
| Select | `FormControl` + `InputLabel` + `Select` + `FormHelperText` |
| Checkbox (with label/error) | `FormControl` + `FormControlLabel` wrapping `Checkbox` + `FormHelperText` |
| Switch (with label/error) | `FormControl` + `FormControlLabel` wrapping `Switch` + `FormHelperText` |
| TextField | `TextField` (this IS the official atomic component, not a shorthand) |
| Button / IconButton | Use directly |
| Dialog | `Dialog` + `DialogTitle` + `DialogContent` + `DialogActions` |
| Alert | `Alert` directly (`onClose` for close button) |

- **`disabled`** always goes on the outermost container (`FormControl`, `Button`, etc.) - not inside, not as a duplicate.
- **`error`** and **`helperText`** always use `FormControl error={}` + `FormHelperText` - not ad-hoc inline text.
- **`sx`** type: when `FormControl` is the root, use `FormControlProps['sx']`, otherwise `MuiXxxProps['sx']`.
- For `labelId` (Select, etc.) use `c.id` from the dynstruct component instance to ensure uniqueness.

## Props Convention

- Map MUI prop types via `MuiXxxProps['propName']` - e.g. `MuiButtonProps['variant']`.
- Include `sx?` typed from the **outermost MUI element** (see MUI Composition Rules above).
- React content props (`ReactNode`, `React.FC`, component types: icons, titles, slots, `children`) are declared with `prop({ reactive: 'ref' })` from `@actdim/dynstruct/componentModel/core`, keeping a non-`undefined` default via `initialValue` (`children: prop({ initialValue: () => null, reactive: 'ref' })`). Without it a value assigned after creation gets deep reactivity and MobX converts the React value, which breaks rendering when a debugger is attached. React values nested in item arrays (`items: [{ icon: <Icon /> }]`) are not covered by this.
- Provide sensible defaults for all props in `def.props`.

## Storybook Stories

Every story file uses `AppContextProvider` + `StorageService` as the decorator. See `src/_stories/Button.stories.tsx` as the reference.

```tsx
import { AppContextProvider, appMsgBus } from './bootstrap';
import { StorageService } from '@actdim/dynstruct/services/react/StorageService';

const meta: Meta<typeof Xxx> = {
    title: 'Controls/Xxx',
    component: Xxx,
    decorators: [
        (Story) => (
            <AppContextProvider value={{ msgBus: appMsgBus }}>
                <StorageService storeName={'test'} />
                <Story />
            </AppContextProvider>
        ),
    ],
    // ...
};
```

- Always use `Meta<typeof Xxx>` explicit annotation (not `satisfies`) - avoids TS2742 from pnpm MUI path references.
- `argTypes` for `startIcon`, `endIcon`, `sx`: set `control: false` (not Storybook-controllable).
- `FullWidth` story should use `parameters: { layout: 'padded' }`.

## File Layout

```
src/
  Button.tsx            ← one file per MUI component
  TextField.tsx
  ...
  _stories/
    bootstrap.ts        ← AppMsgStruct, appMsgBus, AppContextProvider
    Button.stories.tsx
    ...
```

Import from the package: `import { useButton, ButtonStruct } from '@actdim/dynstruct-mui/Button'`.

## Project specifics

<!-- BEGIN ALONG-RULES -->
See the following engineering guidelines:
- `[languages/typescript.md](.along/rules/languages/typescript.md)`
- `[platforms/web.md](.along/rules/platforms/web.md)`
<!-- END ALONG-RULES -->
