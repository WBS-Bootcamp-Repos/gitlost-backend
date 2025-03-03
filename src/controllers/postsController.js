import * as db from '../db/index.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM posts ORDER BY date DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error fetching post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, author, cover } = req.body;
    
    // Validate required fields
    if (!title || !content || !author || !cover) {
      return res.status(400).json({ error: 'All fields are required (title, content, author, cover)' });
    }
    
    const result = await db.query(
      'INSERT INTO posts (title, content, author, cover) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, author, cover]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error creating post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, cover } = req.body;
    
    // Validate required fields
    if (!title || !content || !author || !cover) {
      return res.status(400).json({ error: 'All fields are required (title, content, author, cover)' });
    }
    
    const result = await db.query(
      'UPDATE posts SET title = $1, content = $2, author = $3, cover = $4 WHERE id = $5 RETURNING *',
      [title, content, author, cover, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error updating post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json({ message: 'Post deleted successfully', deletedPost: result.rows[0] });
  } catch (error) {
    console.error('❌ Error deleting post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};