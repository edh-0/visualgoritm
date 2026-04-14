/**
 * Быстрая сортировка (Quick Sort) с возвратом истории шагов
 */

export const quickSortCode = [
  { line: 1, code: 'function quickSort(arr, low = 0, high = arr.length - 1) {' },
  { line: 2, code: '  if (low < high) {' },
  { line: 3, code: '    const pivotIndex = partition(arr, low, high);' },
  { line: 4, code: '    quickSort(arr, low, pivotIndex - 1);' },
  { line: 5, code: '    quickSort(arr, pivotIndex + 1, high);' },
  { line: 6, code: '  }' },
  { line: 7, code: '  return arr;' },
  { line: 8, code: '}' },
  { line: 9, code: '' },
  { line: 10, code: 'function partition(arr, low, high) {' },
  { line: 11, code: '  const pivot = arr[high];' },
  { line: 12, code: '  let i = low - 1;' },
  { line: 13, code: '  for (let j = low; j < high; j++) {' },
  { line: 14, code: '    if (arr[j] <= pivot) {' },
  { line: 15, code: '      i++;' },
  { line: 16, code: '      [arr[i], arr[j]] = [arr[j], arr[i]];' },
  { line: 17, code: '    }' },
  { line: 18, code: '  }' },
  { line: 19, code: '  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];' },
  { line: 20, code: '  return i + 1;' },
  { line: 21, code: '}' }
];

export function quickSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  
  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "Начало быстрой сортировки",
    codeLine: 1,
    variables: { low: 0, high: arr.length - 1, arr: arr.length }
  });

  function partition(low, high, depth = 0) {
    const pivot = arr[high];
    let i = low - 1;
    
    // Выбор опорного элемента
    steps.push({
      array: [...arr],
      comparing: [high],
      swapped: [],
      description: `Выбираем опорный элемент (pivot) = ${pivot} на позиции ${high}`,
      codeLine: 11,
      variables: { low, high, pivot, i, depth }
    });
    
    for (let j = low; j < high; j++) {
      // Сравнение с опорным элементом
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapped: [],
        description: `Сравниваем arr[${j}] = ${arr[j]} с pivot = ${pivot}`,
        codeLine: 14,
        variables: { low, high, i, j, pivot, depth }
      });
      
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          // Обмен элементов
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            comparing: [i, j],
            swapped: [i, j],
            description: `Меняем местами arr[${i}] = ${arr[i]} и arr[${j}] = ${arr[j]}`,
            codeLine: 16,
            variables: { low, high, i, j, pivot, depth, swapped: true }
          });
        } else {
          steps.push({
            array: [...arr],
            comparing: [i, j],
            swapped: [],
            description: `Элемент arr[${j}] уже на своем месте`,
            codeLine: 15,
            variables: { low, high, i, j, pivot, depth }
          });
        }
      }
    }
    
    // Ставим опорный элемент на правильное место
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    const pivotIndex = i + 1;
    
    steps.push({
      array: [...arr],
      comparing: [pivotIndex],
      swapped: [pivotIndex, high],
      description: `Опорный элемент ${pivot} помещен на позицию ${pivotIndex}`,
      codeLine: 19,
      variables: { low, high, pivotIndex, pivot, depth }
    });
    
    return pivotIndex;
  }
  
  function quickSortRecursive(low, high, depth = 0) {
    if (low < high) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Сортируем подмассив от ${low} до ${high}`,
        codeLine: 2,
        variables: { low, high, depth }
      });
      
      const pivotIndex = partition(low, high, depth);
      
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Рекурсивно сортируем левую часть (${low} до ${pivotIndex - 1})`,
        codeLine: 4,
        variables: { low, high: pivotIndex - 1, pivotIndex, depth: depth + 1 }
      });
      quickSortRecursive(low, pivotIndex - 1, depth + 1);
      
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Рекурсивно сортируем правую часть (${pivotIndex + 1} до ${high})`,
        codeLine: 5,
        variables: { low: pivotIndex + 1, high, pivotIndex, depth: depth + 1 }
      });
      quickSortRecursive(pivotIndex + 1, high, depth + 1);
    } else if (low === high) {
      steps.push({
        array: [...arr],
        comparing: [low],
        swapped: [],
        description: `Элемент на позиции ${low} уже отсортирован`,
        codeLine: 6,
        variables: { low, high }
      });
    }
  }
  
  quickSortRecursive(0, arr.length - 1);
  
  // Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [...arr.keys()],
    description: "✅ Быстрая сортировка завершена!",
    codeLine: 7,
    codeHighlight: "Массив полностью отсортирован"
  });
  
  return steps;
}

export const quickSortInfo = {
  name: "Быстрая сортировка",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(log n)",
  description: "Рекурсивный алгоритм, использующий опорный элемент для разделения массива на подмассивы."
};

export const quickSortTheory = {
  title: "⚡ Быстрая сортировка (Quick Sort)",
  principle: "Разделяй и властвуй! Выбираем опорный элемент, делим массив на две части (меньше опорного и больше), рекурсивно сортируем каждую часть.",
  
  steps: [
    "1. Выбираем опорный элемент (обычно последний или средний)",
    "2. Разбиваем массив: все элементы ≤ опорного — слева, > опорного — справа",
    "3. Рекурсивно применяем шаги 1-2 к левой и правой частям",
    "4. Базовый случай: подмассив из 1 элемента уже отсортирован"
  ],
  
  pros: [
    "✅ Очень быстрый на практике (O(n log n) в среднем)",
    "✅ Работает на месте (O(log n) дополнительной памяти)",
    "✅ Отлично работает с большими массивами",
    "✅ Широко используется в стандартных библиотеках"
  ],
  
  cons: [
    "❌ Нестабильный (может менять порядок равных элементов)",
    "❌ Плохие данные могут дать O(n²)",
    "❌ Сложнее в реализации",
    "❌ Рекурсия может переполнить стек на очень больших данных"
  ],
  
  example: "[5, 2, 4, 6, 1, 3], опорный=3\n\n" +
    "Разбиение: [2, 1] 3 [5, 4, 6]\n" +
    "Рекурсия: [1, 2] → [4, 5, 6]\n" +
    "Результат: [1, 2, 3, 4, 5, 6]",
  
  whenToUse: "Лучший выбор для больших случайных массивов. Используется в большинстве стандартных библиотек сортировки.",
  
  visualHint: "Опорный элемент подсвечивается зелёным. Элементы меньше опорного собираются слева, больше — справа."
};