---
protocol: along
slug: architecture
title: 01 Architecture
type: topic
created: 2026-08-27
updated: 2026-09-10
tags: [architecture]
---

# @actdim/dynstruct-mui Architecture

## 1. System Overview

`@actdim/dynstruct-mui` provides Material UI (MUI v5/v6) component adapters specifically engineered for the `@actdim/dynstruct` component system. It bridges Material UI widgets with the dynstruct reactive component model, two-way bindings (`bind`, `bindProp`), and message bus integration.

```
+---------------------------------------------------------------------------------------------------+
|                                     @actdim/dynstruct-mui                                         |
+---------------------------------------------------------------------------------------------------+
|  MUI Component Adapters                                                                           |
|  - Input & Form: TextField, Select, Autocomplete, Checkbox, Switch, RadioGroup, Slider, Rating   |
|  - Actions: Button, IconButton, Fab, ToggleButtonGroup, SpeedDial                                 |
|  - Layout & Containers: Card, Accordion, Dialog, Drawer, Menu, List, Table, Tabs, Stepper          |
|  - Feedback & Display: Alert, Snackbar, CircularProgress, LinearProgress, Skeleton, Badge, Avatar|
|  - Navigation: Breadcrumbs, Pagination, Tooltip                                                   |
+---------------------------------------------------------------------------------------------------+
|  Dynstruct Integration Layer                                                                      |
|  - Hook-Constructors: useButton, useTextField, useDialog, useSelect, etc.                         |
|  - Two-way Data Binding: Seamless connection with bind(() => m.field, v => m.field = v)          |
|  - React Exports: Standard toReact() wrappers for direct JSX usage                                |
+---------------------------------------------------------------------------------------------------+
```

## Form validation

Form validation rules live in the component's def.props (prop({ initialValue, validator })). Connect form controls with indField from @actdim/dynstruct/componentModel/core:
- Spread ...bindField(() => c, 'name') into value controls (TextField, Select, Autocomplete, RadioGroup).
- Pass parts (checked: f.value, error: f.error, helperText: f.helperText, onBlur: f.onBlur) into boolean controls (Checkbox, Switch).
- Gate submission with if (!(await c.validate())) { return; }.

See AGENTS.md (Form Fields and Validation) for full usage details.

## 2. Cross-Links
- [[INDEX.md]] - Knowledge Base Root
- [[02-[domain-model](./topic--domain-model.md).md]] - Domain Model & Component Catalog
- [[03-[setup-and-workflow](./topic--setup-and-workflow.md).md]] - Setup, Build & Storybook Workflow
