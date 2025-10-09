export interface Module {
  id: number;
  title: string;
  emoji: string;
  color: string;
  unlocked: boolean;
}

export interface ExerciseChoice {
  id: number;
  type: 'choice';
  question: string;
  image: string;
  display?: string;
  options: string[];
  correct: number;
  audio?: string;
}

export interface ExerciseMatch {
  id: number;
  type: 'match';
  question: string;
  pairs: Array<{
    french: string;
    russian: string;
    emoji: string;
  }>;
}

export interface ExerciseLetters {
  id: number;
  type: 'letters';
  question: string;
  word: string;
  letters: string[];
}

export interface ExercisePronunciation {
  id: number;
  type: 'pronunciation';
  question: string;
  targetWord: string;
  image: string;
  hint: string;
}

export interface ExerciseGrammar {
  id: number;
  type: 'grammar';
  question: string;
  correctAnswer: string;
  hint: string;
  image: string;
}

export type Exercise = 
  | ExerciseChoice 
  | ExerciseMatch 
  | ExerciseLetters 
  | ExercisePronunciation 
  | ExerciseGrammar;

export interface ModuleProgress {
  [key: number]: number;
}

export interface PronunciationFeedback {
  correct: boolean;
  score: number;
  message: string;
}

export interface GrammarFeedback {
  correct: boolean;
  score: number;
  message: string;
  errors: string[];
}