import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { executeMySQLQuery } from './db/mysql.js';
import { executePostgresQuery } from './db/postgres.js';

// Define schemas for database execution tools
const QueryArgumentsSchema = z.object({
  query: z
    .string()
    .describe('The SQL query to run. Use placeholder parameters to prevent SQL injection.'),
  parameters: z
    .array(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional()
    .describe('Parameters to bind to the query placeholders.'),
});

// Setup the MCP server
export const server = new Server(
  {
    name: 'lumina-mcp-db',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Register list tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'execute_mysql_query',
        description:
          'Execute an SQL query against the MySQL database. Safe parameters binding is supported.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The SQL query to execute (e.g. SELECT * FROM users WHERE id = ?)',
            },
            parameters: {
              type: 'array',
              description: 'Optional query parameters for placeholders',
              items: {
                type: 'string',
              },
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'execute_postgres_query',
        description:
          'Execute an SQL query against the PostgreSQL database. Safe parameters binding is supported.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The SQL query to execute (e.g. SELECT * FROM users WHERE id = $1)',
            },
            parameters: {
              type: 'array',
              description: 'Optional query parameters for placeholders',
              items: {
                type: 'string',
              },
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

// Register call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'execute_mysql_query') {
      // Validate arguments with Zod
      const parsed = QueryArgumentsSchema.safeParse(args);
      if (!parsed.success) {
        throw new McpError(ErrorCode.InvalidParams, `Invalid arguments: ${parsed.error.message}`);
      }

      const { query, parameters = [] } = parsed.data;
      const rows = await executeMySQLQuery(query, parameters);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(rows, null, 2),
          },
        ],
      };
    }

    if (name === 'execute_postgres_query') {
      // Validate arguments with Zod
      const parsed = QueryArgumentsSchema.safeParse(args);
      if (!parsed.success) {
        throw new McpError(ErrorCode.InvalidParams, `Invalid arguments: ${parsed.error.message}`);
      }

      const { query, parameters = [] } = parsed.data;
      const rows = await executePostgresQuery(query, parameters);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(rows, null, 2),
          },
        ],
      };
    }

    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Database Error: ${errorMessage}`,
        },
      ],
    };
  }
});

// Start the server using Stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Lumina MCP Database Server started running on Stdio transport');
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  });
}
