const db = require('../config/db-config');
const fs = require('fs');
const { json } = require('express/lib/response');

exports.getAllPosts = (req, res, next) => {
  db.query(
    `SELECT P.id, P.userId, P.title, P.content, P.date, P.imageUrl, 
    U.username, U.permission, U.image,
    COALESCE(L.totalLikes, 0) AS totalLikes
    FROM posts AS P
    INNER JOIN user AS U ON U.id = P.userId 
    LEFT JOIN (
      SELECT postId, COUNT(*) AS totalLikes
      FROM likes 
      GROUP BY postId
    ) AS L ON L.postId = P.id
    ORDER BY P.id DESC;`,
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

exports.getOnePost = (req, res, next) => {
  try {
    const postId = req.params.postId;
    db.query(
      `SELECT P.id, P.userId, P.title, P.content, P.date, P.imageUrl, 
      U.username, U.permission, U.image,
      COALESCE(L.totalLikes, 0) AS totalLikes
      FROM posts AS P
      INNER JOIN user AS U ON U.id = P.userId 
      LEFT JOIN (
        SELECT postId, COUNT(*) AS totalLikes
        FROM likes 
        GROUP BY postId
      ) AS L ON L.postId = P.id
      WHERE P.id =${postId};`,
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          return res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    throw error;
  }
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
    `INSERT INTO posts (title, content, imageUrl, userId) VALUES ("${title}", "${content}", '${imageUrl}', '${userId}')`,
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
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    db.query(
      `SELECT * FROM posts WHERE id= ?`,
      postId,
      (err, result, fields) => {
        console.log(result);
        if (err) {
          return res.status(400).json(err);
        } else if (
          result[0].imageUrl == null ||
          result[0].imageUrl == 'noImg'
        ) {
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
      }
    );
    db.query(`DELETE FROM posts WHERE id= ?`, postId, (err, result, fields) => {
      if (err) {
        return res.status(400).json({ err });
      }
      console.log('post Deleted');
      return res.status(200).json({ message: 'Post Deleted...' });
    });
  } catch (error) {
    console.log('error in catch');
    return res.status(400).json(error);
  }
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
