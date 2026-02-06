const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'שם התרגיל באנגלית הוא שדה חובה'],
    trim: true
  },
  nameHebrew: {
    type: String,
    required: [true, 'שם התרגיל בעברית הוא שדה חובה'],
    trim: true
  },
  muscleGroup: {
    type: String,
    required: [true, 'קבוצת שרירים היא שדה חובה'],
    enum: ['חזה', 'גב', 'כתפיים', 'רגליים', 'ידיים', 'יד קדמית', 'יד אחורית', 'בטן', 'ליבה', 'ישבן', 'שוקיים']
  },
  secondaryMuscles: [{
    type: String,
    enum: ['חזה', 'גב', 'כתפיים', 'רגליים', 'ידיים', 'יד קדמית', 'יד אחורית', 'בטן', 'ליבה', 'ישבן', 'שוקיים']
  }],
  demoUrl: {
    type: String,
    trim: true
  },
  demoType: {
    type: String,
    enum: ['video', 'image'],
    default: 'image'
  },
  difficulty: {
    type: String,
    enum: ['מתחיל', 'בינוני', 'מתקדם'],
    default: 'בינוני'
  },
  instructions: {
    type: String,
    trim: true
  },
  equipment: [{
    type: String,
    trim: true
  }],
  tips: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for searching by muscle group
exerciseSchema.index({ muscleGroup: 1 });
exerciseSchema.index({ nameHebrew: 'text', name: 'text' });

module.exports = mongoose.model('Exercise', exerciseSchema);
