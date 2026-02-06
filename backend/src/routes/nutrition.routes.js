const express = require('express');
const router = express.Router();
const controller = require('../controllers/nutrition.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

// @route   POST /api/nutrition/log-meal
router.post('/log-meal', controller.logMeal);

// @route   GET /api/nutrition/today
router.get('/today', controller.getTodayLog);

// @route   GET /api/nutrition/history
router.get('/history', controller.getHistory);

// @route   GET /api/nutrition/summary/weekly
router.get('/summary/weekly', controller.getWeeklySummary);

// @route   PUT /api/nutrition/water
router.put('/water', controller.updateWaterIntake);

// @route   DELETE /api/nutrition/meal/:logId/:mealId
router.delete('/meal/:logId/:mealId', controller.deleteMeal);

module.exports = router;
