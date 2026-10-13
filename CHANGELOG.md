# Changelog

All notable changes to `@actdim/dynstruct-mui` are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.8.3] - 2026-10-13

### Fixed
- ESLint configuration repaired and Autocomplete slotProps documentation updated.

### Changed
- Bump patch version to 1.8.3, synchronize workspace dependencies and Along protocol v4.4.12 metadata.

## [1.8.2] - 2026-10-11

### Fixed
- React content props are declared with `prop({ reactive: 'ref' })`, so a React element or component type assigned after creation is stored by reference instead of being converted by MobX (which broke rendering with a debugger attached): `Accordion` (`summary`, `content`, `expandIcon`), `Avatar` (`children`), `Badge` (`children`, `badgeContent`), `Breadcrumbs` (`separator`), `Button` (`label`, `startIcon`, `endIcon`), `Card` (`content`, `title`, `subheader`, `avatar`, `headerAction`, `actions`), `Chip` (`icon`), `Dialog` (`title`, `subtitle`, `content`, `actions`), `Drawer` (`children`), `Fab` (`icon`), `IconButton` (`icon`), `Snackbar` (`action`), `SpeedDial` (`icon`), `Toast` (`action`), `Tooltip` (`title`, `children`) (`feat--ref-props-for-react-content`).

### Changed
- Requires `@actdim/dynstruct` 1.8.2, which adds `reactive: 'ref'` (with an older dynstruct these props fall back to the default deep reactivity).
- AGENTS.md: React content props rule corrected (they are not observable refs by default).
- Item and slot props with React content are `ref` as well (`@actdim/dynstruct` 1.8.2 rejects React values in deep-reactive props in DEV): `List.items`, `Table.rows`, `Tabs.tabs`, `ToggleButtonGroup.items`, `Menu.items`, `Toast.items` (replace the array to update), `TextField.slotProps`, `Autocomplete.slotProps` (`task--content-props-as-ref`).
- Storybook uses the dynstruct regType Vite plugin (`@actdim/dynstruct/vite/plugin`).

## [1.8.0] - 2026-10-01

Commit `90bc7e3`.

### Changed
- Version aligned with `@actdim/dynstruct` 1.8.0; no source changes.
- Along protocol 4.4.1; AI commit attribution disabled.

## [1.7.2] - 2026-09-27

Commit `a17cea7`.

### Changed
- Dependencies documentation, ESLint configuration and Storybook setup synchronized with the workspace.

## Earlier versions

See the git history (`git log --oneline`).
