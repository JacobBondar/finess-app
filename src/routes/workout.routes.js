const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  getWorkout,
  getTodayWorkout,
  createWorkout,
  generateWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout
} = require('../controllers/workout.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/workouts
router.get('/', getWorkouts);

// @route   GET /api/workouts/today
router.get('/today', getTodayWorkout);

// @route   POST /api/workouts
router.post('/', createWorkout);

// @route   POST /api/workouts/generate
router.post('/generate', generateWorkout);

// @route   GET /api/workouts/:id
router.get('/:id', getWorkout);

// @route   PUT /api/workouts/:id
router.put('/:id', updateWorkout);

// @route   DELETE /api/workouts/:id
router.delete('/:id', deleteWorkout);

// @route   POST /api/workouts/:id/complete
router.post('/:id/complete', completeWorkout);

module.exports = router;
