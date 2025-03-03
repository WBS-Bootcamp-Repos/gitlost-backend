import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';
import Post from './post.js';

// Determine if we're in development or production
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Parse connection string to extract individual components
 * This function handles URL-encoded characters in the connection string
 * @param {string} connString - The PostgreSQL connection string
 * @return {Object|null} - Object with connection parameters or null if parsing fails
 */
const getConnectionParams = (connString) => {
  try {
    // Regular expression to extract connection details from PostgreSQL URL
    const regex = /postgresql:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/;
    const matches = connString.match(regex);
    
    if (!matches || matches.length < 5) {
      throw new Error('Invalid connection string format');
    }
    
    return {
      username: decodeURIComponent(matches[1]),  // Decode URL-encoded username
      password: decodeURIComponent(matches[2]),  // Decode URL-encoded password
      host: matches[3],                          // Host doesn't need decoding
      database: decodeURIComponent(matches[4].split('?')[0]), // Remove query params and decode
      ssl: true                                  // Enable SSL for security
    };
  } catch (error) {
    console.error('Error parsing connection string:', error.message);
    return null;
  }
};

// Validate required environment variables
if (!dbConfig.url) {
  console.error('❌ Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Initialize Sequelize instance
let sequelize;
const params = getConnectionParams(dbConfig.url);

if (params) {
  console.log('✅ Connection parameters parsed successfully');
  
  // Create Sequelize instance with explicit parameters to avoid URL encoding issues
  sequelize = new Sequelize(params.database, params.username, params.password, {
    host: params.host,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: isProduction ? false : console.log  // Only log queries in development
  });
} else {
  // Log detailed error and exit
  console.error('❌ Failed to parse connection string. Please check your DATABASE_URL format.');
  console.error('Expected format: postgresql://username:password@host/database');
  process.exit(1);
}

/**
 * Initialize models and add them to the exported object
 * This allows importing all models from a single location
 */
const models = {
  Post: Post(sequelize)
};

/**
 * Set up model associations
 * This runs any associate method defined on the models
 * Useful for defining relationships (e.g., hasMany, belongsTo)
 */
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export Sequelize instance and models
export { sequelize };
export default models;