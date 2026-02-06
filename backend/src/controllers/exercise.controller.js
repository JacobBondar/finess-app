const Exercise = require('../models/Exercise');
const { messages, successResponse, errorResponse } = require('../utils/hebrewResponses');

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res, next) => {
  try {
    const { difficulty, search } = req.query;

    let query = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameHebrew: { $regex: search, $options: 'i' } }
      ];
    }

    const exercises = await Exercise.find(query).sort({ nameHebrew: 1 });

    if (exercises.length === 0) {
      return res.status(200).json(successResponse(messages.exercise.listEmpty, { exercises: [] }));
    }

    res.status(200).json(successResponse(messages.general.success, { exercises }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single exercise
// @route   GET /api/exercises/:id
// @access  Public
const getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json(errorResponse(messages.exercise.notFound));
    }

    res.status(200).json(successResponse(messages.general.success, { exercise }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get exercises by muscle group
// @route   GET /api/exercises/muscle/:group
// @access  Public
const getExercisesByMuscle = async (req, res, next) => {
  try {
    const { group } = req.params;

    const exercises = await Exercise.find({
      $or: [
        { muscleGroup: group },
        { secondaryMuscles: group }
      ]
    }).sort({ nameHebrew: 1 });

    if (exercises.length === 0) {
      return res.status(200).json(successResponse(messages.exercise.listEmpty, { exercises: [] }));
    }

    res.status(200).json(successResponse(messages.general.success, { exercises }));
  } catch (error) {
    next(error);
  }
};

// @desc    Create exercise
// @route   POST /api/exercises
// @access  Private (Admin)
const createExercise = async (req, res, next) => {
  try {
    const {
      name,
      nameHebrew,
      muscleGroup,
      secondaryMuscles,
      demoUrl,
      demoType,
      difficulty,
      instructions,
      equipment,
      tips
    } = req.body;

    const exercise = await Exercise.create({
      name,
      nameHebrew,
      muscleGroup,
      secondaryMuscles,
      demoUrl,
      demoType,
      difficulty,
      instructions,
      equipment,
      tips
    });

    res.status(201).json(successResponse(messages.exercise.created, { exercise }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private (Admin)
const updateExercise = async (req, res, next) => {
  try {
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json(errorResponse(messages.exercise.notFound));
    }

    exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(successResponse(messages.exercise.updated, { exercise }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private (Admin)
const deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json(errorResponse(messages.exercise.notFound));
    }

    await exercise.deleteOne();

    res.status(200).json(successResponse(messages.exercise.deleted));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExercises,
  getExercise,
  getExercisesByMuscle,
  createExercise,
  updateExercise,
  deleteExercise
};
