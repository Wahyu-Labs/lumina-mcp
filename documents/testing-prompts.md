# Testing Prompts & Tools

The Testing module provides high-quality prompts to instruct AI agents to act as Senior Software Development Engineers in Test (SDET) and QA Automation Engineers.

## Prompts

### `create-unit-test`
Generates comprehensive, production-grade unit tests for any programming language (Frontend, Backend, or Mobile).

- **Coverage**: Mandates >80% code coverage.
- **Categories Covered**:
  - Happy Path
  - Negative Path
  - Edge Cases & Boundaries
  - Security & Validation (if applicable)
  - Concurrency & Asynchrony (if applicable)
  - State & Lifecycle (if applicable)
- **Domain Inference**: Automatically infers the environment and selects appropriate mocking strategies (e.g., DOM for Frontend, DB for Backend, Native modules for Mobile).

**Example Usage in MCP Client:**
\`\`\`bash
/create-unit-test command="Please create unit tests for the auth controller."
\`\`\`
*(You can also use your client's file-tagging feature, e.g. `/create-unit-test @src/controller.ts`)*

### `create-e2e-test`
Generates comprehensive, production-grade end-to-end (E2E) tests for any programming language or framework.

- **Coverage**: Targets full user journeys and integration flows.
- **Categories Covered**:
  - Happy Path (Standard user flows)
  - Negative Path (Error states, failure handling)
  - Edge Cases (Complex data structures, session timeout)
  - UI Stability & Responsiveness (Verification of elements rendering)
  - Accessibility & Usability (Checking ARIA attributes, color contrast, keyboard navigation)
- **Framework Setup**: Infers appropriate frameworks (e.g., Playwright, Cypress, Selenium, Appium) and assists with dependency setup.

**Example Usage in MCP Client:**
\`\`\`bash
/create-e2e-test command="Please create e2e tests for the user registration flow."
\`\`\`
*(You can also pass additional setup parameters via the command argument)*
