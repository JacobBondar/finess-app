// Re-export shared constants from root shared folder
// This allows importing like: import { MUSCLE_GROUPS } from '../constants';

const {
  MUSCLE_GROUPS,
  GOALS,
  MEAL_TYPES,
  DIFFICULTY,
  DAYS,
  MUSCLE_GROUP_VALUES,
  GOAL_VALUES,
  MEAL_TYPE_VALUES,
  DIFFICULTY_VALUES,
  DAY_VALUES
} = require('../../../shared/constants');

export {
  MUSCLE_GROUPS,
  GOALS,
  MEAL_TYPES,
  DIFFICULTY,
  DAYS,
  MUSCLE_GROUP_VALUES,
  GOAL_VALUES,
  MEAL_TYPE_VALUES,
  DIFFICULTY_VALUES,
  DAY_VALUES
};
