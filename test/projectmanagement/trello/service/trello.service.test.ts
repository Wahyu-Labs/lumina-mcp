import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGetCard } = vi.hoisted(() => ({
  mockGetCard: vi.fn(),
}));

vi.mock('../../../../src/tools/projectmanagement/trello/repository/trello.repository.js', () => ({
  trelloRepository: {
    getCard: mockGetCard,
  },
}));

import { getTrelloCard } from '../../../../src/tools/projectmanagement/trello/service/trello.service.js';

describe('TrelloService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.TRELLO_API_KEY;
    delete process.env.TRELLO_API_TOKEN;
  });

  it('should call repository when arguments are valid', async () => {
    mockGetCard.mockResolvedValueOnce({ id: 'card1' });

    const result = await getTrelloCard('card1', 'mykey', 'mytoken');

    expect(mockGetCard).toHaveBeenCalledWith('card1', 'mykey', 'mytoken');
    expect(result).toEqual({ id: 'card1' });
  });

  it('should fallback to env variables if arguments are omitted', async () => {
    process.env.TRELLO_API_KEY = 'envkey';
    process.env.TRELLO_API_TOKEN = 'envtoken';

    mockGetCard.mockResolvedValueOnce({ id: 'card2' });

    await getTrelloCard('card2');

    expect(mockGetCard).toHaveBeenCalledWith('card2', 'envkey', 'envtoken');
  });

  it('should throw error if key or token is missing', async () => {
    await expect(getTrelloCard('card3', 'mykey', undefined)).rejects.toThrow(
      'Trello apiKey and apiToken are required',
    );
  });
});
