/* eslint-disable consistent-return */
// Because these controllers only need to return errors

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.index = asyncHandler(async (req, res) => {
  res.render('index');
});

exports.signUp = asyncHandler(async (req, res) => {
  /**
   * Pass an empty user. Prevents the template from trying to render properties
   * from a nonexistent object.
   */
  res.render('signup', { user: {} });
});

exports.signUpPost = [
  // Sanitize and validate
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`First name may be no longer than 100 characters`)
    .escape(),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Last name may be no longer than 100 characters`)
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage(`Please ensure you've entered a valid email address`),
  body('password')
    .isLength({ min: 3, max: 100 })
    .withMessage(
      'Please ensure your password is between 3 and 100 characters long',
    ),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  asyncHandler(async (req, res, next) => {
    /**
     * Save details to user to allow filling the details back in case of errors.
     * Password is handled after no errors are detected.
     */
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isAdmin: req.body.admin === 'on',
    });

    // Show error(s) and repopulate fields if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signup', {
        user,
        errors: errors.array(),
      });
      return;
    }

    // Encrypt password
    bcrypt.hash(user, 10, async (err, hashedPassword) => {
      // TODO: implement error display for users
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      await user.save();
    });
    res.redirect('/');
  }),
];
