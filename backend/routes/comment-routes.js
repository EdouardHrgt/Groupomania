const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-ctrls');
const auth = require('../middleware/auth-mw');

router.get('/limited/:postId/:offset', auth, commentCtrl.getLimitedComments);
router.post('/', auth, commentCtrl.createComment);

module.exports = router;
