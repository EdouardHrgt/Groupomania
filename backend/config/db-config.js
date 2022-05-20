require('dotenv').config();
const model = require('../models/create-db-models');
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL...');
  
  const name = process.env.DB_NAME;

  /*Create DB*/
  con.query(model.createDB(name), (error, result) => {
    if (error) throw error;
    console.log('Database ' + name + ' created...');

    /*Connect to BD*/
    db.connect((e) => {
      if (e) throw e;
      console.log('Connected to ' + name + '...');

      /*Add User table*/
      db.query(model.userTable, (error, result) => {
        if (error) throw error;
      });

      /*Add Posts table*/
      db.query(model.postsTable, (error, result) => {
        if (error) throw error;
      });

      /*Add Comments table*/
      db.query(model.commentsTable, (error, result) => {
        if (error) throw error;
      });

      /*Add Likes table*/
      db.query(model.likesTable, (error, result) => {
        if (error) throw error;
      });

      /*Insert Admin account
      const values = [
        process.env.DB_ADMIN_ACCOUNT_NAME,
        process.env.DB_ADMIN_ACCOUNT_EMAIL,
        process.env.DB_ADMIN_ACCOUNT_PWD,
        process.env.DB_ADMIN_ACCOUNT_ID,
        'admin',
      ];
      db.query(model.insertAdmin, values, (error, result) => {
        if (error) throw error;
        console.log('likes created');
      });
      */
    });
  });
});

module.exports = db;
