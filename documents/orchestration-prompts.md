# Orchestration Prompts & Tools

Lumina MCP includes a powerful **AI Orchestration Engine** designed to automate the entire software development lifecycle end-to-end. By chaining multiple phases and utilizing external tools (like Compound Engineering's `ce-work` and `ce-code-review`), Lumina MCP ensures that AI agents follow a strict, predictable, and highly efficient workflow.

## 🛠️ Tools

### `get_orchestration_phase`

**Description:**
Retrieves the exact instructional prompt for a specific phase (1 to 6) of the orchestration workflow. This tool also supports dynamically skipping the Unit Testing phase, which seamlessly shifts the subsequent phases.

**Parameters:**
- `phase` *(number, required)*: The phase number to fetch (1-6).
- `includeTest` *(boolean, required)*: Set to `false` to skip the Unit Testing phase and automatically shift the phase numbers.

---

## 💬 Prompts

### `lumina-orchestrate`

**Description:**
The primary entry-point prompt that kicks off the 6-Phase Orchestration workflow. It instructs the AI to operate strictly within the phase boundaries, requiring explicit user approval before moving from one phase to the next.

**Usage in IDEs:**
```
/lumina-orchestrate includeTest=true
```

---

## 🔄 The 6-Phase Orchestration Workflow

The orchestration engine is divided into six distinct phases. The AI agent must complete all tasks in the current phase and explicitly request your permission before proceeding.

### Phase 1: Planning, Brainstorming & Test Catalog
1. **Context Fetching:** Checks the repository for relevant context, skills (`Agent.md`), and tickets (via Jira/Trello tools).
2. **Brainstorm & Plan:** Generates a robust technical approach and implementation plan.
3. **Test Catalog:** Generates a test catalog document based on the plan.
*Requires user review of the plan and catalog before continuing.*

### Phase 2: Execution (Implementation)
1. **Execute Work:** The AI utilizes specialized execution agents (e.g., `ce-work` from Compound Engineering) to implement the code exactly as defined in the approved plan.
*Requires user review of the implemented code before continuing.*

### Phase 3: Unit Testing *(Skippable)*
1. **Test Generation:** Generates comprehensive unit tests based on the Test Catalog from Phase 1.
2. **Test Execution:** Runs the tests and patches any failing tests until they pass.
*(Note: If `includeTest` is false, this phase is skipped and Phase 4 takes its place).*

### Phase 4: Code Review
1. **Strict Code Review:** Runs external code review tools (like `ce-code-review`) to rigorously check the implemented code for security, performance, and best practices.
2. **Immediate Fixes:** Any issues found during the review are fixed immediately.

### Phase 5: Verification & Audit
1. **Language-Specific Tests:** Runs language-specific testing suites (e.g., `npm test`, `go test`, `pytest`) to verify overall system stability.
2. **Coverage Report:** Generates and saves a test coverage report to the `docs/` folder.
3. **Database Audit:** If database changes are detected, it runs Lumina's Database tools (`analyze_mysql_query`, `save_audit_report`) to verify schema integrity and query performance.

### Phase 6: Version Control (Git & GitHub)
1. **Commit & Push:** Generates a Conventional Commit message and pushes the code.
2. **Pull Request:** Creates a Pull Request using Tech Company standards (e.g., Netflix/Meta style) with thorough descriptions linking to the original ticket.
