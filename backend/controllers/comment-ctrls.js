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

exports.getOneComment = (req, res, next) => {
  try {
    const id = req.params.id;
    db.query(models.selectOneComm, id, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.length < 1) {
        return res.status(404).json({ message: 'Comment Not Found...' });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createComment = (req, res, next) => {
  try {
    const content = req.body.content;
    const userId = req.body.userId;
    const postId = req.body.postId;
    values = [content, userId, postId];
    db.query(
      models.inserComm,
      values,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res.status(201).json({ message: 'Comment Created...' });
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};
