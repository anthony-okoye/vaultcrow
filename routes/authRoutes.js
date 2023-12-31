// In your routes file:
const express = require('express');
const router = express.Router();
const loginController = require('./controllers/authController');

router.post('/login', authController.login);

module.exports = router;
