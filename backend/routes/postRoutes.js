const express = require('express');
const { createPost, getFeed, likePost, addComment } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getFeed);          // GET /api/posts
router.post('/', auth, createPost);      // POST /api/posts
router.post('/:id/like', auth, likePost); // POST /api/posts/:id/like
router.post('/:id/comment', auth, addComment); // POST /api/posts/:id/comment

module.exports = router;
