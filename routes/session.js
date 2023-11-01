const express = require('express');

const router = express.Router();

const sessionController = require('../controllers/sessionController');

// Handle login
router.post('/log-in', sessionController.logIn);

// Handle logout
router.get('/log-out', sessionController.logOut);

module.exports = router;
