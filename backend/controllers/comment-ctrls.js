const db = require('../config/db-config');

exports.getAllComments = (req, res, next) => {
  db.query(`SELECT * FROM comment ORDER BY id DESC`, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getOneComment = (req, res, next) => {
  db.query(
    `SELECT * FROM comment WHERE id= ?`,
    req.params.id,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.length < 1) {
        return res.status(404).json({ message: 'Comment Not Found...' });
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
};

exports.createComment = (req, res, next) => {
  let comment = req.body;
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
  const id = req.params.id;
  const content = req.body.content;
  
  db.query(
    `UPDATE comment SET content='${content}' WHERE id='${id}'`,
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
    `DELETE FROM comment WHERE id= ?`,
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

