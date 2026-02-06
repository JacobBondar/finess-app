const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const exerciseRoutes = require('./exercise.routes');
const workoutRoutes = require('./workout.routes');
const nutritionRoutes = require('./nutrition.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/workouts', workoutRoutes);
router.use('/nutrition', nutritionRoutes);

module.exports = router;