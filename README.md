<p align="center">
  <h1 align="center">Lumina MCP</h1>
  <p align="center">
    <strong>Give your AI assistant real developer superpowers. Query databases, automate Git workflows, sync project tickets, and orchestrate full development cycles — all through natural language.</strong>
  </p>
  <p align="center">
    <a href="https://lumina-mcp.vercel.app">Website</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-tools--prompts">Tools & Prompts</a> •
    <a href="#-documentation">Documentation</a> •
    <a href="CONTRIBUTING.md">Contributing</a> •
    <a href="CHANGELOG.md">Changelog</a>
  </p>
  <p align="center">
    <img alt="npm" src="https://img.shields.io/badge/npm-v1.0.6-6366f1?style=flat-square">
    <img alt="node" src="https://img.shields.io/badge/node-%3E%3D20.0.0-6366f1?style=flat-square">
    <img alt="license" src="https://img.shields.io/badge/license-MIT-6366f1?style=flat-square">
    <img alt="tests" src="https://img.shields.io/badge/tests-passing-emerald?style=flat-square">
  </p>
</p>

---

## Overview

**Lumina MCP** is a [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI assistants (Antigravity IDE, Claude Code, Cursor, Codex, VS Code) direct access to your developer environment.

It acts as a secure bridge between your AI agent and the real tools developers use every day:

```
You (natural language) → AI Client (MCP) → Lumina MCP Server
                                                  ↓
                              MySQL / PostgreSQL — GitHub — Jira / Trello / OpenProject
                              Schema inspection, Audit reports, Git commits, PR creation,
                              Ticket ingestion, Full dev cycle orchestration
```

> **💡 Pro Tip:** Lumina MCP works out of the box with **any MCP-compatible AI client**. You only need to include environment variables for the tools you actually plan to use.

---

## ✨ Tools & Prompts

### 🗄️ Database Tools (MySQL & PostgreSQL)

| Tool | MySQL | PostgreSQL | Description |
|------|:-----:|:----------:|-------------|
| `execute_mysql_query` / `execute_postgres_query` | ✅ | ✅ | Run read-only SQL queries via natural language |
| `list_mysql_tables` / `list_postgresql_tables` | ✅ | ✅ | List all tables in the target database |
| `inspect_mysql_table` / `inspect_postgresql_table` | ✅ | ✅ | Inspect columns, types, keys, nullability |
| `analyze_mysql_query` / `analyze_postgresql_query` | ✅ | ✅ | `EXPLAIN`/`EXPLAIN ANALYZE` with DBA-level verdict |
| `save_audit_report` / `save_audit_report_pg` | ✅ | ✅ | Persist AI-generated audit reports as Markdown |

**Database Prompts:**

| Prompt | Description |
|--------|-------------|
| `running_query` | Natural language → MySQL `SELECT` query with schema auto-detection |
| `auditor_query` | Full MySQL performance & security audit by a Principal DBA |
| `running_pg_query` | Natural language → PostgreSQL `SELECT` query with schema auto-detection |
| `auditor_pg_query` | Full PostgreSQL performance & security audit by a Principal DBA |

**Example Prompts:**
In your MCP client, you can use these prompts as slash commands:
```bash
/running_query command="Run a query to find the top 5 customers with active status."
/auditor_query command="Analyze query performance for SELECT * FROM orders WHERE status = 'pending'"
/running_pg_query command="Show all tables in public schema."
/auditor_pg_query command="SELECT * FROM users"
```

---

### 🐙 Version Control Tools (GitHub)

| Tool | Description |
|------|-------------|
| `generate_commit_and_push` | Generate a Conventional Commit message, stage files, and push |
| `create_github_pr` | Create a GitHub Pull Request with auto-generated tech company-style description |
| `review_github_pr` | Submit a rigorous AI code review directly to a GitHub Pull Request |
| `fix_github_pr_review` | Fetch PR review comments and automatically apply fixes to the codebase |
| `get_github_pr_diff` | Download a clean unified diff of any open GitHub PR for automated review |
| `reply_to_pr_comment` | Reply to inline comments within a GitHub Pull Request review |
| `resolve_pr_review_thread` | Resolve a GitHub PR review thread by its comment node ID |

**Git Prompts:**

| Prompt | Description |
|--------|-------------|
| `commit_generator_message` | Conventional commit message generator with ticket/branch auto-detection |
| `tech_company_pr_creator` | Netflix/Meta/Google-style PR description generator |
| `ai_code_reviewer` | Senior Staff-level PR reviewer ([CRITICAL], [MAJOR], [MINOR], [NIT]) |
| `fix_pr_review_message` | Analyze review comments, apply fixes, and resolve threads automatically |

**Example Prompts:**
In your MCP client, you can use these prompts as slash commands:
```bash
/commit_generator_message command="Stage my changes and generate a conventional commit message."
/tech_company_pr_creator command="Create a PR description from feat/auth into main."
/ai_code_reviewer command="Review PR #42 and approve it."
/fix_pr_review_message command="Resolve all review comments on PR #104."
```

---

### 📋 Project Management Integration

| Tool | Description |
|------|-------------|
| `get_jira_ticket` | Fetch a Jira issue by ID/Key — includes title, description, labels, comments, epic |
| `get_trello_card` | Fetch a Trello card — includes description, status, checklist, comment history |
| `get_openproject_work_package` | Fetch an OpenProject work package — includes assignee, priority, and comments |

**PM Prompts:**

| Prompt | Description |
|--------|-------------|
| `pm_summarize_ticket` | Summarize a raw Jira/Trello/OpenProject ticket as a Senior Product Manager |
| `pm_brainstorm_plan` | Brainstorm technical approach and create a step-by-step implementation plan |
| `pm_test_catalog` | Generate a comprehensive test catalog based on the ticket and technical plan |

**Example Prompts:**
In your MCP client, you can use these prompts as slash commands:
```bash
/pm_summarize_ticket command="Fetch Jira ticket LUM-402 and summarize it."
/pm_brainstorm_plan command="Download OpenProject work package #82 and create a technical plan."
/pm_test_catalog command="Get Trello card 64b19c and generate a test catalog."
```

---

### 🤖 Orchestration

| Tool | Description |
|------|-------------|
| `get_orchestration_phase` | Retrieve system-level instructions for a specific orchestration phase (1–6) |

**Orchestration Prompt:**

| Prompt | Description |
|--------|-------------|
| `lumina_orchestrate` | Kicks off the full Orchestration Development Cycle. Has optional arguments: `command` and `tokenBudget` |

The orchestration cycle follows **6 deterministic phases**:

| # | Phase | Description |
|---|-------|-------------|
| 1 | **Discovery & Analysis** | Fetches tickets, reads codebase, drafts requirements |
| 2 | **Technical Planning** | Creates a precise file-by-file implementation plan |
| 3 | **Execution & Implementation** | Implements code following the approved plan |
| 4 | **Iterative Code Review** | Multi-agent review loop for security & quality |
| 5 | **Verification & Compounding** | Runs tests, audits DB changes, records learnings |
| 6 | **Git Pull Request Release** | Conventional commit, push, and GitHub PR creation |

**Example Prompts:**
In your MCP client, you can use this prompt as a slash command:
```bash
/lumina_orchestrate command="Build a new login page" tokenBudget="save-tokens"
/lumina_orchestrate command="Implement requirements from Jira ticket LUM-402" tokenBudget="full-detail"
```

---

### 🔒 Security

All database connections are **strictly read-only** with multiple enforcement layers:

- **Write blocking** — Blocks `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `TRUNCATE`
- **SQL injection detection** — Detects comments (`--`, `/*`), tautologies (`OR 1=1`), and `UNION SELECT`
- **Sensitive column filtering** — Auto-strips `password`, `token`, `secret`, `credential` from results
- **Configurable restrictions** — Extend blocked columns via `.lumina/database/restricColumn.json`

---

## 🚀 Quick Start

Add this to your MCP client configuration (e.g. `mcp.json`, Cursor settings, Claude config):

```json
{
  "mcpServers": {
    "lumina-mcp": {
      "command": "npx",
      "args": ["-y", "lumina-mcp"],
      "env": {
        "MYSQL_URL": "mysql://user:password@localhost:3306/db_name",
        "POSTGRES_URL": "postgres://user:password@localhost:5432/db_name",
        "GITHUB_TOKEN": "your-github-personal-access-token",
        "JIRA_URL": "https://yourcompany.atlassian.net",
        "JIRA_EMAIL": "your.email@company.com",
        "JIRA_API_TOKEN": "your-jira-token",
        "TRELLO_API_KEY": "your-trello-key",
        "TRELLO_API_TOKEN": "your-trello-token",
        "OPENPROJECT_URL": "https://openproject.yourcompany.com",
        "OPENPROJECT_API_KEY": "your-openproject-key"
      }
    }
  }
}
```

> **You only need to include the environment variables for the integrations you use.** If you already have the official [Atlassian MCP](https://github.com/atlassian/mcp) or [GitHub MCP](https://github.com/github/mcp) installed, Lumina MCP will automatically use them as a fallback.

For detailed, client-specific installation guides (Antigravity IDE, Cursor, Claude Code, VS Code, Codex), visit **[lumina-mcp.vercel.app](https://lumina-mcp.vercel.app)**.

---

## 📖 Documentation

Detailed guides for every tool, prompt, parameter, and usage example:

| Guide | Description |
|-------|-------------|
| **[MySQL Prompts & Tools](documents/mysql-prompts.md)** | 5 MySQL tools, 2 prompts, security features, and examples |
| **[PostgreSQL Prompts & Tools](documents/postgresql-prompts.md)** | 5 PostgreSQL tools, 2 prompts, security features, and examples |
| **[GitHub Source Control](documents/github-prompts.md)** | 7 Git/GitHub tools, 4 prompts, and fallback strategy |
| **[Project Management Integration](documents/projectmanagement-prompts.md)** | 3 PM tools (Jira, Trello, OpenProject), 3 AI prompts |
| **[AI Orchestration](documents/orchestration-prompts.md)** | 6-Phase Orchestration Engine, native fallback strategy |

---

## 🏗️ Architecture

Lumina MCP follows a clean, layered architecture:

```
src/
├── index.ts                          # MCP server entry point
└── tools/
    ├── database/
    │   ├── mysql/
    │   │   ├── controller/           # Tool & prompt registration
    │   │   ├── service/              # Business logic & read-only validation
    │   │   └── repository/           # Connection pool
    │   └── postgresql/
    │       ├── controller/
    │       ├── service/
    │       └── repository/
    ├── github/                       # Git & PR tools
    ├── projectmanagement/            # Jira, Trello, OpenProject tools
    └── orchestration/                # Phase-based orchestration engine
```

---

## 🧪 Testing

```bash
npm test                # Run all tests
npm run test:coverage   # Run tests with coverage report
npm run lint            # Lint the codebase
npm run format          # Format the codebase
```

---

## 🤝 Contributing

We welcome contributions of all kinds! Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** for guidelines on how to get started, coding standards, and the PR process.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Wahyu-Labs">Wahyu-Labs</a>
</p>
