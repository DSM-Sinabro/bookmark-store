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

const LIMIT = 20;

router.get('/', function (req, res, next) {
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

module.exports = router;
