// Hebrew response messages - הודעות תגובה בעברית

const messages = {
  // Auth messages - הודעות אימות
  auth: {
    registerSuccess: 'המשתמש נרשם בהצלחה',
    loginSuccess: 'התחברת בהצלחה',
    logoutSuccess: 'התנתקת בהצלחה',
    invalidCredentials: 'אימייל או סיסמה שגויים',
    userExists: 'משתמש עם אימייל זה כבר קיים',
    unauthorized: 'אין הרשאה לבצע פעולה זו',
    tokenExpired: 'פג תוקף ההתחברות, יש להתחבר מחדש',
    tokenMissing: 'חסר אסימון הזדהות',
    tokenInvalid: 'אסימון הזדהות לא תקין'
  },

  // User messages - הודעות משתמש
  user: {
    profileUpdated: 'הפרופיל עודכן בהצלחה',
    weightUpdated: 'המשקל עודכן בהצלחה',
    userNotFound: 'המשתמש לא נמצא',
    invalidData: 'נתונים לא תקינים'
  },

  // Exercise messages - הודעות תרגילים
  exercise: {
    created: 'התרגיל נוצר בהצלחה',
    updated: 'התרגיל עודכן בהצלחה',
    deleted: 'התרגיל נמחק בהצלחה',
    notFound: 'התרגיל לא נמצא',
    listEmpty: 'לא נמצאו תרגילים'
  },

  // Workout messages - הודעות אימונים
  workout: {
    created: 'האימון נוצר בהצלחה',
    updated: 'האימון עודכן בהצלחה',
    deleted: 'האימון נמחק בהצלחה',
    notFound: 'האימון לא נמצא',
    listEmpty: 'לא נמצאו אימונים',
    generated: 'האימון נוצר אוטומטית בהצלחה',
    noWorkoutToday: 'אין אימון מתוכנן להיום'
  },

  // Nutrition messages - הודעות תזונה
  nutrition: {
    mealLogged: 'הארוחה נרשמה בהצלחה',
    mealUpdated: 'הארוחה עודכנה בהצלחה',
    mealDeleted: 'הארוחה נמחקה בהצלחה',
    logNotFound: 'יומן התזונה לא נמצא',
    noLogsToday: 'אין רישומי תזונה להיום',
    weekSummary: 'סיכום שבועי'
  },

  // Validation messages - הודעות אימות נתונים
  validation: {
    required: (field) => `${field} הוא שדה חובה`,
    invalidEmail: 'כתובת אימייל לא תקינה',
    passwordTooShort: 'הסיסמה חייבת להכיל לפחות 6 תווים',
    invalidNumber: (field) => `${field} חייב להיות מספר`,
    minValue: (field, min) => `${field} חייב להיות לפחות ${min}`,
    maxValue: (field, max) => `${field} חייב להיות לכל היותר ${max}`
  },

  // General messages - הודעות כלליות
  general: {
    serverError: 'שגיאת שרת, נסה שוב מאוחר יותר',
    notFound: 'המשאב המבוקש לא נמצא',
    success: 'הפעולה בוצעה בהצלחה',
    invalidId: 'מזהה לא תקין'
  }
};

// Helper function to create standard response
const createResponse = (success, message, data = null) => {
  const response = { success, message };
  if (data !== null) {
    response.data = data;
  }
  return response;
};

// Success response
const successResponse = (message, data = null) => createResponse(true, message, data);

// Error response
const errorResponse = (message) => createResponse(false, message);

module.exports = {
  messages,
  successResponse,
  errorResponse,
  createResponse
};
