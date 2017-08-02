
const mysql= require('mysql');

const connection=mysql.createConnection({
  host: 'localhost',
  password: '',
  user: 'root',
  port: 3306,
  database: 'bookmark'
});

connection.connect(function(err){
  if(err){
    throw err;
    console.log(err);
  }
});

module.exports = connection;
