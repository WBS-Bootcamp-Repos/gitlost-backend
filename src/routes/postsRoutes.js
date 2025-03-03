import express from 'express';
import * as postsController from '../controllers/postsController.js';

/**
 * Express router for blog posts
 * Defines all routes for the posts resource
 */
const router = express.Router();

/**
 * Routes for '/posts'
 * GET: Retrieve all posts
 * POST: Create a new post
 */
router.route('/')
  .get(postsController.getAllPosts)
  .post(postsController.createPost);

/**
 * Routes for '/posts/:id'
 * GET: Retrieve a specific post
 * PUT: Update an existing post
 * DELETE: Remove a post
 */
router.route('/:id')
  .get(postsController.getPostById)
  .put(postsController.updatePost)
  .delete(postsController.deletePost);

export default router;