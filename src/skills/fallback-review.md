## 🔍 Phase: Code Review & Quality Gate

> **[SYSTEM NOTICE]** The `ce-code-review` skill from Compound Engineering is not detected in this environment.
> Executing a structured, multi-dimension self-review using the built-in professional code review protocol.

---

### Overview

This phase enforces a structured, tiered code review process that mirrors engineering quality gates at large engineering organizations (e.g., internal review checklists, automated lint gates, security scans). Review ALL code introduced or modified since Phase 1.

---

### Tier 1 — Correctness Review

Verify the implementation is logically sound and meets all requirements:

- [ ] All acceptance criteria defined in the Phase 1 plan are implemented.
- [ ] All edge cases and error paths documented in the plan are handled.
- [ ] No unhandled promise rejections, uncaught exceptions, or missing `try/catch` blocks in I/O paths.
- [ ] Input validation occurs at every trust boundary (API endpoints, worker queue consumers, webhook handlers).
- [ ] Conditional logic is complete — every `if` has considered its corresponding `else` or default.
- [ ] No silent failures: errors are returned or thrown, not swallowed.
- [ ] Boolean logic and comparisons are correct (watch for `==` vs `===`, off-by-one errors, null/undefined coercion).

---

### Tier 2 — Security Review

Apply OWASP-aware thinking to every code path:

- [ ] **Injection**: No user input is concatenated directly into SQL, shell commands, or filesystem paths.
- [ ] **Sensitive Data Exposure**: No secrets, tokens, API keys, or PII logged or hardcoded.
- [ ] **Authentication/Authorization**: All new endpoints or operations verify the caller's identity and permissions before executing.
- [ ] **Dependency Hygiene**: Any newly introduced third-party package is actively maintained (check for known CVEs if possible).
- [ ] **Insecure Deserialization**: Avoid `eval()`, `Function()`, or deserializing untrusted JSON without schema validation.
- [ ] **Error Messaging**: Error responses to end-users do NOT expose internal stack traces, file paths, or implementation details.

---

### Tier 3 — Design & Maintainability Review

Assess long-term health and readability:

- [ ] **Single Responsibility**: Each function, class, and module has a single, clearly stated purpose.
- [ ] **DRY (Don't Repeat Yourself)**: No logic is duplicated — shared code is extracted into utilities or helpers.
- [ ] **Naming Clarity**: Variables, functions, and classes are named with intent. Abbreviations are avoided unless they are universally understood (e.g., `id`, `url`).
- [ ] **Cyclomatic Complexity**: No function has excessive branching. If a function exceeds ~10 decision points, consider decomposing it.
- [ ] **Magic Values**: No unexplained numeric or string literals. Constants and enums are used.
- [ ] **Dead Code**: No commented-out code, unused imports, unreachable branches, or leftover `console.log`/`fmt.Println`/`print()` debug statements.
- [ ] **Coupling**: New code does not create tight coupling between unrelated modules or layers.

---

### Tier 4 — Observability & Operability Review

Ensure the code can be operated confidently in production:

- [ ] **Logging**: Key state transitions and errors are logged at the appropriate level (`info`, `warn`, `error`). Log messages are structured and searchable.
- [ ] **Metrics / Tracing**: If the project uses metrics or distributed tracing, new code paths are instrumented.
- [ ] **Graceful Degradation**: If an external dependency fails (DB, third-party API), the code fails gracefully with a meaningful error — it does not cascade.
- [ ] **Configuration**: Timeouts, retry limits, batch sizes, and other operational tuning parameters are configurable, not hardcoded.

---

### Tier 5 — Test Adequacy Review

Assess test coverage quality (not just quantity):

- [ ] Tests cover the happy path AND primary failure modes.
- [ ] Tests are deterministic — no randomness, no `Date.now()` without mocking.
- [ ] Tests are isolated — they do not depend on global state or execution order.
- [ ] Test names clearly describe what behavior they verify (`should return 404 when user does not exist`).
- [ ] Mocks are used judiciously — avoid over-mocking to the point where tests don't reflect real behavior.

---

### Remediation Protocol

For every issue found:

1. **Classify severity**:
   - 🔴 **Critical** — Must fix before merging. (Security vulnerability, data loss risk, functional regression)
   - 🟡 **Medium** — Should fix before merging. (Design issue, missing error handling, test gap)
   - 🔵 **Low** — Fix if time permits. (Naming, minor style, documentation improvement)

2. **Fix all 🔴 Critical and 🟡 Medium issues immediately** before declaring the review phase complete.

3. **Document 🔵 Low findings** as follow-up tickets or inline `// TODO:` with a clear description.

---

### Phase Completion Checklist

- [ ] All Tier 1–5 checks completed.
- [ ] All 🔴 Critical and 🟡 Medium issues resolved.
- [ ] Code builds cleanly with no errors or warnings.
- [ ] Linter passes (e.g., `eslint`, `golangci-lint`, `flake8`).

Then generate a concise review summary and ask the user:

> _"Code review complete. All critical and medium issues have been resolved. Here is the review summary. Shall I proceed to the next phase?"_

**⛔ Do NOT proceed without explicit user approval.**
