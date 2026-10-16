---
protocol: along
protocol_version: "4.4.15"
slug: remove-unused-peerdeps
type: debt
status: done
completed: 2026-10-16
priority: medium
created: 2026-10-16
updated: 2026-10-16
agent: antigravity
tags: []
milestone: v2.0.0-along-transition
blocked_by: []
related: []
---

# Remove unused peerDependencies (mobx-utils)

## Problem Statement / Background
mobx-utils was listed in peerDependencies of @actdim/dynstruct-mui without any actual usage in MUI component adapters.

## Implementation Details
1. Removed mobx-utils from peerDependencies in package.json.
2. Verified MUI adapter components function cleanly without mobx-utils.
3. Ran package tests and lint checks.

## Acceptance Criteria
- [x] mobx-utils removed from peerDependencies
- [x] Zero peer dependency resolution warnings on install
- [x] All package tests pass cleanly
