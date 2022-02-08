const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-ctrls');

router.get('/', commentCtrl.getAllcomments);
router.get('/:id', commentCtrl.getOnecomment);
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;
