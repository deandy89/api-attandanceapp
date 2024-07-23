const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '103.247.11.173',
  user: 'adka4379_root',
  password: 'hil@pdeui',
  database: 'adka4379_hris'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;
