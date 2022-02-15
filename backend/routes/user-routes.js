const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrls');
const auth = require('../middleware/auth-mw');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.logIn);
router.put('/update/:id', auth, userCtrl.updateUser);
router.delete('/delete', userCtrl.deleteUser);

module.exports = router;
