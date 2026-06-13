import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TrelloRepository } from '../../../../src/tools/projectmanagement/trello/repository/trello.repository.js';

describe('TrelloRepository', () => {
  let repository: TrelloRepository;

  beforeEach(() => {
    repository = new TrelloRepository();
    global.fetch = vi.fn();
  });

  it('should fetch Trello card successfully', async () => {
    const mockResponse = { id: 'abc1234', name: 'My Card' };
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await repository.getCard('abc1234', 'testkey', 'testtoken');
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.trello.com/1/cards/abc1234?key=testkey&token=testtoken',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if fetch fails', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
      text: async () => 'Invalid token',
    } as Response);

    await expect(repository.getCard('xyz999', 'testkey', 'testtoken')).rejects.toThrow(
      'Failed to fetch Trello card xyz999: Unauthorized - Invalid token',
    );
  });
});
