/* eslint-disable consistent-return */
// Because these controllers only need to return errors

const passport = require('passport');

// Handle login
exports.logIn = (req, res, next) => {
  // Normalize email
  req.body.username = req.body.username.toLowerCase();
  // Empty old error messages
  req.session.messages = [];
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login-error',
    failureMessage: true,
  })(req, res, next);
};

// Handle logout
exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
