const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-ctrls');

router.get('/', commentCtrl.getAllComments);
router.get('/filter/:postId', commentCtrl.getPostComments);
router.get('/:id', commentCtrl.getOneComment);
router.post('/', commentCtrl.createComment);
router.put('/update/:id', commentCtrl.updateComment);
router.delete('/delete', commentCtrl.deleteComment);

module.exports = router;
