# Project Management — Available Prompts & Tools

> **Lumina MCP** provides three prompts and three tools for integrating with popular Project Management systems (Jira, Trello, OpenProject) through the Model Context Protocol.

---

## 🔧 Tools

### `get_jira_ticket`

Fetch a Jira ticket/issue by its ID or Key via the Jira REST API.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueIdOrKey` | `string` | ✅ | The ID or Key of the Jira issue (e.g., `PROJ-123`) |
| `domain` | `string` | ✅ | Your Jira workspace domain (e.g., `yourcompany` for `yourcompany.atlassian.net`) |
| `email` | `string` | ✅ | The email address associated with your Jira account |
| `apiToken` | `string` | ✅ | Your Jira API token |

**Example:**
```
/mcp:lumina-mcp-local:get_jira_ticket

issueIdOrKey: "PROJ-123"
domain: "yourcompany"
email: "user@example.com"
apiToken: "your_api_token_here"
```

---

### `get_trello_card`

Fetch a Trello card by its ID or shortlink via the Trello REST API.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | ✅ | The ID or shortlink of the Trello card |
| `apiKey` | `string` | ✅ | Your Trello API key |
| `apiToken` | `string` | ✅ | Your Trello API token |

**Example:**
```
/mcp:lumina-mcp-local:get_trello_card

cardId: "abc123xyz"
apiKey: "your_trello_api_key"
apiToken: "your_trello_api_token"
```

---

### `get_openproject_work_package`

Fetch an OpenProject work package by its ID via the OpenProject REST API.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workPackageId` | `number` | ✅ | The ID of the OpenProject work package |
| `domain` | `string` | ✅ | Your OpenProject workspace domain (e.g., `https://openproject.yourcompany.com`) |
| `apiKey` | `string` | ✅ | Your OpenProject API key/token |

**Example:**
```
/mcp:lumina-mcp-local:get_openproject_work_package

workPackageId: 42
domain: "https://openproject.yourcompany.com"
apiKey: "your_openproject_api_key"
```

---

## 💬 Prompts

### `pm_summarize_ticket`

> **Title:** Senior PM Summarize Ticket

Summarize a raw Jira or Trello ticket as a Senior Product Manager. This prompt takes the raw JSON response from the tools and translates it into a concise, business-focused summary of the problem, requirements, and acceptance criteria.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Raw ticket JSON or natural language context |

---

### `pm_brainstorm_plan`

> **Title:** Staff Engineer Brainstorm and Plan

Brainstorm technical approach and create a step-by-step implementation plan based on the ticket summary. This acts as a Staff Engineer mapping the product requirements to concrete architectural changes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Ticket summary or context |

---

### `pm_test_catalog`

> **Title:** Strict QA Test Catalog Generator

Generate a comprehensive test catalog based on the ticket and technical plan. This ensures that all edge cases, regression risks, and acceptance criteria are tested.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Ticket summary, technical plan, or context |
