const db = require('../config/db-config');

const createDB = (name) => {
  return `CREATE DATABASE IF NOT EXISTS ${name};`;
};

const userTable = `CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    permission ENUM('member', 'moderator', 'admin') NOT NULL DEFAULT 'member',
    username VARCHAR(50) NOT NULL,
    image VARCHAR(250) NOT NULL DEFAULT 'http://localhost:3000/images/default_user.jpg',
    createDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    bio LONGTEXT,
    PRIMARY KEY (id),
    UNIQUE KEY email_UNIQUE (email),
    UNIQUE KEY username_UNIQUE (username)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

const postsTable = `CREATE TABLE IF NOT EXISTS posts (
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(250) NOT NULL,
    title VARCHAR(250) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    imageUrl VARCHAR(250) NOT NULL,
    userId VARCHAR(250) NOT NULL,
    likesCount INT DEFAULT NULL,
    PRIMARY KEY (id),
    KEY userIdKey_idx (userId),
    CONSTRAINT userIdKey FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

const commentsTable = `CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    content varchar(250) NOT NULL,
    date datetime DEFAULT CURRENT_TIMESTAMP,
    userId varchar(250) NOT NULL,
    postId int NOT NULL,
    PRIMARY KEY (id),
    KEY commentPostId_idx (postId),
    KEY commentUserId_idx (userId),
    CONSTRAINT commentPostId FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT commentUserId FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

const likesTable = `CREATE TABLE likes (
    id int NOT NULL AUTO_INCREMENT,
    userId varchar(250) NOT NULL,
    postId int NOT NULL,
    value int NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    KEY likesUserId_idx (userId),
    KEY likesPostId_idx (postId),
    CONSTRAINT likesPostId FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT likesUserId FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

module.exports = {
  createDB,
  userTable,
  postsTable,
  commentsTable,
  likesTable,
};
