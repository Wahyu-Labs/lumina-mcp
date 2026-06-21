# Contributing to Lumina MCP

Thank you for your interest in contributing to **Lumina MCP**! We appreciate contributions of all kinds — bug reports, feature requests, documentation improvements, and code contributions.

Please take a moment to read this guide before opening an issue or submitting a pull request.

### What to Expect

Lumina MCP is opinionated by design. It's maintained by [@darm102](https://github.com/darm102), and its direction reflects a specific point of view about how AI-assisted engineering should work. So while we welcome help, we can't promise to accept every change — some proposals won't fit that vision even when they're good ideas on their own.

Open an issue or send a PR, and we'll fold in what moves the project in the right direction. We just want to be upfront that not everything will land.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Commit Message Convention](#commit-message-convention)

---

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We expect all contributors to be respectful, inclusive, and collaborative. Harassment of any kind will not be tolerated.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lumina-mcp.git
   cd lumina-mcp
   ```
3. **Add the upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/Wahyu-Labs/lumina-mcp.git
   ```

---

## Development Setup

### Prerequisites

- **Node.js** ≥ 22
- **npm** ≥ 10
- **MySQL** and **PostgreSQL** (not required for development)

### 1. Install dependencies

```bash
npm install
```

### 2. Start local database containers (optional)

A `docker-compose.yml` is included to spin up MySQL and PostgreSQL with default credentials:

```bash
docker compose up -d
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` to include the connection strings for the integrations you want to test:

```env
MYSQL_URL=mysql://root:root@localhost:3306/db_name
POSTGRES_URL=postgres://postgres:lumina@localhost:5432/db_name
GITHUB_TOKEN=your-github-token
```

### 4. Start the TypeScript compiler in watch mode

```bash
npm run dev
```

### 5. Build the project

```bash
npm run build
```

### 6. Connect your local build to an MCP client

```json
{
  "mcpServers": {
    "lumina-mcp-local": {
      "command": "node",
      "args": ["/absolute/path/to/lumina-mcp/dist/index.js"],
      "env": {
        "MYSQL_URL": "mysql://root:root@localhost:3306/db_name"
      }
    }
  }
}
```

---

## Project Structure

```
src/
├── index.ts                          # MCP server entry point
└── tools/
    ├── database/
    │   ├── mysql/
    │   │   ├── controller/           # Tool & prompt registration
    │   │   ├── service/              # Business logic & read-only enforcement
    │   │   └── repository/           # Database connection pool
    │   └── postgresql/
    │       ├── controller/
    │       ├── service/
    │       └── repository/
    ├── github/                       # Git & GitHub tools
    ├── projectmanagement/            # Jira, Trello, OpenProject tools
    └── orchestration/                # Phase-based orchestration engine
```

- **Controller** — Registers MCP tools and prompts, handles requests and responses.
- **Service** — Business logic, read-only validation, and query execution.
- **Repository** — Database connection pooling and raw query execution.

---

## Coding Standards

Please follow these standards to keep the codebase consistent:

- **Language:** TypeScript (strict mode enabled)
- **Formatting:** Enforced via [Prettier](https://prettier.io/) — run `npm run format` before committing
- **Linting:** Enforced via [ESLint](https://eslint.org/) — run `npm run lint` and fix all errors
- **Testing:** Write unit tests for all new business logic in the `test/` directory
- **No `any` types:** Use proper TypeScript types and Zod schemas for validation
- **No write operations on databases:** All database tools must remain strictly read-only

---

## Submitting Changes

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Make your changes** following the coding standards above.
3. **Write or update tests** for any changed logic:
   ```bash
   npm test
   npm run test:coverage
   ```
4. **Ensure linting and formatting pass:**
   ```bash
   npm run lint
   npm run format
   ```
5. **Commit your changes** using the [Conventional Commits](#commit-message-convention) format.
6. **Push** to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
7. **Open a Pull Request** against the `main` branch of the upstream repository.

### Pull Request Guidelines

- **Fill in the PR template** completely — include context, motivation, and what was changed.
- **Keep PRs focused** — one feature or fix per PR makes review faster.
- **Reference issues** — link related GitHub issues using `Closes #123` or `Fixes #123`.
- **Ensure CI passes** — all tests, linting, and formatting checks must be green before a PR is merged.
- **Be responsive** — address review comments promptly and re-request a review after making changes.

---

## Reporting Bugs

Before opening a bug report, please search [existing issues](https://github.com/Wahyu-Labs/lumina-mcp/issues) to avoid duplicates.

When filing a bug, include:

1. **Lumina MCP version** (`npx lumina-mcp --version`)
2. **Node.js version** (`node --version`)
3. **MCP client** (Antigravity IDE, Claude Code, Cursor, etc.) and its version
4. **Steps to reproduce** the issue clearly
5. **Expected behavior** vs **Actual behavior**
6. **Error logs** or screenshots if available

---

## Suggesting Features

We welcome feature requests! Open a [GitHub Issue](https://github.com/Wahyu-Labs/lumina-mcp/issues/new) and use the **Feature Request** template.

Please include:

- **Problem statement** — What problem does this solve?
- **Proposed solution** — How do you envision it working?
- **Alternatives considered** — Any other approaches you evaluated?
- **Additional context** — Any examples, references, or screenshots

---

## Commit Message Convention

Lumina MCP uses the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `refactor` | Code refactoring (no feature or bug) |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, or dependency updates |
| `perf` | Performance improvements |

### Scopes

| Scope | Description |
|-------|-------------|
| `mysql` | MySQL-related tools or prompts |
| `postgres` | PostgreSQL-related tools or prompts |
| `github` | Git/GitHub tools or prompts |
| `pm` | Project Management tools or prompts |
| `orchestration` | Orchestration engine |
| `security` | Security enforcement layers |
| `docs` | Documentation changes |

### Examples

```
feat(github): add reply_to_pr_comment tool
fix(mysql): handle null values in sensitive column filter
docs(orchestration): update phase descriptions in README
refactor(postgres): extract connection pool into repository layer
test(pm): add unit tests for get_jira_ticket service
```

---

Thank you for contributing to Lumina MCP! Every contribution, large or small, is valued and appreciated. 🙏
