---
protocol: along
protocol_version: "4.4.10"
slug: eslint-config-repair
type: debt
status: done
completed: 2026-10-12
priority: medium
created: 2026-10-12
updated: 2026-10-12
agent: claude-code
parent: task--leftovers-after-params-semantics
tags: []
blocked_by: []
related: []
---

# Repair broken merge in eslint.config.mjs

`eslint.config.mjs` carried a broken merge (two `export default defineConfig(` calls, duplicated imports, merged
`no-misused-promises` / `ban-ts-comment` entries, two `languageOptions`) and imported `eslint-plugin-jsx-a11y`,
which was not installed, so `pnpm lint` failed. Rebuilt on the repaired `@actdim/dynstruct` config (no react-hooks
`recommended` spread - React Compiler rules contradict the component model; `prefer-const` with
`ignoreReadBeforeAssign`; `prettier/prettier` off), `eslint-plugin-jsx-a11y@^6.10.2` added to devDependencies.

## Acceptance Criteria
- [x] `pnpm lint` runs: 0 errors, 40 warnings (32 `prefer-const` on the canonical `let c` hook-constructor
      pattern, 4 `no-unused-vars`, 2 `rules-of-hooks` in story `render` functions, 1 `only-export-components`,
      1 `no-console`) - left as is
- [x] Automated tests passing
