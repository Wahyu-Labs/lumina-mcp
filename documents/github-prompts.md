# GitHub Source Control — Prompts & Tools

> **Lumina MCP** provides seven tools and four prompts for automating Git workflows and GitHub operations through the Model Context Protocol.

---

## 🔧 Tools

### `generate_commit_and_push`

Generate a Conventional Commit message, stage the specified files, and push them to a remote branch.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `branch` | `string` | ✅ | Target branch to commit and push to |
| `files` | `array` | ✅ | List of file paths to stage and commit |
| `commitMessage` | `string` | ❌ | Commit message (auto-generated if omitted) |
| `diff` | `string` | ❌ | Git diff content for context |

**Example:**
```
/mcp:lumina-mcp-local:generate_commit_and_push

repository: owner/repo
branch: feat/auth
files: ["src/auth.ts", "src/middleware/jwt.ts"]
commitMessage: "feat(auth): implement JWT token rotation"
```

---

### `create_github_pr`

Create a Pull Request on GitHub.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `title` | `string` | ✅ | Pull request title |
| `head` | `string` | ✅ | Source branch (where changes are implemented) |
| `base` | `string` | ✅ | Target branch (where changes will be merged into) |
| `body` | `string` | ✅ | Pull request description (Markdown supported) |

**Example:**
```
/mcp:lumina-mcp-local:create_github_pr

repository: owner/repo
title: "feat(auth): implement JWT token rotation"
head: "feat/auth"
base: "main"
body: "This PR introduces JWT token rotation and secure middleware layers."
```

---

### `review_github_pr`

Submit an AI-powered code review directly to a GitHub Pull Request.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `pullRequestNumber` | `number` | ✅ | The PR number to review |
| `event` | `string` | ✅ | Review action: `APPROVE`, `REQUEST_CHANGES`, or `COMMENT` |
| `body` | `string` | ✅ | The overall review body text |
| `comments` | `array` | ❌ | Inline comments with `path`, `position`, and `body` |

**Example:**
```
/mcp:lumina-mcp-local:review_github_pr

repository: owner/repo
pullRequestNumber: 42
event: "REQUEST_CHANGES"
body: "Found 2 critical issues. See inline comments."
```

---

### `fix_github_pr_review`

Fetch all review comments from a PR to help the AI automatically apply fixes and push the result.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `pullRequestNumber` | `number` | ✅ | The PR number |
| `branch` | `string` | ✅ | Branch to commit the fixes to |

**Example:**
```
/mcp:lumina-mcp-local:fix_github_pr_review

repository: owner/repo
pullRequestNumber: 104
branch: feat/auth
```

---

### `get_github_pr_diff`

Download the clean unified diff of any open GitHub PR for automated review or analysis.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `pullRequestNumber` | `number` | ✅ | The PR number |

---

### `reply_to_pr_comment`

Reply to an inline comment within a GitHub Pull Request review.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `pullRequestNumber` | `number` | ✅ | The PR number |
| `commentId` | `number` | ✅ | The ID of the comment to reply to |
| `body` | `string` | ✅ | The reply message body |

---

### `resolve_pr_review_thread`

Resolve a GitHub PR review thread by its comment node ID, marking the discussion as resolved.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repository` | `string` | ✅ | Repository in `owner/repo` format |
| `threadId` | `string` | ✅ | The GraphQL node ID of the review thread to resolve |

---

## 💬 Prompts

### `commit_generator_message`

> **Title:** Senior SWE Commit Generator

Generate a professional Conventional Commit message with automatic ticket/branch name detection and AI transparent authorship tagging.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

**Example:**
```
Stage my changes and generate a commit message.
```

---

### `tech_company_pr_creator`

> **Title:** Tech Company PR Creator

Generate a comprehensive, tech company-style PR description (Netflix/Meta/Google standard) including problem context, solution overview, test coverage, and a review checklist.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

**Example:**
```
Create a PR from feat/auth into main.
```

---

### `ai_code_reviewer`

> **Title:** AI Code Reviewer

Submit a rigorous, Big Tech-style code review directly to a GitHub Pull Request, acting as a strict Senior Staff Engineer. Issues are categorized as `[CRITICAL]`, `[MAJOR]`, `[MINOR]`, or `[NIT]`.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

**Example:**
```
Review PR #42 and approve it.
```

---

### `fix_pr_review_message`

> **Title:** Fix PR Review Message

Automatically fetch PR review comments, analyze what needs to be fixed, apply changes to the codebase, verify them, and reply or resolve the threads on GitHub.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | ❌ | Natural language instruction or context |

**Example:**
```
Resolve all PR review comments on PR #104.
```

---

## 🛡️ Fallback Strategy

All Git/GitHub prompts use a smart three-tier fallback if a tool is unavailable:

1. **Primary** — Use Lumina MCP tools (`generate_commit_and_push`, `create_github_pr`, etc.)
2. **Secondary** — Fall back to the official GitHub MCP server if registered in the client
3. **Tertiary** — Fall back to GitHub CLI (`gh`) or standard `git` terminal commands
