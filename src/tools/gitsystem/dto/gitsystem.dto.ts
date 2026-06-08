import { z } from 'zod';

export const GenerateCommitSchema = z.object({
  repository: z.string().describe('Repository name in format owner/repo (e.g. facebook/react)'),
  branch: z.string().describe('Branch name to commit and push to'),
  files: z.array(z.string()).describe('List of specific files to add and commit'),
  diff: z.string().optional().describe('Git diff content. If not provided, it might generate based on local staged changes if applicable.'),
});

export const CreatePRSchema = z.object({
  repository: z.string().describe('Repository name in format owner/repo'),
  title: z.string().describe('Pull request title'),
  head: z.string().describe('The name of the branch where your changes are implemented'),
  base: z.string().describe('The name of the branch you want the changes pulled into'),
  body: z.string().describe('The contents of the pull request'),
});

export const ReviewPRSchema = z.object({
  repository: z.string().describe('Repository name in format owner/repo'),
  pullRequestNumber: z.number().describe('The number of the pull request to review'),
  event: z.enum(['APPROVE', 'REQUEST_CHANGES', 'COMMENT']).describe('The review action to perform'),
  body: z.string().describe('The body text of the pull request review'),
  comments: z.array(z.object({
    path: z.string(),
    position: z.number(),
    body: z.string()
  })).optional().describe('Optional inline comments'),
});

export const FixPRSchema = z.object({
  repository: z.string().describe('Repository name in format owner/repo'),
  pullRequestNumber: z.number().describe('The number of the pull request'),
  branch: z.string().describe('The branch of the pull request to commit fixes to'),
});

export const GithubPromptSchema = {
  command: z
    .string()
    .optional()
    .describe(
      "Natural language command or context for the GitHub prompt (e.g., details about the commit, PR context, or review instructions)",
    ),
};
