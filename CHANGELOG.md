# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.3] — 2026-06-14

### Added
- **Orchestration Workflow Module** (`lumina-orchestrate` prompt and `get_orchestration_phase` tool).
- 6-Phase AI Orchestration Engine: 
  1. Planning & Brainstorming
  2. Execution (ce-work)
  3. Unit Testing
  4. Code Review (ce-code-review)
  5. Verification (Language specific tests + Database checks)
  6. Git & GitHub Push
- Dynamic test skipping logic (`includeTest` boolean) which shifts phases seamlessly.
- **Production Build Pipeline**: Replaced standard TypeScript compiler output with an optimized `esbuild` configuration (`build.ts`).
- Minification and mangling enabled to bundle the entire application into a fast, lightweight, and obfuscated single binary.
- Added `bin` executable mapping and shebang (`#!/usr/bin/env node`) for perfect `npx` compatibility across all OS when executed by AI Clients (Cursor, Antigravity, Claude Code, Codex).

## [1.0.2] — 2026-06-14

### Added
- **Project Management MCP integrations** for Jira, Trello, and OpenProject.
- Tools: `get_jira_ticket`, `get_trello_card`, `get_openproject_work_package` for automated ticket retrieval.
- Prompts: `pm_summarize_ticket` (Senior PM Ticket Summarization), `pm_brainstorm_plan` (Staff Engineer Brainstorm & Plan), and `pm_test_catalog` (Strict QA Test Catalog Generator).
- Stronger security practices: Domain sanitization for Jira endpoints and OAuth headers instead of query parameters for Trello API calls.

## [1.0.1] — 2026-06-08

### Added
- GitHub/Git Source Control MCP integration (under the `gitsystem` module).
- Tools: `generate_commit_and_push` (granularity staging), `create_github_pr`, `review_github_pr`, `fix_github_pr_review` (fetches reviews and inline comments concurrently).
- Prompts: `commit_generator_message` (Conventional Commit and JIRA trace), `tech_company_pr_creator` (Netflix/Meta-style description template), `ai_code_reviewer` (strict Senior Staff level review), `fix_pr_review_message` (guided AI fix and commit/push workflow).
- Prompt-Based GitHub Fallback Rules: Native instruction-based fallbacks embedded in all Git/GitHub prompts. The executing AI agent dynamically tries calling `lumina-mcp` tools primary, falls back to the official GitHub MCP server (`github`) secondary, and falls back to executing local CLI commands (`gh` CLI or `git`) tertiary if tokens or environment variables are missing.
- Strict validation test suite with 40 passing tests using Vitest covering database repositories, services, and MCP integrations.

## [1.0.0] — 2026-06-07

### Added

#### MySQL Tools
- `execute_mysql_query` — Execute read-only SQL queries with safe parameter binding
- `list_mysql_tables` — List all tables in a MySQL database
- `inspect_mysql_table` — Inspect table structure (columns, types, keys)
- `analyze_mysql_query` — Run `EXPLAIN` / `EXPLAIN ANALYZE` with Senior DB Auditor report
- `save_audit_report` — Persist AI-generated audit reports to `docs/database/`

#### PostgreSQL Tools
- `execute_postgres_query` — Execute read-only SQL queries with safe parameter binding (`$1`, `$2`)
- `list_postgresql_tables` — List all public-schema tables in a PostgreSQL database
- `inspect_postgresql_table` — Inspect table structure (columns, types, nullability, defaults)
- `analyze_postgresql_query` — Run `EXPLAIN` / `EXPLAIN ANALYZE` with Senior DB Auditor report
- `save_audit_report_pg` — Persist AI-generated audit reports to `docs/database/`

#### MCP Prompts
- `running_query` — Natural-language MySQL query generator with auto schema detection
- `auditor_query` — MySQL query performance & security auditor (Principal DBA level)
- `running_pg_query` — Natural-language PostgreSQL query generator with auto schema detection
- `auditor_pg_query` — PostgreSQL query performance & security auditor (Principal DBA level)

#### Security
- Read-only query enforcement (only `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, `WITH`)
- SQL injection detection (comments, tautologies, `UNION SELECT`)
- Sensitive column auto-filtering (`password`, `token`, `secret`, `credential`, etc.)
- Configurable restricted columns via `.lumina/database/restricColumn.json`

#### Architecture
- Layered architecture: Controller → Service → Repository
- Zod-based DTO validation for all tool inputs
- Shared types and interfaces for query analysis results
- MCP prompt argument compatibility patch for IDE hosts (Antigravity, Claude Code, Cursor)
- Docker Compose setup for local MySQL 8.0 and PostgreSQL 15
- Optional `databaseName` parameter for multi-database environments

#### Developer Experience
- TypeScript strict mode with ESM modules
- ESLint + Prettier code formatting
- Vitest test suite with coverage reporting
- Hot-reload development via `tsx watch`

[1.0.0]: https://github.com/Wahyu-Labs/lumina-mcp/releases/tag/v1.0.0
