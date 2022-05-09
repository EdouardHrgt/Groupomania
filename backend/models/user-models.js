const db = require('../config/db-config');
const selectUsers = `SELECT * FROM user`;
const selectOneUser = `SELECT * FROM user WHERE id=?`;
const selectUserInfos = `SELECT u.username, u.permission, u.image, p.title FROM user AS u
LEFT JOIN posts AS p ON u.id=p.userId
WHERE u.username=?;`
const selectOneUsername = `SELECT * FROM user WHERE username= ?`;
const signIn = `INSERT INTO user (username, email, password, id) VALUES (?,?,?,?)`;
const logIn = `SELECT * FROM user WHERE username= ?`;
const deleteUser = `DELETE FROM user WHERE id= ?`;
const updateUserImg = `UPDATE user SET username=?, password=?, image=? WHERE id=?`;
const updateUser = `UPDATE user SET username=?, password=? WHERE id=?`;
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
