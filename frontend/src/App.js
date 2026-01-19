import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { generateArray } from './utils/generateArray';
import { 
  algorithms, 
  algorithmList 
} from './algorithms';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import UserMenu from './components/auth/UserMenu';
import ArrayVisualizer from './components/ArrayVisualizer';

// ==================== КОМПОНЕНТЫ АВТОРИЗАЦИИ ====================

// Компонент для кнопки входа
const LoginButton = ({ onClick }) => (
  <button 
    className="login-button"
    onClick={onClick}
  >
    Войти / Регистрация
  </button>
);

// Главный компонент с auth логикой - ОТДЕЛЬНЫЙ от AlgorithmVisualizer
const AppContent = () => {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Визуализатор алгоритмов</h1>
          <div className="auth-section">
            {user ? (
              <UserMenu />
            ) : (
              <LoginButton onClick={() => setIsAuthModalOpen(true)} />
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <AlgorithmVisualizer /> 
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

// Обёртка App с AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

// ==================== КОМПОНЕНТ ВИЗУАЛИЗАЦИИ АЛГОРИТМОВ ====================

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState(generateArray(6));
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  
  const timerRef = useRef(null);

  // Генерация шагов
  useEffect(() => {
    console.log(`Генерируем шаги для алгоритма: ${selectedAlgorithm}...`);
    
    const algorithm = algorithms[selectedAlgorithm];
    if (!algorithm || !algorithm.function) {
      console.error('Алгоритм не найден:', selectedAlgorithm);
      return;
    }
    
    const newSteps = algorithm.function(array);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsSorted(false);
    setIsPlaying(false);
    
    console.log(`Сгенерировано ${newSteps.length} шагов`);
  }, [array, selectedAlgorithm]);

  // Логика анимации
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (isPlaying && currentStep < steps.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1 && steps.length > 0) {
      setIsPlaying(false);
      setIsSorted(true);
      console.log('✅ Сортировка завершена!');
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // Функции управления
  const handleNewArray = () => {
    setIsPlaying(false);
    const newSize = Math.floor(Math.random() * 6) + 5;
    setArray(generateArray(newSize));
  };

  const handleAlgorithmChange = (algorithmId) => {
    setIsPlaying(false);
    setSelectedAlgorithm(algorithmId);
    setCurrentStep(0);
    setIsSorted(false);
  };

  const handlePlayPause = () => {
    if (isSorted) {
      setCurrentStep(0);
      setIsSorted(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setIsSorted(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(false);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 10);
    }
  };

  // Данные текущего шага
  const currentStepData = steps[currentStep] || {
    array: array,
    comparing: [],
    swapped: [],
    description: "Готов к сортировке..."
  };

  // Прогресс в процентах
  const progressPercent = steps.length > 0 
    ? Math.round((currentStep / (steps.length - 1)) * 100) 
    : 0;

  // ==================== РЕНДЕР КОМПОНЕНТА ВИЗУАЛИЗАЦИИ ====================

  return (
    <div className="algorithm-visualizer">
      <div className="visualization-section">
      <ArrayVisualizer
        array={currentStepData.array}
        comparing={currentStepData.comparing}
        swapped={currentStepData.swapped}
      />
        
        <div className={`step-description ${isSorted ? 'sorted' : ''}`}>
          {isSorted ? '✅ ' : '📝 '}
          {currentStepData.description}
        </div>
        
        <div className="algorithm-info">
          <h3>{algorithms[selectedAlgorithm]?.info.name || 'Алгоритм'}</h3>
          <div className="complexity">
            <span className="complexity-item">
              <strong>Сложность по времени:</strong> {algorithms[selectedAlgorithm]?.info.timeComplexity}
            </span>
            <span className="complexity-item">
              <strong>Память:</strong> {algorithms[selectedAlgorithm]?.info.spaceComplexity}
            </span>
          </div>
          <p className="algorithm-description">
            {algorithms[selectedAlgorithm]?.info.description}
          </p>
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercent}%` }}
          ></div>
          <span className="progress-text">
            Шаг {currentStep + 1} из {steps.length} ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="controls-panel">
        <div className="algorithm-selector">
          <label htmlFor="algorithm-select">Выберите алгоритм:</label>
          <select 
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => handleAlgorithmChange(e.target.value)}
            className="algorithm-dropdown"
          >
            {algorithmList.map(algo => (
              <option key={algo.id} value={algo.id}>
                {algo.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="button-group">
          <button className="btn new-array" onClick={handleNewArray}>
            🎲 Новый массив
          </button>
          <button 
            className="btn step-back"
            onClick={handleStepBackward}
            disabled={currentStep === 0}
          >
            ⏪ Шаг назад
          </button>
          <button 
            className={`btn play-pause ${isPlaying ? 'pause' : 'play'}`}
            onClick={handlePlayPause}
          >
            {isPlaying ? '⏸ Пауза' : isSorted ? '🔄 С начала' : '▶ Старт'}
          </button>
          <button 
            className="btn step-forward"
            onClick={handleStepForward}
            disabled={currentStep >= steps.length - 1}
          >
            ⏩ Шаг вперёд
          </button>
          <button className="btn reset" onClick={handleReset}>
            🔄 Сброс
          </button>
        </div>
        
        <div className="speed-control">
          <label>Скорость анимации:</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={1000 - speed}
            onChange={(e) => handleSpeedChange(1000 - parseInt(e.target.value))}
            className="speed-slider"
          />
          <div className="speed-labels">
            <span>Быстро ({speed}мс)</span>
            <span>Медленно</span>
          </div>
        </div>
        
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Элементов:</span>
            <span className="stat-value">{array.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Всего шагов:</span>
            <span className="stat-value">{steps.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Статус:</span>
            <span className={`stat-value ${isSorted ? 'sorted' : ''}`}>
              {isSorted ? 'Отсортировано' : isPlaying ? 'Сортируется...' : 'Готово'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="array-info">
        <details>
          <summary>📊 Информация о массиве (кликните чтобы раскрыть)</summary>
          <div className="info-content">
            <p>Текущие значения: <code>[{currentStepData.array.join(', ')}]</code></p>
            <p>Сравниваемые индексы: <code>[{currentStepData.comparing.join(', ') || 'нет'}]</code></p>
            <p>Обменяные индексы: <code>[{currentStepData.swapped.join(', ') || 'нет'}]</code></p>
            <p>Сгенерированные шаги: {steps.length}</p>
          </div>
        </details>
      </div>
      
      <div className="comparison-section">
        <h3>📊 Сравнение алгоритмов</h3>
        <div className="algorithm-cards">
          {Object.entries(algorithms).map(([id, algo]) => (
            <div 
              key={id}
              className={`algorithm-card ${selectedAlgorithm === id ? 'selected' : ''}`}
              onClick={() => handleAlgorithmChange(id)}
            >
              <h4>{algo.info.name}</h4>
              <div className="algorithm-stats">
                <div><strong>Сложность:</strong> {algo.info.timeComplexity}</div>
                <div><strong>Память:</strong> {algo.info.spaceComplexity}</div>
                <div><strong>Шагов для текущего массива:</strong> {algo.function(array).length}</div>
              </div>
              <p>{algo.info.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="live-stats">
        <div className="stat-card">
          <div className="stat-title">Текущий алгоритм</div>
          <div className="stat-value">{algorithms[selectedAlgorithm]?.name || '—'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Всего шагов</div>
          <div className="stat-value">{steps.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Текущий шаг</div>
          <div className="stat-value">{currentStep + 1}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Скорость</div>
          <div className="stat-value">{speed}мс</div>
        </div>
      </div>
    </div>
  );
};

export default App; // Экспортируем главный App