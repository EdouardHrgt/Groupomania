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
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${
    req.file.filename
  }`;
  const userId = req.body.userId;

  db.query(
    `INSERT INTO post (title, content, imageUrl, userId) VALUES ('${title}', '${content}', '${imageUrl}', '${userId}')`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(201).json({ message: 'Post Created...' });
    }
  );
};

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${
    req.file.filename
  }`;
  db.query(
    `UPDATE post SET title='${title}', content='${content}', imageUrl='${imageUrl}' WHERE id='${id}'`,
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
  db.query(`SELECT * FROM post WHERE id= ?`, id, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    // Si pas d'image dans la DB on ne fait rien
    if (result[0].imageUrl == null) {
      next();
    // Si image dans la DB
    } else {
      const filename = result[0].imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('image deleted...');
        }
        next();
      });
    }
  });

  db.query(`DELETE FROM post WHERE id= ?`, id, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: 'Post Not Found...' });
    }
    return res.status(200).json({ message: 'Post Deleted...' });
  });
};
