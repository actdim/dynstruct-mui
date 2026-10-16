---
protocol: along
protocol_version: "4.4.16"
slug: agent-native-component-registry
type: task
status: open
priority: high
created: 2026-10-16
updated: 2026-10-16
agent: antigravity
tags: [agent, ai, mui, dynstruct, metadata, llms]
milestone: v2.0.0-along-transition
parent: task--agent-native-ecosystem-standardization
blocked_by: []
related: []
---

# Agent-native metadata, component registry, and llms.txt contracts for Dynstruct MUI

## Purpose and Scope

`@actdim/dynstruct-mui` provides ready-to-use Material UI component wrappers adapted to `@actdim/dynstruct` contracts.

A common failure mode for AI coding agents when working with UI libraries is prop guessing and architectural mixing: an agent often tries to render raw `<TextField value={m.value} onChange={e => m.value = e.target.value} />` directly inside a Dynstruct view, breaking the component model, reactive tracking, and two-way binding guarantees.

Dynstruct-MUI replaces this ad-hoc code with pre-built Dynstruct structs (`TextFieldStruct`, `ButtonStruct`, `SelectStruct`, etc.) that are instantiated inside `def.children` and wired via `bindProp`.

This task defines the agent-native metadata, the machine-readable Component Registry, and `llms.txt` specifications for `@actdim/dynstruct-mui`.

---

## 1. Package Manifest (`package.json`)

Update the package manifest with agent-native metadata:

- **`description`**:
  ```text
  "Pre-built Material UI component wrappers adapted to Dynstruct contracts for deterministic agent UI composition."
  ```

- **`keywords`**:
  Add agent and component keywords:
  ```json
  [
    "agent-native",
    "ai-ready",
    "llm-friendly",
    "mui-wrappers",
    "agent-components",
    "design-system",
    "dynstruct",
    "component-model",
    "react",
    "typescript"
  ]
  ```

- **`ai` and `llms` fields**:
  Verify alignment with the ecosystem standard:
  ```json
  "llms": "./llms.txt",
  "ai": {
    "instructions": "./AGENTS.md",
    "docs": "./docs",
    "llms": "./llms.txt",
    "llms-full": "./llms-full.txt"
  }
  ```

- **`files` array**:
  Ensure `llms.txt`, `llms-full.txt`, and `AGENTS.md` are packed for npm distribution.

---

## 2. Standardization of `llms.txt`

Restructure `llms.txt` following the llmstxt.org standard:

### Section A: Overview
Explain how Dynstruct-MUI wraps Material UI controls into typed Dynstruct hook-constructors.

### Section B: Golden Rules for AI Agents
1. **Child Definition Location**:
   Always instantiate Dynstruct-MUI components inside `def.children` using their constructor hook (`useTextField`, `useButton`, etc.). NEVER instantiate them inside the `view` function.
2. **Raw MUI Ban for Stateful Controls**:
   NEVER import raw `@mui/material` inputs (`TextField`, `Select`, `Checkbox`, `Switch`) directly into Dynstruct views for editable state. Use the corresponding Dynstruct-MUI wrapper to guarantee model synchronization.
3. **Binding Syntax**:
   Use `bindProp(() => m, 'propertyName')` for input bindings:
   ```ts
   valueInput: useTextField({
     value: bindProp(() => m, 'username'),
     label: 'Username',
   })
   ```
4. **Rendering in View**:
   Render the child in the view using the capitalized accessor: `<c.children.ValueInput />`.

### Section C: Component Registry (Cheat Sheet for Agents)
Provide a clear catalog of available wrappers and their struct signatures:

| Wrapper Hook | Struct Type | Primary Props / Bindings | Render in View |
|---|---|---|---|
| `useTextField` | `TextFieldStruct` | `value: bindProp(() => m, 'field')`, `label`, `disabled` | `<c.children.Field />` |
| `useButton` | `ButtonStruct` | `onClick: c.actions.myAction`, `label`, `variant` | `<c.children.Btn />` |
| `useSelect` | `SelectStruct` | `value: bindProp(() => m, 'field')`, `options: [...]` | `<c.children.Picker />` |
| `useCheckbox` | `CheckboxStruct` | `checked: bindProp(() => m, 'flag')`, `label` | `<c.children.Check />` |
| `useSwitch` | `SwitchStruct` | `checked: bindProp(() => m, 'flag')`, `label` | `<c.children.Toggle />` |
| `useDialog` | `DialogStruct` | `open: bindProp(() => m, 'isOpen')`, `title` | `<c.children.Modal />` |

### Section D: Canonical Form Snippet
Provide a complete form composition example showing how an agent wires multiple controls together.

---

## 3. In-Source JSDoc Annotations

Add `@example` and `@agentNotice` JSDoc annotations to each exported component hook in `src/`:
- Document accepted props.
- Show `bindProp` two-way binding example.
- Show view rendering syntax `<c.children.MyControl />`.

---

## Acceptance Criteria

- [ ] `package.json` updated with agent-native description and keywords.
- [ ] `llms.txt` conforms to llmstxt.org with Component Registry and binding examples.
- [ ] Exported wrapper hooks carry `@example` JSDoc tags.
- [ ] Vitest test suite passes without errors (`pnpm test`).
