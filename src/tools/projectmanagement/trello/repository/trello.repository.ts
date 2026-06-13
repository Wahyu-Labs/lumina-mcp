export class TrelloRepository {
  async getCard(cardId: string, apiKey: string, apiToken: string): Promise<unknown> {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch Trello card ${cardId}: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }
}

export const trelloRepository = new TrelloRepository();
