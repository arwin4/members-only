const express = require('express');

const router = express.Router();

const clubController = require('../controllers/clubController');

// Render index
router.get('/', clubController.index);

// Render signup
router.get('/sign-up', clubController.signUp);

// Handle signup submission
router.post('/sign-up', clubController.signUpPost);

module.exports = router;
