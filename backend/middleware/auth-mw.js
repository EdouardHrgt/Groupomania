const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('No headers received');
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const permission = decodedToken.permission;
      const userId = decodedToken.userId;

      if (permission == 'admin' || permission == 'moderator') {
        next();
      } else if (req.body.userId && req.body.userId !== userId) {
        throw 'User Id Invalide';
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Req non authentifiée' });
    }
  }
};
