'use server';

import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Determine if we're in development environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Create a connection pool
const pool = new Pool({
  // Use local database for development, otherwise use the configured DATABASE_URL
  connectionString: isDevelopment
    ? 'postgresql://postgres:postgres@localhost:5432'
    : process.env.DATABASE_URL,
});

// Function to initialize the database with schema
export async function initializeDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'src/app/(persistent)/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await pool.query(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
  }
}

// Execute a query with parameters
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now();
    const res = pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.then(r => r.rowCount) });
    return res;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Export the pool for direct use if needed
export async function getPool() {
  return {pool};
}
