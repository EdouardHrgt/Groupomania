const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // dev branch
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const permission = decodedToken.permission;
    const userId = decodedToken.userId;
    if (permission == 'admin') {
      console.log('Admin authentified...11');
    } else if (permission == 'moderator') {
      console.log('Moderator identified...');
    }
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User Id Invalide';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Req non authentifiée' });
  }
};

/*
Syteme de permission :
Mettre la permission de la DB dans le token
Décoder la permission du token dans le midlleware
dire que si permission = admin ou modo on va dans next
*/
