const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrls');
const auth = require('../middleware/auth-mw');
const password = require('../middleware/password-mw');
const multer = require('../middleware/multer-mw');

// router.post('/signup', password, userCtrl.signUp);
router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.logIn);
router.put('/update/:id', multer, userCtrl.updateUser);
router.delete('/delete', userCtrl.deleteUser);

module.exports = router;
