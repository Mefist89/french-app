import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { ExerciseLetters as ExerciseLettersType } from '../types';

interface ExerciseLettersProps {
  exercise: ExerciseLettersType;
  onComplete: (isCorrect: boolean) => void;
  onNext: () => void;
}

interface SelectedLetter {
  letter: string;
  index: number;
}

const ExerciseLetters = ({ exercise, onComplete, onNext }: ExerciseLettersProps) => {
  const [selectedLetters, setSelectedLetters] = useState<SelectedLetter[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleLetterClick = (letter: string, index: number) => {
    if (selectedLetters.length < exercise.word.length && !showResult) {
      const newSelectedLetters = [...selectedLetters, { letter, index }];
      setSelectedLetters(newSelectedLetters);

      // Check if word is complete
      if (newSelectedLetters.length === exercise.word.length) {
        const word = newSelectedLetters.map((l) => l.letter).join('');
        setTimeout(() => {
          const isCorrect = word === exercise.word;
          setShowResult(true);
          onComplete(isCorrect);
        }, 300);
      }
    }
  };

  const removeLastLetter = () => {
    setSelectedLetters(selectedLetters.slice(0, -1));
  };

  const handleNext = () => {
    onNext();
  };

  const handleRetry = () => {
    setSelectedLetters([]);
    setShowResult(false);
  };

  const isLetterUsed = (index: number) => {
    return selectedLetters.some((l) => l.index === index);
  };

  const isCorrect = selectedLetters.map((l) => l.letter).join('') === exercise.word;

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {exercise.question}
      </h2>

      <div className="mb-8 bg-purple-100 p-6 rounded-2xl min-h-[100px] flex items-center justify-center gap-2">
        {selectedLetters.length === 0 ? (
          <span className="text-gray-400 text-2xl">Нажми на буквы...</span>
        ) : (
          selectedLetters.map((item, index) => (
            <div
              key={index}
              className="bg-purple-500 text-white w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold"
            >
              {item.letter}
            </div>
          ))
        )}
      </div>

      {selectedLetters.length > 0 && !showResult && (
        <div className="text-center mb-6">
          <button
            onClick={removeLastLetter}
            className="bg-red-400 text-white px-6 py-3 rounded-xl hover:bg-red-500 transition"
          >
            Удалить последнюю букву
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {exercise.letters.map((letter, index) => {
          const used = isLetterUsed(index);
          return (
            <button
              key={index}
              onClick={() => handleLetterClick(letter, index)}
              disabled={used || showResult}
              className={`p-6 rounded-2xl text-3xl font-bold transition-all ${
                used
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white hover:scale-110 hover:shadow-lg'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-8 text-center">
          {isCorrect ? (
            <>
              <div className="flex items-center justify-center gap-3 text-green-600 text-2xl font-bold mb-6">
                <CheckCircle className="w-12 h-12" />
                <span>Правильно! Молодец! 🎉</span>
              </div>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transform transition"
              >
                Дальше <ArrowRight className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 text-red-600 text-2xl font-bold mb-6">
                <XCircle className="w-12 h-12" />
                <span>Попробуй ещё раз!</span>
              </div>
              <button
                onClick={handleRetry}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl text-xl font-bold mx-auto hover:scale-105 transform transition"
              >
                Попробовать снова
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ExerciseLetters;