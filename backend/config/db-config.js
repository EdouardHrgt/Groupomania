require('dotenv').config();
const model = require('../models/create-db-models');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  const name = process.env.DB_NAME;
  if (err) throw err;
  console.log('Connexion to : ' + name + ' sucessfull...');
});

module.exports = db;
