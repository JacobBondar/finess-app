const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { GOAL_VALUES } = require('../../../shared/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'שם הוא שדה חובה'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'אימייל הוא שדה חובה'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'כתובת אימייל לא תקינה']
  },
  password: {
    type: String,
    required: [true, 'סיסמה היא שדה חובה'],
    minlength: [6, 'הסיסמה חייבת להכיל לפחות 6 תווים'],
    select: false
  },
  age: {
    type: Number,
    min: [13, 'גיל מינימלי הוא 13'],
    max: [120, 'גיל לא תקין']
  },
  currentWeight: {
    type: Number,
    min: [20, 'משקל לא תקין'],
    max: [500, 'משקל לא תקין']
  },
  height: {
    type: Number,
    min: [50, 'גובה לא תקין'],
    max: [300, 'גובה לא תקין']
  },
  goal: {
    type: String,
    enum: GOAL_VALUES,
    default: 'חיטוב'
  },
  cholesterolLevel: {
    type: Number,
    min: 0
  },
  weightHistory: [{
    weight: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add weight to history when currentWeight is modified
userSchema.pre('save', function(next) {
  if (this.isModified('currentWeight') && this.currentWeight) {
    this.weightHistory.push({
      weight: this.currentWeight,
      date: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
