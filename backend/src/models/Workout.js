const mongoose = require('mongoose');
const { MUSCLE_GROUP_VALUES, GOAL_VALUES, DAY_VALUES } = require('../../../shared/constants');

const exerciseInWorkoutSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  sets: {
    type: Number,
    required: [true, 'מספר סטים הוא שדה חובה'],
    min: [1, 'מינימום סט אחד']
  },
  reps: {
    type: Number,
    required: [true, 'מספר חזרות הוא שדה חובה'],
    min: [1, 'מינימום חזרה אחת']
  },
  weight: {
    type: Number,
    min: 0
  },
  restSeconds: {
    type: Number,
    default: 60,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  }
});

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'שם האימון הוא שדה חובה'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exercises: [exerciseInWorkoutSchema],
  targetMuscleGroups: [{
    type: String,
    enum: MUSCLE_GROUP_VALUES
  }],
  estimatedDuration: {
    type: Number, // in minutes
    min: 0
  },
  goal: {
    type: String,
    enum: GOAL_VALUES
  },
  scheduledDays: [{
    type: String,
    enum: DAY_VALUES
  }],
  isTemplate: {
    type: Boolean,
    default: false
  },
  completedSessions: [{
    date: {
      type: Date,
      default: Date.now
    },
    duration: Number, // actual duration in minutes
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
workoutSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for user queries
workoutSchema.index({ user: 1 });
workoutSchema.index({ user: 1, scheduledDays: 1 });

module.exports = mongoose.model('Workout', workoutSchema);
