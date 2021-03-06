var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var session = require('express-session');
var methodOverride = require('method-override');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('quiz2015_7vhlk4a6loz8b5vhdf6'));
app.use(session());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  //if (!req.path.match(/\/login|\/logout|\/user/)) {
  if(req.path !== "/login") {
    req.session.redir = req.path;
  }
  res.locals.session = req.session;
  next();
});

app.use(function(req, res, next) {
  if (req.session.user) {
    var curtime = (new Date()).getTime();
    if (curtime - req.session.lastTransaction > 1000 * 10 * 2) {
      delete req.session.user;
      delete req.session.lastTransaction;
    } else {
      req.session.lastTransaction = curtime;
    }
  } // If no session.user, nothing to caducate
  next();
});

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
