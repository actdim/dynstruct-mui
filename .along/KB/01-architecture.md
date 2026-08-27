---
protocol: along
slug: 01-architecture
title: 01 Architecture
type: topic
created: 2026-08-27
updated: 2026-08-27
tags: []
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

## 2. Cross-Links
- [[INDEX.md]] - Knowledge Base Root
- [[02-domain-model.md]] - Domain Model & Component Catalog
- [[03-setup-and-workflow.md]] - Setup, Build & Storybook Workflow
