const db = require('../config/db-config');

const selectComms = `SELECT * FROM comments ORDER BY id DESC`;

const selectPostComms = `SELECT comments.id, content, date, userId, postId, username, image, permission 
FROM comments 
JOIN user 
ON comments.userId = user.id WHERE postId= ?`;

const selectOneComm = `SELECT comments.id, content, date, userId, postId, username, image, permission 
FROM comments 
JOIN user 
ON comments.userId = user.id WHERE comments.id= ?`;

const selectLimitedComms = `SELECT comments.id, content, date, userId, postId, username, image, permission 
FROM comments 
JOIN user 
ON comments.userId = user.id WHERE postId= ?
LIMIT 0, 3`;

const inserComm = `INSERT INTO comments (content, userId, postId) VALUES (?,?,?)`;

const selectOffsetComms = function (int) {
  return `SELECT comments.id, content, date, userId, postId, username, image, permission 
  FROM comments 
  JOIN user 
  ON comments.userId = user.id WHERE postId=?
  ORDER BY comments.id DESC
  LIMIT ${int}, 3`;
};

module.exports = {
  selectComms,
  selectPostComms,
  selectOneComm,
  selectLimitedComms,
  inserComm,
  selectOffsetComms,
};
