const db = require('../config/db-config');

const selectComms = `SELECT * FROM comments ORDER BY id DESC`;
const selectPostComms = `SELECT comments.id, content, date, userId, postId, username, image, permission 
FROM comments 
JOIN user 
ON comments.userId = user.id WHERE postId= ?`;
const selectOneComm = `SELECT * FROM comments WHERE id= ?`;
const inserComm = `INSERT INTO comments (content, userId, postId) VALUES (?,?,?)`;
module.exports = { selectComms, selectPostComms, selectOneComm, inserComm };
