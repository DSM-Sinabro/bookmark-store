var express = require('express');

var router = express.Router();

require('date-utils');

<<<<<<< HEAD
var connection= require('./mysql.js');

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'bookmark'
// });
// connection.connect();
=======
// var connection= require('./mysql.js');
>>>>>>> 17881a6f2f37b11f68fec39590c713a250d24fc5


// get
router.get('/bookmarks', function (req, res, next) {
  var sort = req.query.sort;
  var query = req.query.query;

  console.log(sort + ", " + query);

  var sql = 'SELECT b.url, b.title, b.writer AS bwriter, t.tag, t.writer AS twriter FROM bookmark b INNER JOIN tag t ON b.id=t.bookmarkId';
  var params;

  if (query) {
    sql += ' WHERE b.title LIKE ? OR b.url LIKE ? OR b.writer LIKE ? OR t.tag LIKE ?';
  }

  if (sort) {
    var base;
    if (sort.charAt(0) === '-') {
      // desc
      base = sort.substr(1, sort.length);
      sql += ' ORDER BY ? DESC';
    } else {
      // asc
      base = sort;
      sql += ' ORDER BY ? ASC';
    }

    params = [base, regexQuery, regexQuery, regexQuery, regexQuery, LIMIT];
  } else {
    params = [regexQuery, regexQuery, regexQuery, regexQuery, LIMIT];
  }

  var regexQuery = '%' + query + '%';
  conn.query(sql, [regexQuery, regexQuery, regexQuery, regexQuery, LIMIT], getQueryCallback);
});

<<<<<<< HEAD
router.route('/bookmarks').post((req, res)=>{
  var nowDate= new Date().toFormat('YYYY-MM-DD HH24:MI:SS')
  var tags= req.body.tags;
  var testuserid="testid01";
=======
// post
router.post('/bookmarks', function (req, res) {
  var nowDate = new Date().toFormat('YYYY-MM-DD HH24:MI:SS')
  var tags = req.body.tags;
  var testuserid = "testid01";
  console.log(tags[0]);
>>>>>>> 17881a6f2f37b11f68fec39590c713a250d24fc5
  var bookmarkInput = {
    url: req.body.url,
    title: req.body.title,
    userid: testuserid,
    rec: 0,
    date: nowDate
  };
  connection.query('insert into bookmark set ?', bookmarkInput, function (err, results) {
    if (err) {
      throw err;
      console.log(err);
      res.status(500);
    }
    console.log('bookmark insert');
<<<<<<< HEAD
    if(tags){
        connection.query('SELECT LAST_INSERT_ID()',function(err, result){
            if(err){
                throw err;
                console.log(err);
                
                res.status(500);
            }
            var uid=Number(result[0]['LAST_INSERT_ID()']);
            //tags insert
            for(var i=0; i<tags.length;i++){
                var tagInput={
                    bookmarkId : uid,
                    content : tags[i],
                    userid : testuserid
                }
                connection.query('insert into tag set ?',tagInput,function(err, results){
                if(err){
                    throw err;
                    console.log(err);
                    res.status(500);
                }
                console.log('tag insert');
                res.status(201);
                });
            }
=======
    connection.query('SELECT LAST_INSERT_ID()', function (err, result) {
      if (err) {
        throw err;
        console.log(err);
      }
      var uid = Number(result[0]['LAST_INSERT_ID()']);
      //tags insert
      for (var i = 0; i < tags.length; i++) {
        var tagInput = {
          bookmarkId: uid,
          content: tags[i],
          userid: testuserid
        }
        connection.query('insert into tag set ?', tagInput, function (err, results) {
          if (err) {
            throw err;
            console.log(err);
          }
          console.log('tag insert');
>>>>>>> 17881a6f2f37b11f68fec39590c713a250d24fc5
        });
    } else{
        res.status(201);
    }
  });
}).delete((req,res)=>{
    
})

// delete
router.delete('/bookmarks/:bookmarkId', function (req, res, next) {
  var bookmarkId = req.params.bookmarkId;
  var userId = req.session.id;

  var sql = 'DELETE FROM bookmark WHERE id=? AND userId=?;';
  conn.query(sql, [bookmarkId, userId], function (err, rows) {
    if (err) throw err;

    if (rows.length >= 1) {
      res.status(200);
    } else {
      res.status(400);
    }
  });
});

function getQueryCallback(err, rows, fields) {
  if (err) throw err;

  if (rows) {
    var resArray = new Array();

    rows.forEach(function (currentValue, index, arr) {
      var resObject = new Object();
      resObject.url = currentValue.url;
      resObject.title = currentValue.title;
      resObject.bookmarkWriter = currentValue.bwriter;
      resObject.tag = currentValue.tag;
      resObject.tagWriter = currentValue.twriter;

      resArray.push(resObject);
    });

    res.status(200);
    res.json(resArray);
  }
}

module.exports = router;
