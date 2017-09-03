var express = require('express');

var router = express.Router();

require('date-utils');

var connection = require('../mysql.js');

router.get('/bookmarks', function (req, res, next) {
  var sort = req.query.sort;
  var query = req.query.query;
  //for recommend table
  const user= req.session.userId;
  console.log(user);
  console.log(sort + ", " + query);
  var sql = 'SELECT b.url, b.title, b.rec, b.userId AS bUserId, t.content AS tag, t.userId AS tUserId FROM bookmark b INNER JOIN tag t ON b.uid=t.bookmarkId';
  var sortSql=' order by b.date DESC, b.title DESC, b.rec DESC';
  var params;

  if (query) {
    sql += ' WHERE b.title LIKE ? OR b.url LIKE ? OR b.userId LIKE ? OR t.tag LIKE ?';
  }

  var regexQuery = '%' + query + '%';
  
  // if (sort) {
  //   var base;
  //   if (sort.charAt(0) === '-') {
  //     // desc
  //     base = sort.substr(1, sort.length);
  //     sql += ' ORDER BY ? DESC';
  //   } else {
  //     // asc
  //     base = sort;
  //     sql += ' ORDER BY ? ASC';
  //   }

  //   params = [base, regexQuery, regexQuery, regexQuery, regexQuery, LIMIT];
  // } else {
  //   params = [regexQuery, regexQuery, regexQuery, regexQuery, LIMIT];
  // }
  //이거는 그냥 asc desc잔씀?

  if(sort){
    if(sort=='title'){
      sortSql='order by b.title DESC, b.date DESC, b.rec DESC';
    }else if (sort=='recommanded'){
      sortSql='order by b.rec DESC, b.date DESC, b.title DESC';
    }
  }
  connection.query(sql+sortSql, params, function(err, results, fields) {
    if (err) throw err;

    if (results) {
      var resArray = new Array();

      results.forEach(function (currentValue, index, arr) {
        var resObject = new Object();
        resObject.url = currentValue.url;
        resObject.title = currentValue.title;
        resObject.bookmarkUserId = currentValue.bUserId;
        resObject.tag = currentValue.tag;
        resObject.tagUserId = currentValue.tUserId;
        if(connection.query('select userid from recommend where bookmarkId = ?',[]))
          resArray.push(resObject);
      });

      res.status(200);
      res.json(resArray);
    }
  });
});
router.route('/bookmarks').post((req, res) => {
  var url = req.body.url;
  var title = req.body.title;
  var userId = req.body.userId;
  var nowDate = new Date().toFormat('YYYY-MM-DD HH24:MI:SS')
  var tags = req.body.tags;
  var sql = 'INSERT INTO bookmark (url, title, userId) VALUES ("?", "?", "?")';
  connection.query(sql, [url, title, userId], function (err, results) {
    if (err) {
      throw err;
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log('bookmark insert');
    if (tags) {
      connection.query('SELECT LAST_INSERT_ID()', function (err, result) {
        if (err) {
          throw err;
          console.log(err);

          res.sendStatus(500);
        }
        var uid = Number(result[0]['LAST_INSERT_ID()']);
        //tags insert
        for (var i = 0; i < tags.length; i++) {
          // var tagInput = {
          //   'bookmarkId': uid,
          //   'content': tags[i],
          //   'userId': userId
          // }
          connection.query('insert into tag ("?", "?", "?")', [uid, tags[i], userId], function (err, results) {
            if (err) {
              throw err;
              console.log(err);
              res.sendStatus(409);
            }
            console.log('tag insert');
            res.sendStatus(201);
          });
        }
      });
    } else {
      res.sendStatus(201);
    }
  });
})

router.delete('/bookmarks/:bookmarkId', function (req, res, next) {
  var bookmarkId = req.params.bookmarkId;
  var userId = req.session.userId;

  var sql = 'DELETE FROM bookmark WHERE uid=? AND userId=?;';
  connection.query(sql, [bookmarkId, userId], function (err, results, fields) {
    if (err) throw err;

    if (results.length >= 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });
});

module.exports = router;