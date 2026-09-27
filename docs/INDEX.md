---
protocol: along
slug: INDEX
title: '@actdim/dynstruct-mui - Knowledge Base Topic Index'
type: index
created: 2026-09-10
updated: 2026-09-27
tags: [index, kb, topics, map]
---

# @actdim/dynstruct-mui - Knowledge Base Topic Index

Central entry point and cross-linked topic catalog for project documentation:

## Knowledge Graph & Topic Map

```mermaid
flowchart TD
    INDEX["Knowledge Base (INDEX)"]
    T_ARCHITECTURE["01 Architecture"]
    INDEX --> T_ARCHITECTURE
    T_DEPENDENCIES["Dependencies & AI Documentation for @actdim/dynstruct-mui"]
    INDEX --> T_DEPENDENCIES
    T_DOMAIN_MODEL["02 Domain Model"]
    INDEX --> T_DOMAIN_MODEL
    T_SETUP_AND_WORKFLOW["03 Setup And Workflow"]
    INDEX --> T_SETUP_AND_WORKFLOW
    T_ARCHITECTURE -.->|references| T_DOMAIN_MODEL
    T_ARCHITECTURE -.->|references| T_SETUP_AND_WORKFLOW
    T_DOMAIN_MODEL -.->|references| T_ARCHITECTURE
    T_DOMAIN_MODEL -.->|references| T_SETUP_AND_WORKFLOW
    T_SETUP_AND_WORKFLOW -.->|references| T_ARCHITECTURE
    T_SETUP_AND_WORKFLOW -.->|references| T_DOMAIN_MODEL
```

---

## Articles

- **[01 Architecture](./topic--architecture.md)** (topic) `architecture`
- **[Dependencies & AI Documentation for @actdim/dynstruct-mui](./topic--dependencies.md)** (topic) `dependencies`, `subproject`, `ai-context`, `rules`
- **[02 Domain Model](./topic--domain-model.md)** (topic) `domain-model`
- **[03 Setup And Workflow](./topic--setup-and-workflow.md)** (topic) `setup-and-workflow`

---

## Related Context

- [AGENTS.md](../AGENTS.md): Active protocol conventions and rules.
- [.along/DECISIONS.md](../.along/DECISIONS.md): Architectural Decision Records.
- [Domain Model & Entity Ecosystem](./topic--domain-model.md): Specifications for active issues and project history.
