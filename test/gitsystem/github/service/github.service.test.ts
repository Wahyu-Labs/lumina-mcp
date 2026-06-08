import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGithubRepository, mockExec, mockExecFile } = vi.hoisted(() => ({
  mockGithubRepository: {
    createPullRequest: vi.fn(),
    createCodeReview: vi.fn(),
    getPRReviewComments: vi.fn(),
  },
  mockExec: vi.fn(),
  mockExecFile: vi.fn(),
}));

vi.mock('child_process', () => ({
  exec: (cmd: string, callback: (err: Error | null, stdout: string, stderr: string) => void) =>
    mockExec(cmd, callback),
  execFile: (
    file: string,
    args: string[],
    callback: (err: Error | null, stdout: string, stderr: string) => void,
  ) => mockExecFile(file, args, callback),
}));

// Mock util.promisify to return our mocks
vi.mock('util', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  promisify: (fn: Function) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (...args: any[]) => {
      return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        fn(...args, (error: Error | null, stdout: string, stderr: string) => {
          if (error) reject(error);
          else resolve({ stdout, stderr });
        });
      });
    };
  },
}));

vi.mock('../../../../src/tools/gitsystem/github/repository/github.repository.js', () => ({
  githubRepository: mockGithubRepository,
}));

import {
  generateAndPushCommit,
  getLocalGitChanges,
  createPullRequest,
  createCodeReview,
  getPRReviewComments,
} from '../../../../src/tools/gitsystem/github/service/github.service.js';

describe('GitHub Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateAndPushCommit', () => {
    it('should throw error if no files provided', async () => {
      await expect(generateAndPushCommit('owner/repo', 'main', 'msg', [])).rejects.toThrow(
        'No files specified to commit',
      );
    });

    it('should call git commands correctly and succeed', async () => {
      mockExecFile.mockImplementation((file, args, callback) => {
        callback(null, 'Success output', '');
      });

      const result = await generateAndPushCommit('owner/repo', 'main', 'feat: initial commit', [
        'file1.ts',
        'file2.ts',
      ]);

      expect(mockExecFile).toHaveBeenCalledTimes(3);
      expect(mockExecFile).toHaveBeenNthCalledWith(
        1,
        'git',
        ['add', 'file1.ts', 'file2.ts'],
        expect.any(Function),
      );
      expect(mockExecFile).toHaveBeenNthCalledWith(
        2,
        'git',
        ['commit', '-m', 'feat: initial commit'],
        expect.any(Function),
      );
      expect(mockExecFile).toHaveBeenNthCalledWith(
        3,
        'git',
        ['push', 'origin', 'main'],
        expect.any(Function),
      );
      expect(result).toEqual({
        success: true,
        stdout: 'Success output\nSuccess output',
        stderr: '',
      });
    });

    it('should throw error if git command fails', async () => {
      mockExecFile.mockImplementation((file, args, callback) => {
        callback(new Error('Git command failed'), '', 'Error output');
      });

      await expect(
        generateAndPushCommit('owner/repo', 'main', 'feat: initial commit', ['file1.ts']),
      ).rejects.toThrow('Failed to commit and push: Git command failed');
    });
  });

  describe('getLocalGitChanges', () => {
    it('should return staged and unstaged changes', async () => {
      mockExec.mockImplementation((cmd, callback) => {
        if (cmd === 'git diff --staged') {
          callback(null, 'staged changes content', '');
        } else if (cmd === 'git diff') {
          callback(null, 'unstaged changes content', '');
        }
      });

      const result = await getLocalGitChanges();
      expect(result).toContain('Staged Changes:\nstaged changes content');
      expect(result).toContain('Unstaged Changes:\nunstaged changes content');
    });

    it('should return default message if no changes detected', async () => {
      mockExec.mockImplementation((cmd, callback) => {
        callback(null, '', '');
      });

      const result = await getLocalGitChanges();
      expect(result).toBe('No local changes detected.');
    });

    it('should fallback to error string if command throws', async () => {
      mockExec.mockImplementation((cmd, callback) => {
        callback(new Error('git failed'), '', '');
      });

      const result = await getLocalGitChanges();
      expect(result).toBe('Failed to read local git changes.');
    });
  });

  describe('Repository proxies', () => {
    it('should proxy createPullRequest to githubRepository', async () => {
      mockGithubRepository.createPullRequest.mockResolvedValueOnce({ id: 1 });
      const result = await createPullRequest('owner/repo', 'title', 'head', 'base', 'body');
      expect(mockGithubRepository.createPullRequest).toHaveBeenCalledWith(
        'owner/repo',
        'title',
        'head',
        'base',
        'body',
      );
      expect(result).toEqual({ id: 1 });
    });

    it('should proxy createCodeReview to githubRepository', async () => {
      mockGithubRepository.createCodeReview.mockResolvedValueOnce({ id: 2 });
      const result = await createCodeReview('owner/repo', 42, 'APPROVE', 'body', []);
      expect(mockGithubRepository.createCodeReview).toHaveBeenCalledWith(
        'owner/repo',
        42,
        'APPROVE',
        'body',
        [],
      );
      expect(result).toEqual({ id: 2 });
    });

    it('should proxy getPRReviewComments to githubRepository', async () => {
      mockGithubRepository.getPRReviewComments.mockResolvedValueOnce({ comments: [] });
      const result = await getPRReviewComments('owner/repo', 42);
      expect(mockGithubRepository.getPRReviewComments).toHaveBeenCalledWith('owner/repo', 42);
      expect(result).toEqual({ comments: [] });
    });
  });
});
