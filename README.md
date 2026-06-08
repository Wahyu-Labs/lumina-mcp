<p align="center">
  <h1 align="center">✦ Lumina MCP</h1>
  <p align="center">
    <strong>Unified MCP toolkit for database operations — query, inspect, analyze, and audit your MySQL & PostgreSQL databases through natural language.</strong>
  </p>
  <p align="center">
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-features">Features</a> •
    <a href="#-documentation">Documentation</a> •
    <a href="CHANGELOG.md">Changelog</a> •
    <a href="#-license">License</a>
  </p>
</p>

---

## Overview

**Lumina MCP** is a [Model Context Protocol](https://modelcontextprotocol.io) server that exposes database tools and AI-driven prompts for MySQL and PostgreSQL. It allows any MCP-compatible client (Antigravity IDE, Claude Code, Cursor, etc.) to query, inspect, and audit databases using natural language — with built-in security guardrails.

```
You (natural language) → MCP Client → Lumina MCP → MySQL / PostgreSQL
                                          ↓
                              Query results, audit reports,
                              schema inspection, EXPLAIN plans
```

---

## ✨ Features

### 🗄️ Database Tools

| Tool | MySQL | PostgreSQL | Description |
|------|:-----:|:----------:|-------------|
| **Execute Query** | ✅ | ✅ | Run read-only SQL queries with parameterized bindings |
| **List Tables** | ✅ | ✅ | Discover all tables in the target database |
| **Inspect Table** | ✅ | ✅ | View column names, types, keys, nullability, defaults |
| **Analyze Query** | ✅ | ✅ | `EXPLAIN` / `EXPLAIN ANALYZE` with Senior DBA verdicts |
| **Save Audit Report** | ✅ | ✅ | Persist AI-generated audit reports as Markdown |

### 🐙 GitHub Source Control Tools

| Tool | Description |
|------|-------------|
| **Generate Commit & Push** | Staging granularity commit generation, staging only created/modified files, Conventional Commit with JIRA/Ticket auto-detection, and push |
| **Create PR** | Create a pull request on GitHub with custom head/base branches and body |
| **Review PR** | Submit a rigorous, Big Tech-style code review directly to a GitHub Pull Request |
| **Fix PR Review** | Fetch review comments and code review threads concurrently to guide code fixes |

### 💬 AI Prompts

| Prompt | Engine | Description |
|--------|--------|-------------|
| `running_query` | MySQL | Natural-language → SQL with auto schema detection |
| `auditor_query` | MySQL | Full performance & security audit by a Principal DBA |
| `running_pg_query` | PostgreSQL | Natural-language → SQL with auto schema detection |
| `auditor_pg_query` | PostgreSQL | Full performance & security audit by a Principal DBA |
| `commit_generator_message` | GitHub/Git | Conventional commit message generator with ticket/branch detection |
| `tech_company_pr_creator` | GitHub/Git | Tech Company PR description generator (Netflix/Meta/Google style) |
| `ai_code_reviewer` | GitHub/Git | Senior Staff level PR reviewer checking correctness, security, performance |
| `fix_pr_review_message` | GitHub/Git | Automatically analyze PR review comments, guide fixes, and push updates |

### 🔒 Security

- **Read-only enforcement** — Blocks `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `TRUNCATE`
- **SQL injection detection** — Detects comments, tautologies (`OR 1=1`), and `UNION SELECT`
- **Sensitive column filtering** — Auto-strips `password`, `token`, `secret`, `credential` from results
- **Configurable restrictions** — Extend blocked columns via `.lumina/database/restricColumn.json`

---

## 🚀 Quick Start (Usage via MCP Client)

You can run **Lumina MCP** directly using `npx` (which runs the published npm package) without manual installation or cloning:

Add this configuration to your MCP client settings (e.g. `mcp.json` or your Cursor/Claude Desktop settings):

```json
{
  "mcpServers": {
    "lumina-mcp": {
      "command": "npx",
      "args": ["-y", "lumina-mcp"],
      "env": {
        "MYSQL_URL": "mysql://root:root@localhost:3306/db_name",
        "POSTGRES_URL": "postgres://postgres:lumina@localhost:5432/db_name",
        "GITHUB_TOKEN": "your-github-personal-access-token"
      }
    }
  }
}
```

> ℹ️ **Connection Configuration:**
> - **MySQL:** `mysql://{username}:{password}@{host}:{port}/{database_name}`
> - **PostgreSQL:** `postgres://{username}:{password}@{host}:{port}/{database_name}`
> - **GitHub:** Personal Access Token (PAT) with `repo` scopes.
>
> You can omit any environment variables that you do not use.

---

## 📖 Documentation

Detailed guides with every tool parameter, prompt workflow, usage examples, and security features:

| Guide | Description |
|-------|-------------|
| **[MySQL Prompts & Tools](documents/mysql-prompts.md)** | All 5 MySQL tools, 2 prompts, security features, and usage examples |
| **[PostgreSQL Prompts & Tools](documents/postgresql-prompts.md)** | All 5 PostgreSQL tools, 2 prompts, security features, and usage examples |
| **[GitHub Source Control Prompts & Tools](documents/github-prompts.md)** | All 4 Git/GitHub tools, 4 prompts, rollout guardrails, and usage examples |

---

## 🤝 Development & Contributing

Contributions are welcome! If you want to develop locally, run from source, or contribute to Lumina MCP, follow these instructions:

### Prerequisites

- **Node.js** ≥ 18
- **MySQL** 8.0+ / **PostgreSQL** 15+ (or use the included Docker Compose)

### 1. Clone & Install

```bash
git clone https://github.com/Wahyu-Labs/lumina-mcp.git
cd lumina-mcp
npm install
```

### 2. Run Database Containers (Optional)

We include a `docker-compose.yml` to spin up local MySQL and PostgreSQL instances configured with default credentials:

```bash
docker compose up -d
```

### 3. Local Development

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Start the TypeScript compiler in watch mode:

```bash
npm run dev
```

### 4. Build & Production Run

To build and run the compiled production build locally:

```bash
npm run build
npm start
```

To connect your local build to your MCP client, configure it like this:

```json
    "lumina-mcp-local": {
      "command": "node",
      "args": ["/absolute/path/to/lumina-mcp/dist/index.js"],
      "env": {
        "MYSQL_URL": "mysql://root:root@localhost:3306/db_name",
        "POSTGRES_URL": "postgres://postgres:lumina@localhost:5432/db_name"
      }
    }
```

---

## 🏗️ Architecture

Lumina MCP uses a clean, **layered architecture** to separate concerns:

```
src/
├── index.ts                          # MCP server entry point
├── utils/
│   └── prompt-args.utils.ts          # Prompt argument compatibility patch
└── tools/
    └── database/
        ├── dto/                      # Zod validation schemas
        │   └── database.dto.ts
        ├── types/                    # TypeScript interfaces
        │   └── database.types.ts
        ├── prompts/                  # AI prompt templates
        │   ├── running-query.prompt.ts
        │   └── auditor-query.prompt.ts
        ├── utils/                    # Shared utilities
        │   ├── security.ts           # SQL injection & column filtering
        │   └── report.ts             # Audit report persistence
        ├── mysql/
        │   ├── controller/           # Tool & prompt registration
        │   ├── service/              # Business logic & validation
        │   └── repository/           # Database connection pool
        └── postgresql/
            ├── controller/
            ├── service/
            └── repository/
```

- **Controller** — Registers MCP tools and prompts, handles requests/responses.
- **Service** — Business logic, read-only validation, query execution analysis.
- **Repository** — Database connection pooling and raw query execution.

---

## 🧪 Testing & Verification

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Format
npm run format
```

---

## 🚀 Contributing Process

1. **Fork** the repository.
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`).
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`).
4. **Push** to the branch (`git push origin feature/amazing-feature`).
5. **Open** a Pull Request.

Please ensure your code passes linting, formatting, and unit tests before opening a PR.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Wahyu-Labs">Wahyu-Labs</a>
</p>
