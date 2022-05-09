const db = require('../config/db-config');
const fs = require('fs');
const { json } = require('express/lib/response');
const models = require('../models/posts-models');

exports.getAllPosts = (req, res, next) => {
  try {
    db.query(models.selectAllPosts, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getUserPosts = (req, res, next) => {
  const userId = req.params.id;
  db.query(models.getUserPosts, userId, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
};

exports.getOnePost = (req, res, next) => {
  try {
    const postId = req.params.postId;
    db.query(models.getOnePost, postId, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.status(200).json(result);
      }
    });
  } catch (error) {
    throw error;
  }
};

exports.createPost = (req, res, next) => {
  try {
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
    const values = [title, content, imageUrl, userId];
    db.query(models.createPost, values, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(201).json({ message: 'Post Created...' });
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.updatePost = (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    if (req.file) {
      db.query(models.selectWhere, id, (err, result, fields) => {
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
        models.updatePostImg,
        [title, content, imageUrl, id],
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
        models.updatePost,
        [title, content, id],
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
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.deletePost = (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    db.query(models.selectWhere, postId, (err, result, fields) => {
      console.log(result);
      if (err) {
        return res.status(400).json(err);
      } else if (result[0].imageUrl == null || result[0].imageUrl == 'noImg') {
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
    db.query(models.deleteWhere, postId, (err, result, fields) => {
      if (err) {
        return res.status(400).json({ err });
      }
      console.log('post Deleted');
      return res.status(200).json({ message: 'Post Deleted...' });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
