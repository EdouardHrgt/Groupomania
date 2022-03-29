const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-ctrls');
const auth = require('../middleware/auth-mw');

router.get('/', auth, commentCtrl.getAllComments);
router.get('/filter/:postId', auth, commentCtrl.getFilteredComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.post('/', auth, commentCtrl.createComment);
router.put('/update/:id', auth, commentCtrl.updateComment);
router.delete('/delete', auth, commentCtrl.deleteComment);

module.exports = router;
