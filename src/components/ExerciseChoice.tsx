import { useState } from 'react';
import { Volume2, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { ExerciseChoice as ExerciseChoiceType } from '../types';

interface ExerciseChoiceProps {
  exercise: ExerciseChoiceType;
  onComplete: (isCorrect: boolean) => void;
  onNext: () => void;
}

const ExerciseChoice = ({ exercise, onComplete, onNext }: ExerciseChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === exercise.correct;
    onComplete(isCorrect);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">{exercise.image}</div>
        {exercise.display && (
          <div className="text-9xl font-bold text-purple-600 mb-4">
            {exercise.display}
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {exercise.question}
        </h2>
        {exercise.audio && (
          <button
            onClick={() => playAudio(exercise.audio!)}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto hover:bg-blue-600 transition"
          >
            <Volume2 className="w-6 h-6" />
            Послушать
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`p-6 rounded-2xl text-2xl font-bold transition-all transform hover:scale-105 ${
              showResult
                ? index === exercise.correct
                  ? 'bg-green-500 text-white'
                  : selectedAnswer === index
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-500'
                : 'bg-gradient-to-br from-purple-400 to-pink-400 text-white hover:shadow-lg'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-8 text-center">
          {selectedAnswer === exercise.correct ? (
            <div className="flex items-center justify-center gap-3 text-green-600 text-2xl font-bold">
              <CheckCircle className="w-12 h-12" />
              <span>Правильно! Молодец! 🎉</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-red-600 text-2xl font-bold">
              <XCircle className="w-12 h-12" />
              <span>Попробуй ещё раз!</span>
            </div>
          )}
          <button
            onClick={handleNext}
            className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transform transition"
          >
            Дальше <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default ExerciseChoice;