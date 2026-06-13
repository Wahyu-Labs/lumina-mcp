export const PM_SUMMARIZE_TICKET_PROMPT = `You are an expert Senior Product Manager at a top-tier Big Tech company. 

I will provide you with the raw description and details of a Jira or Trello ticket. 
Your task is to analyze the ticket and create a comprehensive, well-structured, and clear summary. 

Please structure your summary as follows:
1. **Ticket Overview**: A high-level 2-3 sentence summary of the feature, bug, or task.
2. **Problem Statement**: What specific user or business problem does this solve?
3. **Core Requirements (Acceptance Criteria)**: Clearly list the requirements that must be met for this ticket to be considered "Done". 
4. **Out of Scope**: Explicitly state what is NOT covered in this ticket to prevent scope creep.
5. **Dependencies & Risks**: Identify any potential blockers, external dependencies, or risks involved in executing this ticket.

Please read the ticket content provided below and generate the summary. Once generated, save the output to \`docs/{ticket-id}/summary.md\` (replace \`{ticket-id}\` with the actual ticket number).

**Raw Ticket Content:**
{{context}}
`;

export const PM_BRAINSTORM_PLAN_PROMPT = `Based on the ticket summary we created in \`docs/{ticket-id}/summary.md\`, I want to start the engineering phase.

First, let's use the Compound Engineering \`ce-brainstorm\` tool. 
Please act as a Staff Engineer and brainstorm the best technical approach, architecture, and edge cases for this ticket. Think about how this integrates with our existing systems, potential performance bottlenecks, and the best tools for the job. 

Save the detailed results of this brainstorm to \`docs/{ticket-id}/brainstorm.md\`.

Immediately after creating the brainstorm document, WITHOUT waiting for any alignment or interaction from the user, proceed to use the \`ce-plan\` tool to break down the implementation into a step-by-step actionable plan.

Ensure that the final plan is saved to \`docs/{ticket-id}/plan.md\` and includes:
1. Architectural decisions made during brainstorming.
2. Step-by-step execution tasks.
3. Specific files to be created or modified.

Additional Context:
{{context}}
`;

export const PM_TEST_CATALOG_PROMPT = `You are a Strict Senior QA Engineer at a top-tier Big Tech company with 10+ years of experience in quality assurance.

Based on the ticket summary (\`docs/{ticket-id}/summary.md\`) and the technical plan (\`docs/{ticket-id}/plan.md\`), your task is to generate a **comprehensive and exhaustive Test Catalog**.

You must think critically and cover ALL of the following test categories:

### Test Categories (must all be present in the catalog)
1. **Happy Path (Functional)**: The standard, expected flow with valid inputs covering every core feature described in the ticket.
2. **Negative Path**: Invalid inputs, unauthorized access, missing data, malformed payloads, wrong data types.
3. **Edge Cases**: Boundary values, extreme conditions (very large/small inputs, empty states, max limits), unexpected state transitions.
4. **Security**: XSS prevention, CSRF protection, injection attacks, unauthorized access, session hijacking, token expiry.
5. **Performance**: Response time thresholds, concurrent user load, memory consumption, rendering performance under heavy data.
6. **Accessibility (a11y)**: Keyboard navigation, screen reader support, ARIA labels, focus management, color contrast ratios.
7. **Responsiveness / Cross-Browser**: Layout integrity on desktop, tablet, and mobile viewports; behavior across major browsers (Chrome, Firefox, Safari, Edge).
8. **Integration**: End-to-end flows across multiple components, API contract validation, data consistency between frontend and backend.

---

## Output Format 1: Markdown (\`docs/{ticket-id}/test-catalog.md\`)

The Markdown file must be **highly detailed and professionally structured** as a Senior QA Engineer would produce. Include the following for EVERY test case:

### Required fields per test case in Markdown:
- **Case ID**: Unique identifier (e.g., TC-3701)
- **Test Category**: One of: Happy Path, Negative Path, Edge Case, Security, Performance, Accessibility, Responsiveness, Integration
- **Severity**: Critical / Major / Minor / Trivial
- **Priority**: P0 (Blocker) / P1 (High) / P2 (Medium) / P3 (Low)
- **Title**: A concise, descriptive test case title
- **Description**: 2-3 sentences explaining what this test validates and WHY it matters.
- **Prerequisites**: Numbered list of all preconditions that must be met before execution.
- **Test Steps**: Numbered, detailed step-by-step instructions. Each step must be atomic and actionable (a junior QA should be able to follow them without ambiguity).
- **Test Data**: Specific example inputs, payloads, or configurations to use (when applicable).
- **Expected Result (Pass)**: Precise, observable outcomes that indicate a PASS.
- **Expected Result (Fail)**: Precise, observable outcomes that indicate a FAIL.
- **Notes / Comments**: Any additional context, known issues, or related test cases.

### Markdown document structure:
1. **Header**: Title, Ticket ID, Catalog ID, Date, Author role.
2. **Test Summary Matrix**: A table summarizing all test cases with columns: Case ID | Category | Severity | Priority | Title | Status (default: "Not Executed").
3. **Detailed Test Cases**: Grouped by category (Happy Path, Negative Path, Edge Cases, Security, Performance, Accessibility, Responsiveness, Integration), each with all required fields listed above.
4. **Coverage Summary**: A brief section at the bottom stating the total number of test cases per category and overall coverage assessment.

---

## Output Format 2: Text (\`docs/{ticket-id}/test-catalog.txt\`)

**CRITICAL: The \`.txt\` file MUST strictly follow this exact format for each test case without ANY deviation:**

Test catalog Id: [A unique catalog identifier, e.g., TC-1000]
--------------------------
caseId: [A unique test case identifier, e.g., TC-1001]
--------------------
prequites
- [prerequisite 1]
- [prerequisite 2]
step
- [step 1]
- [step 2]
success result
- [Expected successful outcome]
failed result
- [Expected failed outcome or error message]
------------------------

The \`.txt\` file must contain ALL the same test cases from the Markdown file, but formatted strictly in the template above. Do NOT add extra fields or change the structure.

---

Please generate the complete test catalog for the current ticket and save both files respectively.

Additional Context:
{{context}}
`;
