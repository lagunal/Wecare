var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const configDB = require('./config/db');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const errorLogger = require('./utlities/errorLogger');


//routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coachesRouter = require('./routes/coaches');
var bookingsRouter = require('./routes/bookings');

dotenv.config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const swaggerOptions = {
  swaggerDefinition: {
    openai: "3.0.0",
    info: {
      title: 'We Care',
      description: 'This is a REST  API application created to register users and schedule appointments',
      version: '1.0.0',
      contact:{
        name:"Ludwing Laguna",
        url:"https://github/lagunal"
      },
      servers:['http://localhost:3000']
    }
  },
  apis: ['./routes/users.js']
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes

app.use('/users', usersRouter);
app.use('/coaches', coachesRouter);
app.use('/bookings' , bookingsRouter);
app.use('/', indexRouter);
app.use(errorLogger);

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

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`)
  configDB.connectDB();
});
