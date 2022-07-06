var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./config/config");
// const middleware = require('./middleware/jwt-middleware')

db.sequelize.sync();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var empRouter = require('./routes/emp');
var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', loginRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/emp', empRouter);
module.exports = app;