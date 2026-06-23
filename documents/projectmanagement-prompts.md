# Project Management Integration — Prompts & Tools

> **Lumina MCP** provides three tools and three prompts for integrating with popular project management systems (Jira, Trello, OpenProject) through the Model Context Protocol. This allows AI agents to directly ingest ticket requirements and build precisely what was specified.

---

## 🔧 Tools

### `get_jira_ticket`

Fetch a Jira issue by its ID or Key, including title, description, labels, comments, reporter, and epic links.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueIdOrKey` | `string` | ✅ | Jira issue ID or Key (e.g., `PROJ-123`) |
| `domain` | `string` | ✅ | Jira workspace domain (e.g., `yourcompany` for `yourcompany.atlassian.net`) |
| `email` | `string` | ✅ | Email associated with your Jira account |
| `apiToken` | `string` | ✅ | Your Jira API token |

> **Note:** If you have set `JIRA_URL`, `JIRA_EMAIL`, and `JIRA_API_TOKEN` as environment variables in your MCP config, the AI agent will use those automatically without needing to pass credentials in the prompt.

**Example:**
```
/mcp:lumina-mcp-local:get_jira_ticket

issueIdOrKey: "PROJ-123"
domain: "yourcompany"
email: "user@example.com"
apiToken: "your_api_token_here"
```

**Returns:** Title, description, status, priority, assignee, labels, comments, epic link, and acceptance criteria.

---

### `get_trello_card`

Fetch a Trello card by its ID or shortlink, including description, status, checklist items, and comment history.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | ✅ | Trello card ID or shortlink |
| `apiKey` | `string` | ✅ | Your Trello API key |
| `apiToken` | `string` | ✅ | Your Trello API token |

> **Note:** If `TRELLO_API_KEY` and `TRELLO_API_TOKEN` are set in your MCP environment config, they will be used automatically.

**Example:**
```
/mcp:lumina-mcp-local:get_trello_card

cardId: "abc123xyz"
apiKey: "your_trello_api_key"
apiToken: "your_trello_api_token"
```

**Returns:** Card title, description, list/column, checklists with completion status, labels, members, and all comments.

---

### `get_openproject_work_package`

Fetch an OpenProject work package by its ID, including assignee, priority, description, status, and comments.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workPackageId` | `number` | ✅ | OpenProject work package ID |
| `domain` | `string` | ✅ | OpenProject instance URL (e.g., `https://openproject.yourcompany.com`) |
| `apiKey` | `string` | ✅ | Your OpenProject API key/token |

> **Note:** If `OPENPROJECT_URL` and `OPENPROJECT_API_KEY` are set in your MCP environment config, they will be used automatically.

**Example:**
```
/mcp:lumina-mcp-local:get_openproject_work_package

workPackageId: 42
domain: "https://openproject.yourcompany.com"
apiKey: "your_openproject_api_key"
```

**Returns:** Subject, description, type, status, priority, assignee, due date, and activity/comments.

---

### `get_github_issue`

Fetch a GitHub issue, including its body, comments, labels, milestones, and any linked pull requests.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | ✅ | Repository owner |
| `repo` | `string` | ✅ | Repository name |
| `issueNumber` | `number` | ✅ | GitHub issue number |
| `githubToken` | `string` | ❌ | GitHub Token (uses env var `GITHUB_TOKEN` or `GITHUB_PERSONAL_ACCESS_TOKEN` if omitted) |

**Example:**
```
/mcp:lumina-mcp-local:get_github_issue

owner: "Wahyu-Labs"
repo: "lumina-mcp"
issueNumber: 11
```

**Returns:** Core issue metadata, comments, assignees, labels, and linked pull requests via cross-references.

---

## 💬 Prompts

### `pm_summarize_ticket`

> **Title:** Senior PM Summarize Ticket

Summarize a raw Jira, Trello, or OpenProject ticket as a Senior Product Manager. Translates raw ticket JSON into a concise, business-focused summary covering the problem statement, requirements, and acceptance criteria.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Raw ticket JSON or natural language context |

**Example:**
```
Fetch and summarize Jira ticket LUM-402.
```

**Output includes:**
- Problem statement in plain language
- Business context and motivation
- Acceptance criteria in testable format
- Priority and risk assessment

---

### `pm_brainstorm_plan`

> **Title:** Staff Engineer Brainstorm and Plan

Brainstorm technical approaches and create a step-by-step implementation plan based on the ticket summary. Acts as a Staff Engineer mapping product requirements to concrete architectural changes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Ticket summary or context |

**Example:**
```
Download OpenProject work package #82 and create a technical implementation plan.
```

**Output includes:**
- High-level architectural decisions
- File-by-file change manifest
- API contracts and interface changes
- Dependencies and risk areas

---

### `pm_test_catalog`

> **Title:** Strict QA Test Catalog Generator

Generate a comprehensive, FAANG-level test catalog based on the ticket and technical plan. Enforces 8 rigorous testing categories (Happy Path, Negative Path, Edge Cases, Security, Performance, Accessibility, Responsiveness, Integration) and generates both Markdown and structured `.txt` formats.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Ticket summary, technical plan, or context |

**Example:**
```
Get the checklist from Trello card 64b19c and generate a full test catalog.
```

**Output includes:**
- Unit test cases per component
- Integration test scenarios
- Edge cases and negative test cases
- Acceptance criteria verification checklist

---

## 🔗 Integration with Orchestration

Project Management tools integrate directly with the **Lumina Orchestration Engine**. During Phase 1 (Discovery & Analysis), the orchestration agent automatically calls the PM tools to fetch tickets and inject requirements into the planning context:

```
/lumina-orchestrate includeTest=true
> Fetch Jira ticket LUM-402 first, then start orchestration.
```

This ensures the entire development cycle — from code to PR — is grounded in the exact requirements from your project management system.
