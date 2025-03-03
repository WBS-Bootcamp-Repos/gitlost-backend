import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg'; 

dotenv.config(); // envi variables from .env file

const app = express();
const PORT = process.env.PORT || 4000;

// Destructure Pool from the imported pg module
const { Pool } = pkg;

// PGSQL connection pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure DB_URL is in .env file
});

// Helper function for executing queries
const queryDB = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};

// Middleware to parse JSON bodies
app.use(express.json());

// route to check if the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Blog Server is Running!' });
});

// GET /posts - Retrieve all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await queryDB('SELECT * FROM posts');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// GET /posts/:id - Retrieve a single post by ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await queryDB('SELECT * FROM posts WHERE id = $1', [id]);
    if (post.length > 0) {
      res.json(post[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

// POST /posts - Create a new post
app.post('/posts', async (req, res) => {
  const { author, title, content, cover } = req.body;
  try {
    const newPost = await queryDB(
      'INSERT INTO posts (author, title, content, cover) VALUES ($1, $2, $3, $4) RETURNING *',
      [author, title, content, cover]
    );
    res.status(201).json(newPost[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT /posts/:id - Update an existing post by ID
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { author, title, content, cover } = req.body;
  try {
    const updatedPost = await queryDB(
      'UPDATE posts SET author = $1, title = $2, content = $3, cover = $4 WHERE id = $5 RETURNING *',
      [author, title, content, cover, id]
    );
    if (updatedPost.length > 0) {
      res.json(updatedPost[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /posts/:id - Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await queryDB('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (deletedPost.length > 0) {
      res.json(deletedPost[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
