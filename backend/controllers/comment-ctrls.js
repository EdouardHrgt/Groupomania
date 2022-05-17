const db = require('../config/db-config');
const models = require('../models/comment-models');

exports.getLimitedComments = (req, res, next) => {
  try {
    const postId = req.params.postId;
    const offset = req.params.offset;
    db.query(
      models.selectOffsetComms(offset),
      postId,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.length <= 0) {
          return res.status(204).json({ message: 'No comments...' });
        } else {
          return res.status(200).json(result);
        }
      }
    );
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
