import React, { useState } from 'react';
import './TheoryPanel.css';

const TheoryPanel = ({ theory }) => {
  const [expandedSections, setExpandedSections] = useState({
    principle: true,
    steps: true,
    prosCons: true,
    example: false,
    whenToUse: false
  });

  if (!theory) {
    return (
      <div className="theory-panel">
        <div className="theory-placeholder">
          <span className="placeholder-icon">📚</span>
          <p>Выберите алгоритм, чтобы увидеть теорию</p>
        </div>
      </div>
    );
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="theory-panel">
      <div className="theory-header">
        <h3>{theory.title || '📖 Теория алгоритма'}</h3>
      </div>

      {/* Принцип работы */}
      <div className="theory-section">
        <div className="section-title" onClick={() => toggleSection('principle')}>
          <span className="toggle-icon">{expandedSections.principle ? '▼' : '▶'}</span>
          <span>💡 Принцип работы</span>
        </div>
        {expandedSections.principle && (
          <div className="section-content">
            <p>{theory.principle}</p>
          </div>
        )}
      </div>

      {/* Пошаговое описание */}
      <div className="theory-section">
        <div className="section-title" onClick={() => toggleSection('steps')}>
          <span className="toggle-icon">{expandedSections.steps ? '▼' : '▶'}</span>
          <span>📋 Пошаговое описание</span>
        </div>
        {expandedSections.steps && (
          <div className="section-content">
            <ul>
              {theory.steps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Плюсы и минусы */}
      <div className="theory-section">
        <div className="section-title" onClick={() => toggleSection('prosCons')}>
          <span className="toggle-icon">{expandedSections.prosCons ? '▼' : '▶'}</span>
          <span>👍 Плюсы и минусы</span>
        </div>
        {expandedSections.prosCons && (
          <div className="section-content pros-cons">
            <div className="pros">
              <h4>✅ Плюсы</h4>
              <ul>
                {theory.pros?.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>
            <div className="cons">
              <h4>❌ Минусы</h4>
              <ul>
                {theory.cons?.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Пример работы */}
      {theory.example && (
        <div className="theory-section">
          <div className="section-title" onClick={() => toggleSection('example')}>
            <span className="toggle-icon">{expandedSections.example ? '▼' : '▶'}</span>
            <span>🔍 Пример работы</span>
          </div>
          {expandedSections.example && (
            <div className="section-content">
              <pre className="example-code">{theory.example}</pre>
            </div>
          )}
        </div>
      )}

      {/* Когда использовать */}
      {theory.whenToUse && (
        <div className="theory-section">
          <div className="section-title" onClick={() => toggleSection('whenToUse')}>
            <span className="toggle-icon">{expandedSections.whenToUse ? '▼' : '▶'}</span>
            <span>🎯 Когда использовать</span>
          </div>
          {expandedSections.whenToUse && (
            <div className="section-content">
              <p>{theory.whenToUse}</p>
            </div>
          )}
        </div>
      )}

      {/* Визуальная подсказка */}
      {theory.visualHint && (
        <div className="theory-visual-hint">
          <span className="hint-icon">👁️</span>
          <span>{theory.visualHint}</span>
        </div>
      )}
    </div>
  );
};

export default TheoryPanel;