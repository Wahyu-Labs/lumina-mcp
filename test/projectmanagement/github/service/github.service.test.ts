import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGetIssue, mockGetIssueComments, mockGetIssueTimeline } = vi.hoisted(() => ({
  mockGetIssue: vi.fn(),
  mockGetIssueComments: vi.fn(),
  mockGetIssueTimeline: vi.fn(),
}));

vi.mock('../../../../src/tools/projectmanagement/github/repository/github.repository.js', () => ({
  githubRepository: {
    getIssue: mockGetIssue,
    getIssueComments: mockGetIssueComments,
    getIssueTimeline: mockGetIssueTimeline,
  },
}));

import { getGithubIssue } from '../../../../src/tools/projectmanagement/github/service/github.service.js';

describe('GithubService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GITHUB_TOKEN;
    delete process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  });

  it('should call repository when arguments are valid', async () => {
    mockGetIssue.mockResolvedValueOnce({ id: 1 });
    mockGetIssueComments.mockResolvedValueOnce([]);
    mockGetIssueTimeline.mockResolvedValueOnce([]);

    const result = await getGithubIssue('myowner', 'myrepo', 1, 'mytoken');

    expect(mockGetIssue).toHaveBeenCalledWith('myowner', 'myrepo', 1, 'mytoken');
    expect(result).toEqual(expect.objectContaining({ id: 1 }));
  });

  it('should fallback to env variables if token is omitted', async () => {
    process.env.GITHUB_TOKEN = 'envtoken';

    mockGetIssue.mockResolvedValueOnce({ id: 2 });
    mockGetIssueComments.mockResolvedValueOnce([]);
    mockGetIssueTimeline.mockResolvedValueOnce([]);

    await getGithubIssue('myowner', 'myrepo', 2);

    expect(mockGetIssue).toHaveBeenCalledWith('myowner', 'myrepo', 2, 'envtoken');
  });

  it('should fallback to GITHUB_PERSONAL_ACCESS_TOKEN if GITHUB_TOKEN is omitted', async () => {
    process.env.GITHUB_PERSONAL_ACCESS_TOKEN = 'pattoken';

    mockGetIssue.mockResolvedValueOnce({ id: 3 });
    mockGetIssueComments.mockResolvedValueOnce([]);
    mockGetIssueTimeline.mockResolvedValueOnce([]);

    await getGithubIssue('myowner', 'myrepo', 3);

    expect(mockGetIssue).toHaveBeenCalledWith('myowner', 'myrepo', 3, 'pattoken');
  });

  it('should throw error if owner is missing', async () => {
    await expect(getGithubIssue('', 'myrepo', 4)).rejects.toThrow(
      'Owner, repo, and issueNumber are required to fetch a GitHub issue.',
    );
  });

  it('should throw error if repo is missing', async () => {
    await expect(getGithubIssue('myowner', '', 4)).rejects.toThrow(
      'Owner, repo, and issueNumber are required to fetch a GitHub issue.',
    );
  });

  it('should throw error if issueNumber is missing', async () => {
    await expect(getGithubIssue('myowner', 'myrepo', '')).rejects.toThrow(
      'Owner, repo, and issueNumber are required to fetch a GitHub issue.',
    );
  });
});
