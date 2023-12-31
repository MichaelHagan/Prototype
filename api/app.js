var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let { initializeDatabase, runSeeders } = require('./utils/dbCreateHelper');

const db = require('./config/database');

let adminsRouter = require('./routes/admin');
let businessRouter = require('./routes/business');
let indexRouter = require('./routes/index');
let jobOwnerRouter = require('./routes/jobOwner');
let locationRouter = require('./routes/location');
let orderRouter = require('./routes/order');
let carRouter = require('./routes/car')
let usersRouter = require('./routes/user');
let imageRouter = require('./routes/image');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/admins', adminsRouter);
app.use('/businesses', businessRouter);
app.use('/', indexRouter);
app.use('/jobowners', jobOwnerRouter);
app.use('/locations', locationRouter);
app.use('/orders', orderRouter);
app.use('/cars', carRouter)
app.use('/users', usersRouter);
app.use('/images', imageRouter);


//db models sync
initializeDatabase().then((res) => {
  db.sync().then((result) => {
    console.log('models synced successfully')
    
    // Check and run Seeders
    runSeeders();
    
  })
}).catch((err) => {
  console.log(err);
});



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
