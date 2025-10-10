import { useState } from 'react';
import { Star, Home } from 'lucide-react';
import { getModuleExercises } from '../data/exercises/index';
import ExerciseChoice from './ExerciseChoice';
import ExerciseMatch from './ExerciseMatch';
import ExerciseLetters from './ExerciseLetters';
import ExercisePronunciation from './ExercisePronunciation';
import ExerciseGrammar from './ExerciseGrammar';

interface ModuleScreenProps {
  moduleId: number;
  onBack: () => void;
  onComplete: (score: number, total: number) => void;
}

const moduleNames: Record<number, string> = {
  1: 'Приветствия',
  2: 'Алфавит',
  3: 'Цифры 1-10',
  4: 'Цвета',
  5: 'Животные',
  6: 'Семья',
  7: 'Еда',
  8: 'Школа',
  9: 'Одежда',
  10: 'Погода',
  11: 'Транспорт',
  12: 'Дом',
  13: 'Произношение',
  14: 'Грамматика'
};

const ModuleScreen = ({ moduleId, onBack, onComplete }: ModuleScreenProps) => {
  const exercises = getModuleExercises(moduleId);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [resetKey, setResetKey] = useState(0); // Добавили ключ для сброса

  const currentEx = exercises[currentExercise];
  const moduleName = moduleNames[moduleId] || `Модуль ${moduleId}`;

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect && !completedExercises.includes(currentExercise)) {
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise]);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setResetKey(resetKey + 1); // Увеличиваем ключ при переходе к следующему упражнению
    } else {
      onComplete(score, exercises.length);
    }
  };

  if (!currentEx) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 p-6 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <p className="text-2xl text-gray-700 mb-4">
            Упражнения для этого модуля пока не добавлены
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transform transition"
          >
            Вернуться в меню
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl transition"
            >
              <Home className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold text-purple-600">{moduleName}</h1>
              <p className="text-gray-600">
                Упражнение {currentExercise + 1} из {exercises.length}
              </p>
            </div>
            <div className="flex gap-2">
              {[...Array(exercises.length)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    completedExercises.includes(i)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
              style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {currentEx.type === 'choice' && (
            <ExerciseChoice
              key={resetKey} // Добавили key для сброса состояния
              exercise={currentEx}
              onComplete={handleExerciseComplete}
              onNext={handleNext}
            />
          )}

          {currentEx.type === 'match' && (
            <ExerciseMatch
              key={resetKey} // Добавили key для сброса состояния
              exercise={currentEx}
              onComplete={handleExerciseComplete}
              onNext={handleNext}
            />
          )}

          {currentEx.type === 'letters' && (
            <ExerciseLetters
              key={resetKey} // Добавили key для сброса состояния
              exercise={currentEx}
              onComplete={handleExerciseComplete}
              onNext={handleNext}
            />
          )}

          {currentEx.type === 'pronunciation' && (
            <ExercisePronunciation
              key={resetKey} // Добавили key для сброса состояния
              exercise={currentEx}
              onComplete={handleExerciseComplete}
              onNext={handleNext}
            />
          )}

          {currentEx.type === 'grammar' && (
            <ExerciseGrammar
              key={resetKey} // Добавили key для сброса состояния
              exercise={currentEx}
              onComplete={handleExerciseComplete}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleScreen;