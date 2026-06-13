export class JiraRepository {
  async getTicket(
    issueIdOrKey: string,
    domain: string,
    email: string,
    apiToken: string,
  ): Promise<unknown> {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\.atlassian\.net\/?$/, '').replace(/\/$/, '');
    const url = `https://${cleanDomain}.atlassian.net/rest/api/3/issue/${issueIdOrKey}`;
    const credentials = Buffer.from(`${email}:${apiToken}`).toString('base64');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch Jira ticket ${issueIdOrKey}: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }
}

export const jiraRepository = new JiraRepository();
