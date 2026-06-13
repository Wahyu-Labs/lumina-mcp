import { openProjectRepository } from '../repository/openproject.repository.js';

export async function getOpenProjectWorkPackage(
  workPackageId: string,
  domain?: string,
  apiKey?: string,
): Promise<unknown> {
  const finalDomain = domain || process.env.OPENPROJECT_DOMAIN;
  const finalApiKey = apiKey || process.env.OPENPROJECT_API_KEY;

  if (!finalDomain) {
    throw new Error('OpenProject domain is required. Provide it as an argument or set OPENPROJECT_DOMAIN.');
  }

  if (!finalApiKey) {
    throw new Error('OpenProject apiKey is required. Provide it as an argument or set OPENPROJECT_API_KEY.');
  }

  return await openProjectRepository.getWorkPackage(workPackageId, finalDomain, finalApiKey);
}
