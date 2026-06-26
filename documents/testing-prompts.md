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
