const User = require('../models/User');
const { generateToken } = require('../middleware/auth.middleware');
const { messages, successResponse, errorResponse } = require('../utils/hebrewResponses');

const register = async (req, res, next) => {
  try {
    const { name, email, password, age, currentWeight, height, goal } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(errorResponse(messages.auth.userExists));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      age,
      currentWeight,
      height,
      goal
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json(successResponse(messages.auth.registerSuccess, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        currentWeight: user.currentWeight,
        height: user.height,
        goal: user.goal
      },
      token
    }));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json(errorResponse(messages.validation.required('אימייל וסיסמה')));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json(errorResponse(messages.auth.invalidCredentials));
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json(errorResponse(messages.auth.invalidCredentials));
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json(successResponse(messages.auth.loginSuccess, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        currentWeight: user.currentWeight,
        height: user.height,
        goal: user.goal
      },
      token
    }));
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

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

module.exports = {
  register,
  login,
  getMe
};
