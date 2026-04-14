/**
 * Сортировка выбором с возвратом истории шагов и подсветкой кода
 */

export const selectionSortCode = [
  { line: 1, code: 'function selectionSort(arr) {' },
  { line: 2, code: '  const n = arr.length;' },
  { line: 3, code: '  for (let i = 0; i < n - 1; i++) {' },
  { line: 4, code: '    let minIndex = i;' },
  { line: 5, code: '    for (let j = i + 1; j < n; j++) {' },
  { line: 6, code: '      if (arr[j] < arr[minIndex]) {' },
  { line: 7, code: '        minIndex = j;' },
  { line: 8, code: '      }' },
  { line: 9, code: '    }' },
  { line: 10, code: '    if (minIndex !== i) {' },
  { line: 11, code: '      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];' },
  { line: 12, code: '    }' },
  { line: 13, code: '  }' },
  { line: 14, code: '  return arr;' },
  { line: 15, code: '}' }
];

export function selectionSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;

  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "Начало сортировки выбором",
    codeLine: 1,
    variables: { n }
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Начало внешнего цикла
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Ищем минимальный элемент, начиная с позиции ${i}`,
      codeLine: 3,
      variables: { i, minIndex, n }
    });

    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Предполагаем, что минимальный элемент - на позиции ${i} (значение ${arr[i]})`,
      codeLine: 4,
      variables: { i, minIndex, n }
    });

    for (let j = i + 1; j < n; j++) {
      // Внутренний цикл
      steps.push({
        array: [...arr],
        comparing: [minIndex, j],
        swapped: [],
        description: `Сравниваем текущий минимальный (${arr[minIndex]}) с элементом на позиции ${j} (${arr[j]})`,
        codeLine: 5,
        variables: { i, j, minIndex, n }
      });

      // Проверка условия
      steps.push({
        array: [...arr],
        comparing: [minIndex, j],
        swapped: [],
        description: `${arr[j]} < ${arr[minIndex]}?`,
        codeLine: 6,
        variables: { i, j, minIndex, n, current: arr[j], minValue: arr[minIndex] }
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...arr],
          comparing: [minIndex],
          swapped: [],
          description: `Найден новый минимальный элемент: ${arr[minIndex]} на позиции ${minIndex}`,
          codeLine: 7,
          variables: { i, j, minIndex, n }
        });
      } else {
        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [],
          description: `Текущий минимальный элемент остается на позиции ${minIndex}`,
          codeLine: 8,
          variables: { i, j, minIndex, n }
        });
      }
    }

    // Конец внутреннего цикла
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      description: `Минимальный элемент в оставшейся части - ${arr[minIndex]} на позиции ${minIndex}`,
      codeLine: 9,
      variables: { i, minIndex, n }
    });

    // Проверка, нужен ли обмен
    steps.push({
      array: [...arr],
      comparing: [i, minIndex],
      swapped: [],
      description: `Проверяем, нужно ли менять элементы: minIndex (${minIndex}) != i (${i})?`,
      codeLine: 10,
      variables: { i, minIndex, n }
    });

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [i, minIndex],
        swapped: [i, minIndex],
        description: `Меняем местами ${arr[i]} и ${arr[minIndex]}`,
        codeLine: 11,
        variables: { i, minIndex, n, swapped: true }
      });
    } else {
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Обмен не нужен, элемент уже на своем месте`,
        codeLine: 12,
        variables: { i, minIndex, n }
      });
    }

    // Элемент на позиции i отсортирован
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [i],
      description: `Элемент на позиции ${i} теперь на своем месте`,
      codeLine: 12,
      variables: { i, n }
    });
  }

  // Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [...arr.keys()],
    description: "✅ Сортировка выбором завершена!",
    codeLine: 14,
    codeHighlight: "Возвращаем отсортированный массив"
  });

  return steps;
}

export const selectionSortInfo = {
  name: "Сортировка выбором",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  description: "На каждом проходе ищет минимальный элемент и ставит его в начало неотсортированной части."
};

export const selectionSortTheory = {
  title: "🎯 Сортировка выбором (Selection Sort)",
  principle: "На каждом проходе находим минимальный элемент и ставим его в начало неотсортированной части.",
  
  steps: [
    "1. Ищем минимальный элемент в неотсортированной части массива",
    "2. Меняем его местами с первым неотсортированным элементом",
    "3. Сдвигаем границу отсортированной части вправо",
    "4. Повторяем, пока весь массив не будет отсортирован"
  ],
  
  pros: [
    "✅ Простой и интуитивный",
    "✅ Работает на месте",
    "✅ Минимальное количество обменов (n-1)",
    "✅ Хорош для массивов с дорогой операцией записи"
  ],
  
  cons: [
    "❌ Медленный (O(n²) всегда)",
    "❌ Нестабильный",
    "❌ Не адаптируется к данным (всегда n² сравнений)"
  ],
  
  example: "[5, 2, 4, 6, 1, 3]\n\n" +
    "Шаг 1: min=1 → [1, 2, 4, 6, 5, 3]\n" +
    "Шаг 2: min=2 → [1, 2, 4, 6, 5, 3]\n" +
    "Шаг 3: min=3 → [1, 2, 3, 6, 5, 4]\n" +
    "Шаг 4: min=4 → [1, 2, 3, 4, 5, 6]\n" +
    "Шаг 5: min=5 → [1, 2, 3, 4, 5, 6]",
  
  whenToUse: "Когда количество операций записи критично (например, EEPROM память). Для обычных массивов не рекомендуется.",
  
  visualHint: "Красным подсвечивается текущий минимальный элемент. После каждого прохода один элемент встаёт на своё место (зелёный)."
};