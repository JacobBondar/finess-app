const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   POST /api/auth/register
router.post('/register', controller.register);

// @route   POST /api/auth/login
router.post('/login', controller.login);

// @route   GET /api/auth/me
router.get('/me', protect, controller.getMe);

module.exports = router;

// protect, auth.middleware