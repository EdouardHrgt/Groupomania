const db = require('../config/db-config');
const selectUsers = `SELECT * FROM user`;
const selectOneUser = `SELECT * FROM user WHERE id=?`;

const selectUserInfos = `SELECT U.username, U.permission, U.image, U.bio, U.createDate,
COALESCE(P.totalPosts, 0) AS totalPosts,
COALESCE(C.totalComms, 0) AS totalComms,
COALESCE(L.totalLikes, 0) AS totalLikes
FROM user AS U 
LEFT JOIN(
	SELECT userId, COUNT(*) AS totalPosts
    FROM posts
) AS P ON P.userId = u.id
LEFT JOIN(
	SELECT userId, COUNT(*) AS totalComms
    FROM comments
) AS C ON C.userId = u.id
LEFT JOIN(
	SELECT userId, COUNT(*) AS totalLikes
    FROM likes
) AS L ON L.userId = u.id
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
