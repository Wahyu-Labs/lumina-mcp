# GitHub Source Control — Available Prompts & Tools

> **Lumina MCP** provides four prompts and four tools for interacting with Git and GitHub through the Model Context Protocol.

---

## 🔧 Tools

### `generate_commit_and_push`

Generate a commit message based on local changes, commit the files, and push them to GitHub.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository name in format `owner/repo` |
| `branch` | `string` | ✅ | Branch name to commit and push to |
| `files` | `array` | ✅ | List of specific files to add and commit |
| `diff` | `string` | ❌ | Git diff content (optional) |

**Example:**
```
/mcp:lumina-mcp-local:generate_commit_and_push

repository: owner/repo
branch: main
files: ["src/index.ts", "package.json"]
diff: "Update versions"
```

---

### `create_github_pr`

Create a pull request on GitHub.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository name in format `owner/repo` |
| `title` | `string` | ✅ | Pull request title |
| `head` | `string` | ✅ | The name of the branch where your changes are implemented |
| `base` | `string` | ✅ | The name of the branch you want the changes pulled into |
| `body` | `string` | ✅ | The contents of the pull request description |

**Example:**
```
/mcp:lumina-mcp-local:create_github_pr

repository: owner/repo
title: "feat: implement auth"
head: "feature/auth"
base: "main"
body: "This PR introduces JWT token rotation and authentication layers."
```

---

### `review_github_pr`

Submit an AI-based code review directly to a GitHub Pull Request.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository name in format `owner/repo` |
| `pullRequestNumber` | `number` | ✅ | The number of the pull request to review |
| `event` | `string` | ✅ | The review action to perform (`APPROVE`, `REQUEST_CHANGES`, `COMMENT`) |
| `body` | `string` | ✅ | The body text of the pull request review |
| `comments` | `array` | ❌ | Optional inline comments containing `path`, `position`, and `body` |

---

### `fix_github_pr_review`

Fetch the reviews and inline comments of a Pull Request to help automatically fix them.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository name in format `owner/repo` |
| `pullRequestNumber` | `number` | ✅ | The number of the pull request |
| `branch` | `string` | ✅ | The branch of the pull request to commit fixes to |

---

## 💬 Prompts

### `commit_generator_message`

> **Title:** Senior SWE Commit Generator

Generate a professional commit message following conventional commits, ticket/branch name detection, and AI transparent authorship rules.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

---

### `tech_company_pr_creator`

> **Title:** Tech Company PR Creator

Generate a comprehensive PR description following the style of large tech companies (like Netflix, Meta, or Google), including context, solution, test coverage, and checklist.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

---

### `ai_code_reviewer`

> **Title:** AI Code Reviewer

Submit a rigorous, high-standard code review directly to GitHub acting as a strict **Senior Staff Engineer** with categorization for issues ([CRITICAL], [MAJOR], [MINOR], [NIT]).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

---

### `fix_pr_review_message`

> **Title:** Fix PR Review Message

Automatically analyze review comments, apply fixes to the codebase, verify changes, and reply/resolve them on GitHub.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

---

## 🔒 Execution Guardrails & Fallbacks

All Git/GitHub prompts enforce that after generating a description, commit message, or code fix, the AI **must** call the respective MCP tool (`generate_commit_and_push`, `create_github_pr`, `review_github_pr`) to complete the workflow automatically.

### Prompt-Based Fallback Rules
To avoid environment-setup roadblocks (such as a missing or invalid `GITHUB_TOKEN` on the server), all prompt templates embed dynamic, intelligent fallback flow instructions for the AI:
1. **Primary**: Attempt to use `lumina-mcp` tools (e.g. `create_github_pr`, `review_github_pr`, etc.).
2. **Secondary**: Fall back to the official GitHub MCP server (`github`) if it is registered in the client's environment.
3. **Tertiary**: Fall back to executing local shell commands via the GitHub CLI (`gh` CLI) or standard `git` terminal commands if both MCP servers are unavailable or fail.

