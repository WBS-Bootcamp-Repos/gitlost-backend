import pg from 'pg';
const { Pool } = pg;

// Using dotenv directly as this is a standalone script
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful:', result.rows[0]);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    // Close the pool
    await pool.end();
  }
};

testConnection();