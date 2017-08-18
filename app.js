var express = require('express');
var path = require('path');
var http= require('http');

var logger = require('morgan');

var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

// app.use(logger('dev'));
app.use(bodyParser.json());


// app.use(express.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// var data= require('./data/data.js');


var session = require('express-session');
var redis = require('redis');


app.use(session({
  'secret': 'sdfjkfjsdlkasfds',
  'resave': false,
  'saveUninitialized': true
}));

var bookmarks= require('./routes/bookmarks.js');
var user= require('./routes/users.js');
var tag= require('./routes/tag.js');
app.use('/', bookmarks);
app.use('/', user);
app.use('/', tag);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.get('/bookmark',function(req, res){
//   res.render('bookmark',{});
// } 


var server= app.listen(3000, function(req, res){
  console.log("server running at 3000port");
  // data();
})
