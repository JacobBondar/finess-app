require('dotenv').config();

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const connectDB = require('../config/db');

const exercises = [
  {
    name: 'Push-ups',
    nameHebrew: 'שכיבות סמיכה',
    muscleGroup: 'חזה',
    secondaryMuscles: ['כתפיים', 'יד אחורית'],
    difficulty: 'מתחיל',
    instructions: 'שכבו על הבטן, הניחו את כפות הידיים על הרצפה ברוחב כתפיים. הרימו את הגוף תוך שמירה על גב ישר, ואז הורידו בחזרה.',
    equipment: [],
    tips: ['שמרו על הליבה מכווצת', 'אל תתנו לירכיים לצנוח']
  },
  {
    name: 'Squats',
    nameHebrew: 'סקוואטים',
    muscleGroup: 'רגליים',
    secondaryMuscles: ['ישבן', 'ליבה'],
    difficulty: 'מתחיל',
    instructions: 'עמדו ברוחב כתפיים, הורידו את הגוף כאילו אתם יושבים על כיסא. שמרו על הברכיים מעל קצות האצבעות.',
    equipment: [],
    tips: ['שמרו על הגב ישר', 'דחפו את הברכיים החוצה']
  },
  {
    name: 'Pull-ups',
    nameHebrew: 'מתח',
    muscleGroup: 'גב',
    secondaryMuscles: ['יד קדמית', 'כתפיים'],
    difficulty: 'מתקדם',
    instructions: 'אחזו במוט בגריפ רחב מהכתפיים, משכו את הגוף למעלה עד שהסנטר מעל המוט.',
    equipment: ['מוט מתח'],
    tips: ['הימנעו מנדנוד', 'כווצו את השכמות']
  },
  {
    name: 'Crunches',
    nameHebrew: 'כפיפות בטן',
    muscleGroup: 'בטן',
    secondaryMuscles: [],
    difficulty: 'מתחיל',
    instructions: 'שכבו על הגב עם ברכיים כפופות, הניחו ידיים מאחורי הראש, הרימו את הכתפיים מהרצפה תוך כיווץ הבטן.',
    equipment: [],
    tips: ['אל תמשכו את הצוואר', 'התמקדו בכיווץ הבטן']
  },
  {
    name: 'Bench Press',
    nameHebrew: 'לחיצת חזה',
    muscleGroup: 'חזה',
    secondaryMuscles: ['כתפיים', 'יד אחורית'],
    difficulty: 'בינוני',
    instructions: 'שכבו על ספסל ישר, הורידו את המוט לחזה ודחפו למעלה.',
    equipment: ['ספסל', 'מוט', 'משקולות'],
    tips: ['שמרו על כתפיים מקובעות לספסל', 'הוזילו באיטיות']
  },
  {
    name: 'Deadlift',
    nameHebrew: 'דדליפט',
    muscleGroup: 'גב',
    secondaryMuscles: ['רגליים', 'ישבן', 'ליבה'],
    difficulty: 'מתקדם',
    instructions: 'עמדו מול מוט ברוחב כתפיים, התכופפו ואחזו במוט, הרימו תוך שמירה על גב ישר.',
    equipment: ['מוט', 'משקולות'],
    tips: ['שמרו על הגב ישר לאורך כל התנועה', 'דחפו דרך העקבים']
  },
  {
    name: 'Lateral Raises',
    nameHebrew: 'כתפיים צד',
    muscleGroup: 'כתפיים',
    secondaryMuscles: [],
    difficulty: 'מתחיל',
    instructions: 'עמדו עם משקולות בידיים, הרימו את הידיים הצידה עד גובה הכתפיים.',
    equipment: ['משקולות'],
    tips: ['אל תנדנדו את הגוף', 'שלטו בתנועה']
  },
  {
    name: 'Bicep Curls',
    nameHebrew: 'ביצפס עם משקולות',
    muscleGroup: 'יד קדמית',
    secondaryMuscles: [],
    difficulty: 'מתחיל',
    instructions: 'עמדו עם משקולות בידיים, כפפו את המרפקים והרימו את המשקולות לכתפיים.',
    equipment: ['משקולות'],
    tips: ['שמרו על המרפקים צמודים לגוף', 'הימנעו מנדנוד']
  },
  {
    name: 'Tricep Dips',
    nameHebrew: 'טריצפס על ספסל',
    muscleGroup: 'יד אחורית',
    secondaryMuscles: ['כתפיים', 'חזה'],
    difficulty: 'בינוני',
    instructions: 'שבו על קצה ספסל, הניחו ידיים על הקצה, הורידו את הגוף והרימו חזרה.',
    equipment: ['ספסל'],
    tips: ['שמרו על מרפקים כלפי אחורה', 'אל תרדו נמוך מדי']
  },
  {
    name: 'Lunges',
    nameHebrew: 'לאנג׳ים',
    muscleGroup: 'רגליים',
    secondaryMuscles: ['ישבן', 'ליבה'],
    difficulty: 'מתחיל',
    instructions: 'צעדו קדימה עם רגל אחת, הורידו את הברך האחורית כלפי הרצפה, ודחפו חזרה.',
    equipment: [],
    tips: ['שמרו על פלג גוף עליון ישר', 'הברך הקדמית לא חורגת מקצה הרגל']
  },
  {
    name: 'Plank',
    nameHebrew: 'פלאנק',
    muscleGroup: 'ליבה',
    secondaryMuscles: ['בטן', 'כתפיים'],
    difficulty: 'מתחיל',
    instructions: 'שכבו על הבטן, הרימו את הגוף על המרפקים וקצות האצבעות, שמרו על קו ישר.',
    equipment: [],
    tips: ['אל תתנו לירכיים לעלות או לרדת', 'כווצו את הבטן']
  },
  {
    name: 'Shoulder Press',
    nameHebrew: 'לחיצת כתפיים',
    muscleGroup: 'כתפיים',
    secondaryMuscles: ['יד אחורית'],
    difficulty: 'בינוני',
    instructions: 'שבו או עמדו עם משקולות בגובה הכתפיים, דחפו למעלה עד יישור הידיים.',
    equipment: ['משקולות'],
    tips: ['אל תקשתו את הגב', 'שמרו על ליבה יציבה']
  },
  {
    name: 'Leg Press',
    nameHebrew: 'מכבש רגליים',
    muscleGroup: 'רגליים',
    secondaryMuscles: ['ישבן'],
    difficulty: 'בינוני',
    instructions: 'שבו במכונה, הניחו רגליים על הפלטפורמה ודחפו עד כמעט יישור הברכיים.',
    equipment: ['מכונת מכבש רגליים'],
    tips: ['אל תנעלו את הברכיים', 'שלטו בתנועה']
  },
  {
    name: 'Lat Pulldown',
    nameHebrew: 'משיכה עליונה',
    muscleGroup: 'גב',
    secondaryMuscles: ['יד קדמית'],
    difficulty: 'בינוני',
    instructions: 'שבו במכונה, אחזו במוט ומשכו כלפי מטה עד החזה.',
    equipment: ['מכונת משיכה עליונה'],
    tips: ['הימנעו מלהישען אחורה', 'כווצו את השכמות']
  },
  {
    name: 'Romanian Deadlift',
    nameHebrew: 'דדליפט רומני',
    muscleGroup: 'רגליים',
    secondaryMuscles: ['גב', 'ישבן'],
    difficulty: 'בינוני',
    instructions: 'עמדו עם מוט, הורידו אותו לאורך הרגליים תוך שמירה על רגליים כמעט ישרות.',
    equipment: ['מוט', 'משקולות'],
    tips: ['שמרו על גב ישר', 'הרגישו מתיחה בירכיים האחוריות']
  },
  {
    name: 'Cable Rows',
    nameHebrew: 'חתירה בכבל',
    muscleGroup: 'גב',
    secondaryMuscles: ['יד קדמית'],
    difficulty: 'בינוני',
    instructions: 'שבו מול מכונת כבלים, משכו את הידית לבטן תוך כיווץ השכמות.',
    equipment: ['מכונת כבלים'],
    tips: ['שמרו על גב ישר', 'אל תעזרו בנדנוד']
  },
  {
    name: 'Mountain Climbers',
    nameHebrew: 'מטפסי הרים',
    muscleGroup: 'ליבה',
    secondaryMuscles: ['בטן', 'רגליים', 'כתפיים'],
    difficulty: 'בינוני',
    instructions: 'התחילו בתנוחת שכיבות סמיכה, הביאו ברך אחת לחזה ואז החליפו במהירות.',
    equipment: [],
    tips: ['שמרו על ירכיים נמוכות', 'נשמו באופן סדיר']
  },
  {
    name: 'Leg Curls',
    nameHebrew: 'כיפוף ירכיים',
    muscleGroup: 'רגליים',
    secondaryMuscles: [],
    difficulty: 'מתחיל',
    instructions: 'שכבו על מכונת כיפוף ירכיים, כפפו את הרגליים כלפי הישבן.',
    equipment: ['מכונת כיפוף ירכיים'],
    tips: ['שלטו בתנועה', 'אל תרימו את הירכיים מהספסל']
  },
  {
    name: 'Calf Raises',
    nameHebrew: 'הרמות שוקיים',
    muscleGroup: 'שוקיים',
    secondaryMuscles: [],
    difficulty: 'מתחיל',
    instructions: 'עמדו על קצות האצבעות, הרימו את העקבים גבוה ככל האפשר, והורידו לאט.',
    equipment: [],
    tips: ['עשו את התנועה באיטיות', 'סחטו בנקודה העליונה']
  },
  {
    name: 'Russian Twist',
    nameHebrew: 'סיבוב רוסי',
    muscleGroup: 'בטן',
    secondaryMuscles: ['ליבה'],
    difficulty: 'בינוני',
    instructions: 'שבו עם ברכיים כפופות, הרימו רגליים מהרצפה, סובבו את פלג הגוף העליון משמאל לימין.',
    equipment: ['משקולת (אופציונלי)'],
    tips: ['שמרו על גב ישר', 'שלטו בתנועה']
  }
];

const seedExercises = async () => {
  try {
    await connectDB();

    // Clear existing exercises
    await Exercise.deleteMany({});
    console.log('נמחקו תרגילים קיימים');

    // Insert new exercises
    await Exercise.insertMany(exercises);
    console.log(`נוספו ${exercises.length} תרגילים בהצלחה`);

    process.exit(0);
  } catch (error) {
    console.error(`שגיאה: ${error.message}`);
    process.exit(1);
  }
};

seedExercises();
