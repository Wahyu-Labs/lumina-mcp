import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { TestingPromptSchema } from '../dto/testing.dto.js';
import { CREATE_UNIT_TEST_PROMPT } from '../prompts/index.js';

export function registerTestingController(server: McpServer) {
  // Prompts
  server.registerPrompt(
    'create-unit-test',
    {
      title: 'Senior SDET Create Unit Test',
      description: 'Generate high-quality unit tests covering happy path, negative path, and edge cases with >80% coverage for any programming language.',
      argsSchema: TestingPromptSchema,
    },
    async ({ command }) => {
      const promptText = CREATE_UNIT_TEST_PROMPT.replace(
        '{{context}}',
        () => command || 'No context provided. Please provide the source code to test.',
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
