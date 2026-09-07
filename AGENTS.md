<!-- BEGIN ALONG-PROTOCOL ref=../../../AGENTS.md (managed by along-init - do not edit by hand) -->
This folder belongs to a repository that uses the ALONG structure. The full working
guidance + agent-context protocol live once in the nearest ancestor `AGENTS.md` (`../../../AGENTS.md`) -
read it there. This folder keeps its OWN `.along/` state; use the nearest one.
Only this folder's specifics follow.
<!-- END ALONG-PROTOCOL --># AI Agent Guide for `@actdim/dynstruct-mui`

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

// 1. Local Struct type — generic but private to file, default = BaseAppMsgStruct
type Struct<TMsgStruct extends BaseAppMsgStruct = BaseAppMsgStruct> = ComponentStruct<
    TMsgStruct,
    {
        props: { /* ... */ };
    }
>;

// 2. Hook-constructor — NOT generic, uses Struct with default
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

// 3. Exported type — concrete (non-generic) alias
export type XxxStruct = Struct;

// 4. React adapter — no explicit type params needed
export const Xxx = toReact(useXxx);
Xxx.displayName = 'Xxx';
```

### Rules

- **`Struct` stays local** — generic with `TMsgStruct` default, never exported directly.
- **Hook-constructor is non-generic** — `useXxx(params: ComponentParams<Struct>): Component<Struct>`.
- **`XxxStruct` export is non-generic** — `export type XxxStruct = Struct`.
- **`toReact` needs no type params** — `toReact(useXxx)` works because the hook is non-generic.
- **`displayName`** — always set `Xxx.displayName = 'Xxx'` after `toReact(...)` so Storybook and React DevTools show the correct name.
- **Disabled state** — use `m.$.isDisabled` (from `ComponentState`), not a dedicated `disabled` prop.
- **Loading state** — use explicit `loading?: boolean` prop or wire to `m.$.pendingRequestCount > 0`.
- **`m.$.isVisible`** — hide/show via component state, not a prop.

## Import Paths

```ts
// Contracts (types only)
import { ... } from '@actdim/dynstruct/componentModel/contracts';

// React utilities (useComponent, toReact)
import { ... } from '@actdim/dynstruct/componentModel/react/hooks';
//                                                     ^^^^^^^^^^^
// Note: the file lives at dist/componentModel/react/react.d.ts
// NOT dist/componentModel/react.d.ts — that file does not exist

// App domain
import { ... } from '@actdim/dynstruct/appDomain/appContracts';
import { ... } from '@actdim/dynstruct/appDomain/commonContracts';
```

## MUI Composition Rules

Always follow the **official MUI website patterns** — use composable building blocks, not convenience shorthands:

| Component | Correct pattern |
|---|---|
| Select | `FormControl` + `InputLabel` + `Select` + `FormHelperText` |
| Checkbox (with label/error) | `FormControl` + `FormControlLabel` wrapping `Checkbox` + `FormHelperText` |
| Switch (with label/error) | `FormControl` + `FormControlLabel` wrapping `Switch` + `FormHelperText` |
| TextField | `TextField` (this IS the official atomic component, not a shorthand) |
| Button / IconButton | Use directly |
| Dialog | `Dialog` + `DialogTitle` + `DialogContent` + `DialogActions` |
| Alert | `Alert` directly (`onClose` for close button) |

- **`disabled`** always goes on the outermost container (`FormControl`, `Button`, etc.) — not inside, not as a duplicate.
- **`error`** and **`helperText`** always use `FormControl error={}` + `FormHelperText` — not ad-hoc inline text.
- **`sx`** type: when `FormControl` is the root, use `FormControlProps['sx']`, otherwise `MuiXxxProps['sx']`.
- For `labelId` (Select, etc.) use `c.id` from the dynstruct component instance to ensure uniqueness.

## Props Convention

- Map MUI prop types via `MuiXxxProps['propName']` — e.g. `MuiButtonProps['variant']`.
- Include `sx?` typed from the **outermost MUI element** (see MUI Composition Rules above).
- Reactive `ReactNode` props (icons, content, `React.FC`) are fine — MobX handles them as observable refs.
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

- Always use `Meta<typeof Xxx>` explicit annotation (not `satisfies`) — avoids TS2742 from pnpm MUI path references.
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
