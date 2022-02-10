const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrls');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.logIn);
router.put('/update/:id', userCtrl.updateUser);
router.delete('/delete/', userCtrl.deleteUser);

module.exports = router;
