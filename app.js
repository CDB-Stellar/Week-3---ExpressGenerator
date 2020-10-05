//This is the main manifest file. It links all the site structure together
//Installed third-party packages here:
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//These are routers
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

//This line makes a new express application. Stores it in the app variable
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //this line tells the application where the views are
app.set('view engine', 'ejs'); //express -e configured the view engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //anything in public folder is automatically a route
//^ it can be tedious to have to manually add all routes in a site which is why you would make a static route (in this course everything is manual though)
app.use(express.static(path.join(__dirname, 'node_modules'))); //this lets you not have to put the node_modules path part in index.ejs

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

module.exports = app;
