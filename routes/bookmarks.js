var express= require('express');

var router = express.Router();

require('date-utils');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookmark'
});
connection.connect();

const LIMIT = 20;

router.get('/bookmarks', function (req, res, next) {
    var sort = req.query.sort;
    var query = req.query.query;

    console.log(sort + ", " + query);

    var sql = 'SELECT b.url, b.title, b.writer AS bwriter, t.tag, t.writer AS twriter FROM bookmark b INNER JOIN tag t ON b.id=t.bookmarkId';
    if (sort) {
        if (sort.charAt(0) === '-') {
            // desc
            var base = sort.substr(1, sort.length);
            sql += ' ORDER BY ';
        } else {
            // asc

        }
    }
    if (query) {
        sql += ' WHERE b.title LIKE ? OR b.url LIKE ? OR b.writer LIKE ? OR t.tag LIKE ?';
    }

    var regexQuery = '%' + query + '%';
    conn.query(sql, [regexQuery, regexQuery, regexQuery, regexQuery, LIMIT], function (err, rows, fields) {
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
    });
});

router.post('/bookmarks',function(req, res){
  var nowDate= new Date().toFormat('YYYY-MM-DD HH24:MI:SS')
  var tags= req.body.tags;
  var testuserid="testid01";
  console.log(tags[0]);
  var bookmarkInput = {
    url : req.body.url,
    title : req.body.title,
    userid : testuserid,
    rec : 0,
    date : nowDate
  };
  connection.query('insert into bookmark set ?',bookmarkInput,function(err, results){
    if(err){
      throw err;
      console.log(err);
    }
    console.log('bookmark insert');
    connection.query('SELECT LAST_INSERT_ID()',function(err, result){
      if(err){
        throw err;
        console.log(err);
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
          }
          console.log('tag insert');
        });
      }
    });
  });
});

module.exports = router;
