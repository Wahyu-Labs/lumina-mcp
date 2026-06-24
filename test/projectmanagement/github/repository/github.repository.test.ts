import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GithubRepository } from '../../../../src/tools/projectmanagement/github/repository/github.repository.js';

describe('GithubRepository', () => {
  let repository: GithubRepository;

  beforeEach(() => {
    repository = new GithubRepository();
    global.fetch = vi.fn();
  });

  it('should fetch GitHub issue successfully without token', async () => {
    const mockResponse = { id: '123', title: 'Test Issue' };
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await repository.getIssue('myowner', 'myrepo', 1);
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/myowner/myrepo/issues/1',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should fetch GitHub issue successfully with token', async () => {
    const mockResponse = { id: '123', title: 'Test Issue' };
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await repository.getIssue('myowner', 'myrepo', 1, 'mytoken');
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/myowner/myrepo/issues/1',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer mytoken',
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if fetch fails', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
      text: async () => 'Issue does not exist',
    } as Response);

    await expect(repository.getIssue('myowner', 'myrepo', 999)).rejects.toThrow(
      'Failed to fetch GitHub issue myowner/myrepo#999: Not Found - Issue does not exist',
    );
  });
});
