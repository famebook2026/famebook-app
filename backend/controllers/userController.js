const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('followers following', 'username');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const followToggle = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ error: 'User not found' });

    const me = req.user;
    const alreadyFollowing = target.followers.map(id => id.toString()).includes(me._id.toString());
    if (alreadyFollowing) {
      target.followers = target.followers.filter(id => id.toString() !== me._id.toString());
      me.following = me.following.filter(id => id.toString() !== target._id.toString());
    } else {
      target.followers.push(me._id);
      me.following.push(target._id);
    }
    await target.save();
    await me.save();
    res.json({ following: !alreadyFollowing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProfile, followToggle };
