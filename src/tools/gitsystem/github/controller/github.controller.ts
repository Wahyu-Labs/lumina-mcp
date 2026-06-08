import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  generateAndPushCommit,
  createPullRequest,
  createCodeReview,
  getPRReviewComments,
  getLocalGitChanges,
} from '../service/github.service.js';
import {
  GenerateCommitSchema,
  CreatePRSchema,
  ReviewPRSchema,
  FixPRSchema,
  GithubPromptSchema,
} from '../../dto/gitsystem.dto.js';
import {
  SENIOR_COMMIT_PROMPT,
  TECH_COMPANY_PR_PROMPT,
  AI_CODE_REVIEWER_PROMPT,
  PR_REVIEW_FIX_PROMPT,
} from '../../prompts/index.js';

export function registerGithubController(server: McpServer) {
  // Tools
  server.registerTool(
    'generate_commit_and_push',
    {
      description: 'Generate a commit message based on local changes, commit, and push to GitHub.',
      inputSchema: GenerateCommitSchema,
    },
    async ({ repository, branch, commitMessage, diff, files }) => {
      try {
        const message = commitMessage || diff || 'Update repository';
        const result = await generateAndPushCommit(repository, branch, message, files, diff);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `GitHub Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    'create_github_pr',
    {
      description: 'Create a pull request to GitHub.',
      inputSchema: CreatePRSchema,
    },
    async ({ repository, title, head, base, body }) => {
      try {
        const result = await createPullRequest(repository, title, head, base, body);
        return {
          content: [
            {
              type: 'text',
              text: `Successfully created PR: ${result.html_url}\nState: ${result.state}`,
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `GitHub Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    'review_github_pr',
    {
      description: 'Submit an AI-based code review to a GitHub Pull Request.',
      inputSchema: ReviewPRSchema,
    },
    async ({ repository, pullRequestNumber, event, body, comments }) => {
      try {
        const result = await createCodeReview(repository, pullRequestNumber, event, body, comments);
        return {
          content: [
            {
              type: 'text',
              text: `Successfully submitted review: ${result.html_url}\nState: ${result.state}`,
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `GitHub Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    'fix_github_pr_review',
    {
      description: 'Read a PR review comments and automatically apply fixes.',
      inputSchema: FixPRSchema,
    },
    async ({ repository, pullRequestNumber, branch: _branch }) => {
      try {
        const comments = await getPRReviewComments(repository, pullRequestNumber);

        return {
          content: [
            {
              type: 'text',
              text: `Review comments fetched successfully. Please analyze these comments and apply code changes:\n${JSON.stringify(comments, null, 2)}`,
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `GitHub Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  // Prompts
  server.registerPrompt(
    'commit_generator_message',
    {
      title: 'Senior SWE Commit Generator',
      description: 'Generate commit message like a senior software engineer in a big tech company.',
      argsSchema: GithubPromptSchema,
    },
    async ({ command }) => {
      const localChanges = await getLocalGitChanges();
      const finalContext = command
        ? `${command}\n\n[Auto-detected Local Changes]:\n${localChanges}`
        : `[Auto-detected Local Changes]:\n${localChanges}`;

      const promptText = SENIOR_COMMIT_PROMPT.replace('{{context}}', finalContext);
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    'tech_company_pr_creator',
    {
      title: 'Tech Company PR Creator',
      description: 'Create pull request description like a tech company, including test coverage.',
      argsSchema: GithubPromptSchema,
    },
    async ({ command }) => {
      const promptText = TECH_COMPANY_PR_PROMPT.replace(
        '{{context}}',
        command || 'No context provided.',
      );
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    'ai_code_reviewer',
    {
      title: 'AI Code Reviewer',
      description: 'Provide code review directly to github based on AI.',
      argsSchema: GithubPromptSchema,
    },
    async ({ command }) => {
      const promptText = AI_CODE_REVIEWER_PROMPT.replace(
        '{{context}}',
        command || 'No context provided.',
      );
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    'fix_pr_review_message',
    {
      title: 'Fix PR Review Message',
      description:
        'Fetch review comments and provide instructions to automatically fix them, commit/push, and submit a review approval or comment on GitHub.',
      argsSchema: GithubPromptSchema,
    },
    async ({ command }) => {
      const promptText = PR_REVIEW_FIX_PROMPT.replace(
        '{{context}}',
        command || 'No context provided.',
      );
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );
}
