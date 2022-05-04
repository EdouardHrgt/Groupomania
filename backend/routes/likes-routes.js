const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes-ctrls');
const auth = require('../middleware/auth-mw');
const rateLimit = require('../middleware/rate-limit-mw.js')

router.get('/:postId/:userId', auth, rateLimit, likesCtrl.likePost);
router.get('/:postId', auth, likesCtrl.getPostLikes);

module.exports = router;