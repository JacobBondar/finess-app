const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/users/profile
router.get('/profile', controller.getProfile);

// @route   PUT /api/users/profile
router.put('/profile', controller.updateProfile);

// @route   PUT /api/users/weight
router.put('/weight', controller.updateWeight);

// @route   GET /api/users/weight-history
router.get('/weight-history', controller.getWeightHistory);

module.exports = router;