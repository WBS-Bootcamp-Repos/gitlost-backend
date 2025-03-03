import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import postsRoutes from './routes/postsRoutes.js';

/**
 * Express application setup
 * Configures middleware, routes, and starts the server
 */

// Initialize express application
const app = express();
const PORT = process.env.PORT || 3001;

// Apply middleware
app.use(cors());                  // Enable CORS for all routes
app.use(express.json());          // Parse JSON request bodies

// Mount routes
app.use('/posts', postsRoutes);   // Posts resource routes

// Health check/welcome route
app.get('/', (req, res) => {
  res.send('Blog API is running');
});

/**
 * Start the server and sync database
 * Ensures database tables match models before starting the application
 */
const startServer = async () => {
  try {
    // Sync models with database
    // Note: { force: true } would drop and recreate tables (use with caution)
    await sequelize.sync();
    console.log('✅ Database synced successfully');
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the application
startServer();