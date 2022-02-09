const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../config/db-config');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

exports.signUp = (req, res, next) => {
  const user = req.body;
  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;
    db.query(`INSERT INTO user SET ?`, user, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json('Error signup: ' + err);
      }
      return res
        .status(201)
        .json({ message: user.username + ' Created as member...' });
    });
  });
};

exports.logIn = (req, res, next) => {
  if (req.body.username && req.body.password) {
    db.query(`SELECT * FROM user WHERE username= ?`, req.body.username, (err, result, fields) => {

        if (err) {
          console.log(err);
          return res.status(400).json('Error logIn: ' + err);
        }

        if (result.length > 0) {
          bcrypt.compare(req.body.password, result[0].password)
            .then((valid) => {
              if (!valid) {
                return res.status(401).json({ error: 'password do not match...' });}
              res.status(200).json({
                userId: result[0].id,
                username: result[0].username,
                token: jwt.sign({ userId: result[0].id }, process.env.TOKEN, {expiresIn: '24h', })
              });
            });
        }
      }
    );
  } else {
    return res.status(500).json({ message: 'user not find...' });
  }
};

exports.updateUser = (req, res, next) => {
  db.query(`SELECT * FROM user WHERE id= ?`, req.params.id, (err, result, fields) =>{
    if (err) {
      console.log(err);
      return res.status(400).json('Error updateUser: ' + err);
    }
    console.log(result);
    return res.status(206).json({ message: 'ça marche' });
  })
  /*
  db.query(`UPDATE user SET email= ?, username= ?, password= ? WHERE id= ?`,
  req.body.email, req.body.username, req.body.password, req.params.id, (err, result, fields) =>{
    if (err) {
      console.log(err);
      return res.status(400).json('Error updateUser: ' + err);
    }
    return res.status(200).json({ message: 'user updated...'});
  })
  */
};

exports.deleteUser = (req, res, next) => {
  db.query(`DELETE * FROM user WHERE id= ?`, req.params.id, (err, result, field) => {

      if (err) {
        console.log('Error deleteUSer' + err);
        return res.status(400).json(err);
      }

      console.log('Account deleted...');
      return res
        .status(201)
        .json({ message: req.body.username + ' Deleted...' });
    }
  );
};
