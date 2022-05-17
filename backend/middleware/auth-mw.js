const jwt = require('jsonwebtoken');
const models = require('../models/user-models');
const db = require('../config/db-config');

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    
    const permission = decodedToken.permission;
    const userId = decodedToken.userId;

    if (permission != 'admin' || permission != 'moderator') {

      db.query(models.selectOneUser, userId, (err, result, fields) => {
        if (err) {
          return res.status(400).json(err);

        } else if (result[0].id != userId) {
          return res.status(403).json({ message: 'Forbidden request' });

        } else {
          next();
        }
      });
    }
  } catch (error) {
    res.status(401).json({ message: 'Request not authentified' });
  }
};
