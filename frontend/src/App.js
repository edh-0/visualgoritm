import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { generateArray } from './utils/generateArray';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import UserMenu from './components/auth/UserMenu';
import ArrayVisualizer from './components/ArrayVisualizer';
import CodeDebugger from './components/CodeDebugger';
import GraphVisualizer from './components/GraphVisualizer';
import { sampleGraph, graphNodes } from './algorithms/bfs';
import { algorithms } from './algorithms';
import TheoryPanel from './components/TheoryPanel';

// Компонент для кнопки входа
const LoginButton = ({ onClick }) => (
  <button className="login-button" onClick={onClick}>
    Войти / Регистрация
  </button>
);

// Главный компонент с auth логикой
const AppContent = () => {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');

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
          <div className="algorithms-menu">
            <button className="menu-trigger">📋 Алгоритмы ▼</button>
            <div className="menu-dropdown">
              <div className="menu-category">
                <div className="category-title">📊 Сортировка</div>
                <div className="category-items">
                  <span onClick={() => setSelectedAlgorithm('bubble')}>Пузырьковая</span>
                  <span onClick={() => setSelectedAlgorithm('selection')}>Выбором</span>
                  <span onClick={() => setSelectedAlgorithm('insertion')}>Вставками</span>
                  <span onClick={() => setSelectedAlgorithm('quick')}>Быстрая</span>
                </div>
              </div>
              <div className="menu-category">
                <div className="category-title">🔍 Поиск</div>
                <div className="category-items">
                  <span onClick={() => setSelectedAlgorithm('binarySearch')}>Бинарный поиск</span>
                  <span onClick={() => setSelectedAlgorithm('linearSearch')}>Линейный поиск</span>
                </div>
              </div>
              <div className="menu-category">
                <div className="category-title">🕸 Графы</div>
                <div className="category-items">
                  <span onClick={() => setSelectedAlgorithm('bfs')}>BFS (обход в ширину)</span>
                  <span onClick={() => setSelectedAlgorithm('dfs')}>DFS (обход в глубину)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-section">
            {user ? <UserMenu /> : <LoginButton onClick={() => setIsAuthModalOpen(true)} />}
          </div>
        </div>
      </header>
      <main className="app-main">
        <AlgorithmVisualizer 
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
        />
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

// Компонент визуализации алгоритмов
const AlgorithmVisualizer = ({ selectedAlgorithm, onAlgorithmChange }) => {
  const [array, setArray] = useState(generateArray(6));
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const speed = 500;
  const [isSorted, setIsSorted] = useState(false);
  const graphData = { nodes: graphNodes, edges: sampleGraph };
  const { user, updateStats, updateProgress} = useAuth();
  
  const timerRef = useRef(null);
  const isGraphAlgorithm = algorithms[selectedAlgorithm]?.type === 'graph';


  const saveAlgorithmCompletion = useCallback(() => {
    if (!user) return;
    
    // Сохраняем прогресс (алгоритм изучен)
    if (!progressSavedRef.current) {
      progressSavedRef.current = true;
      updateProgress(selectedAlgorithm);
      console.log('✅ Прогресс сохранён для:', selectedAlgorithm);
    }
    
    // Сохраняем статистику выполнения
    if (!hasSavedRef.current && steps.length > 0) {
      hasSavedRef.current = true;
      updateStats(selectedAlgorithm, steps.length);
      console.log('✅ Статистика сохранена для:', selectedAlgorithm, steps.length);
    }
  }, [user, selectedAlgorithm, steps.length, updateProgress, updateStats]);

  // Генерация шагов
  useEffect(() => {
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
      saveAlgorithmCompletion(); 
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed, saveAlgorithmCompletion]);
  
  // useEffect для сохранения прогресса и статистики при завершении
  const hasSavedRef = useRef(false);
  const progressSavedRef = useRef(false);
  
  useEffect(() => {
    if (isSorted && steps.length > 0 && user && !hasSavedRef.current) {
      hasSavedRef.current = true;
      updateStats(selectedAlgorithm, steps.length);
    } else if (!isSorted) {
      // Сбрасываем флаг при новой сортировке
      hasSavedRef.current = false;
    }
  }, [isSorted, steps.length, user, selectedAlgorithm, updateStats]);

  // Сохраняем прогресс при смене алгоритма
  const prevAlgorithmRef = useRef(selectedAlgorithm);

  // Функции управления
  const handleNewArray = () => {
    setIsPlaying(false);
    const newSize = Math.floor(Math.random() * 6) + 5;
    setArray(generateArray(newSize));
    hasSavedRef.current = false;
    progressSavedRef.current = false;  // ← сброс
    setIsSorted(false);
  };
  
  const handlePlayPause = () => {
    if (isSorted) {
      setCurrentStep(0);
      setIsSorted(false);
      setIsPlaying(true);
      progressSavedRef.current = false; // Сбрасываем флаг при повторном запуске
    } else {
      setIsPlaying(!isPlaying);
    }
    
    // Сохраняем прогресс при первом запуске (не пауза)
    if (!isPlaying && !isSorted && user && !progressSavedRef.current) {
      progressSavedRef.current = true;
      updateProgress(selectedAlgorithm);
    }
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
  
  const handleAlgorithmChange = (algorithmId) => {
    setIsPlaying(false);
    onAlgorithmChange(algorithmId);
    setCurrentStep(0);
    setIsSorted(false);
    hasSavedRef.current = false;
    progressSavedRef.current = false;  // ← сброс
  };

  // Данные текущего шага
  const currentStepData = steps[currentStep] || {
    array: array,
    comparing: [],
    swapped: [],
    description: "Готов к сортировке...",
    codeLine: 1,
    variables: {}
  };
  
  // Получаем код текущего алгоритма
  const currentCode = algorithms[selectedAlgorithm]?.code || [];
  
  // Прогресс в процентах
  const progressPercent = steps.length > 0
    ? Math.round((currentStep / (steps.length - 1)) * 100)
    : 0;

  return (
    <div className="algorithm-visualizer">      
      {/* Двухколоночный layout */}
      <div className="visualization-layout">
        {/* Левая колонка - визуализация*/}
        <div className="visualization-column">
          <div className="visualization-section">
            <h3 className="section-title">{'Визуализация алгоритма'}</h3>
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
                  <span className="stat-label">Прогресс:</span>
                  <span className="stat-value">{progressPercent}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Статус:</span>
                  <span className={`stat-value ${isSorted ? 'sorted' : ''}`}>
                    {isSorted ? '✅ Выполнено' : isPlaying ? '▶ Выполняется...' : '⏸ Пауза'}
                  </span>
                </div>
              </div>
                {isGraphAlgorithm ? (
                <GraphVisualizer
                  graph={currentStepData.graph || graphData}
                  visitedNodes={currentStepData.visitedNodes || []}
                  queueNodes={currentStepData.queueNodes || []}
                  currentNode={currentStepData.currentNode}
                />
                ) : (
                  <ArrayVisualizer
                    array={currentStepData.array}
                    comparing={currentStepData.comparing}
                    swapped={currentStepData.swapped}
                  />
                )}
            <div className={`step-description ${isSorted ? 'sorted' : ''}`}>
              {isSorted ? '✅ ' : '📝 '}
              {currentStepData.description}
            </div>
          </div>
        </div>
        
        {/* Правая колонка - отладка кода */}
        <div className="debugger-column">
          <CodeDebugger
            code={currentCode}
            currentLine={currentStepData.codeLine}
            variables={currentStepData.variables || {}}
            stepDescription={currentStepData.description}
            onNewData={handleNewArray}
            onStepBack={handleStepBackward}
            onStepForward={handleStepForward}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            isPlaying={isPlaying}
            isSorted={isSorted}
            canStepBack={currentStep > 0}
            canStepForward={currentStep < steps.length - 1}
          />
        </div>
      </div>
      
      {/* Информация об алгоритме (краткая) */}
{/*       <div className="algorithm-info">
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
 */}
      {/* Расширенная теория */}
      <TheoryPanel theory={algorithms[selectedAlgorithm]?.theory} />
    </div>
  );
};

export default App;