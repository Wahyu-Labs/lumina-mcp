import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenProjectRepository } from '../../../../src/tools/projectmanagement/openproject/repository/openproject.repository.js';

describe('OpenProjectRepository', () => {
  let repository: OpenProjectRepository;

  beforeEach(() => {
    repository = new OpenProjectRepository();
    global.fetch = vi.fn();
  });

  it('should fetch OpenProject work package successfully', async () => {
    const mockResponse = { id: 1234, subject: 'My WP' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await repository.getWorkPackage('1234', 'test.domain.com', 'testapikey');
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://test.domain.com/api/v3/work_packages/1234',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic YXBpa2V5OnRlc3RhcGlrZXk=', // Base64 of apikey:testapikey
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if fetch fails', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
      text: async () => 'Invalid token',
    });

    await expect(repository.getWorkPackage('999', 'test.domain.com', 'testapikey')).rejects.toThrow(
      'Failed to fetch OpenProject work package 999: Unauthorized - Invalid token',
    );
  });
});
