const db = require('../config/db-config');
const fs = require('fs');
const { json } = require('express/lib/response');

exports.getAllPosts = (req, res, next) => {
  db.query(
    `SELECT title, content, imageUrl, userId, posts.id, username, permission, image, date FROM posts JOIN user ON posts.userId = user.id ORDER BY posts.id DESC`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    }
  );
};

exports.getUserPosts = (req, res, next) => {
  const userId = req.params.id;
  db.query(
    `SELECT * FROM posts WHERE userId= ?`,
    userId,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.status(200).json(result);
      }
    }
  );
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.params.id;
  let imageUrl = '';
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
  } else if (!req.file) {
    imageUrl = 'noImg';
  }
  db.query(
    `INSERT INTO posts (title, content, imageUrl, userId) VALUES ('${title}', '${content}', '${imageUrl}', '${userId}')`,
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
    if (result[0].imageUrl == null || result[0].imageUrl == 'noImg') {
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

exports.likePost = (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  db.query(
    `SELECT * FROM likes WHERE userId='${userId}' AND postId='${postId}'`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else if (result.length <= 0) {
        db.query(
          `INSERT INTO likes (postId, userId) VALUES ('${postId}', '${userId}')`,
          (err, result, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            }
            console.log('Like saved...');
            return res.status(201).json(result);
          }
        );
      } else {
        db.query(
          `DELETE FROM likes WHERE userId='${userId}' AND postId='${postId}'`,
          (err, result, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            }
            console.log('Like deleted...');
            return res.status(201).json(result);
          }
        );
      }
    }
  );
};

exports.getPostLikes = (req, res, next) => {
  const postId = req.params.postId;
  db.query(
    `SELECT * FROM likes WHERE postId= ?`,
    postId,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.status(200).json(result);
      }
    }
  );
};
