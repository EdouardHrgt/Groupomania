const db = require('../config/db-config');

exports.getAllcomments = (req, res, next) => {
  console.log(req.body);
};

exports.getOnecomment = (req, res, next) => {
  console.log(req.body);
};

exports.createComment = (req, res, next) => {
  let comment = req.body;
  comment.date = new Date(Date.now());

  db.query(`INSERT INTO comment SET ?`, comment, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    console.log(result);
    return res.status(201).json({ message: 'Comment Created...' });
  });
};

exports.updateComment = (req, res, next) => {
  console.log(req.body);
};

exports.deleteComment = (req, res, next) => {
  console.log(req.body);
};
