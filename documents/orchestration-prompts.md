# AI Orchestration — Prompts & Tools

> **Lumina MCP** includes a powerful **AI Orchestration Engine** that automates the entire software development lifecycle end-to-end. The agent follows a strict, phase-based workflow — ensuring high-quality, production-ready output at every step.

---

## 🔧 Tools

### `get_orchestration_phase`

Retrieve the exact system-level instructions for a specific phase of the Orchestration Development Cycle. This tool powers the recursive, phase-by-phase workflow that the AI agent follows.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phase` | `number` | ✅ | Phase number to fetch (1–6) |
| `includeTest` | `boolean` | ✅ | Set to `false` to skip the Unit Testing phase and auto-shift subsequent phase numbers |

---

## 💬 Prompts

### `lumina-orchestrate`

> **Title:** Lumina Orchestrate

The primary entry-point prompt that kicks off the full **Orchestration Development Cycle**. It instructs the AI to operate strictly within phase boundaries and requires explicit user approval before moving to the next phase.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `includeTest` | `boolean` | ❌ | Whether to include the Unit Testing phase (default: `true`) |

**Usage:**
```
/lumina-orchestrate includeTest=true
/lumina-orchestrate includeTest=false
```

**Integration with Project Management:**
```
/lumina-orchestrate includeTest=true
> Fetch Jira ticket LUM-402 first, then start the orchestration.

/lumina-orchestrate includeTest=false
> Use the requirements from Trello card 64b19c as the starting context.

/lumina-orchestrate includeTest=true
> Start from OpenProject work package #82.
```

---

## 🔄 The Orchestration Development Cycle

The orchestration engine is divided into **six deterministic phases**. The AI agent completes all tasks in the current phase and requests user approval before proceeding to the next.

### Phase 1: Discovery & Analysis

1. **Context Fetching** — Reads the repository structure, checks for relevant skills (`Agent.md`), and fetches project tickets via Jira/Trello/OpenProject tools.
2. **Requirements Drafting** — Synthesizes findings into a clear requirements document.
3. **Test Catalog** — Generates a test catalog based on the requirements.

> *Requires user review of the requirements and test catalog before continuing.*

---

### Phase 2: Technical Planning

1. **Implementation Plan** — AI drafts a precise file-by-file implementation plan that maps every change to a specific file and method.
2. **API Contract** — Documents all new/modified interfaces and data contracts.

> *Requires user approval of the plan before any code is written.*

---

### Phase 3: Execution & Implementation

1. **Code Implementation** — AI uses specialized execution agents (e.g., `ce-work` from Compound Engineering) to implement the code exactly as defined in the approved plan.
2. **No deviation** — The agent is strictly prohibited from making changes outside the approved plan scope.

> *Requires user review of implemented code before continuing.*

---

### Phase 4: Iterative Code Review

1. **Strict Review** — Runs external code review tools (e.g., `ce-code-review`) to check for security vulnerabilities, performance regressions, and best practice violations.
2. **Immediate Fixes** — All issues found during review are fixed before the phase is marked complete.

---

### Phase 5: Verification & Compounding

1. **Test Execution** — Runs language-specific tests (`npm test`, `pytest`, `go test`, etc.) to verify overall system stability.
2. **Coverage Report** — Generates and saves a coverage report to `docs/`.
3. **Database Audit** — If database changes were made, runs Lumina's database tools (`analyze_mysql_query`, `save_audit_report`) to verify schema integrity and query performance.
4. **Knowledge Compounding** — Records design decisions and learnings in `docs/solutions/`.

---

### Phase 6: Git Pull Request Release

1. **Conventional Commit** — Generates a structured commit message following the Conventional Commits spec with ticket/branch auto-detection.
2. **Push** — Stages and pushes all changes to the remote branch.
3. **Pull Request** — Creates a GitHub PR with a tech company-style description linking back to the original ticket.

---

## 🛡️ Native Fallback Strategy

Lumina MCP works best with the [Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin) (`ce-brainstorm`, `ce-work`, `ce-code-review`). If the plugin is not installed in your AI client environment, Lumina automatically detects this and injects **Native Fallback Prompts**:

| Fallback | Behavior |
|----------|----------|
| **Planning Fallback** | Mandates technical design documents, API contracts, and file change manifests |
| **Execution Fallback** | Enforces strict code quality, error handling, security standards, and no hardcoded secrets |
| **Code Review Fallback** | A 5-tier checklist covering correctness, security (OWASP-aware), performance, maintainability, and observability |
| **Compounding Fallback** | Guides the AI to write `docs/solutions/` and Architecture Decision Records (ADRs) manually |

This means Lumina MCP delivers engineering rigor regardless of which AI client you use — from Antigravity IDE to standard Claude Desktop.
