const db = require('../config/db-config');

const selectLikes = `SELECT * FROM likes WHERE postId= ?`;
const selectOneLike = `SELECT * FROM likes WHERE userId=? AND postId=?`;
const insertLike = `INSERT INTO likes (postId, userId) VALUES (?,?)`;
const deleteLike = `DELETE FROM likes WHERE userId=? AND postId=?`;
module.exports = {
  selectLikes,
  selectOneLike,
  insertLike,
  deleteLike,
};
