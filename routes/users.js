
var express = require('express');
var router = express.Router();

var session = require('express-session');
var mysqlStore = require('mysql-session-store')(session);

var connection= require('./mysql.js');

app.use(session({
  'store': new RedisStore(sessionoptions),
  'secret': 'sdfjkfjsdlkasfds',
  'resave': false,
  'saveUninitialized': true
}));

router.post('users/login', function (req, res, next) {
  var user = req.body;

  if (req.session.user) {

  } else {
    var sql = 'SELECT id FROM user WHERE id=? AND password=?;';
    connection.query(sql, [user.id, user.password], function (err, rows, fields) {
      if (err) throw err;

      if (rows.length >= 1) {
        console.log(user.id + ' is logged in.');
        req.session.id = user.id;
        res.status(200);
      } else {
        console.log(user.id + 'is failed to login.');
        res.status(401);
      }
    });
  }
});
router.delete('users/logout', function (req, res) {

  if (req.session.id) {
    console.log('logout user:' + req.session.id);
    req.session.destroy(function (err) {
      if (err) throw err;
      console.log('logout');
      res.status(200);
    });
  }
});

router.post('users/register', function (req, res) {
  var paramid = req.body.id;
  var parampassword = req.body.password;
  connection.query('SELECT id FROM user', function (err, results) {
    if (err) throw err;
    if (!result) {
      console.log('이미 있는 아이디');
      res.status(409);
      return;
    }
    var userInput = {
      id: paramid,
      password: parampassword
    }
    connection.query('insert into user set ?', userInput, function (err, results) {
      if (err) throw err;
      console.log('user insert');

      if (results.length >= 1) {
        res.status(201);
      } else {
        res.status(400);
      }
    })
  })
});

module.exports = router;

