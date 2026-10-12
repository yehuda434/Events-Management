import { Pool, QueryResult, QueryResultRow } from 'pg';
import { config } from '../config';

// Create a PostgreSQL connection pool configured for Neon
export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false, // Required for Neon cloud database connections
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Helper for executing queries
export const query = async <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV !== 'production') {
    console.log('Executed query', { text, duration, rows: res.rowCount });
  }
  return res;
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Successfully connected to Neon PostgreSQL at:', res.rows[0].now);
    return true;
  } catch (err: any) {
    console.error('❌ Failed to connect to Neon PostgreSQL:', err.message);
    return false;
  }
};
