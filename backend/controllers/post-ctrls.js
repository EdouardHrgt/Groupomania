const db = require('../config/db-config');
const fs = require('fs');
const { json } = require('express/lib/response');

exports.getAllPosts = (req, res, next) => {
  db.query(`SELECT * FROM post ORDER BY date DESC`, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    console.log(result);
    return res.status(200).json(result);
  });
};

exports.getOnePost = (req, res, next) => {
  db.query(
    `SELECT * FROM post WHERE id= ?`,
    req.params.id,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.length < 1) {
        return res.status(404).json({ message: 'Post Not Found...' });
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
};

exports.createPost = (req, res, next) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const content = req.body.content;
  console.log(req.file);
  return res.status(201).json({ message: 'Req reçue...' });
  /*
  db.query(
    `INSERT INTO post (title, content, userId) VALUES ('${title}', '${content}', '${userId}')`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      console.log(result);
      return res.status(201).json({ message: 'Post Created...' });
    }
  );
  */
};

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  db.query(
    `UPDATE post SET title='${title}', content='${content}' WHERE id='${id}'`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: 'Post Not Found...' });
      }
      console.log(result);
      return res.status(200).json({ message: 'Post Updated...' });
    }
  );
  //db.query(`UPDATE post (title, content) VALUES ('${title}', '${content}') WHERE id='${id}'`);
};

exports.deletePost = (req, res, next) => {
  const id = req.body.id;
  db.query(`DELETE FROM post WHERE id= ?`, id, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: 'Post Not Found...' });
    }
    return res.status(200).json({ message: 'Post Deleted...' });
  });
};
