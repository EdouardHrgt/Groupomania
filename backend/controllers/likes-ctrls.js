const db = require('../config/db-config');
const models = require('../models/likes-models');

exports.likePost = (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  db.query(models.selectOneLike, [userId, postId], (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else if (result.length <= 0) {
      db.query(models.insertLike, [postId, userId], (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res.status(201).json(result);
      });
    } else {
      db.query(models.deleteLike, [userId, postId], (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res.status(201).json(result);
      });
    }
  });
};

exports.getPostLikes = (req, res, next) => {
  const postId = req.params.postId;
  db.query(models.selectLikes, postId, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
};
