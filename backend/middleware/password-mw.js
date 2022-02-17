const pwdSchema = require('../models/password-model');

module.exports = (req, res, next) => {
  if (pwdSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      message: 'Password too weak ! add numbers, caps and special characters',
    });
  }
};
