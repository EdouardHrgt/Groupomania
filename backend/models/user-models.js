const db = require('../config/db-config');
const selectUsers = `SELECT * FROM user`;
const selectOneUser = `SELECT * FROM user WHERE id=?`;

const selectUserInfos = `SELECT u.username, u.permission, u.image, u.bio, u.createDate,
(SELECT COUNT(*) FROM posts p WHERE p.userId = u.id) AS totalPosts,
(SELECT COUNT(*) FROM comments c WHERE c.userId = u.id) AS totalComms,
(SELECT COUNT(*) FROM likes l WHERE l.userId = u.id) AS totalLikes
FROM user AS u
WHERE u.username =?`;

const selectOneUsername = `SELECT * FROM user WHERE username= ?`;
const signIn = `INSERT INTO user (username, email, password, id) VALUES (?,?,?,?)`;
const logIn = `SELECT * FROM user WHERE username= ?`;
const deleteUser = `DELETE FROM user WHERE id= ?`;
const updateUserImg = `UPDATE user SET username=?, bio=?, password=?, image=? WHERE id=?`;
const updateUser = `UPDATE user SET username=?, bio=?, password=? WHERE id=?`;
const rankUser = `UPDATE user SET permission=? WHERE id=?`;

module.exports = {
  selectUsers,
  signIn,
  logIn,
  selectOneUser,
  selectOneUsername,
  selectUserInfos,
  deleteUser,
  updateUser,
  updateUserImg,
  rankUser,
};
