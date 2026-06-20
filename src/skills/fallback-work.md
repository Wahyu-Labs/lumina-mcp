## ⚙️ Phase 2: Code Execution & Implementation

> **[SYSTEM NOTICE]** The `ce-work` and `ce-compound` skills from Compound Engineering are not detected in this environment.
> Executing this phase using the built-in professional implementation protocol.

---

### Pre-Execution Checklist

Before writing code, confirm the following:

- [ ] Phase 1 plan was reviewed and **explicitly approved** by the user.
- [ ] You have read any existing related code to understand the current patterns and conventions.
- [ ] You know the target runtime/framework (e.g., Node.js, Go, Python, Java) and version constraints.
- [ ] You understand the branch strategy: feature branch, trunk-based, etc.

---

### Step 1 — Implementation Standards

Adhere to the following engineering standards throughout all code written in this phase:

#### Code Quality
- Follow the existing project structure — do not introduce new patterns unless discussed in Phase 1.
- Write **self-documenting code**: clear naming > inline comments. Add comments only for non-obvious logic (e.g., workarounds, complex algorithms, regulatory constraints).
- Apply the **Single Responsibility Principle**: each function/class/module does one thing well.
- Avoid magic numbers and string literals — use named constants or enums.
- Keep functions small and composable (≤ 30 LOC is a good target).

#### Error Handling
- All I/O operations (file reads, DB queries, HTTP calls) MUST have explicit error handling.
- Use structured error types / typed exceptions — avoid bare `throw new Error("something went wrong")`.
- Log errors at the appropriate level: `error` for failures, `warn` for degraded behavior, `info` for significant state changes.
- Return or propagate meaningful error messages; do NOT swallow errors silently.

#### Security
- Never hardcode credentials, tokens, or secrets — use environment variables.
- Sanitize all user-supplied inputs before using them in queries, file paths, or shell commands.
- Apply the principle of least privilege: new services/modules should request only the permissions they need.
- Validate request payloads at the API boundary using schema validation (e.g., Zod, Joi, class-validator).

#### Performance
- Avoid N+1 query patterns — batch DB calls where possible.
- Use appropriate data structures (e.g., `Map` over object for lookups in hot paths).
- Lazy-load or defer expensive operations unless required upfront.

---

### Step 2 — Iterative Development

Execute the implementation in logical, atomic increments:

1. **Scaffold the structure first**: Create files, modules, and interfaces before filling in logic — this validates the design.
2. **Implement core logic**: Write the primary business logic and data transformations.
3. **Wire up integrations**: Connect to databases, external services, and other modules.
4. **Add observability**: Include structured logging (with correlation IDs where applicable), metrics counters, or trace spans.
5. **Handle edge cases**: Implement all edge cases, error paths, and boundary conditions identified in Phase 1.
6. **Clean up**: Remove `TODO`s, dead code, commented-out blocks, and debug prints.

---

### Step 3 — Self-Verification

After implementation, before declaring this phase complete, perform the following checks:

- [ ] All files listed in the Phase 1 Change Manifest have been created or modified as planned.
- [ ] No TypeScript/linter errors exist (run `tsc --noEmit` or equivalent for the project language).
- [ ] The code builds successfully (run `npm run build` or equivalent).
- [ ] No environment secrets are hardcoded.
- [ ] All new public functions/methods have JSDoc or equivalent documentation.

---

### Step 4 — Knowledge Compounding (Replaces `ce-compound`)

Document any reusable learning or patterns discovered during implementation:

1. **Identify the insight**: Did you find an undocumented project pattern, a non-obvious workaround, or a reusable abstraction?
2. **Create a solution doc**: If the insight is highly reusable, create or update a markdown file in `docs/solutions/` with a clear title, the problem it solves, and the solution pattern with a code example.
3. **Inline annotations**: For localized insights, add a well-placed `// NOTE:` or `// WHY:` comment so the next engineer understands the intent.

---

### Step 5 — Phase Completion Summary

Generate a compressed summary (≤ 150 words) covering:

- Files created or modified (paths only).
- Key architectural decisions made.
- Any deviations from the Phase 1 plan and the reasoning.
- Open questions or risks discovered during implementation.

Then ask the user:

> _"Phase 2 implementation is complete. Here is a summary of changes made. Shall I proceed to Phase 3 (Code Review)?"_

**⛔ Do NOT proceed to Phase 3 without explicit user approval.**
