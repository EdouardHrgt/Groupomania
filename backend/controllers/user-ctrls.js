const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../config/db-config');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const fs = require('fs');

require('dotenv').config({ path: './.env' });

exports.signUp = (req, res, next) => {
  console.log(req.body);
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
          return res
            .status(201)
            .json({ message: `Welcome to Groupomania ${username} !` });
        }
      );
    });
  } else {
    return res.status(400).json({ message: 'Please use a valid Email...' });
  }
};

exports.logIn = (req, res, next) => {
  const username = req.body.username;
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
            return res
              .status(404)
              .json({ message: 'password do not match...' });
          }

          return res.status(200).json({
            userId: result[0].id,
            username: result[0].username,
            permission: result[0].permission,
            image: result[0].image,
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
  console.log(req.body);
  console.log(req.file);
  const id = req.params.id;
  const username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
      db.query(
        `UPDATE user SET username='${username}', password='${password}', image='${imageUrl}' WHERE id=${id}`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else if (result.affectedRows == 0) {
            return res.status(404).json({ message: 'User not found...' });
          } else {
            console.log('User updated with an image...');
            /*return res
              .status(201)
              .json({ message: 'User updated with an image...' });*/
          }
        }
      );
    } else if (!req.file) {
      db.query(
        `UPDATE user SET username='${username}', password='${password}' WHERE id=${id}`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else if (result.affectedRows == 0) {
            return res.status(404).json({ message: 'User not found...' });
          } else {
            // return res.status(201).json({ message: 'User updated...' });
            console.log('User updated...');
          }
        }
      );
    }
    db.query(
      `SELECT * FROM user WHERE username= ?`,
      username,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          console.log('...............OOOOOOKKKK....................');
          return res
            .status(201)
            .json({ username: result[0].username, image: result[0].image });
        }
      }
    );
  });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  const defaultPicture = 'http://localhost:3000/images/default_user.png';

  db.query(`SELECT * FROM user WHERE id= ?`, userId, (err, result, fields) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (result.length <= 0) {
      return res.status(404).json({ message: 'No image on user...' });
    }

    if (result[0].image == defaultPicture) {
      console.log('No custom picture for this user...');
    } else {
      const filename = result[0].image.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('image deleted...');
        }
      });
    }
  });

  db.query(`DELETE FROM user WHERE id= ?`, userId, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: 'User not found...' });
    }
    return res.status(201).json({ message: 'User Deleted...' });
  });
};
