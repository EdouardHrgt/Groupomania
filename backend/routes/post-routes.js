const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-ctrls');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.createPost);
router.put('/update/:id', postCtrl.updatePost);
router.delete('/delete', postCtrl.deletePost);

module.exports = router;
