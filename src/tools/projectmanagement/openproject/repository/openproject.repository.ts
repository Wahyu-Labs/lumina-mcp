export class OpenProjectRepository {
  async getWorkPackage(workPackageId: string, domain: string, apiKey: string): Promise<unknown> {
    const url = `https://${domain}/api/v3/work_packages/${workPackageId}`;
    
    // OpenProject uses Basic Auth where username is 'apikey'
    const authHeader = 'Basic ' + Buffer.from(`apikey:${apiKey}`).toString('base64');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch OpenProject work package ${workPackageId}: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }
}

export const openProjectRepository = new OpenProjectRepository();
