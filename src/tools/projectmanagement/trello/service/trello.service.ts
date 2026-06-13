import { trelloRepository } from '../repository/trello.repository.js';

export async function getTrelloCard(
  cardId: string,
  apiKey?: string,
  apiToken?: string,
): Promise<unknown> {
  const finalKey = apiKey || process.env.TRELLO_API_KEY;
  const finalToken = apiToken || process.env.TRELLO_API_TOKEN;

  if (!finalKey || !finalToken) {
    throw new Error('Trello apiKey and apiToken are required. Provide them as arguments or set TRELLO_API_KEY and TRELLO_API_TOKEN.');
  }

  return await trelloRepository.getCard(cardId, finalKey, finalToken);
}
