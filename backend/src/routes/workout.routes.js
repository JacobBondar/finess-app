const express = require('express');
const router = express.Router();
const controller = require('../controllers/workout.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/workouts
router.get('/', controller.getWorkouts);

// @route   GET /api/workouts/today
router.get('/today', controller.getTodayWorkout);

// @route   POST /api/workouts
router.post('/', controller.createWorkout);

// @route   POST /api/workouts/generate
// router.post('/generate', controller.generateWorkout);

// @route   GET /api/workouts/:id
router.get('/:id', controller.getWorkout);

// @route   PUT /api/workouts/:id
router.put('/:id', controller.updateWorkout);

// @route   DELETE /api/workouts/:id
router.delete('/:id', controller.deleteWorkout);

// @route   POST /api/workouts/:id/complete
router.post('/:id/complete', controller.completeWorkout);

module.exports = router;
