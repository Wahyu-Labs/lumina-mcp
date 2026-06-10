import { GitHubPRResponse, GitHubReviewResponse } from '../../types/github.types.js';
import { githubRepository } from '../repository/github.repository.js';

import { exec, execFile } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);

export async function generateAndPushCommit(
  branch: string,
  message: string,
  files: string[],
  _diffContent?: string,
): Promise<{ success: boolean; stdout: string; stderr: string }> {
  try {
    if (!files || files.length === 0) {
      throw new Error(
        'No files specified to commit. AI must specify explicitly which files to add.',
      );
    }

    // Securely add files
    await execFileAsync('git', ['add', ...files]);

    // Securely commit with message
    const { stdout: commitOut, stderr: commitErr } = await execFileAsync('git', [
      'commit',
      '-m',
      message,
    ]);

    // Securely push to branch
    const { stdout: pushOut, stderr: pushErr } = await execFileAsync('git', [
      'push',
      'origin',
      branch,
    ]);

    return {
      success: true,
      stdout: `${commitOut}\n${pushOut}`.trim(),
      stderr: `${commitErr}\n${pushErr}`.trim(),
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to commit and push: ${errorMessage}`);
  }
}

export async function getLocalGitChanges(): Promise<string> {
  try {
    const { stdout: staged } = await execAsync('git diff --staged');
    const { stdout: unstaged } = await execAsync('git diff');
    let output = '';
    if (staged) output += `Staged Changes:\n${staged}\n\n`;
    if (unstaged) output += `Unstaged Changes:\n${unstaged}\n\n`;
    return output || 'No local changes detected.';
  } catch {
    return 'Failed to read local git changes.';
  }
}

export async function createPullRequest(
  repository: string,
  title: string,
  head: string,
  base: string,
  body: string,
): Promise<GitHubPRResponse> {
  return await githubRepository.createPullRequest(repository, title, head, base, body);
}

export async function createCodeReview(
  repository: string,
  pullRequestNumber: number,
  event: 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT',
  body: string,
  comments?: Array<{
    path: string;
    line: number;
    side?: 'LEFT' | 'RIGHT';
    body: string;
  }>,
): Promise<GitHubReviewResponse> {
  return await githubRepository.createCodeReview(
    repository,
    pullRequestNumber,
    event,
    body,
    comments,
  );
}

export async function getPRReviewComments(
  repository: string,
  pullRequestNumber: number,
): Promise<unknown> {
  return await githubRepository.getPRReviewComments(repository, pullRequestNumber);
}

export async function getPullRequestDiff(
  repository: string,
  pullRequestNumber: number,
): Promise<string> {
  return await githubRepository.getPullRequestDiff(repository, pullRequestNumber);
}

export async function replyToPRComment(
  repository: string,
  pullRequestNumber: number,
  commentId: number,
  body: string,
): Promise<unknown> {
  return await githubRepository.replyToPRComment(repository, pullRequestNumber, commentId, body);
}

export async function resolvePRReviewThread(
  repository: string,
  pullRequestNumber: number,
  commentNodeId: string,
): Promise<unknown> {
  return await githubRepository.resolvePRReviewThread(repository, pullRequestNumber, commentNodeId);
}
