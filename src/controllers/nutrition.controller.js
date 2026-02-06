const NutritionLog = require('../models/NutritionLog');
const { messages, successResponse, errorResponse } = require('../utils/hebrewResponses');

// Helper to get start of day
const getStartOfDay = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// @desc    Log a meal
// @route   POST /api/nutrition/log-meal
// @access  Private
const logMeal = async (req, res, next) => {
  try {
    const { mealType, description, protein, calories, carbs, fat, date } = req.body;

    const logDate = date ? getStartOfDay(new Date(date)) : getStartOfDay();

    // Find or create nutrition log for the day
    let nutritionLog = await NutritionLog.findOne({
      user: req.user.id,
      date: logDate
    });

    if (!nutritionLog) {
      nutritionLog = await NutritionLog.create({
        user: req.user.id,
        date: logDate,
        meals: []
      });
    }

    // Add meal
    nutritionLog.meals.push({
      mealType,
      description,
      protein: protein || 0,
      calories: calories || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      time: new Date()
    });

    await nutritionLog.save();

    res.status(201).json(successResponse(messages.nutrition.mealLogged, {
      log: nutritionLog
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's nutrition log
// @route   GET /api/nutrition/today
// @access  Private
const getTodayLog = async (req, res, next) => {
  try {
    const today = getStartOfDay();

    const nutritionLog = await NutritionLog.findOne({
      user: req.user.id,
      date: today
    });

    if (!nutritionLog) {
      return res.status(200).json(successResponse(messages.nutrition.noLogsToday, {
        log: null,
        date: today
      }));
    }

    res.status(200).json(successResponse(messages.general.success, {
      log: nutritionLog
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get nutrition history
// @route   GET /api/nutrition/history
// @access  Private
const getHistory = async (req, res, next) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;

    let query = { user: req.user.id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = getStartOfDay(new Date(startDate));
      if (endDate) query.date.$lte = getStartOfDay(new Date(endDate));
    }

    const logs = await NutritionLog.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.status(200).json(successResponse(messages.general.success, {
      logs,
      count: logs.length
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get weekly summary
// @route   GET /api/nutrition/summary/weekly
// @access  Private
const getWeeklySummary = async (req, res, next) => {
  try {
    const today = getStartOfDay();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const logs = await NutritionLog.find({
      user: req.user.id,
      date: { $gte: weekAgo, $lte: today }
    }).sort({ date: -1 });

    // Calculate averages
    const totalDays = logs.length || 1;
    const totals = logs.reduce((acc, log) => {
      return {
        protein: acc.protein + log.dailyTotals.protein,
        calories: acc.calories + log.dailyTotals.calories,
        carbs: acc.carbs + log.dailyTotals.carbs,
        fat: acc.fat + log.dailyTotals.fat,
        water: acc.water + log.waterIntake
      };
    }, { protein: 0, calories: 0, carbs: 0, fat: 0, water: 0 });

    const averages = {
      protein: Math.round(totals.protein / totalDays),
      calories: Math.round(totals.calories / totalDays),
      carbs: Math.round(totals.carbs / totalDays),
      fat: Math.round(totals.fat / totalDays),
      water: Math.round(totals.water / totalDays)
    };

    res.status(200).json(successResponse(messages.nutrition.weekSummary, {
      period: {
        from: weekAgo,
        to: today
      },
      daysLogged: totalDays,
      totals,
      averages,
      dailyLogs: logs
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update water intake
// @route   PUT /api/nutrition/water
// @access  Private
const updateWaterIntake = async (req, res, next) => {
  try {
    const { amount, date } = req.body;

    if (!amount || amount < 0) {
      return res.status(400).json(errorResponse(messages.validation.invalidNumber('כמות מים')));
    }

    const logDate = date ? getStartOfDay(new Date(date)) : getStartOfDay();

    let nutritionLog = await NutritionLog.findOne({
      user: req.user.id,
      date: logDate
    });

    if (!nutritionLog) {
      nutritionLog = await NutritionLog.create({
        user: req.user.id,
        date: logDate,
        meals: [],
        waterIntake: amount
      });
    } else {
      nutritionLog.waterIntake = amount;
      await nutritionLog.save();
    }

    res.status(200).json(successResponse('צריכת המים עודכנה', {
      waterIntake: nutritionLog.waterIntake,
      date: logDate
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a meal from log
// @route   DELETE /api/nutrition/meal/:logId/:mealId
// @access  Private
const deleteMeal = async (req, res, next) => {
  try {
    const { logId, mealId } = req.params;

    const nutritionLog = await NutritionLog.findOne({
      _id: logId,
      user: req.user.id
    });

    if (!nutritionLog) {
      return res.status(404).json(errorResponse(messages.nutrition.logNotFound));
    }

    // Remove meal
    nutritionLog.meals = nutritionLog.meals.filter(
      meal => meal._id.toString() !== mealId
    );

    await nutritionLog.save();

    res.status(200).json(successResponse(messages.nutrition.mealDeleted, {
      log: nutritionLog
    }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logMeal,
  getTodayLog,
  getHistory,
  getWeeklySummary,
  updateWaterIntake,
  deleteMeal
};
