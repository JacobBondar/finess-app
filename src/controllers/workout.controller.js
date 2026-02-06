const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const { messages, successResponse, errorResponse } = require('../utils/hebrewResponses');

// Hebrew day names mapping
const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

// @desc    Get all workouts for user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })
      .populate('exercises.exercise')
      .sort({ createdAt: -1 });

    if (workouts.length === 0) {
      return res.status(200).json(successResponse(messages.workout.listEmpty, { workouts: [] }));
    }

    res.status(200).json(successResponse(messages.general.success, { workouts }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('exercises.exercise');

    if (!workout) {
      return res.status(404).json(errorResponse(messages.workout.notFound));
    }

    res.status(200).json(successResponse(messages.general.success, { workout }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's workout
// @route   GET /api/workouts/today
// @access  Private
const getTodayWorkout = async (req, res, next) => {
  try {
    const today = new Date();
    const dayIndex = today.getDay(); // 0 = Sunday
    const hebrewDay = hebrewDays[dayIndex];

    const workout = await Workout.findOne({
      user: req.user.id,
      scheduledDays: hebrewDay
    }).populate('exercises.exercise');

    if (!workout) {
      return res.status(200).json(successResponse(messages.workout.noWorkoutToday, { workout: null }));
    }

    res.status(200).json(successResponse(messages.general.success, { workout, day: hebrewDay }));
  } catch (error) {
    next(error);
  }
};

// @desc    Create workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res, next) => {
  try {
    const {
      name,
      exercises,
      targetMuscleGroups,
      estimatedDuration,
      goal,
      scheduledDays,
      isTemplate
    } = req.body;

    const workout = await Workout.create({
      name,
      user: req.user.id,
      exercises,
      targetMuscleGroups,
      estimatedDuration,
      goal,
      scheduledDays,
      isTemplate
    });

    const populatedWorkout = await Workout.findById(workout._id)
      .populate('exercises.exercise');

    res.status(201).json(successResponse(messages.workout.created, { workout: populatedWorkout }));
  } catch (error) {
    next(error);
  }
};

// @desc    Generate workout based on goal
// @route   POST /api/workouts/generate
// @access  Private
// const generateWorkout = async (req, res, next) => {
//   try {
//     const { goal, targetMuscleGroups, difficulty } = req.body;

//     // Build query for exercises
//     let exerciseQuery = {};

//     if (targetMuscleGroups && targetMuscleGroups.length > 0) {
//       exerciseQuery.muscleGroup = { $in: targetMuscleGroups };
//     }

//     if (difficulty) {
//       exerciseQuery.difficulty = difficulty;
//     }

//     // Get exercises matching criteria
//     const exercises = await Exercise.find(exerciseQuery);

//     if (exercises.length === 0) {
//       return res.status(400).json(errorResponse(messages.exercise.listEmpty));
//     }

//     // Configure sets/reps based on goal
//     let setsConfig, repsConfig, restConfig;
//     switch (goal) {
//       case 'בניית מסה':
//         setsConfig = 4;
//         repsConfig = 8;
//         restConfig = 90;
//         break;
//       case 'כוח':
//         setsConfig = 5;
//         repsConfig = 5;
//         restConfig = 120;
//         break;
//       case 'חיטוב':
//       case 'ירידה במשקל':
//         setsConfig = 3;
//         repsConfig = 15;
//         restConfig = 45;
//         break;
//       case 'סיבולת':
//         setsConfig = 3;
//         repsConfig = 20;
//         restConfig = 30;
//         break;
//       default:
//         setsConfig = 3;
//         repsConfig = 12;
//         restConfig = 60;
//     }

//     // Select random exercises (max 6-8 for a workout)
//     const shuffled = exercises.sort(() => 0.5 - Math.random());
//     const selectedExercises = shuffled.slice(0, Math.min(8, exercises.length));

//     // Build workout exercises array
//     const workoutExercises = selectedExercises.map(exercise => ({
//       exercise: exercise._id,
//       sets: setsConfig,
//       reps: repsConfig,
//       restSeconds: restConfig
//     }));

//     // Calculate estimated duration
//     const estimatedDuration = workoutExercises.length * setsConfig * 2; // rough estimate: 2 min per set

//     // Create workout
//     const workout = await Workout.create({
//       name: `אימון ${goal || 'כללי'} - ${new Date().toLocaleDateString('he-IL')}`,
//       user: req.user.id,
//       exercises: workoutExercises,
//       targetMuscleGroups: targetMuscleGroups || [],
//       estimatedDuration,
//       goal: goal || req.user.goal
//     });

//     const populatedWorkout = await Workout.findById(workout._id)
//       .populate('exercises.exercise');

//     res.status(201).json(successResponse(messages.workout.generated, { workout: populatedWorkout }));
//   } catch (error) {
//     next(error);
//   }
// };

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res, next) => {
  try {
    let workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!workout) {
      return res.status(404).json(errorResponse(messages.workout.notFound));
    }

    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('exercises.exercise');

    res.status(200).json(successResponse(messages.workout.updated, { workout }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!workout) {
      return res.status(404).json(errorResponse(messages.workout.notFound));
    }

    await workout.deleteOne();

    res.status(200).json(successResponse(messages.workout.deleted));
  } catch (error) {
    next(error);
  }
};

// @desc    Log completed workout session
// @route   POST /api/workouts/:id/complete
// @access  Private
const completeWorkout = async (req, res, next) => {
  try {
    const { duration, notes } = req.body;

    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!workout) {
      return res.status(404).json(errorResponse(messages.workout.notFound));
    }

    workout.completedSessions.push({
      date: new Date(),
      duration,
      notes
    });

    await workout.save();

    res.status(200).json(successResponse('האימון נרשם כהושלם', {
      workout,
      totalSessions: workout.completedSessions.length
    }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  getTodayWorkout,
  createWorkout,
  // generateWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout
};
