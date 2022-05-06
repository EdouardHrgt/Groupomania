const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-ctrls');
const auth = require('../middleware/auth-mw');

router.get('/', auth, commentCtrl.getAllComments);
router.get('/filter/:postId', auth, commentCtrl.getFilteredComments);
router.get('/:postId/:userId', auth, commentCtrl.getOneComment);
router.get('/limited/:postId/:offset', auth, commentCtrl.getLimitedComments);
router.post('/', auth, commentCtrl.createComment);

module.exports = router;
