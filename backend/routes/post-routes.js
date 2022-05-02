const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-ctrls');
const auth = require('../middleware/auth-mw');
const multer = require('../middleware/multer-mw');
const rateLimit = require('../middleware/rate-limit-mw');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getUserPosts);
router.get('/filteredPost/:postId', auth, postCtrl.getOnePost);
router.post('/:id', auth, multer, postCtrl.createPost);
router.get('/like/:postId/:userId', auth, rateLimit, postCtrl.likePost);
router.get('/like/:postId', auth, postCtrl.getPostLikes);
router.put('/update/:id', auth, multer, postCtrl.updatePost);
router.delete('/delete/:postId/:userId', auth, postCtrl.deletePost);

module.exports = router;
