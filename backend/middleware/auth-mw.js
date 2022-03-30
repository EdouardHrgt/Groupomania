const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User Id Invalide';
    } else {
      next();
    }
  } catch (error) {
    console.log(' !! Not AUTH !!');
    // console.log(req.headers.authorization);
    res.status(401).json({ message: 'Req non authentifiée' });
  }
};
