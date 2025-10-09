import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { ExerciseMatch as ExerciseMatchType } from '../types';

interface ExerciseMatchProps {
  exercise: ExerciseMatchType;
  onComplete: (isCorrect: boolean) => void;
  onNext: () => void;
}

const ExerciseMatch = ({ exercise, onComplete, onNext }: ExerciseMatchProps) => {
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedFrench, setSelectedFrench] = useState<typeof exercise.pairs[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFrenchClick = (item: typeof exercise.pairs[0]) => {
    if (!matchedPairs.includes(item.french)) {
      setSelectedFrench(item);
    }
  };

  const handleRussianClick = (item: typeof exercise.pairs[0]) => {
    if (matchedPairs.includes(item.french)) return;

    if (selectedFrench && selectedFrench.russian === item.russian) {
      const newMatchedPairs = [...matchedPairs, item.french];
      setMatchedPairs(newMatchedPairs);
      setSelectedFrench(null);

      // Check if all pairs are matched
      if (newMatchedPairs.length === exercise.pairs.length) {
        setTimeout(() => {
          setShowResult(true);
          onComplete(true);
        }, 500);
      }
    } else {
      // Wrong match - reset selection
      setSelectedFrench(null);
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {exercise.question}
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-600 text-center">
            Французский
          </h3>
          {exercise.pairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => handleFrenchClick(pair)}
              disabled={matchedPairs.includes(pair.french)}
              className={`w-full p-4 rounded-xl text-xl font-bold transition-all ${
                matchedPairs.includes(pair.french)
                  ? 'bg-green-500 text-white'
                  : selectedFrench?.french === pair.french
                  ? 'bg-purple-600 text-white scale-105'
                  : 'bg-purple-400 text-white hover:bg-purple-500 hover:scale-105'
              }`}
            >
              {pair.emoji} {pair.french}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-pink-600 text-center">
            Русский
          </h3>
          {exercise.pairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => handleRussianClick(pair)}
              disabled={matchedPairs.includes(pair.french)}
              className={`w-full p-4 rounded-xl text-xl font-bold transition-all ${
                matchedPairs.includes(pair.french)
                  ? 'bg-green-500 text-white'
                  : 'bg-pink-400 text-white hover:bg-pink-500 hover:scale-105'
              }`}
            >
              {pair.russian}
            </button>
          ))}
        </div>
      </div>
      {showResult && (
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-3 text-green-600 text-2xl font-bold mb-6">
            <CheckCircle className="w-12 h-12" />
            <span>Отлично! Все пары верны! 🎉</span>
          </div>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transform transition"
          >
            Дальше <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default ExerciseMatch;