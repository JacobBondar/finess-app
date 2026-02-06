const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  mealType: {
    type: String,
    required: [true, 'סוג הארוחה הוא שדה חובה'],
    enum: ['ארוחת בוקר', 'ארוחת צהריים', 'ארוחת ערב', 'חטיף', 'לפני אימון', 'אחרי אימון']
  },
  description: {
    type: String,
    required: [true, 'תיאור הארוחה הוא שדה חובה'],
    trim: true
  },
  protein: {
    type: Number,
    min: 0,
    default: 0
  },
  calories: {
    type: Number,
    min: 0,
    default: 0
  },
  carbs: {
    type: Number,
    min: 0,
    default: 0
  },
  fat: {
    type: Number,
    min: 0,
    default: 0
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const nutritionLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
  },
  meals: [mealSchema],
  dailyTotals: {
    protein: {
      type: Number,
      default: 0
    },
    calories: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    },
    fat: {
      type: Number,
      default: 0
    }
  },
  waterIntake: {
    type: Number, // in ml
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate daily totals before saving
nutritionLogSchema.pre('save', function(next) {
  this.updatedAt = new Date();

  // Calculate totals from meals
  this.dailyTotals = this.meals.reduce((totals, meal) => {
    return {
      protein: totals.protein + (meal.protein || 0),
      calories: totals.calories + (meal.calories || 0),
      carbs: totals.carbs + (meal.carbs || 0),
      fat: totals.fat + (meal.fat || 0)
    };
  }, { protein: 0, calories: 0, carbs: 0, fat: 0 });

  next();
});

// Index for user and date queries
nutritionLogSchema.index({ user: 1, date: 1 }, { unique: true });
nutritionLogSchema.index({ user: 1 });

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);
