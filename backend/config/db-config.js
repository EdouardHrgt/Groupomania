const mysql = require('mysql2');
require('dotenv').config({ path: './.env'});

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_AUTH,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('DataBase Connected...');
});

module.exports = db;
