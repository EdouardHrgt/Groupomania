const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../config/db-config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
        .json({ message: user.username + ', Created as member...' });
    });
  });
};

exports.logIn = (req, res, next) => {
  if (req.body.username && req.body.password) {
    db.query(
      `SELECT * FROM user WHERE username= ?`,
      req.body.username,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.length > 0) {
          bcrypt
            .compare(req.body.password, result[0].password)
            .then((valid) => {
              if (!valid) {
                return res
                  .status(401)
                  .json({ error: 'password do not match...' });
              }
              return res.status(200).json({
                userId: result[0].id,
                username: result[0].username,
                token: jwt.sign({ userId: result[0].id }, process.env.TOKEN, {
                  expiresIn: '24h',
                }),
              });
            });
        }
        if (result.length <= 0) {
          return res.status(404).json({ message: 'User not find...' });
        }
      }
    );
  } else {
    return res.status(500).json({ message: 'missing element...' });
  }
};

exports.updateUser = (req, res, next) => {
  if (req.body.email && req.body.username && req.body.password) {
    const id = req.params.id;
    const email = req.body.email;
    const username = req.body.username;
    let password = req.body.password;

    bcrypt.hash(password, 10).then((hash) => {
      password = hash;
      db.query(
        `UPDATE user SET email='${email}', username='${username}', password='${password}' WHERE id=${id}`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(' Error updateUser: ' + err);
          }
          return res.status(200).json({ message: 'User updated...' });
        }
      );
    });
  } else {
    return res.status(400).json({ message: 'Missing element...' });
  }
};

exports.deleteUser = (req, res, next) => {
  db.query(
    `DELETE * FROM user WHERE id= ?`,
    req.params.id,
    (err, result, field) => {
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
