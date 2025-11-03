const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { text, mediaUrl, tags = [] } = req.body;
    const post = new Post({ user: req.user._id, text, mediaUrl, tags });
    await post.save();
    await post.populate('user', 'username avatarUrl');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeed = async (req, res) => {
  try {
    // Simplest feed: recent posts, could be improved with follow filter
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('user', 'username avatarUrl')
      .populate('comments.user', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const idx = post.likes.indexOf(req.user._id);
    if (idx === -1) post.likes.push(req.user._id);
    else post.likes.splice(idx, 1);
    await post.save();
    res.json({ likesCount: post.likes.length, liked: post.likes.includes(req.user._id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();
    await post.populate('comments.user', 'username');
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPost, getFeed, likePost, addComment };
