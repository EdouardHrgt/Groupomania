const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrls');
const auth = require('../middleware/auth-mw');
const password = require('../middleware/password-mw');
const multer = require('../middleware/multer-mw');

router.get('/', auth, userCtrl.getAllUsers);
router.post('/signup', password, userCtrl.signUp);
router.post('/login', userCtrl.logIn);
router.put('/update/:id', auth, multer, userCtrl.updateUser);
router.put('/rank', auth, userCtrl.rankUser);
router.delete('/delete/:id', auth, userCtrl.deleteUser);

module.exports = router;
