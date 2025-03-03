# Blog API Backend

A RESTful API backend for a blog application built with Express.js, Sequelize ORM, and PostgreSQL.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
  - [Testing Database Connection](#testing-database-connection)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Testing Endpoints](#testing-endpoints)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- PostgreSQL database (we're using Neon PostgreSQL)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-api-backend.git
   cd blog-api-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

Create a `.env` file in the root directory of your project. This file is used to store environment variables that should not be committed to version control.

1. Create a new file named exactly `.env` (with the leading dot) in the project root
2. Add the following configuration:

```
# Server configuration
PORT=3001

# Database configuration (Neon PostgreSQL)
DATABASE_URL='postgresql://username:password@host/database?sslmode=require'
```

Replace the `DATABASE_URL` with your actual Neon PostgreSQL connection string. For example:

```
DATABASE_URL='postgresql://john_doe:my_secure_password@ep-cool-forest-123456.us-east-2.aws.neon.tech/blog_db?sslmode=require'
```

**Important notes about the .env file:**
- Make sure there are no spaces around the equal signs
- The .env file must be in the project root, not in the src folder

## Database Configuration

This project uses Sequelize ORM to interact with a PostgreSQL database. The database connection is configured in `src/models/index.js`.

### Testing Database Connection

Before starting the server, you can verify your database connection:

```bash
node -r dotenv/config test-db.js
```

If successful, you'll see:
```
✅ Database connection successful: { now: "2025-03-03T12:34:56.789Z" }
```

## Running the Server

### Development Mode

```bash
npm run dev
```

This starts the server with auto-reload enabled using Node.js built-in watch mode.

### Production Mode

```bash
npm start
```

The server will run on the port specified in your `.env` file (default: 3001).

## API Endpoints

The API provides the following endpoints:

### Posts

| Method | Endpoint      | Description                   | Request Body                                 |
|--------|---------------|-------------------------------|----------------------------------------------|
| GET    | /posts        | Retrieve all posts            | N/A                                          |
| GET    | /posts/:id    | Retrieve a specific post      | N/A                                          |
| POST   | /posts        | Create a new post             | `{title, content, author, cover}`            |
| PUT    | /posts/:id    | Update an existing post       | `{title, content, author, cover}`            |
| DELETE | /posts/:id    | Delete a post                 | N/A                                          |

### Testing Endpoints

You can test the API endpoints using cURL commands:

#### Get All Posts
```bash
curl http://localhost:3001/posts
```

#### Get Single Post
```bash
curl http://localhost:3001/posts/1
```

#### Create New Post
```bash
curl -X POST http://localhost:3001/posts -H "Content-Type: application/json" -d '{"title":"Test Post","content":"This is a test post","author":"Test Author","cover":"https://example.com/image.jpg"}'
```

#### Update Post
```bash
curl -X PUT http://localhost:3001/posts/1 -H "Content-Type: application/json" -d '{"title":"Updated Post","content":"This is an updated post","author":"Test Author","cover":"https://example.com/image.jpg"}'
```

#### Delete Post
```bash
curl -X DELETE http://localhost:3001/posts/1
```

## Project Structure

```
blog-api-backend/
├── node_modules/
├── src/
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── controllers/
│   │   └── postsController.js  # Post route handlers
│   ├── models/
│   │   ├── index.js        # Sequelize initialization
│   │   └── post.js         # Post model definition
│   ├── routes/
│   │   └── postsRoutes.js  # API route definitions
│   └── server.js           # Express app setup
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lock file
├── README.md               # Project documentation
└── test-db.js              # Database connection tester
```

## Troubleshooting

### Connection Issues

If you encounter database connection issues:

1. Check that your `.env` file contains the correct `DATABASE_URL`
2. Ensure your database credentials are valid
3. Verify that your IP is allowed to connect to the database (check firewall settings)
4. For Neon PostgreSQL issues, check that SSL settings are properly configured

### URL Encoding Issues

If you see errors about "database does not exist" and your database name contains spaces or special characters:

1. Make sure the database name in your URL is properly URL-encoded
2. The application automatically decodes the URL-encoded parts of the connection string

### Sequelize Sync Issues

If tables aren't being created:

1. Check the database user has permissions to create tables
2. Try running `sequelize.sync({ force: true })` in development (caution: this drops existing tables)

