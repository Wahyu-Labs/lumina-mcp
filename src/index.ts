import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerMysqlController } from './database/mysql/index.js';
import { registerPostgresqlController } from './database/postgresql/index.js';

export const server = new McpServer({
  name: 'lumina-mcp',
  version: '1.0.3',
});

// Register feature controllers (tools + prompts)
registerMysqlController(server);
registerPostgresqlController(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Lumina MCP Database Server started running on Stdio transport');
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((err: unknown) => {
    console.error('Fatal error starting lumina-mcp-db:', err);
    process.exit(1);
  });
}
