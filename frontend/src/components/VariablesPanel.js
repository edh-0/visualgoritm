import React from 'react';
import './VariablesPanel.css';

const VariablesPanel = ({ variables = {}, stepInfo = {} }) => {
  // Определяем тип переменных для разной подсветки
  const getVariableType = (key, value) => {
    if (key === 'i' || key === 'j' || key === 'minIndex') return 'loop';
    if (key === 'n' || key === 'length') return 'constant';
    if (key === 'key' || key === 'temp') return 'temporary';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) return 'array';
    return 'default';
  };

  // Фильтруем важные переменные
  const importantVars = ['i', 'j', 'key', 'minIndex', 'n', 'swapped', 'sorted', 'left', 'right'];
  const filteredVars = Object.entries(variables)
    .filter(([key]) => importantVars.includes(key) || key !== 'n')
    .slice(0, 8);

  if (filteredVars.length === 0) {
    return (
      <div className="variables-panel">
        <h4> Переменные</h4>
        <div className="variables-empty">
          <span className="empty-icon">🔍</span>
          <p>Нет переменных для отображения</p>
        </div>
      </div>
    );
  }

  return (
    <div className="variables-panel">
      <div className="variables-header">
        <h4> Переменные</h4>
        <span className="variables-count">{filteredVars.length}</span>
      </div>
      
      <div className="variables-grid">
        {filteredVars.map(([key, value]) => {
          const type = getVariableType(key, value);
          let displayValue = value;
          
          // Форматируем значение для отображения
          if (typeof value === 'boolean') {
            displayValue = value ? 'true ✓' : 'false ✗';
          } else if (typeof value === 'object' && value !== null) {
            displayValue = JSON.stringify(value);
          } else if (value === null || value === undefined) {
            displayValue = '—';
          }
          
          return (
            <div key={key} className={`variable-item variable-${type}`}>
              <span className="variable-name">{key}</span>
              <span className="variable-value">{displayValue}</span>
              {type === 'loop' && (
                <span className="variable-badge">итерация</span>
              )}
              {type === 'temporary' && (
                <span className="variable-badge temp">временная</span>
              )}
            </div>
          );
        })}
      </div>

      {stepInfo.description && (
        <div className="step-context">
          <div className="step-context-icon">💡</div>
          <div className="step-context-text">{stepInfo.description}</div>
        </div>
      )}
    </div>
  );
};

export default VariablesPanel;