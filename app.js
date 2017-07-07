var express = require('express');
var path = require('path');
var http= require('http');

var logger = require('morgan');
var session= require('express-session');


var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');
// var bookmarks = require('./routes/bookmarks');

var app = express();

// view engine setup
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret : 'sdfjkfjsdlkasfds',
  resave : false,
  saveUninitialized : true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
// app.use('/bookmarks', bookmarks);

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

app.get('/index', function(req, res){
  res.render('index',{});
})

var server= app.listen(3000, function(req, res){
  console.log("server running at 3000port");

})
