## 📚 Knowledge Compounding & Engineering Memory

> **[SYSTEM NOTICE]** The `ce-compound` skill from Compound Engineering is not detected in this environment.
> Executing the knowledge documentation protocol using the built-in professional compounding workflow.

---

### Why This Matters

Engineering teams that don't document learnings re-discover the same solutions repeatedly — this is a compounding tax on velocity. At high-performing engineering organizations, every non-trivial engineering decision is captured somewhere: an ADR, a runbook, a `docs/solutions/` entry, or a code comment that explains *why*, not just *what*.

This phase ensures that valuable discoveries made during this task are persisted for the team and for future AI agents working in this codebase.

---

### Step 1 — Identify Compoundable Insights

Review the implementation just completed and ask:

1. **Novel Patterns**: Did you introduce or discover a reusable pattern not previously documented in the project?  
   *(Example: a new way to handle pagination, a generalized retry utility, a type-safe error wrapper)*

2. **Non-Obvious Workarounds**: Did you work around a framework quirk, a library bug, or an infrastructure limitation?  
   *(Example: why a specific library call must be invoked in a particular order, a timing issue in async flows)*

3. **Architecture Decisions**: Were any meaningful trade-off decisions made? What were the alternatives considered and why were they rejected?  
   *(Example: chose polling over webhooks due to firewall constraints; chose eventual consistency over strong consistency for performance)*

4. **Hard-Won Debugging Insights**: Did investigating this task reveal a systemic issue, a misunderstood invariant, or a gotcha that will likely be encountered again?

5. **Tooling & Process**: Did you discover something about the project's build system, test harness, or CI pipeline worth documenting?

---

### Step 2 — Determine Documentation Tier

Not everything needs a dedicated document. Apply the right granularity:

| Insight Type | Where to Capture |
|-------------|-----------------|
| Reusable abstraction / pattern | `docs/solutions/<topic>.md` |
| Architecture trade-off / rationale | `docs/decisions/ADR-NNN-<title>.md` (Architecture Decision Record) |
| Non-obvious code behavior | Inline `// WHY:` or `// NOTE:` comment in the source |
| Infrastructure or environment quirk | `docs/runbooks/<service>-runbook.md` or `README.md` section |
| Minor tip | Not worth a file — embed in a related PR description |

---

### Step 3 — Write the Documentation

For any insight classified as Tier `docs/solutions/` or `docs/decisions/`, create or update the relevant file with this structure:

#### For `docs/solutions/<topic>.md`

```markdown
# [Solution Title]

**Last Updated**: YYYY-MM-DD  
**Author**: AI Agent / [Engineer Name]  
**Related PRs / Tickets**: [links]

## Problem
[One paragraph: What was the problem? What made it tricky?]

## Solution
[Clear explanation of the approach taken. Include a minimal code example if applicable.]

## Alternatives Considered
[Brief list of approaches that were rejected and why.]

## Caveats & Limitations
[Anything a future engineer needs to know before applying this pattern in a different context.]
```

#### For `docs/decisions/ADR-NNN-<title>.md`

```markdown
# ADR-NNN: [Decision Title]

**Date**: YYYY-MM-DD  
**Status**: Accepted | Deprecated | Superseded by ADR-XXX

## Context
[What problem or constraint drove this decision?]

## Decision
[What was decided?]

## Consequences
[Positive and negative outcomes of this decision.]
```

---

### Step 4 — Inline Annotations

For localized, code-level insights that don't warrant a separate file, add a well-placed comment directly in the source:

```typescript
// WHY: We use a Map here instead of a plain object because we iterate
// over entries in hot paths (~10k calls/sec) and Map has O(1) iteration
// order guarantee vs. object key ordering quirks in older V8 versions.
const cache = new Map<string, CachedEntry>();
```

```typescript
// NOTE: This must be called BEFORE `initializeConnection()`.
// The underlying driver uses a lazy singleton and calling init() first
// causes a race condition in multi-threaded environments. See ADR-012.
await configureDriver(options);
```

---

### Step 5 — Completion Signal

After documenting:

1. List all documents created or updated (paths only).
2. List any inline annotations added (file + line reference).
3. Confirm no sensitive information was captured in any documentation.

> _"Knowledge compounding complete. Engineering insights from this task have been persisted for future reference."_
