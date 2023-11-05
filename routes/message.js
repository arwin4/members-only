const express = require('express');

const router = express.Router();

const messageController = require('../controllers/messageController');

// Show new message form
router.get('/write', messageController.write);

// Handle new message
router.post('/write', messageController.messageSubmit);

// Handle delete message
router.get('/delete/:id', messageController.messageDelete);

module.exports = router;
