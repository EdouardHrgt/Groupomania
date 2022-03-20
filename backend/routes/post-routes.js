const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-ctrls');
const auth = require('../middleware/auth-mw');
const multer = require('../middleware/multer-mw');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/:id', multer, postCtrl.createPost);
router.put('/update/:id', multer, postCtrl.updatePost);
router.delete('/delete/:id', postCtrl.deletePost);

module.exports = router;
