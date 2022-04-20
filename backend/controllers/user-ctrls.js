const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../config/db-config');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: './.env' });

exports.getAllUsers = (req, res, next) => {
  db.query(`SELECT * FROM user`, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.signUp = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  // UUID generation
  const rng = uuidv4();
  const uuid = JSON.stringify(rng);
  if (emailValidator.validate(email)) {
    let password = req.body.password;
    bcrypt.hash(password, 10).then((hash) => {
      password = hash;
      db.query(
        `INSERT INTO user (username, email, password, id) VALUES ('${username}', '${email}', '${password}', ${uuid})`,
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
            token: jwt.sign(
              { userId: result[0].id, permission: result[0].permission },
              process.env.TOKEN,
              {
                expiresIn: '24h',
              }
            ),
          });
        });
      } else if (result.length <= 0) {
        return res.status(404).json({ message: 'User not find...' });
      }
    }
  );
};

exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    if (req.file) {
      //Delete Old picture
      db.query(`SELECT * FROM user WHERE id=?`, id, (err, result, fields) => {
        if (err) {
          return res.status(400).json(err);
        } else if (
          result[0].image != 'http://localhost:3000/images/default_user.jpg'
        ) {
          const filename = result[0].image.split('/images/')[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Old Profile picture deleted...');
            }
          });
        } else {
          console.log('No custom picture in this user...');
        }
      });
      //Save New picture
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
      db.query(
        `UPDATE user SET username='${username}', password='${password}', image='${imageUrl}' WHERE id='${id}`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else if (result.affectedRows == 0) {
            return res.status(404).json({ message: 'User not found...' });
          } else {
            console.log('User updated with an image...');
          }
        }
      );
      //Save changes without Picture
    } else if (!req.file) {
      db.query(
        `UPDATE user SET username='${username}', password='${password}' WHERE id='${id}'`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else if (result.affectedRows == 0) {
            return res.status(404).json({ message: 'User not found...' });
          } else {
            console.log('User updated with no Img...');
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
          return res.status(201).json({
            userId: result[0].id,
            username: result[0].username,
            permission: result[0].permission,
            image: result[0].image,
          });
        }
      }
    );
  });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  const defaultPicture = 'http://localhost:3000/images/default_user.jpg';
  db.query(`SELECT * FROM user WHERE id= ?`, userId, (err, result, fields) => {
    if (err) {
      return res.status(400).json(err);
    } else if (userId != result[0].id) {
      console.log('userId is not matching...');
      return res.status(404).json({ message: 'Lack of permission...' });
    } else if (result[0].image == defaultPicture) {
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
    } else if (result.affectedRows == 0) {
      return res.status(404).json({ message: 'User not found...' });
    } else {
      return res.status(201).json({ message: 'User Deleted...' });
    }
  });
};

exports.rankUser = (req, res, next) => {
  console.log(req.body);
  return res.status(201).json({ message: 'ça marche' });
  /*
  db.query(
    `UPDATE user SET permission='${}' WHERE id='${userId}'`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        console.log(result);
        return res.status(201).json({ message: 'user promoted...' });
      }
    }
  );*/
};
