var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'bookmark_store'
});
conn.connect();

router.post('/login', function (req, res, next) {
  var user = req.body;

  var sql = 'SELECT id FROM user WHERE id=? AND password=?;';
  conn.query(sql, [user.id, user.password], function (err, results, fields) {
    if (err) throw err;

    if (results.length >= 1) {
      console.log(user.id + ' is logged in.');
      req.session.id = user.id;
      res.status(200);
    } else {
      console.log(user.id + 'is failed to login.');
      res.status(401);
    }
  });
});

router.delete('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) throw err;

    res.status(200);
  });
});

router.post('/register', function (req, res, next) {
  var user = req.body;

  var sql = 'INSERT INTO user(id, password) VALUES(?, ?);';
  conn.query(sql, [user.id, user.password], function (err, results, fields) {
    if (err) throw err;

    if (results.length >= 1) {
      res.status(201);
    } else {
      res.status(400);
    }
  });
});

module.exports = router;
