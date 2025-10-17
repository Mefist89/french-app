import { useState, useEffect } from 'react';
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
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (text: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  const playSequence = async () => {
    if (isPlaying || !exercise.audio || !exercise.display) return;
    
    setIsPlaying(true);
    
    // For alphabet module (if display format is "A - Avion")
    if (exercise.display.includes(' - ')) {
      const [letter, word] = exercise.display.split(' - ');
      
      // 1. Pronounce the letter
      await playAudio(letter);
      await new Promise(resolve => setTimeout(resolve, 500)); // пауза 0.5 сек
      
      // 2. Pronounce the word
      await playAudio(word);
      await new Promise(resolve => setTimeout(resolve, 500)); // пауза 0.5 сек
      
      // 3. Pronounce the letter again for reinforcement
      await playAudio(letter);
    } else {
      // Обычное произношение для других упражнений
      await playAudio(exercise.audio);
    }
    
    setIsPlaying(false);
  };

  // Автоматически проигрываем при загрузке упражнения
  useEffect(() => {
    const timer = setTimeout(() => {
      playSequence();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [exercise.id]);

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
          <div className="text-6xl font-bold text-purple-600 mb-4">
            {exercise.display}
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {exercise.question}
        </h2>
        {exercise.audio && (
          <button
            onClick={playSequence}
            disabled={isPlaying}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition ${
              isPlaying 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            {isPlaying ? 'Se redă...' : 'Ascultă din nou'}
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
              <span>Corect! Bravo! 🎉</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-red-600 text-2xl font-bold">
              <XCircle className="w-12 h-12" />
              <span>Încearcă din nou!</span>
            </div>
          )}
          <button
            onClick={handleNext}
            className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transform transition"
          >
            Mai departe <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default ExerciseChoice;