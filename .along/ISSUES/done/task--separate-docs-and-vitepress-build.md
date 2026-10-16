---
protocol: along
protocol_version: "4.4.15"
slug: separate-docs-and-vitepress-build
type: task
status: done
completed: 2026-10-16
priority: medium
created: 2026-10-16
updated: 2026-10-16
agent: antigravity
tags: []
milestone: v2.0.0-along-transition
parent: task--separate-docs-and-vitepress-build
blocked_by: []
related: []
---

# Separate docs sources and VitePress build artifacts

## Background Context
In `@actdim/dynstruct-mui`, documentation existed in `docs/` (`INDEX.md`, `topic--*.md`) and was referenced by `llms.txt`, but VitePress was not yet configured.
To ensure documentation is available for both humans via GitHub Pages and AI agents via npm package progressive disclosure, VitePress was introduced with isolated build outputs.

## Implementation Details
1. Installed `vitepress` and `vitepress-plugin-mermaid` in `devDependencies`.
2. Added `docs:dev`, `docs:build`, and `docs:preview` scripts to `package.json`.
3. Created `docs/.vitepress/config.ts` configured with `base: '/dynstruct-mui/'`, `outDir: '../.dist-docs'`, and `cacheDir: '../node_modules/.cache/vitepress'`.
4. Added `!docs/.vitepress` to `package.json` `files` array to protect npm releases.
5. Created `.github/workflows/pages.yml` with artifact path set to `.dist-docs`.
6. Added `.dist-docs/` and `.vitepress` cache rules to `.gitignore`.
7. Verified `pnpm run docs:build` compiles successfully to `.dist-docs/` in 19.44s.
8. Verified `npm pack --dry-run` produces clean 67.4 kB tarball containing only component dist and markdown docs.

## Acceptance Criteria
- [x] Configure VitePress with `outDir: '../.dist-docs'` and `cacheDir: '../node_modules/.cache/vitepress'`
- [x] Add `docs:*` scripts and `devDependencies` to `package.json`
- [x] Add `!docs/.vitepress` to `package.json` `files`
- [x] Create `.github/workflows/pages.yml` targeting `.dist-docs`
- [x] Add `.dist-docs/` to `.gitignore`
- [x] Verify `docs:build` compiles outside `docs/`
- [x] Verify `npm pack --dry-run` excludes all `.vitepress` build artifacts and configs
- [x] All automated tests pass cleanly (`pnpm test`)
