var express = require('express');
var router = express.Router();

var session= require('express-session');
var mysqlStore= require('mysql-session-store')(session);

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'bookmark_store'
});
connection.connect();

var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:'',
  database: 'bookmark_store'
};

app.use(session({
  store: new RedisStore(sessionoptions),
  secret : 'sdfjkfjsdlkasfds',
  resave : false,
  saveUninitialized : true
}));

router.post('/login', function(req, res, next) {
    var user = req.body;

    if(req.session.user){

    }else{
      var sql = 'SELECT id FROM user WHERE id=? AND password=?;';
      connection.query(sql, [user.id, user.password], function(err, rows, fields) {
        if (err) throw err;

        if (rows.length >= 1) {
          console.log(user.id + ' is logged in.');
          req.session.user= {
            id : user.id
          };
          res.status(200);
        } else {
          console.log(user.id + 'is failed to login.');
          res.status(401);
        }
      });
    }    
});
router.get('/logout',function(req,res){
  
  if(req.session.id){
    console.log('logout user:'+req.session.id);
    req.session.destroy(function(err){
      if(err) throw err;
      console.log('logout');
    });
  }

});

router.post('/user/register',function(req,res){
  var paramid= req.body.id;
  var parampassword= req.body.password;
  connection.query('SELECT id FROM user',function(err,result){
    if(err) throw err;
    if(!result){
      console.log('이미 있는 아이디');
      //error
    }
    var userInput= {
      id : paramid,
      password : parampassword
    }
    connection.query('insert into user set ?',userInput,function(err, result){
      if(err) throw err;
      console.log('user insert');
    })
  })
});

module.exports = router;
