var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

require('dotenv').config();
var index = require('./app//routes/index');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(session({
  secret: 'nightlife',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);


module.exports = app;
