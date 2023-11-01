const express = require('express');
const passport = require('passport');

const router = express.Router();

const clubController = require('../controllers/clubController');

// Render index
router.get('/', clubController.index);

// Render signup
router.get('/sign-up', clubController.signUp);

// Handle signup submission
router.post('/sign-up', clubController.signUpPost);

// // Handle login
// router.post(
//   '/log-in',
//   passport.authenticate('local', {
//     successRedirect: '/success',
//     failureRedirect: '/failure',
//   }),
// );

module.exports = router;
