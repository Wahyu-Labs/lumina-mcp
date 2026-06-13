import { z } from 'zod';

export const GetJiraTicketSchema = {
  domain: z.string().describe('Jira domain prefix (e.g. yourcompany for yourcompany.atlassian.net). Defaults to JIRA_DOMAIN env var if not provided.').optional(),
  email: z.string().describe('Jira email address. Defaults to JIRA_EMAIL env var if not provided.').optional(),
  apiToken: z.string().describe('Jira API token. Defaults to JIRA_API_TOKEN env var if not provided.').optional(),
  issueIdOrKey: z.string().describe('Jira Issue ID or Key (e.g., PRJ-1234)'),
};

export const GetTrelloCardSchema = {
  apiKey: z.string().describe('Trello API Key. Defaults to TRELLO_API_KEY env var if not provided.').optional(),
  apiToken: z.string().describe('Trello API Token. Defaults to TRELLO_API_TOKEN env var if not provided.').optional(),
  cardId: z.string().describe('Trello Card ID or shortlink'),
};

export const GetOpenProjectWorkPackageSchema = {
  domain: z.string().describe('OpenProject domain (e.g. openproject.yourcompany.com). Defaults to OPENPROJECT_DOMAIN env var if not provided.').optional(),
  apiKey: z.string().describe('OpenProject API Key. Defaults to OPENPROJECT_API_KEY env var if not provided.').optional(),
  workPackageId: z.string().describe('OpenProject Work Package ID'),
};

export const ProjectManagementPromptSchema = {
  command: z.string().optional().describe('Additional instructions or context'),
};
