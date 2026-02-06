// Hebrew constants and translations
const MUSCLE_GROUPS = {
  CHEST: { en: 'chest', he: 'חזה' },
  BACK: { en: 'back', he: 'גב' },
  SHOULDERS: { en: 'shoulders', he: 'כתפיים' },
  LEGS: { en: 'legs', he: 'רגליים' },
  ARMS: { en: 'arms', he: 'ידיים' },
  BICEPS: { en: 'biceps', he: 'יד קדמית' },
  TRICEPS: { en: 'triceps', he: 'יד אחורית' },
  ABS: { en: 'abs', he: 'בטן' },
  CORE: { en: 'core', he: 'ליבה' },
  GLUTES: { en: 'glutes', he: 'ישבן' },
  CALVES: { en: 'calves', he: 'שוקיים' }
};

// User goals - מטרות
const GOALS = {
  TONING: { en: 'toning', he: 'חיטוב' },
  MASS_BUILDING: { en: 'mass_building', he: 'בניית מסה' },
  WEIGHT_LOSS: { en: 'weight_loss', he: 'ירידה במשקל' },
  MAINTENANCE: { en: 'maintenance', he: 'שמירה' },
  STRENGTH: { en: 'strength', he: 'כוח' },
  ENDURANCE: { en: 'endurance', he: 'סיבולת' }
};

// Meal types - סוגי ארוחות
const MEAL_TYPES = {
  BREAKFAST: { en: 'breakfast', he: 'ארוחת בוקר' },
  LUNCH: { en: 'lunch', he: 'ארוחת צהריים' },
  DINNER: { en: 'dinner', he: 'ארוחת ערב' },
  SNACK: { en: 'snack', he: 'חטיף' },
  PRE_WORKOUT: { en: 'pre_workout', he: 'לפני אימון' },
  POST_WORKOUT: { en: 'post_workout', he: 'אחרי אימון' }
};

// Difficulty levels - רמות קושי
const DIFFICULTY = {
  BEGINNER: { en: 'beginner', he: 'מתחיל' },
  INTERMEDIATE: { en: 'intermediate', he: 'בינוני' },
  ADVANCED: { en: 'advanced', he: 'מתקדם' }
};

// Days of week - ימי השבוע
const DAYS = {
  SUNDAY: { en: 'sunday', he: 'ראשון' },
  MONDAY: { en: 'monday', he: 'שני' },
  TUESDAY: { en: 'tuesday', he: 'שלישי' },
  WEDNESDAY: { en: 'wednesday', he: 'רביעי' },
  THURSDAY: { en: 'thursday', he: 'חמישי' },
  FRIDAY: { en: 'friday', he: 'שישי' },
  SATURDAY: { en: 'saturday', he: 'שבת' }
};

// Helper function to extract Hebrew values for enum arrays
const getHebrewValues = (obj) => Object.values(obj).map(item => item.he);

module.exports = {
  MUSCLE_GROUPS,
  GOALS,
  MEAL_TYPES,
  DIFFICULTY,
  DAYS,
  // Pre-computed enum arrays for model schemas
  MUSCLE_GROUP_VALUES: getHebrewValues(MUSCLE_GROUPS),
  GOAL_VALUES: getHebrewValues(GOALS),
  MEAL_TYPE_VALUES: getHebrewValues(MEAL_TYPES),
  DIFFICULTY_VALUES: getHebrewValues(DIFFICULTY),
  DAY_VALUES: getHebrewValues(DAYS)
};
