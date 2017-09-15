const mysql= require('mysql');

const DB_CONFIG= require('./config/dbConfig.json');

const connection=mysql.createConnection({
  host: DB_CONFIG.host,
  password: DB_CONFIG.password,
  user: DB_CONFIG.user,
  port: DB_CONFIG.port,
  database: DB_CONFIG.database
});
//페스워드 환경변수 지정해서 자동넣기 해서 쓰셈
connection.connect(function(err){
  if(err){
    throw err;
    console.log(err);
  }
});

module.exports = connection;