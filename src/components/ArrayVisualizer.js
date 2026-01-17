// components/ArrayVisualizer.js
import React from 'react';
import './ArrayVisualizer.css';

function ArrayVisualizer({ array = [], comparing = [], swapped = [] }) {
  if (!array.length) {
    return <div className="no-data">Нет данных для отображения</div>;
  }

  // Находим максимальное значение для нормализации высоты
  const maxValue = Math.max(...array);
  
  return (
    <div className="array-container">
      {array.map((value, index) => {
        // Определяем цвет и классы
        let barClass = 'array-bar';
        let backgroundColor = '#3498db'; // синий по умолчанию
        
        if (comparing.includes(index)) {
          backgroundColor = '#e74c3c'; // красный для сравнения
          barClass += ' comparing';
        }
        if (swapped.includes(index)) {
          backgroundColor = '#2ecc71'; // зелёный для обмена
          barClass += ' swapped';
        }
        
        // Высота в процентах от максимального значения
        const heightPercent = (value / maxValue) * 100;

        return (
          <div
            key={index}
            className={barClass}
            style={{
              height: `${heightPercent}%`, // Проценты вместо пикселей
              backgroundColor: backgroundColor,
              width: `${80 / array.length}%` // Адаптивная ширина
            }}
          >
            <span className="bar-value">{value}</span>
            <div className="bar-index">{index}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ArrayVisualizer;