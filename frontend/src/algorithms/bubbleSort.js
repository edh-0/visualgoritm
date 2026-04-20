/**
 * Пузырьковая сортировка с возвратом истории шагов и подсветкой кода
 * @param {number[]} initialArray - исходный массив
 * @returns {Array} Массив объектов-шагов для анимации
 */

// Код алгоритма для отображения в дебаггере
export const bubbleSortCode = [
  { line: 1, code: 'function bubbleSort(arr) {' },
  { line: 2, code: '  const n = arr.length;' },
  { line: 3, code: '  for (let i = 0; i < n - 1; i++) {' },
  { line: 4, code: '    for (let j = 0; j < n - i - 1; j++) {' },
  { line: 5, code: '      if (arr[j] > arr[j + 1]) {' },
  { line: 6, code: '        // Меняем элементы местами' },
  { line: 7, code: '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];' },
  { line: 8, code: '      }' },
  { line: 9, code: '    }' },
  { line: 10, code: '  }' },
  { line: 11, code: '  return arr;' },
  { line: 12, code: '}' }
];

export function bubbleSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;

  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "Начальное состояние массива",
    codeLine: 1,
    codeHighlight: "Начало выполнения функции"
  });

  // Основной алгоритм пузырьковой сортировки
  for (let i = 0; i < n - 1; i++) {
    // Отмечаем начало внешнего цикла 
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      description: `Начало прохода ${i + 1}, i = ${i}`,
      codeLine: 3,
      variables: { i, j: null, n }
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Внутренний цикл (строка 4)
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: [],
        description: `Сравниваем элементы на позициях ${j} и ${j + 1}`,
        codeLine: 4,
        variables: { i, j, n }
      });

      // Проверка условия (строка 5)
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: [],
        description: `Проверяем: ${arr[j]} > ${arr[j + 1]}?`,
        codeLine: 5,
        variables: { i, j, n, left: arr[j], right: arr[j + 1] }
      });

      if (arr[j] > arr[j + 1]) {
        // Обмен элементов (строка 7)
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: [j, j + 1],
          description: `Меняем местами ${arr[j]} и ${arr[j + 1]}`,
          codeLine: 7,
          variables: { i, j, n, swapped: true }
        });
      } else {
        // Если обмен не нужен
        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [],
          description: `Элементы уже в правильном порядке`,
          codeLine: 8,
          variables: { i, j, n, swapped: false }
        });
      }
    }
    
    // Конец внутреннего цикла (строка 9)
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [n - i - 1],
      description: `Элемент на позиции ${n - i - 1} теперь на своем месте`,
      codeLine: 9,
      variables: { i, n }
    });
  }

  // Конец внешнего цикла (строка 10-11)
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "✅ Массив полностью отсортирован!",
    codeLine: 11,
    codeHighlight: "Возвращаем отсортированный массив"
  });

  return steps;
}

export const bubbleSortInfo = {
  name: "Пузырьковая сортировка",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  description: "Попарно сравнивает соседние элементы и меняет их местами, если они не в порядке."
};

export const bubbleSortTheory = {
  title: "🫧 Пузырьковая сортировка (Bubble Sort)",
  principle: "Соседние элементы сравниваются и меняются местами, если они в неправильном порядке. Самый большой элемент 'всплывает' в конец на каждом проходе.",
  
  steps: [
    "1. Проходим по массиву, сравнивая пары соседних элементов",
    "2. Если элементы в неправильном порядке — меняем их местами",
    "3. После каждого прохода самый большой элемент оказывается в конце",
    "4. Повторяем, пока массив не отсортирован"
  ],
  
  pros: [
    "✅ Простейший для понимания",
    "✅ Легко реализовать",
    "✅ Стабильный",
    "✅ Работает на месте"
  ],
  
  cons: [
    "❌ Очень медленный (O(n²) всегда)",
    "❌ Не подходит для реальных задач",
    "❌ Много лишних сравнений"
  ],
  
  example: "[5, 2, 4, 6, 1, 3]\n\n" +
    "Проход 1: [2, 4, 5, 1, 3, 6]\n" +
    "Проход 2: [2, 4, 1, 3, 5, 6]\n" +
    "Проход 3: [2, 1, 3, 4, 5, 6]\n" +
    "Проход 4: [1, 2, 3, 4, 5, 6]",
  
  whenToUse: "Только для обучения. В реальных проектах не используется из-за низкой производительности.",
  
  visualHint: "Красные элементы — сравниваются. Зелёные — после обмена. Элементы справа постепенно становятся отсортированными."
};