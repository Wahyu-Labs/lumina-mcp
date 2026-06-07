# PostgreSQL — Available Prompts & Tools

> **Lumina MCP** provides two AI-driven prompts and five tools for interacting with PostgreSQL databases through the Model Context Protocol.

---

## 🔧 Tools

### `execute_postgres_query`

Execute a read-only SQL query against a PostgreSQL database with safe parameter binding.

| Parameter      | Type       | Required | Description                                          |
|----------------|------------|----------|------------------------------------------------------|
| `query`        | `string`   | ✅       | The SQL query to execute (read-only only)            |
| `parameters`   | `array`    | ❌       | Bind values for query placeholders (`$1`, `$2`, …)   |
| `databaseName` | `string`   | ❌       | Target database name (defaults to env config)        |

**Example usage via MCP client:**

```
/mcp:lumina-mcp-local:execute_postgres_query

query: SELECT name, email FROM users WHERE status = $1 LIMIT 10
parameters: ["active"]
databaseName: my_app_db
```

---

### `list_postgresql_tables`

List all user tables in the `public` schema of the PostgreSQL database.

| Parameter      | Type     | Required | Description                                   |
|----------------|----------|----------|-----------------------------------------------|
| `databaseName` | `string` | ❌       | Target database name (defaults to env config) |

**Example:**

```
/mcp:lumina-mcp-local:list_postgresql_tables

databaseName: my_app_db
```

---

### `inspect_postgresql_table`

Inspect the structure of a PostgreSQL table — column names, data types, nullability, and default values.

| Parameter      | Type     | Required | Description                                   |
|----------------|----------|----------|-----------------------------------------------|
| `table`        | `string` | ✅       | Table name to inspect                         |
| `databaseName` | `string` | ❌       | Target database name (defaults to env config) |

**Example:**

```
/mcp:lumina-mcp-local:inspect_postgresql_table

table: orders
databaseName: my_app_db
```

---

### `analyze_postgresql_query`

Run `EXPLAIN` (and `EXPLAIN ANALYZE`) on a `SELECT` query and return a structured Senior DB Auditor report with performance, security, and speed verdicts.

| Parameter      | Type     | Required | Description                                   |
|----------------|----------|----------|-----------------------------------------------|
| `query`        | `string` | ✅       | The SELECT query to analyze                   |
| `databaseName` | `string` | ❌       | Target database name (defaults to env config) |

**Example:**

```
/mcp:lumina-mcp-local:analyze_postgresql_query

query: SELECT s.name, c.title, e.grade FROM students s JOIN enrollments e ON s.id = e.student_id JOIN courses c ON c.id = e.course_id WHERE e.grade = 'A'
databaseName: academic_db
```

**Report includes:**
- `performanceVerdict` — `EXCELLENT` | `GOOD` | `NEEDS_OPTIMIZATION` | `CRITICAL`
- `speedVerdict` — `OPTIMAL` | `ACCEPTABLE` | `SLOW`
- `securityVerdict` — `SECURE` | `WARNING` | `RISKY`
- Full execution plan output with AI-powered analysis

---

### `save_audit_report_pg`

Persist an AI-generated audit report as a Markdown file in `docs/database/`.

| Parameter       | Type     | Required | Description                                  |
|-----------------|----------|----------|----------------------------------------------|
| `reportContent` | `string` | ✅       | The full markdown content of the audit report |

> Reports are saved to `docs/database/auditor-query-{date}-{timestamp}.md` automatically.

---

## 💬 Prompts

Prompts are natural-language entry points. They auto-detect table schemas from your database and inject context into the AI conversation.

### `running_pg_query`

> **Title:** PostgreSQL Query Generator

Generate and execute a read-only SQL query from natural language. The prompt automatically discovers your PostgreSQL schema, matches mentioned tables, and injects column metadata so the AI can write accurate queries.

| Parameter | Type     | Required | Description                                    |
|-----------|----------|----------|------------------------------------------------|
| `command` | `string` | ❌       | Natural language instruction for the query      |

**Example:**

```
/mcp:lumina-mcp-local:running_pg_query

command: count orders grouped by status from orders table in ecommerce_db
```

**What happens under the hood:**
1. Queries `information_schema.tables` to fetch all public tables
2. Matches tables mentioned in your command
3. Inspects matched tables via `information_schema.columns`
4. Injects schema context into a structured prompt
5. AI generates a `SELECT` query, executes it, and returns results in a formatted table

**Rules enforced:**
- Only `SELECT` queries are generated — no writes ever
- Explicit column names (no `SELECT *`)
- Parameterized placeholders (`$1`, `$2`, …) for user values
- `LIMIT` guards on unbounded result sets
- JOINs preferred over subqueries

---

### `auditor_pg_query`

> **Title:** PostgreSQL Query Auditor

Run a full performance & security audit on a SQL query. The AI acts as a **Principal-Level PostgreSQL Performance Engineer** with 15+ years of experience.

| Parameter | Type     | Required | Description                                  |
|-----------|----------|----------|----------------------------------------------|
| `command` | `string` | ❌       | The SQL query (or description) to audit      |

**Example:**

```
/mcp:lumina-mcp-local:auditor_pg_query

command: SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id WHERE orders.status = 'pending'
```

**Audit workflow:**
1. Inspects all referenced table schemas via `information_schema`
2. Runs `EXPLAIN` / `EXPLAIN ANALYZE` on the query
3. Evaluates execution plan signals:

| Signal                          | Severity    | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `Seq Scan`                      | 🔴 CRITICAL | Sequential scan — no index used              |
| `Sort`                          | 🟠 HIGH     | Explicit sort operation outside index order   |
| `Hash Join` on large tables     | 🟡 MEDIUM   | May indicate missing index on join column     |
| `Nested Loop` without index     | 🔴 CRITICAL | Cartesian-style join without index           |

4. Generates index strategy recommendations (covering, composite, partial)
5. Evaluates CTEs vs subqueries performance implications
6. Proposes rewritten SQL when improvements exist
7. Checks security: `SELECT *`, hardcoded literals, parameterization (`$1`, `$2`)
8. Saves the full report to `docs/database/` and outputs it inline

---

## 🔒 Security Features

All PostgreSQL tools include built-in security layers:

- **Read-only enforcement** — Only `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, and `WITH` statements are allowed
- **SQL injection detection** — Blocks SQL comments (`--`, `/*`, `#`), tautologies (`OR 1=1`), and `UNION SELECT` patterns
- **Sensitive column filtering** — Automatically strips columns like `password`, `token`, `secret`, `credential` from query results
- **Configurable restricted columns** — Add custom restricted columns via `.lumina/database/restricColumn.json`

```json
{
  "COLUMNS": ["ssn", "credit_card", "api_key"]
}
```
