## 🧠 Phase 1: Discovery, Scoping & Technical Design

> **[SYSTEM NOTICE]** The `ce-brainstorm` skill from Compound Engineering is not detected in this environment.
> Executing this phase using the built-in professional planning protocol.

---

### Step 1 — Context Gathering & Ticket Retrieval

Before writing a single line of code, fully understand the problem space.

- If a ticket reference (Jira, Trello, OpenProject) is available in the context, retrieve it via the corresponding tool (`get_jira_ticket`, `get_trello_card`, `get_openproject_work_package`).
- If no ticket is available, derive requirements directly from the user's provided description.
- Identify and read any related `SKILL.md`, `STRATEGY.md`, `CONTRIBUTING.md`, `ADR`, or `docs/` files inside the workspace to understand project conventions.
- Search for existing code patterns related to the feature using codebase search tools — do NOT reinvent patterns that already exist.

---

### Step 2 — Problem Framing

State clearly and concisely:

1. **Problem Statement**: What user pain point or business need does this solve?
2. **Scope Boundaries**: What is explicitly IN scope vs. OUT of scope for this task?
3. **Success Criteria**: What does "done" look like? How will success be measured?
4. **Non-functional Requirements**: Performance targets, security constraints, scalability considerations, observability hooks (logging, metrics, tracing).

---

### Step 3 — Technical Design

Produce a structured technical design covering:

#### Architecture Decision

- Identify the architectural pattern to be applied (e.g., RESTful service layer, event-driven, repository pattern, CQRS).
- List all systems, services, or modules that will be affected or integrated.
- If a database schema change is involved, specify the migration strategy.

#### Breakdown of Changes

Produce a table or structured list of all files to be created, modified, or deleted:

| Action | File / Module | Reason |
|--------|--------------|--------|
| CREATE | `src/...` | New feature module |
| MODIFY | `src/...` | Extend existing logic |
| DELETE | `src/...` | Cleanup deprecated code |

#### API & Interface Contracts

- Define any new API endpoints, function signatures, or interfaces.
- Include request/response shapes (use TypeScript types, JSON examples, or OpenAPI snippets as appropriate).
- Identify backward compatibility concerns and deprecation strategy if applicable.

#### Risk & Dependency Assessment

- List external dependencies introduced and their maintenance status.
- Flag any known race conditions, security risks, or performance bottlenecks.
- Highlight cross-team or cross-service dependencies that may require coordination.

---

### Step 4 — Test Strategy

Even at the planning stage, define a test strategy:

- **Unit Tests**: Core logic, pure functions, edge cases.
- **Integration Tests**: Service boundaries, DB interactions, external API mocks.
- **E2E / Contract Tests**: Full user-facing flows (if applicable).
- **Regression Targets**: Identify any existing tests that may be impacted.

---

### Step 5 — Human Review Gate 🛑

Present the following artifacts to the user in a clear, readable format:

1. **Problem Statement & Scope**
2. **Technical Design Summary**
3. **File Change Manifest**
4. **API / Interface Contracts**
5. **Test Strategy**

Ask the user:

> _"Here is the technical design and implementation plan for review. Please confirm, request changes, or flag any missed requirements before I proceed to implementation."_

**⛔ You MUST NOT proceed to Phase 2 until the user explicitly approves this plan.**
