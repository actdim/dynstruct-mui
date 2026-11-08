---
protocol: along
protocol_version: "4.6.1"
slug: standalone-missing-peer-devdeps
type: bug
status: open
priority: medium
created: 2026-11-08
updated: 2026-11-08
agent: claude-code
tags: [tooling, standalone, ci]
milestone: v2.0.0-along-transition
blocked_by: []
related: [task--adopt-dev-config]
---

# Standalone clone fails typecheck/build/test: peerDependencies not installed

Found while verifying `task--adopt-dev-config`; red at HEAD `38cede5` before that change (identical result after it).
In a fresh clone outside Mempart (`git clone`, `pnpm install --no-frozen-lockfile`), `.npmrc` sets
`auto-install-peers=false` and the peers `@actdim/dynstruct`, `@mui/material`, `@actdim/msgmesh`, `@actdim/utico`
are not devDependencies, so they are not installed: `tsc -b tsconfig.json` reports 450 errors (mostly
`TS2307 Cannot find module`), `pnpm run build` fails and 1 of 2 test files fails. Inside Mempart the workspace
provides them, so the problem is invisible there. `pnpm run lint` is unaffected (exit 0). Note: the `typecheck`
script is `tsc -p tsconfig.json --noEmit`, which checks nothing on a solution-style `tsconfig.json`
(`files: []`); `tsc -b` is what fails.

## Requirements
- REQ-1: `package.json` MUST list every peerDependency used by `src/` or `tests/` also as a devDependency with a range satisfying the peer range.
- REQ-2: The `typecheck` script MUST be `tsc -b tsconfig.json`, as in the sibling packages.
- REQ-3: A fresh standalone clone MUST pass `pnpm install`, `pnpm run typecheck`, `pnpm run build` and `pnpm run test`.

## Acceptance Criteria
- [ ] Standalone clone: typecheck 0 errors, build exit 0, all test files pass.
- [ ] Mempart workspace `pnpm --dir src run typecheck` still passes.
