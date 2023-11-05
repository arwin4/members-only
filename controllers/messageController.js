/* eslint-disable consistent-return */
// Because these controllers only need to return errors

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.write = asyncHandler((req, res) => {
  res.render('newMessageForm');
});

exports.messageSubmit = [
  body('title')
    .isLength({ min: 1, max: 50 })
    .withMessage(
      'The title for your message may be no longer than 50 characters',
    )
    .escape(),
  body('message')
    .isLength({ min: 1, max: 500 })
    .withMessage('Your message may be no longer than 500 characters')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const user = res.locals.currentUser;

    const message = new Message({
      title: req.body.title,
      content: req.body.message,
      /* The name is passed, not a reference to the user in the database. It is
      sufficient for the purposes of this app. */
      author: user.fullName,
    });

    if (typeof user === 'undefined') {
      try {
        throw new Error('User not found. You may not be logged in.');
      } catch (err) {
        return next(err);
      }
    } else if (!user.isMember) {
      try {
        throw new Error('You must be a member to post a message.');
      } catch (err) {
        return next(err);
      }
    }

    // Show error(s) and repopulate fields if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('newMessageForm', {
        message,
        errors: errors.array(),
      });
    } else {
      // No errors, save message
      try {
        await message.save();
      } catch (error) {
        return next(error);
      }
      res.redirect('/');
    }
  }),
];

exports.messageDelete = asyncHandler(async (req, res, next) => {
  if (!res.locals.currentUser.isAdmin) {
    try {
      throw new Error('You must be an admin to delete a message');
    } catch (err) {
      return next(err);
    }
  }

  const messageId = req.params.id;
  try {
    await Message.findByIdAndDelete(messageId).exec();
  } catch (err) {
    return next(err);
  }

  res.redirect('/');
});
