---
protocol: along
protocol_version: "2.2.5"
slug: setup-and-workflow
title: 03 Setup And Workflow
type: topic
created: 2026-08-27
updated: 2026-09-02
tags: [setup-and-workflow]
---

# @actdim/dynstruct-mui Setup, Build & Storybook Workflow

## 1. Prerequisites & Installation

- **Node.js**: >= 20.0.0
- **Package Manager**: `pnpm` (version ~10.21.0)
- **TypeScript**: >= 5.9.3

Install dependencies:
```bash
pnpm install
```

### Peer Dependencies
```bash
pnpm add @actdim/dynstruct @actdim/msgmesh @actdim/utico @mui/material @emotion/react @emotion/styled react react-dom mobx mobx-react-lite
```

## 2. Scripts & Workflows

| Command | Action | Description |
|---|---|---|
| `pnpm run build` | `tsc -b tsconfig.json && vite build` | Compiles ESM packages with `.d.ts` declaration maps |
| `pnpm run storybook` | `storybook dev -p 6006` | Launches Storybook with all Material UI component stories |
| `pnpm run build-storybook` | `storybook build` | Builds static Storybook bundle |
| `pnpm run test` | `npx vitest --config=vitest.node.config.ts --no-cache` | Runs unit tests |
| `pnpm run typecheck` | `tsc -b tsconfig.json` | Runs strict TypeScript verification |
| `pnpm run lint` | `eslint "./**/*.{ts,tsx}"` | Lints codebase |
| `pnpm run format` | `prettier --write .` | Formats all files |

## 3. Storybook Catalog (`src/_stories/`)
Interactive stories exist for every wrapped Material UI component: `Button.stories.tsx`, `Dialog.stories.tsx`, `TextField.stories.tsx`, `Select.stories.tsx`, `Card.stories.tsx`, `Accordion.stories.tsx`, `Table.stories.tsx`, `Tabs.stories.tsx`, etc.

## 4. Cross-Links
- [[INDEX.md]] - Knowledge Base Root
- [[01-architecture.md]] - Architecture
- [[02-domain-model.md]] - Domain Model
