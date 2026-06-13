import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getJiraTicket } from '../jira/service/jira.service.js';
import { getTrelloCard } from '../trello/service/trello.service.js';
import { getOpenProjectWorkPackage } from '../openproject/service/openproject.service.js';
import {
  GetJiraTicketSchema,
  GetTrelloCardSchema,
  GetOpenProjectWorkPackageSchema,
  ProjectManagementPromptSchema,
} from '../dto/projectmanagement.dto.js';
import {
  PM_SUMMARIZE_TICKET_PROMPT,
  PM_BRAINSTORM_PLAN_PROMPT,
  PM_TEST_CATALOG_PROMPT,
} from '../prompts/index.js';

export function registerProjectManagementController(server: McpServer) {
  // Tools
  server.registerTool(
    'get_jira_ticket',
    {
      description: 'Fetch a Jira ticket/issue by its ID or Key via Jira REST API.',
      inputSchema: GetJiraTicketSchema,
    },
    async ({ issueIdOrKey, domain, email, apiToken }) => {
      try {
        const ticket = await getJiraTicket(issueIdOrKey, domain, email, apiToken);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(ticket, null, 2),
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Jira Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    'get_trello_card',
    {
      description: 'Fetch a Trello card by its ID or shortlink via Trello REST API.',
      inputSchema: GetTrelloCardSchema,
    },
    async ({ cardId, apiKey, apiToken }) => {
      try {
        const card = await getTrelloCard(cardId, apiKey, apiToken);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(card, null, 2),
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Trello Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    'get_openproject_work_package',
    {
      description: 'Fetch an OpenProject work package by its ID via OpenProject REST API.',
      inputSchema: GetOpenProjectWorkPackageSchema,
    },
    async ({ workPackageId, domain, apiKey }) => {
      try {
        const wp = await getOpenProjectWorkPackage(workPackageId, domain, apiKey);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(wp, null, 2),
            },
          ],
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `OpenProject Tool Error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  );

  // Prompts
  server.registerPrompt(
    'pm_summarize_ticket',
    {
      title: 'Senior PM Summarize Ticket',
      description: 'Summarize a raw Jira or Trello ticket as a Senior Product Manager.',
      argsSchema: ProjectManagementPromptSchema,
    },
    async ({ command }) => {
      const promptText = PM_SUMMARIZE_TICKET_PROMPT.replace(
        '{{context}}',
        () => command || 'No context provided. Please paste the raw ticket content here.',
      );
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    'pm_brainstorm_plan',
    {
      title: 'Staff Engineer Brainstorm and Plan',
      description: 'Brainstorm technical approach and create a plan based on the ticket summary.',
      argsSchema: ProjectManagementPromptSchema,
    },
    async ({ command }) => {
      const promptText = PM_BRAINSTORM_PLAN_PROMPT.replace(
        '{{context}}',
        () => command || 'No context provided.',
      );
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    'pm_test_catalog',
    {
      title: 'Strict QA Test Catalog Generator',
      description: 'Generate comprehensive test catalog based on the ticket and technical plan.',
      argsSchema: ProjectManagementPromptSchema,
    },
    async ({ command }) => {
      const promptText = PM_TEST_CATALOG_PROMPT.replace(
        '{{context}}',
        () => command || 'No context provided.',
      );
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: promptText,
            },
          },
        ],
      };
    },
  );
}
