const db = require('../config/db-config');

exports.getAllComments = (req, res, next) => {
  db.query(`SELECT * FROM comments ORDER BY id DESC`, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
};
exports.getFilteredComments = (req, res, next) => {
  const postId = req.params.postId;
  db.query(
    `SELECT comments.id, content, date, userId, postId, username, image, permission FROM comments JOIN user ON comments.userId = user.id WHERE postId= ?`,
    postId,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    }
  );
};

exports.getOneComment = (req, res, next) => {
  const id = req.params.id;
  db.query(`SELECT * FROM comments WHERE id= ?`, id, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    if (result.length < 1) {
      return res.status(404).json({ message: 'Comment Not Found...' });
    }
    return res.status(200).json(result);
  });
};

exports.createComment = (req, res, next) => {
  console.log('new comment............')
  console.log(req.body);
  const content = req.body.content;
  const userId = req.body.userId;
  const postId = req.body.postId;
  db.query(
    `INSERT INTO comments (content, userId, postId) VALUES ('${content}', '${userId}', '${postId}')`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      console.log(result);
      return res.status(201).json({ message: 'Comment Created...' });
    }
  );
};

exports.updateComment = (req, res, next) => {
  const id = req.params.id;
  const content = req.body.content;

  db.query(
    `UPDATE comments SET content='${content}' WHERE id='${id}'`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: 'Comment Not Found...' });
      }
      console.log(result);
      return res.status(200).json({ message: 'Comment Updated...' });
    }
  );
};

exports.deleteComment = (req, res, next) => {
  db.query(
    `DELETE FROM comments WHERE id= ?`,
    req.body.id,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: 'Comment Not Found...' });
      }
      return res.status(200).json({ message: 'Comment Deleted...' });
    }
  );
};
