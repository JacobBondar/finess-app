const express = require('express');
const router = express.Router();
const controller = require('../controllers/exercise.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/exercises
router.get('/', controller.getExercises);

// @route   GET /api/exercises/muscle/:group
router.get('/muscle/:group', controller.getExercisesByMuscle);

// @route   GET /api/exercises/:id
router.get('/:id', controller.getExercise);

// Protected routes (admin only - for now just protected)
// @route   POST /api/exercises
router.post('/', protect, controller.createExercise);

// @route   PUT /api/exercises/:id
router.put('/:id', protect, controller.updateExercise);

// @route   DELETE /api/exercises/:id
router.delete('/:id', protect, controller.deleteExercise);

module.exports = router;
