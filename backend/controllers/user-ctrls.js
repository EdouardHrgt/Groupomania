const bcrypt = require('bcrypt');
const db = require('../config/db-config');
require('dotenv').config({ path: './.env' });

exports.signUp = (req, res, next) => {
  const user = req.body
   bcrypt.hash(user.password, 10) 
  .then((hash) => {
      user.password = hash
      db.query(`INSERT INTO user SET ?`, user, (err, result, fields) => {
          if (err) {
              console.log(err)
              return res.status(400).json('Error signup: ' + err)
          }
          return res.status(201).json({ message : user.username + ' Created as member...' })
      });
  });
}; 

exports.logIn = (req, res, next) => {
  res.status(201).json({ message: `Tentative de login` });
  // si username + MDP == BDD --> on envoie le token
  // `SELECT * FROM user WHERE username = ? AND email = ?`, req.body.username,req.body.email ............
};

exports.updateUser = (req, res, next) => {
  res.status(201).json({ message: `Update de l'utilisateur` });
  // `UPDATE user SET email='req.body.email', username= 'req.body.username'`
};

exports.deleteUser = (req, res, next) => {
  db.query('DELETE FROM user WHERE id= ? AND username=?', req.body.userId, req.body.username, (err,result,field) => {
      if (err) {
        console.log('Error deleteUSer' + err);
        return res.status(400).json(err);
      }
      console.log('Account deleted...')
      return res.status(201).json({ message : req.body.username + ' Deleted...' });
    }
  )
}