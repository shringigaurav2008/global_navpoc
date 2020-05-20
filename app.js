const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();


const oidc = new ExpressOIDC({
  issuer: 'https://dev-337333.oktapreview.com/oauth2/default',
  client_id: '0oarljwjo5OlifVJn0h7',
  client_secret: "FVMkSmE8DHnDEKiZZS1UU33ZXPrhrbkbGmOVc0fx",
  redirect_uri: 'http://localhost:4200/',
  appBaseUrl: 'http://localhost:4200',
  scope: 'openid profile'
});


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'its_a_secret_to_everybody' 
}));

app.use(oidc.router);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',oidc.ensureAuthenticated(), indexRouter);
app.use('/users', usersRouter);

app.get('/logout',oidc.forceLogoutAndRevoke(), (req, res) => {
  req.logout();
  res.redirect('/');
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
//app.listen(4200, () => console.log(`Example app listening on port port!`))
module.exports = app;
