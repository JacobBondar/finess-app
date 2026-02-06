const User = require('../models/User');
const { messages, successResponse, errorResponse } = require('../utils/hebrewResponses');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json(errorResponse(messages.user.userNotFound));
    }

    res.status(200).json(successResponse(messages.general.success, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        currentWeight: user.currentWeight,
        height: user.height,
        goal: user.goal,
        cholesterolLevel: user.cholesterolLevel,
        weightHistory: user.weightHistory,
        createdAt: user.createdAt
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, age, height, goal, cholesterolLevel } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json(errorResponse(messages.user.userNotFound));
    }

    // Update fields
    if (name) user.name = name;
    if (age) user.age = age;
    if (height) user.height = height;
    if (goal) user.goal = goal;
    if (cholesterolLevel !== undefined) user.cholesterolLevel = cholesterolLevel;

    await user.save();

    res.status(200).json(successResponse(messages.user.profileUpdated, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        currentWeight: user.currentWeight,
        height: user.height,
        goal: user.goal,
        cholesterolLevel: user.cholesterolLevel
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update user weight
// @route   PUT /api/users/weight
// @access  Private
const updateWeight = async (req, res, next) => {
  try {
    const { weight } = req.body;

    if (!weight || weight < 20 || weight > 500) {
      return res.status(400).json(errorResponse(messages.validation.invalidNumber('משקל')));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json(errorResponse(messages.user.userNotFound));
    }

    user.currentWeight = weight;
    await user.save();

    res.status(200).json(successResponse(messages.user.weightUpdated, {
      currentWeight: user.currentWeight,
      weightHistory: user.weightHistory
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get weight history
// @route   GET /api/users/weight-history
// @access  Private
const getWeightHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('weightHistory currentWeight');

    if (!user) {
      return res.status(404).json(errorResponse(messages.user.userNotFound));
    }

    res.status(200).json(successResponse(messages.general.success, {
      currentWeight: user.currentWeight,
      weightHistory: user.weightHistory
    }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateWeight,
  getWeightHistory
};
