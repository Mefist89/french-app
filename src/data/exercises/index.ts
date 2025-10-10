import type { Exercise } from '../../types/index';
import { module1Exercises } from './module1-greetings';
import { module2Exercises } from './module2-alphabet';
import { module5Exercises } from './module5-animals';
import { module13Exercises } from './module13-pronunciation';
import { module14Exercises } from './module14-grammar';

export const exercisesData: Record<number, Exercise[]> = {
  1: module1Exercises,
  2: module2Exercises,
  5: module5Exercises,
  13: module13Exercises,
  14: module14Exercises
};

export const getModuleExercises = (moduleId: number): Exercise[] => {
  return exercisesData[moduleId] || [];
};