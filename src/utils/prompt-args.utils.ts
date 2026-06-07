import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GetPromptRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import {
  normalizeObjectSchema,
  safeParseAsync,
  getParseErrorMessage,
} from '@modelcontextprotocol/sdk/server/zod-compat.js';

/**
 * Compatibility utility for MCP hosts (e.g. Antigravity IDE) that call
 * `prompts/get` without an `arguments` field (undefined).
 *
 * Per the MCP spec, `arguments` is optional — but the SDK's Zod validation
 * rejects `undefined`, throwing error -32602 even when all prompt args are optional.
 *
 * This utility overrides the `GetPromptRequest` handler to normalize
 * `undefined` → `{}` before validation runs, so:
 *  - Antigravity IDE  : no longer crashes with -32602
 *  - Claude Code / Cursor : `argsSchema` is intact → argument input UI still works
 *
 * IMPORTANT: Call this AFTER all controllers are registered so that McpServer
 * has already initialized `_promptHandlersInitialized`. Calling it earlier
 * would have no effect because McpServer re-registers the handler on first
 * `registerPrompt`.
 */
export function applyPromptArgsPatch(server: McpServer): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type RegisteredPrompt = {
    enabled: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    argsSchema?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => unknown;
  };

  server.server.setRequestHandler(
    GetPromptRequestSchema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (request, extra): Promise<any> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const registeredPrompts = (server as any)._registeredPrompts as Record<
        string,
        RegisteredPrompt
      >;

      const prompt = registeredPrompts[request.params.name];
      if (!prompt) {
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request.params.name} not found`);
      }
      if (!prompt.enabled) {
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request.params.name} disabled`);
      }

      if (prompt.argsSchema) {
        const argsObj = normalizeObjectSchema(prompt.argsSchema);

        // KEY FIX: normalize undefined → {} so Zod accepts optional-only schemas
        // when hosts omit the `arguments` field entirely.
        const rawArgs = request.params.arguments ?? {};

        const parseResult = await safeParseAsync(argsObj!, rawArgs);
        if (!parseResult.success) {
          const error = 'error' in parseResult ? parseResult.error : 'Unknown error';
          const errorMessage = getParseErrorMessage(error);
          throw new McpError(
            ErrorCode.InvalidParams,
            `Invalid arguments for prompt ${request.params.name}: ${errorMessage}`,
          );
        }

        return await Promise.resolve(prompt.callback(parseResult.data, extra));
      }

      return await Promise.resolve(prompt.callback(extra));
    },
  );
}
