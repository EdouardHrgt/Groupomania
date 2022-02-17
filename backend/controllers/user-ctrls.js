const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../config/db-config');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
//validator.validate("test@email.com"); // true

require('dotenv').config({ path: './.env' });

exports.signUp = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  if (emailValidator.validate(email)) {
    let password = req.body.password;
    bcrypt.hash(password, 10).then((hash) => {
      password = hash;
      db.query(
        `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${password}')`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          }
          return res.status(201).json({ message: ' User created...' });
        }
      );
    });
  } else {
    return res.status(400).json({ message: 'Please use a valid Email...' });
  }
};

exports.logIn = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;

  db.query(
    `SELECT * FROM user WHERE username= ?`,
    username,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password).then((valid) => {
          if (!valid) {
            return res.status(404).json({ error: 'password do not match...' });
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
};

exports.updateUser = (req, res, next) => {
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
          return res.status(400).json(err);
        }

        if (result.affectedRows == 0) {
          return res.status(404).json({ message: 'User not found...' });
        }

        return res.status(201).json({ message: 'User updated...' });
      }
    );
  });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  db.query(`DELETE FROM user WHERE id= ?`, userId, (err, result, fields) => {
    if (err) {
      console.log('Error deleteUSer' + err);
      return res.status(400).json(err);
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: 'User not found...' });
    }

    return res.status(201).json({ message: 'User Deleted...' });
  });
};
