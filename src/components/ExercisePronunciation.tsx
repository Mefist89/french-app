import { useState } from 'react';
import { Mic, Volume2, ArrowRight } from 'lucide-react';
import type { ExercisePronunciation as ExercisePronunciationType, PronunciationFeedback } from '../types';

interface ExercisePronunciationProps {
  exercise: ExercisePronunciationType;
  onComplete: (isCorrect: boolean) => void;
  onNext: () => void;
}

const ExercisePronunciation = ({ exercise, onComplete, onNext }: ExercisePronunciationProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [showResult, setShowResult] = useState(false);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

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

  const startRecording = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      alert('Ne pare rău, browserul tău nu suportă recunoașterea vocală. Încearcă Chrome.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsRecording(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const confidence = event.results[0][0].confidence;
      setRecognizedText(transcript);

      // AI evaluation
      const targetLower = exercise.targetWord.toLowerCase();
      const similarity = calculateSimilarity(transcript, targetLower);

      let newFeedback: PronunciationFeedback;
      if (similarity > 0.8 || transcript.includes(targetLower.split(' ')[0])) {
        newFeedback = {
          correct: true,
          score: Math.round(confidence * 100),
          message: 'Excelent! Pronunția este aproape perfectă! 🎉'
        };
        onComplete(true);
      } else if (similarity > 0.5) {
        newFeedback = {
          correct: false,
          score: Math.round(confidence * 70),
          message: 'Bine, dar se poate îmbunătăți. Încearcă din nou! 👍'
        };
        onComplete(false);
      } else {
        newFeedback = {
          correct: false,
          score: Math.round(confidence * 40),
          message: 'Încearcă din nou. Ascultă atent și repetă! 🎧'
        };
        onComplete(false);
      }

      setFeedback(newFeedback);
      setShowResult(true);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert('Ошибка записи. Попробуйте ещё раз.');
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">{exercise.image}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {exercise.question}
        </h2>
        <div className="bg-blue-100 p-4 rounded-xl mb-4">
          <p className="text-2xl font-bold text-blue-600">{exercise.targetWord}</p>
          <p className="text-gray-600 mt-2">({exercise.hint})</p>
        </div>
        <button
          onClick={() => playAudio(exercise.targetWord)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto hover:bg-blue-600 transition mb-6"
        >
          <Volume2 className="w-6 h-6" />
          Послушать произношение
        </button>
      </div>

      {!showResult && (
        <div className="text-center">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className={`px-12 py-6 rounded-2xl text-2xl font-bold transition-all transform ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gradient-to-br from-red-400 to-pink-400 text-white hover:scale-105 hover:shadow-lg'
            }`}
          >
            <Mic className="w-8 h-8 inline-block mr-3" />
            {isRecording ? 'Se înregistrează... Vorbă!' : 'Apasă și pronunță'}
          </button>
          {recognizedText && (
            <div className="mt-6 bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-600">Ai spus:</p>
              <p className="text-xl font-bold text-gray-800">{recognizedText}</p>
            </div>
          )}
        </div>
      )}

      {showResult && feedback && (
        <div className="mt-8 text-center">
          <div
            className={`p-6 rounded-2xl mb-6 ${
              feedback.correct ? 'bg-green-100' : 'bg-yellow-100'
            }`}
          >
            <div className="text-6xl mb-4">
              {feedback.correct ? '🎉' : '🤔'}
            </div>
            <p
              className={`text-2xl font-bold mb-2 ${
                feedback.correct ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {feedback.message}
            </p>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {feedback.score}%
            </div>
            <p className="text-gray-60">Evaluare AI</p>
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

export default ExercisePronunciation;