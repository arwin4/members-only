/* eslint-disable no-console */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const app = express();

// Import secrets
require('dotenv').config();

const mongoString = process.env.MONGODB_CONNECTION_STRING;
const sessionSecret = process.env.SESSION_STRING;

// Mongo imports
const User = require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({ secret: sessionSecret, resave: false, saveUninitialized: true }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

/** Passport functions start */
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/** Passport functions end */

// Make currentUser object available throughout app
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const sessionRouter = require('./routes/session');
const messageRouter = require('./routes/message');

app.use('/', indexRouter);
app.use('/session', sessionRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let mongoConnectionSuccessful = false;

async function connectToMongoAtlas() {
  console.log('Connecting to MongoDB Atlas...');
  try {
    await mongoose.connect(mongoString);
    mongoConnectionSuccessful = true;
  } catch (error) {
    console.log(error);
  }
}

connectToMongoAtlas()
  .then(() => {
    console.log('Server has finished starting.');
    // eslint-disable-next-line no-unused-expressions
    mongoConnectionSuccessful
      ? console.log('Connection to MongoDB Atlas successful.')
      : console.log('Connection to MongoDB Atlas FAILED.');
  })
  .catch((err) => console.log(err));

module.exports = app;
