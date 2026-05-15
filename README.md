# @actdim/dynstruct-mui

MUI component wrappers for [@actdim/dynstruct](https://github.com/actdim/dynstruct). Each component is a dynstruct hook-constructor — observable props, reactive rendering, MobX-backed state out of the box.

[![npm version](https://img.shields.io/npm/v/@actdim/dynstruct-mui.svg)](https://www.npmjs.com/package/@actdim/dynstruct-mui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

## Components

| Component | Import |
|---|---|
| Accordion | `@actdim/dynstruct-mui/Accordion` |
| Alert | `@actdim/dynstruct-mui/Alert` |
| Autocomplete | `@actdim/dynstruct-mui/Autocomplete` |
| Avatar | `@actdim/dynstruct-mui/Avatar` |
| Badge | `@actdim/dynstruct-mui/Badge` |
| Breadcrumbs | `@actdim/dynstruct-mui/Breadcrumbs` |
| Button | `@actdim/dynstruct-mui/Button` |
| Card | `@actdim/dynstruct-mui/Card` |
| Checkbox | `@actdim/dynstruct-mui/Checkbox` |
| Chip | `@actdim/dynstruct-mui/Chip` |
| CircularProgress | `@actdim/dynstruct-mui/CircularProgress` |
| Dialog | `@actdim/dynstruct-mui/Dialog` |
| Drawer | `@actdim/dynstruct-mui/Drawer` |
| Fab | `@actdim/dynstruct-mui/Fab` |
| IconButton | `@actdim/dynstruct-mui/IconButton` |
| LinearProgress | `@actdim/dynstruct-mui/LinearProgress` |
| List | `@actdim/dynstruct-mui/List` |
| Menu | `@actdim/dynstruct-mui/Menu` |
| Pagination | `@actdim/dynstruct-mui/Pagination` |
| RadioGroup | `@actdim/dynstruct-mui/RadioGroup` |
| Rating | `@actdim/dynstruct-mui/Rating` |
| Select | `@actdim/dynstruct-mui/Select` |
| Skeleton | `@actdim/dynstruct-mui/Skeleton` |
| Slider | `@actdim/dynstruct-mui/Slider` |
| Snackbar | `@actdim/dynstruct-mui/Snackbar` |
| SpeedDial | `@actdim/dynstruct-mui/SpeedDial` |
| Stepper | `@actdim/dynstruct-mui/Stepper` |
| Switch | `@actdim/dynstruct-mui/Switch` |
| Table | `@actdim/dynstruct-mui/Table` |
| Tabs | `@actdim/dynstruct-mui/Tabs` |
| TextField | `@actdim/dynstruct-mui/TextField` |
| ToggleButtonGroup | `@actdim/dynstruct-mui/ToggleButtonGroup` |
| Tooltip | `@actdim/dynstruct-mui/Tooltip` |

## Installation

```bash
npm install @actdim/dynstruct-mui
```

Peer dependencies: `@actdim/dynstruct`, `@mui/material`, `react`, `mobx`, `mobx-react-lite` — see `package.json` for full list.

## Usage

```tsx
import { useButton } from '@actdim/dynstruct-mui/Button';

const saveBtn = useButton({
    props: {
        label: 'Save',
        variant: 'contained',
        onClick: () => handleSave(),
    },
});

// In JSX:
// <saveBtn.view />
// or via React adapter:
import { Button } from '@actdim/dynstruct-mui/Button';
// <Button label="Save" variant="contained" onClick={handleSave} />
```

## Development

```bash
pnpm storybook      # run Storybook
pnpm build          # build
pnpm typecheck      # type check
pnpm lint           # lint
pnpm format         # format
```

## License

Proprietary — see [LICENSE](LICENSE) for details.

## Author

Pavel Borodaev — [github.com/actdim/dynstruct-mui](https://github.com/actdim/dynstruct-mui)
