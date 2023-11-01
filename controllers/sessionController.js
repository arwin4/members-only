/* eslint-disable consistent-return */
// Because these controllers only need to return errors

const passport = require('passport');

// Handle login
// TODO: show success/failure to user
exports.logIn = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })(req, res, next);
};

// Handle logout
// TODO: show successful logout to user
exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
