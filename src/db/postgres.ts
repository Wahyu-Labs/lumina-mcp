import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
let pool: pg.Pool | null = null;

export function getPostgresPool(): pg.Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432', 10),
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE || 'lumina_db',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  return pool;
}

export async function executePostgresQuery<T>(query: string, params?: unknown[]): Promise<T[]> {
  const connectionPool = getPostgresPool();
  const result = await connectionPool.query(query, params);
  return result.rows as T[];
}
