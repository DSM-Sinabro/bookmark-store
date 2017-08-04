
var express = require('express');
var router = express.Router();

var connection= require('../mysql.js');



router.post('/users/login', function (req, res, next) {
  console.log('/login');
  var user = req.body;
  console.log(sessionKey);
  if (req.session.userId) {
    
  } else {
    var sql = 'SELECT id FROM user WHERE id=? AND password=?;';
    connection.query(sql, [user.id, user.password], function (err, rows, fields) {
      if (err) throw err;

      if (rows.length >= 1) {
        console.log(user.id + ' is logged in.');

        var session= req.session;
        session.userId = user.id;
        // console.log(req.session.userid);
        // return res.json(req.session);
        res.sendStatus(200);
      } else {
        console.log(user.id + 'is failed to login.');
        res.sendStatus(401);
      }
    });
  }
});
router.delete('users/logout', function (req, res) {

  if (req.session.userId) {
    console.log('logout user:' + req.session.userId);
    req.session.destroy(function (err) {
      if (err) throw err;
      console.log('logout');
      res.sendStatus(200);
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
      res.sendStatus(409);
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
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    })
  })
});

module.exports = router;

