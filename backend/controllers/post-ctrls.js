const db = require('../config/db-config');
const fs = require('fs');
const { json } = require('express/lib/response');

exports.getAllPosts = (req, res, next) => {
  db.query(
    `SELECT title, content, imageUrl, userId, posts.id, username, permission, image, date  FROM posts JOIN user ON posts.userId = user.id ORDER BY posts.id DESC`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    }
  );
};

exports.getOnePost = (req, res, next) => {
  db.query(
    `SELECT * FROM posts WHERE id= ?`,
    req.params.id,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.length < 1) {
        return res.status(404).json({ message: 'Post Not Found...' });
      }
      return res.status(200).json(result);
    }
  );
};

exports.createPost = (req, res, next) => {
  console.log(req.file);
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.params.id;
  //if req, soit image url = req.file soit un default user et 1 seule query
  if (req.file) {
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
    db.query(
      `INSERT INTO posts (title, content, imageUrl, userId) VALUES ('${title}', '${content}', '${imageUrl}', '${userId}')`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res
          .status(201)
          .json({ message: 'Post Created with an image...' });
      }
    );
  }
  if (!req.file) {
    db.query(
      `INSERT INTO posts (title, content, userId) VALUES ('${title}', '${content}', '${userId}')`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res.status(201).json({ message: 'Post Created...' });
      }
    );
  }
};

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  console.log(req.file);
  console.log(req.body);
  if (req.file) {
    db.query(`SELECT * FROM posts WHERE id= ?`, id, (err, result, fields) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (result[0].imageUrl == null) {
        console.log('No image in this post...');
      } else {
        const filename = result[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('image deleted...');
          }
        });
      }
    });
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;

    db.query(
      `UPDATE posts SET title='${title}', content='${content}', imageUrl='${imageUrl}' WHERE id='${id}'`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: 'Post Not Found...' });
        }
        console.log('post updated with img...');
        return res
          .status(200)
          .json({ message: 'Post Updated with new image...' });
      }
    );
  }

  if (!req.file) {
    db.query(
      `UPDATE posts SET title='${title}', content='${content}' WHERE id='${id}'`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: 'Post Not Found...' });
        }
        console.log('post updated NO img...');
        return res.status(200).json({ message: 'Post Updated...' });
      }
    );
  }
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  db.query(`SELECT * FROM posts WHERE id= ?`, postId, (err, result, fields) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (result[0].imageUrl == null) {
      console.log('No image in this post...');
    } else {
      const filename = result[0].imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('image deleted...');
        }
      });
    }
  });
  db.query(`DELETE FROM posts WHERE id= ?`, postId, (err, result, fields) => {
    if (err) {
      return res.status(400).json({ err });
    }
    console.log('post Deleted');
    return res.status(200).json({ message: 'Post Deleted...' });
  });
};
