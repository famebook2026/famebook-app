const express = require('express');
const { getProfile, followToggle } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', auth, getProfile);          // GET /api/users/:id
router.post('/:id/toggle-follow', auth, followToggle); // POST /api/users/:id/toggle-follow

module.exports = router;
