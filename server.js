pry = require('pryjs');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var bcrypt = require('bcrypt');

//Mongo/mongoose
var db = require('./db');
var db = mongoose.connection;
mongoose.connect('mongodb://heroku_8jddbrfh:hugkjreq35221hlopm2vbktdk6@ds025239.mlab.com:25239/heroku_8jddbrfh');

var usersController = require('./controllers/users');
var sessionsController = require('./controllers/sessions');
var indexController = require('./controllers/index');
var sightingController = require('./controllers/sighting')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use(session({
  secret: "herpaderpatology",
  resave: false,
  saveUninitialized: false
}));

// app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/', indexController);
app.use('/user/sightings', sightingController);
app.use('/user', usersController);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
