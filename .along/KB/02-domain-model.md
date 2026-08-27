---
protocol: along
slug: 02-domain-model
title: 02 Domain Model
type: topic
created: 2026-08-27
updated: 2026-08-27
tags: []
---

# @actdim/dynstruct-mui Domain Model & Component Catalog

## 1. Domain Overview

`@actdim/dynstruct-mui` exposes typed component structures and hook-constructors wrapping `@mui/material` components.

## 2. Component Catalog

### 2.1. Form & Input Components
- **`useTextField` / `TextField`**: Material UI text field with label, helperText, error state, and two-way string binding.
- **`useSelect` / `Select`**: Select dropdown supporting single and multi-selection with options mapping.
- **`useAutocomplete` / `Autocomplete`**: Searchable combobox and autocomplete input.
- **`useCheckbox` / `Checkbox`**: Boolean checkbox toggle with label.
- **`useSwitch` / `Switch`**: On/off toggle switch.
- **`useRadioGroup` / `RadioGroup`**: Radio button selection group.
- **`useSlider` / `Slider`**: Continuous or discrete numeric slider.
- **`useRating` / `Rating`**: Star rating input widget.

### 2.2. Actions & Buttons
- **`useButton` / `Button`**: Primary, secondary, text, and contained button variants with click handlers.
- **`useIconButton` / `IconButton`**: Icon-only button wrapper.
- **`useFab` / `Fab`**: Floating Action Button.
- **`useToggleButtonGroup` / `ToggleButtonGroup`**: Segmented button group.
- **`useSpeedDial` / `SpeedDial`**: Expandable floating action speed dial.

### 2.3. Dialogs, Drawers & Layouts
- **`useDialog` / `Dialog`**: Modal dialog with title, content, actions, and open/close state.
- **`useDrawer` / `Drawer`**: Side sliding drawer container.
- **`useCard` / `Card`**: Container card with header, media, content, and action sections.
- **`useAccordion` / `Accordion`**: Expandable panel accordion.
- **`useTable` / `Table`**: Data table with sorting and pagination headers.
- **`useTabs` / `Tabs`**: Tab navigation bar.
- **`useStepper` / `Stepper`**: Multi-step wizard navigation.

### 2.4. Feedback & Indicators
- **`useAlert` / `Alert`**: Severity banner (`error`, `warning`, `info`, `success`).
- **`useSnackbar` / `Snackbar`**: Floating toast notification with auto-hide duration.
- **`useCircularProgress` / `CircularProgress`** & **`useLinearProgress` / `LinearProgress`**: Loading spinners.
- **`useSkeleton` / `Skeleton`**: Content placeholder loading skeleton.
- **`useTooltip` / `Tooltip`**: Hover tooltip popup.

## 3. Cross-Links
- [[INDEX.md]] - Knowledge Base Root
- [[01-architecture.md]] - System Architecture
- [[03-setup-and-workflow.md]] - Setup, Build & Storybook Workflow
