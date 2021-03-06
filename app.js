var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.promise = global.Promise;


var app = express();

// view engine setup

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(cookieParser());

mongoose.connect('mongodb://localhost/write-me');
mongoose.set('debug', true);
require('./models/Users');
require('./config/passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res,) {
  createError(404);
});

module.exports = app;
