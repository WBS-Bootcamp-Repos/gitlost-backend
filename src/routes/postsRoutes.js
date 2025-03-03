import express from 'express';
import * as postsController from '../controllers/postsController.js';

const router = express.Router();

// Group routes for base path '/'
router.route('/')
  .get(postsController.getAllPosts)
  .post(postsController.createPost);

// Group routes for '/:id' path
router.route('/:id')
  .get(postsController.getPostById)
  .put(postsController.updatePost)
  .delete(postsController.deletePost);

export default router;