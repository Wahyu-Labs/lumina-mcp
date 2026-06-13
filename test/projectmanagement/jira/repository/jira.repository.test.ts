import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JiraRepository } from '../../../../src/tools/projectmanagement/jira/repository/jira.repository.js';

describe('JiraRepository', () => {
  let repository: JiraRepository;

  beforeEach(() => {
    repository = new JiraRepository();
    global.fetch = vi.fn();
  });

  it('should fetch Jira ticket successfully', async () => {
    const mockResponse = { id: '123', key: 'PRJ-123' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await repository.getTicket('PRJ-123', 'testdomain', 'test@test.com', 'token123');
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://testdomain.atlassian.net/rest/api/3/issue/PRJ-123',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from('test@test.com:token123').toString('base64')}`,
          Accept: 'application/json',
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if fetch fails', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
      text: async () => 'Issue does not exist',
    });

    await expect(repository.getTicket('PRJ-999', 'testdomain', 'test@test.com', 'token123')).rejects.toThrow(
      'Failed to fetch Jira ticket PRJ-999: Not Found - Issue does not exist',
    );
  });
});
