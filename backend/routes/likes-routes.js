const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes-ctrls');
const auth = require('../middleware/auth-mw');

router.post('/like/:postId', auth, likesCtrl.likes);

module.exports = router;
