import { describe, it, expect, vi, beforeEach } from 'vitest';

interface ServerWithHandlers {
  _requestHandlers: Map<
    string,
    (request: { method: string; params?: unknown }) => Promise<{
      tools?: unknown[];
      content?: Array<{ type: string; text: string }>;
      isError?: boolean;
    }>
  >;
}

// Setup mocks BEFORE importing the server to ensure modules are mocked
const { mockExecuteMySQLQuery, mockExecutePostgresQuery } = vi.hoisted(() => ({
  mockExecuteMySQLQuery: vi.fn(),
  mockExecutePostgresQuery: vi.fn(),
}));

vi.mock('../src/db/mysql.js', () => ({
  executeMySQLQuery: mockExecuteMySQLQuery,
}));

vi.mock('../src/db/postgres.js', () => ({
  executePostgresQuery: mockExecutePostgresQuery,
}));

// Set NODE_ENV to test to prevent main() auto-run, then import server
process.env.NODE_ENV = 'test';
import { server } from '../src/index.js';

describe('Lumina MCP Database Tools Server', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should list available tools', async () => {
    // Retrieve registered list tools request handler
    const listHandler = (server as unknown as ServerWithHandlers)._requestHandlers.get(
      'tools/list',
    );
    expect(listHandler).toBeDefined();

    const response = await listHandler!({ method: 'tools/list' });
    expect(response).toEqual({
      tools: [
        {
          name: 'execute_mysql_query',
          description:
            'Execute an SQL query against the MySQL database. Safe parameters binding is supported.',
          inputSchema: expect.any(Object),
        },
        {
          name: 'execute_postgres_query',
          description:
            'Execute an SQL query against the PostgreSQL database. Safe parameters binding is supported.',
          inputSchema: expect.any(Object),
        },
      ],
    });
  });

  it('should call execute_mysql_query with correct parameters', async () => {
    mockExecuteMySQLQuery.mockResolvedValueOnce([{ id: 1, name: 'Alice' }]);

    const callHandler = (server as unknown as ServerWithHandlers)._requestHandlers.get(
      'tools/call',
    );
    expect(callHandler).toBeDefined();

    const response = await callHandler!({
      method: 'tools/call',
      params: {
        name: 'execute_mysql_query',
        arguments: {
          query: 'SELECT * FROM users WHERE id = ?',
          parameters: ['1'],
        },
      },
    });

    expect(mockExecuteMySQLQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', ['1']);
    expect(response).toEqual({
      content: [
        {
          type: 'text',
          text: JSON.stringify([{ id: 1, name: 'Alice' }], null, 2),
        },
      ],
    });
  });

  it('should call execute_postgres_query with correct parameters', async () => {
    mockExecutePostgresQuery.mockResolvedValueOnce([{ id: 2, name: 'Bob' }]);

    const callHandler = (server as unknown as ServerWithHandlers)._requestHandlers.get(
      'tools/call',
    );
    expect(callHandler).toBeDefined();

    const response = await callHandler!({
      method: 'tools/call',
      params: {
        name: 'execute_postgres_query',
        arguments: {
          query: 'SELECT * FROM users WHERE id = $1',
          parameters: ['2'],
        },
      },
    });

    expect(mockExecutePostgresQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', [
      '2',
    ]);
    expect(response).toEqual({
      content: [
        {
          type: 'text',
          text: JSON.stringify([{ id: 2, name: 'Bob' }], null, 2),
        },
      ],
    });
  });

  it('should return error for invalid parameters', async () => {
    const callHandler = (server as unknown as ServerWithHandlers)._requestHandlers.get(
      'tools/call',
    );

    const response = await callHandler!({
      method: 'tools/call',
      params: {
        name: 'execute_mysql_query',
        arguments: {
          // Missing query parameter
          parameters: ['1'],
        },
      },
    });

    expect(response.isError).toBe(true);
    expect(response.content![0].text).toContain('Invalid arguments:');
  });
});
