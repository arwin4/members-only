const express = require('express');

const router = express.Router();

const clubController = require('../controllers/clubController');

// Render index
router.get('/', clubController.index);

module.exports = router;
