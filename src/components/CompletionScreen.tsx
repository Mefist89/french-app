import { Trophy, Home, Star } from 'lucide-react';

interface CompletionScreenProps {
  score: number;
  total: number;
  onBackToMenu: () => void;
  onRetry: () => void;
}

const CompletionScreen = ({ score, total, onBackToMenu, onRetry }: CompletionScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 p-8 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <Trophy className="w-32 h-32 text-yellow-500 mx-auto mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold text-purple-600 mb-4">Отлично!</h1>
        <p className="text-3xl text-gray-700 mb-8">
          Ты набрал {score} из {total} звёзд!
        </p>
        
        {/* Stars Display */}
        <div className="flex gap-3 mb-8 justify-center">
          {[...Array(total)].map((_, i) => (
            <Star
              key={i}
              className={`w-12 h-12 ${
                i < score 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Motivational Message */}
        <div className="mb-8">
          {score === total && (
            <p className="text-2xl text-green-600 font-bold">
              🎉 Perfect! Ești minunat! 🎉
            </p>
          )}
          {score >= total * 0.8 && score < total && (
            <p className="text-2xl text-blue-600 font-bold">
              👏 Foarte bine! Aproape perfect!
            </p>
          )}
          {score >= total * 0.6 && score < total * 0.8 && (
            <p className="text-2xl text-purple-600 font-bold">
              👍 Bine! Continuă să te străduiești!
            </p>
          )}
          {score < total * 0.6 && (
            <p className="text-2xl text-orange-600 font-bold">
              💪 Încearcă din nou, poți reuși!
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transform transition flex items-center gap-2"
          >
            <Home className="w-6 h-6" />
            Înapoi la meniu
          </button>
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transform transition"
          >
            Repetă exercițiul
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;