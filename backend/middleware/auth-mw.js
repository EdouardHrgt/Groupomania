const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const permission = decodedToken.permission;
    const userId = decodedToken.userId;
    const uuid = decodedToken.uuid;

    if (permission == 'admin' || permission == 'moderator') {
      console.log('Moderator / admin authentified ...');
      next();
      // Modifier avec UUID et plus id
    } else if (req.body.userId && req.body.userId !== userId) {
      throw 'User Id Invalide';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Req non authentifiée' });
  }
};
