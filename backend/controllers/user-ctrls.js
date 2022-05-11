const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../config/db-config');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: './.env' });
const models = require('../models/user-models');

exports.getAllUsers = (req, res, next) => {
  try {
    db.query(models.selectUsers, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOneUser = (req, res, next) => {
  try {
    const name = req.params.username;
    db.query(models.selectUserInfos, name, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.signUp = (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const rng = uuidv4();
    const uuid = JSON.stringify(rng);
    if (emailValidator.validate(email)) {
      let password = req.body.password;
      bcrypt.hash(password, 10).then((hash) => {
        password = hash;
        const values = [username, email, password, uuid];
        db.query(models.signIn, values, (err, result, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          }
          return res
            .status(201)
            .json({ message: `Welcome to Groupomania ${username} !` });
        });
      });
    } else {
      return res.status(400).json({ message: 'Please use a valid Email...' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.logIn = (req, res, next) => {
  try {
    const username = req.body.username;
    let password = req.body.password;
    db.query(models.logIn, username, (err, result, fields) => {
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
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const id = req.params.id;
    const username = req.body.username;
    let password = req.body.password;
    const bio = req.body.bio;
    bcrypt.hash(password, 10).then((hash) => {
      password = hash;
      if (req.file) {
        //Delete Old picture
        db.query(models.selectOneUser, id, (err, result, fields) => {
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
          models.updateUserImg,
          [username, bio, password, imageUrl, id],
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
          models.updateUser,
          [username, bio, password, id],
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
      db.query(models.selectOneUsername, username, (err, result, fields) => {
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
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = req.params.id;
    const defaultPicture = 'http://localhost:3000/images/default_user.jpg';

    db.query(models.selectOneUser, userId, (err, result, fields) => {
      if (err) {
        return res.status(400).json(err);
      } else if (result[0].id != decodedToken.userId) {
        if (decodedToken.permission == 'admin') {
          if (result[0].image != defaultPicture) {
            const filename = result[0].image.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('image deleted...');
              }
            });
          }
        } else {
          return res.status(401).json(err);
        }
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
    db.query(models.deleteUser, userId, (err, result, fields) => {
      if (err) {
        return res.status(400).json(err);
      } else if (result.affectedRows == 0) {
        return res.status(404).json({ message: 'User not found...' });
      } else {
        return res.status(201).json({ message: 'User Deleted...' });
      }
    });
  } catch (error) {
    return res.status(500).json(err);
  }
};

exports.rankUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const permission = decodedToken.permission;
    if (permission == 'admin') {
      const rank = req.body.rank;
      const userId = req.body.id;
      db.query(models.rankUser, [rank, userId], (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          return res.status(201).json({ message: 'user promoted...' });
        }
      });
    } else {
      return res.status(400).json(err);
    }
  } catch (error) {
    return res.status(500).json(err);
  }
};
