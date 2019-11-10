var debug = require('debug');
var compression = require('compression');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var genericHelpers = require('./api/helpers/genericHelpers');
var http = require('http');

var app = express();

app.use(compression()); // Compresses the sent data to the browser

// Should be over the routes
require('./api/models/sequelize');

// Requiring passport for authentication
require('./api/config/passport');

// required to get the full error message in logs
genericHelpers.attachToJsonPropertyWithErrorPrototype();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./api/routes/index'); // Controls api calls


app.keepAliveTimeout = 60000 * 2; // Extending time of wait

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Api listener to fetch the data from the sever and save it.
genericHelpers.apiListener();

app.use(logger('dev'));

app.use(cors()); // For CORS policy error
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser());

app.use(cookieParser());
// Changed to target Angular path
app.use(express.static(path.join(__dirname, 'dist')));



// initializing passport
app.use(passport.initialize());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);


app.use(/^\/(?!api).*/, function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('/dist/index.html', { root: __dirname });
});

if (process.env.NODE_ENV == 'production') {

  
  var server = http.createServer(app);

  server.listen('3000', '0.0.0.0', function() {
    console.log('Listening to port:  ' + 80);
  });
}

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
  res.render('error');
});

module.exports = app;
