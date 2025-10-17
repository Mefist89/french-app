import { Star, Trophy, Lock } from 'lucide-react';
import type { Module, ModuleProgress } from '../types/index';

interface MainMenuProps {
  moduleProgress: ModuleProgress;
  onModuleSelect: (moduleId: number) => void;
}

const modules: Module[] = [
  { id: 1, title: 'Salutări', emoji: '👋', color: 'from-blue-400 to-purple-400', unlocked: true },
  { id: 2, title: 'Alfabet', emoji: '🔤', color: 'from-green-400 to-teal-400', unlocked: true },
  { id: 3, title: 'Numere 1-10', emoji: '🔢', color: 'from-pink-400 to-red-400', unlocked: true },
  { id: 4, title: 'Culori', emoji: '🎨', color: 'from-yellow-400 to-orange-400', unlocked: true },
  { id: 5, title: 'Animale', emoji: '🐱', color: 'from-purple-400 to-pink-400', unlocked: true },
  { id: 6, title: 'Familie', emoji: '👨‍👩‍👧', color: 'from-red-400 to-orange-400', unlocked: true },
  { id: 7, title: 'Mâncare', emoji: '🍎', color: 'from-indigo-400 to-blue-400', unlocked: true },
  { id: 8, title: 'Școală', emoji: '📚', color: 'from-cyan-400 to-blue-400', unlocked: true },
  { id: 9, title: 'Haine', emoji: '👕', color: 'from-yellow-400 to-amber-400', unlocked: true },
  { id: 10, title: 'Vremea', emoji: '☀️', color: 'from-gray-400 to-slate-400', unlocked: true },
  { id: 11, title: 'Transport', emoji: '🚗', color: 'from-emerald-400 to-green-400', unlocked: true },
  { id: 12, title: 'Casă', emoji: '🏠', color: 'from-orange-400 to-red-400', unlocked: true },
  { id: 13, title: 'Pronunție', emoji: '🎤', color: 'from-rose-400 to-pink-400', unlocked: true },
  { id: 14, title: 'Gramatică', emoji: '✍️', color: 'from-violet-400 to-purple-400', unlocked: true }
];

const MainMenu = ({ moduleProgress, onModuleSelect }: MainMenuProps) => {
  const totalModules = modules.length;
  const completedModules = Object.values(moduleProgress).filter(p => p === 5).length;
  const totalStars = Object.values(moduleProgress).reduce((a, b) => a + b, 0);
  const maxStars = totalModules * 5;

  const handleModuleClick = (module: Module) => {
    if (module.unlocked) {
      onModuleSelect(module.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🇫🇷 Limba Franceză
          </h1>
          <p className="text-2xl text-white/90">Pentru clasa întâi</p>
        </div>

        {/* Modules Grid - 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map((module) => {
            const progress = moduleProgress[module.id] || 0;
            const isCompleted = progress === 5;
            
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module)}
                disabled={!module.unlocked}
                className={`relative bg-white rounded-3xl shadow-2xl p-6 transition-all transform hover:scale-105 hover:shadow-3xl ${
                  module.unlocked ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Module Number Badge */}
                <div className="absolute -top-3 -left-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {module.id}
                </div>

                {/* Lock Icon */}
                {!module.unlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-400 to-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6" />
                  </div>
                )}

                {/* Module Content */}
                <div className="text-center">
                  <div className="text-6xl mb-3">{module.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                  
                  {/* Progress Stars */}
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < progress
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r ${module.color} transition-all`}
                      style={{ width: `${(progress / 5) * 100}%` }}
                    />
                  </div>
                  
                  <p className="text-gray-600 mt-1 text-sm">
                    {progress}/5
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-center">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Total module</p>
              <p className="text-4xl font-bold text-white">{totalModules}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Finalizate</p>
              <p className="text-4xl font-bold text-white">{completedModules}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Total stele</p>
              <p className="text-4xl font-bold text-white">
                {totalStars}/{maxStars}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;