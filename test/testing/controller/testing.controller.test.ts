import { describe, it, expect, vi, beforeEach } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTestingController } from '../../../src/tools/testing/controller/testing.controller.js';
import { CREATE_UNIT_TEST_PROMPT } from '../../../src/tools/testing/prompts/index.js';

describe('Testing Controller', () => {
  let mockServer: {
    registerPrompt: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockServer = {
      registerPrompt: vi.fn(),
    };
  });

  it('should register create-unit-test prompt', () => {
    registerTestingController(mockServer as unknown as McpServer);

    expect(mockServer.registerPrompt).toHaveBeenCalledWith(
      'create-unit-test',
      expect.any(Object),
      expect.any(Function),
    );
  });

  describe('create-unit-test prompt', () => {
    let createUnitTestCallback: (args: { command?: string }) => Promise<{ messages: { role: string; content: { text: string } }[] }>;

    beforeEach(() => {
      registerTestingController(mockServer as unknown as McpServer);
      createUnitTestCallback = mockServer.registerPrompt.mock.calls[0][2];
    });

    it('should replace {{context}} with the provided command', async () => {
      const commandText = 'function sum(a, b) { return a + b; }';
      const result = await createUnitTestCallback({ command: commandText });
      const expectedText = CREATE_UNIT_TEST_PROMPT.replace('{{context}}', commandText);

      expect(result.messages[0].role).toBe('user');
      expect(result.messages[0].content.text).toBe(expectedText);
    });

    it('should handle undefined command gracefully by providing default text', async () => {
      const result = await createUnitTestCallback({});
      const expectedText = CREATE_UNIT_TEST_PROMPT.replace('{{context}}', 'No context provided. Please provide the source code to test.');

      expect(result.messages[0].content.text).toBe(expectedText);
    });
  });
});
