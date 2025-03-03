import pg from 'pg';
const { Pool } = pg;

// Using dotenv directly as this is a standalone script
import 'dotenv/config';

// Validate that DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Initialize a connection pool using the database URL from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Test the database connection by executing a simple query
 * This function attempts to connect to the database and run a timestamp query
 */
const testConnection = async () => {
  try {
    // Execute a simple query to verify connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful:', result.rows[0]);
  } catch (error) {
    // Log detailed error if connection fails
    console.error('❌ Database connection failed:', error.message);
  } finally {
    // Always close the connection pool to prevent hanging connections
    await pool.end();
  }
};

// Execute the test function
testConnection();