---
protocol: along
protocol_version: "4.6.0"
slug: package-root-export
type: task
status: open
priority: high
created: 2026-11-03
updated: 2026-11-04
agent: claude-code
tags: [packaging, exports, typescript]
parent: task--package-exports-and-paths
blocked_by: []
related: []
plan_status: approved
---

# Root `"."` entry in `exports`

## Problem Statement
`package.json` `exports` has only `"./*"`. A bare `import { ... } from '@actdim/dynstruct-mui'` (51 imports in
Mempart webapp and ui-core) does not resolve through `exports` under `moduleResolution: bundler`, so consumers map it
with tsconfig `paths` to `dist/index.d.ts` and a vitest alias to `dist/index.es.js`, although `src/index.ts` and
`dist/index.*` exist.

## Requirements
- REQ-1: `exports` gets `"."` -> `types: ./dist/index.d.ts`, `import: ./dist/index.es.js`, listed before `"./*"`.
- REQ-2: `"./*"` and `typesVersions` stay unchanged (subpath imports such as `@actdim/dynstruct-mui/Toast` keep working).
- REQ-3: No version bump here (monorepo-wide `version:sync` in the release step).

## Implementation steps
1. Add the entry; build; check that bare and subpath imports resolve (Node `import.meta.resolve`, tsc trace).

## Acceptance Criteria
- [ ] `"."` export present; `pnpm --filter @actdim/dynstruct-mui build`, `test`, `lint` green.
- [ ] Bare import resolves to `dist/index.es.js` / `dist/index.d.ts` without `paths` or aliases.
