import express from 'express';
import * as postsController from '../controllers/postsController.js';

const router = express.Router();

// Get all posts
router.get('/', postsController.getAllPosts);

// Get a single post by ID
router.get('/:id', postsController.getPostById);

// Create a new post
router.post('/', postsController.createPost);

// Update a post
router.put('/:id', postsController.updatePost);

// Delete a post
router.delete('/:id', postsController.deletePost);

export default router;