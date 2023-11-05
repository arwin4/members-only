const express = require('express');

const router = express.Router();

const clubController = require('../controllers/clubController');

// Render index
router.get('/', clubController.index);

router.get('/login-error', clubController.loginError);

// Render signup
router.get('/sign-up', clubController.signUp);

// Handle signup submission
router.post('/sign-up', clubController.signUpPost);

router.get('/become-a-member', clubController.becomeAMember);

router.post('/become-a-member', clubController.becomeAMemberSubmit);

module.exports = router;
