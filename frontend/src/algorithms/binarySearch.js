/**
 * Бинарный поиск с возвратом истории шагов
 */

export const binarySearchCode = [
  { line: 1, code: 'function binarySearch(arr, target) {' },
  { line: 2, code: '  let left = 0;' },
  { line: 3, code: '  let right = arr.length - 1;' },
  { line: 4, code: '  while (left <= right) {' },
  { line: 5, code: '    let mid = Math.floor((left + right) / 2);' },
  { line: 6, code: '    if (arr[mid] === target) {' },
  { line: 7, code: '      return mid;' },
  { line: 8, code: '    }' },
  { line: 9, code: '    if (arr[mid] < target) {' },
  { line: 10, code: '      left = mid + 1;' },
  { line: 11, code: '    } else {' },
  { line: 12, code: '      right = mid - 1;' },
  { line: 13, code: '    }' },
  { line: 14, code: '  }' },
  { line: 15, code: '  return -1;' },
  { line: 16, code: '}' }
];

export function binarySearchSteps(initialArray, target = null) {
  const steps = [];
  // Для бинарного поиска массив должен быть отсортирован
  const arr = [...initialArray].sort((a, b) => a - b);
  
  // Если цель не указана, выбираем случайный элемент из массива
  const searchTarget = target !== null ? target : arr[Math.floor(Math.random() * arr.length)];
  
  let left = 0;
  let right = arr.length - 1;
  
  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: `Начинаем бинарный поиск элемента ${searchTarget} в отсортированном массиве`,
    codeLine: 1,
    variables: { target: searchTarget, left, right, arr: arr.length }
  });
  
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: `Устанавливаем левую границу = ${left}, правую = ${right}`,
    codeLine: 2,
    variables: { target: searchTarget, left, right }
  });
  
  let foundIndex = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Отмечаем текущую итерацию
    steps.push({
      array: [...arr],
      comparing: [mid],
      swapped: [],
      description: `Вычисляем средний индекс: mid = (${left} + ${right}) / 2 = ${mid}`,
      codeLine: 4,
      variables: { target: searchTarget, left, right, mid, value: arr[mid] }
    });
    
    steps.push({
      array: [...arr],
      comparing: [mid],
      swapped: [],
      description: `Проверяем: arr[${mid}] = ${arr[mid]} === ${searchTarget}?`,
      codeLine: 5,
      variables: { target: searchTarget, left, right, mid, value: arr[mid] }
    });
    
    if (arr[mid] === searchTarget) {
      foundIndex = mid;
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapped: [mid],
        description: `✅ Нашли элемент ${searchTarget} на позиции ${mid}!`,
        codeLine: 6,
        variables: { target: searchTarget, left, right, mid, found: true }
      });
      break;
    }
    
    if (arr[mid] < searchTarget) {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapped: [],
        description: `${arr[mid]} < ${searchTarget}, ищем в правой половине`,
        codeLine: 9,
        variables: { target: searchTarget, left, right, mid, comparison: 'less' }
      });
      left = mid + 1;
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Сдвигаем левую границу: left = ${left}`,
        codeLine: 10,
        variables: { target: searchTarget, left, right }
      });
    } else {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapped: [],
        description: `${arr[mid]} > ${searchTarget}, ищем в левой половине`,
        codeLine: 11,
        variables: { target: searchTarget, left, right, mid, comparison: 'greater' }
      });
      right = mid - 1;
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Сдвигаем правую границу: right = ${right}`,
        codeLine: 12,
        variables: { target: searchTarget, left, right }
      });
    }
  }
  
  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      description: `❌ Элемент ${searchTarget} не найден в массиве`,
      codeLine: 15,
      variables: { target: searchTarget, left, right, found: false }
    });
  }
  
  return steps;
}

export const binarySearchInfo = {
  name: "Бинарный поиск",
  type: "search",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  description: "Эффективный алгоритм поиска в отсортированном массиве, который на каждом шаге делит область поиска пополам."
};

export const binarySearchTheory = {
  title: "🎯 Бинарный поиск (Binary Search)",
  principle: "Делим отсортированный массив пополам и определяем, в какой половине находится искомый элемент. Повторяем, пока не найдём.",
  
  steps: [
    "1. Определяем левую и правую границу поиска",
    "2. Находим средний элемент",
    "3. Если средний элемент = искомому → успех",
    "4. Если средний элемент < искомого → ищем в правой половине",
    "5. Если средний элемент > искомого → ищем в левой половине",
    "6. Повторяем шаги 2-5, пока границы не сомкнутся"
  ],
  
  pros: [
    "✅ Очень быстрый (O(log n))",
    "✅ Минимум сравнений",
    "✅ Простая реализация"
  ],
  
  cons: [
    "❌ Требует отсортированный массив",
    "❌ Не работает с несортированными данными",
    "❌ Плох для динамических данных (частые вставки/удаления)"
  ],
  
  example: "Поиск 4 в [1, 2, 3, 4, 5, 6]\n\n" +
    "Шаг 1: left=0, right=5, mid=2 (3) → 3<4 → left=3\n" +
    "Шаг 2: left=3, right=5, mid=4 (5) → 5>4 → right=3\n" +
    "Шаг 3: left=3, right=3, mid=3 (4) → Успех!",
  
  whenToUse: "Идеален для поиска в статических отсортированных данных: словари, телефонные книги, базы данных с индексом.",
  
  visualHint: "Синим подсвечивается текущая область поиска. Зелёным — найденный элемент."
};