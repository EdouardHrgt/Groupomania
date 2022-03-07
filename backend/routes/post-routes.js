const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-ctrls');
const auth = require('../middleware/auth-mw');
const multer = require('../middleware/multer-mw');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/update/:id', auth, multer, postCtrl.updatePost);
router.delete('/delete', auth, postCtrl.deletePost);

module.exports = router;
