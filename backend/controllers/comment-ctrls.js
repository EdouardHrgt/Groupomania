const db = require('../config/db-config');
const models = require('../models/comment-models');

exports.getAllComments = (req, res, next) => {
  try {
    db.query(models.selectComms, (err, result, fields) => {
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
exports.getFilteredComments = (req, res, next) => {
  try {
    const postId = req.params.postId;
    db.query(models.selectPostComms, postId, (err, result, fields) => {
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

exports.getLimitedComments = (req, res, next) => {
  try {
    const postId = req.params.postId;
    const offset = req.params.offset;
    db.query(
      `SELECT comments.id, content, date, userId, postId, username, image, permission 
        FROM comments 
        JOIN user 
        ON comments.userId = user.id WHERE postId= ${postId}
        LIMIT ${offset}, 2`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOneComment = (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    db.query(
      `SELECT * FROM comments WHERE postId='${postId}' AND userId='${userId}' ORDER BY id DESC LIMIT 1`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.length < 1) {
          return res.status(404).json({ message: 'Comment Not Found...' });
        }
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.createComment = (req, res, next) => {
  try {
    const content = req.body.content;
    const userId = req.body.userId;
    const postId = req.body.postId;
    values = [content, userId, postId];
    db.query(models.inserComm, values, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(201).json({ message: 'Comment Created...' });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
