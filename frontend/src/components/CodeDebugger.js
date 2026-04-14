import React from 'react';
import VariablesPanel from './VariablesPanel';
import './CodeDebugger.css';

const CodeDebugger = ({ 
  code, 
  currentLine, 
  variables = {}, 
  stepDescription = '',
  onNewData,
  onStepBack,
  onStepForward,
  onPlayPause,
  onReset,
  isPlaying,
  isSorted,
  canStepBack,
  canStepForward
}) => {
  if (!code || code.length === 0) {
    return (
      <div className="code-debugger-empty">
        <p>📝 Выберите алгоритм для отображения кода</p>
      </div>
    );
  }

  return (
    <div className="code-debugger">
      <div className="code-header">
        <div className="code-title">
          <span className="code-icon"></span>
          <h3>Отладка кода</h3>
        </div>
        <div className="code-info">
          <div className="info-badge">
            <span className="badge-label">Строка</span>
            <span className="badge-value">{currentLine || '—'}</span>
          </div>
        </div>
        <div className="debugger-controls">
          <button className="debugger-btn" onClick={onNewData} title="Новые данные">
            🎲
          </button>
          <button 
            className="debugger-btn" 
            onClick={onStepBack} 
            disabled={!canStepBack}
            title="Шаг назад"
          >
            ⏪
          </button>
          <button 
            className={`debugger-btn play-pause ${isPlaying ? 'pause' : 'play'}`}
            onClick={onPlayPause}
            title={isPlaying ? 'Пауза' : isSorted ? 'С начала' : 'Старт'}
          >
            {isPlaying ? '⏸' : isSorted ? '🔄' : '▶'}
          </button>
          <button 
            className="debugger-btn" 
            onClick={onStepForward} 
            disabled={!canStepForward}
            title="Шаг вперёд"
          >
            ⏩
          </button>
          <button className="debugger-btn" onClick={onReset} title="Сброс">
            🔄
          </button>
        </div>
      </div>
      
      <div className="code-container">
        {code.map((line) => (
          <div
            key={line.line}
            className={`code-line ${currentLine === line.line ? 'active' : ''}`}
          >
            <span className="line-number">{line.line}</span>
            <span className="line-code">{line.code}</span>
            {currentLine === line.line && (
              <span className="execution-indicator">▶</span>
            )}
          </div>
        ))}
      </div>

      <VariablesPanel 
        variables={variables} 
        stepInfo={{ description: stepDescription }}
      />
    </div>
  );
};

export default CodeDebugger;