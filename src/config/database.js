// Import dotenv to load environment variables
import 'dotenv/config';

/**
 * Sequelize configuration for database connection
 * Simplified to use a single configuration object
 * SSL options ensure secure connection to Neon PostgreSQL
 */
const dbConfig = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,         // Requires SSL connection
      rejectUnauthorized: false  // Accepts self-signed certificates
    }
  }
};

export default dbConfig;