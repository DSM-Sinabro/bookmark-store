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

router.post('/login', function(req, res, next) {
    var user = req.body;

    var sql = 'SELECT id FROM user WHERE id=? AND password=?;';
    conn.query(sql, [user.id, user.password], function(err, rows, fields) {
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
});

module.exports = router;
