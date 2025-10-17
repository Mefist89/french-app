import { useState } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import type { ExerciseGrammar as ExerciseGrammarType, GrammarFeedback } from '../types';

interface ExerciseGrammarProps {
  exercise: ExerciseGrammarType;
  onComplete: (isCorrect: boolean) => void;
  onNext: () => void;
}

const ExerciseGrammar = ({ exercise, onComplete, onNext }: ExerciseGrammarProps) => {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<GrammarFeedback | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  const checkGrammar = () => {
    const userAnswer = input.trim();
    const correctAnswer = exercise.correctAnswer;

    const similarity = calculateSimilarity(
      userAnswer.toLowerCase(),
      correctAnswer.toLowerCase()
    );

    let newFeedback: GrammarFeedback;
    if (similarity >= 0.9) {
      newFeedback = {
        correct: true,
        score: 100,
        message: 'Total corect! Foarte bine! 🌟',
        errors: []
      };
      onComplete(true);
    } else if (similarity >= 0.7) {
      newFeedback = {
        correct: false,
        score: 70,
        message: 'Aproape corect! Verifică ortografia. 📝',
        errors: ['Mică eroare de ortografie']
      };
      onComplete(false);
    } else {
      newFeedback = {
        correct: false,
        score: 30,
        message: 'Încearcă din nou. Răspunsul corect este: ' + correctAnswer,
        errors: ['Scriere incorectă']
      };
      onComplete(false);
    }

    setFeedback(newFeedback);
    setShowResult(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() && !showResult) {
      checkGrammar();
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">{exercise.image}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {exercise.question}
        </h2>
        <div className="bg-purple-100 p-4 rounded-xl mb-6">
          <p className="text-gray-600">💡 Подсказка: {exercise.hint}</p>
        </div>
      </div>

      {!showResult && (
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Scrie răspunsul aici..."
            className="w-full p-6 text-2xl border-4 border-purple-300 rounded-2xl mb-6 focus:outline-none focus:border-purple-500"
            autoFocus
          />
          <button
            onClick={checkGrammar}
            disabled={!input.trim()}
            className={`w-full px-8 py-6 rounded-2xl text-2xl font-bold transition-all ${
              input.trim()
                ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white hover:scale-105 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageSquare className="w-8 h-8 inline-block mr-3" />
            Verifică răspunsul
          </button>
        </div>
      )}

      {showResult && feedback && (
        <div className="mt-8 text-center">
          <div
            className={`p-6 rounded-2xl mb-6 ${
              feedback.correct ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className="text-6xl mb-4">
              {feedback.correct ? '✅' : '📝'}
            </div>
            <p
              className={`text-2xl font-bold mb-4 ${
                feedback.correct ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {feedback.message}
            </p>
            <div className="bg-white p-4 rounded-xl mb-4">
              <p className="text-gray-600 mb-2">Răspunsul tău:</p>
              <p className="text-xl font-bold text-gray-800">{input}</p>
              {!feedback.correct && (
                <>
                  <p className="text-gray-600 mt-4 mb-2">Răspunsul corect:</p>
                  <p className="text-xl font-bold text-green-600">
                    {exercise.correctAnswer}
                  </p>
                </>
              )}
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {feedback.score}%
            </div>
            <p className="text-gray-600">Evaluare AI</p>
          </div>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transform transition"
          >
            Mai departe <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default ExerciseGrammar;