import models from '../models/index.js';
const { Post } = models;

/**
 * Get all blog posts
 * Retrieves all posts from the database, ordered by date descending (newest first)
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['date', 'DESC']]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get a single post by ID
 * Retrieves a specific post from the database using its primary key
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    console.error('❌ Error fetching post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Create a new blog post
 * Validates required fields and saves a new post to the database
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, author, cover } = req.body;
    
    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!content) missingFields.push('content');
    if (!author) missingFields.push('author');
    if (!cover) missingFields.push('cover');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    const post = await Post.create({
      title,
      content, 
      author,
      cover
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('❌ Error creating post:', error.message);
    
    // Check for Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update an existing blog post
 * Validates required fields and updates post if it exists
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, cover } = req.body;
    
    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!content) missingFields.push('content');
    if (!author) missingFields.push('author');
    if (!cover) missingFields.push('cover');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Update post
    await post.update({
      title,
      content,
      author,
      cover
    });
    
    res.status(200).json(post);
  } catch (error) {
    console.error('❌ Error updating post:', error.message);
    
    // Check for Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete a blog post
 * Removes a post from the database if it exists
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Save post data before deletion to return in response
    const deletedPost = { ...post.toJSON() };
    await post.destroy();
    
    res.status(200).json({ 
      message: 'Post deleted successfully', 
      deletedPost 
    });
  } catch (error) {
    console.error('❌ Error deleting post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};