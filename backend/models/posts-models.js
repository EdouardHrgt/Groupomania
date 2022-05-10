const db = require('../config/db-config');

const selectAllPosts = `SELECT P.id, P.userId, P.title, P.content, P.date, P.imageUrl, 
    U.username, U.permission, U.image,
    COALESCE(L.totalLikes, 0) AS totalLikes
    FROM posts AS P
    INNER JOIN user AS U ON U.id = P.userId 
    LEFT JOIN (
      SELECT postId, COUNT(*) AS totalLikes
      FROM likes 
      GROUP BY postId
    ) AS L ON L.postId = P.id
    ORDER BY P.id DESC;`;

const getUserPosts = `SELECT * FROM posts WHERE userId= ?`;

const getOnePost = `SELECT P.id, P.userId, P.title, P.content, P.date, P.imageUrl, 
U.username, U.permission, U.image,
COALESCE(L.totalLikes, 0) AS totalLikes
FROM posts AS P
INNER JOIN user AS U ON U.id = P.userId 
LEFT JOIN (
  SELECT postId, COUNT(*) AS totalLikes
  FROM likes 
  GROUP BY postId
) AS L ON L.postId = P.id
WHERE P.id =?`;

const createPost = `INSERT INTO posts (title, content, imageUrl, userId) VALUES (?,?,?,?)`;

const selectWhere = `SELECT * FROM posts WHERE id= ?`;
const deleteWhere = `DELETE FROM posts WHERE id= ?`;
const updatePost = `UPDATE posts SET title=?, content=? WHERE id=?`;
const updatePostImg = `UPDATE posts SET title=?, content=?, imageUrl=? WHERE id=?`;

module.exports = {
  selectAllPosts,
  getUserPosts,
  getOnePost,
  createPost,
  selectWhere,
  deleteWhere,
  updatePost,
  updatePostImg,
};
