import { useState } from 'react';
import MainMenu from './components/MainMenu';
import ModuleScreen from './components/ModuleScreen';
import CompletionScreen from './components/CompletionScreen';
import type { ModuleProgress } from './types/index';

type Screen = 'menu' | 'module' | 'completion';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [moduleScore, setModuleScore] = useState<number>(0);
  const [totalExercises, setTotalExercises] = useState<number>(5);
  
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress>({
    1: 5, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 
    8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0
  });

  const handleModuleSelect = (moduleId: number) => {
    setSelectedModule(moduleId);
    setCurrentScreen('module');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setSelectedModule(null);
  };

  const handleModuleComplete = (score: number, total: number) => {
    setModuleScore(score);
    setTotalExercises(total);
    setCurrentScreen('completion');
    
    // Обновляем прогресс модуля
    if (selectedModule) {
      setModuleProgress(prev => ({
        ...prev,
        [selectedModule]: Math.max(prev[selectedModule] || 0, score)
      }));
    }
  };

  const handleRetryModule = () => {
    setCurrentScreen('module');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'menu' && (
        <MainMenu
          moduleProgress={moduleProgress}
          onModuleSelect={handleModuleSelect}
        />
      )}

      {currentScreen === 'module' && selectedModule && (
        <ModuleScreen
          moduleId={selectedModule}
          onBack={handleBackToMenu}
          onComplete={handleModuleComplete}
        />
      )}

      {currentScreen === 'completion' && (
        <CompletionScreen
          score={moduleScore}
          total={totalExercises}
          onBackToMenu={handleBackToMenu}
          onRetry={handleRetryModule}
        />
      )}
    </div>
  );
}

export default App;