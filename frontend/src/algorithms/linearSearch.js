/**
 * Линейный поиск с возвратом истории шагов
 */

export const linearSearchCode = [
  { line: 1, code: 'function linearSearch(arr, target) {' },
  { line: 2, code: '  for (let i = 0; i < arr.length; i++) {' },
  { line: 3, code: '    if (arr[i] === target) {' },
  { line: 4, code: '      return i;' },
  { line: 5, code: '    }' },
  { line: 6, code: '  }' },
  { line: 7, code: '  return -1;' },
  { line: 8, code: '}' }
];

export function linearSearchSteps(initialArray, target = null) {
  const steps = [];
  const arr = [...initialArray];
  
  // Если цель не указана, выбираем случайный элемент
  const searchTarget = target !== null ? target : arr[Math.floor(Math.random() * arr.length)];
  
  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: `Начинаем линейный поиск элемента ${searchTarget}`,
    codeLine: 1,
    variables: { target: searchTarget, i: 0 }
  });
  
  let foundIndex = -1;
  
  for (let i = 0; i < arr.length; i++) {
    // Показываем текущий проверяемый элемент
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Проверяем элемент на позиции ${i} со значением ${arr[i]}`,
      codeLine: 2,
      variables: { target: searchTarget, i, currentValue: arr[i] }
    });
    
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `${arr[i]} === ${searchTarget}?`,
      codeLine: 3,
      variables: { target: searchTarget, i, currentValue: arr[i] }
    });
    
    if (arr[i] === searchTarget) {
      foundIndex = i;
      steps.push({
        array: [...arr],
        comparing: [i],
        swapped: [i],
        description: `✅ Нашли элемент ${searchTarget} на позиции ${i}!`,
        codeLine: 4,
        variables: { target: searchTarget, i, found: true }
      });
      break;
    }
  }
  
  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      description: `❌ Элемент ${searchTarget} не найден в массиве`,
      codeLine: 7,
      variables: { target: searchTarget, found: false }
    });
  }
  
  return steps;
}

export const linearSearchInfo = {
  name: "Линейный поиск",
  type: "search",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  description: "Последовательно проверяет каждый элемент массива, пока не найдёт искомый."
};

export const linearSearchTheory = {
  title: "🔍 Линейный поиск (Linear Search)",
  principle: "Последовательно перебирает все элементы массива, сравнивая их с искомым значением.",
  steps: [
    "1. Начинаем с первого элемента массива",
    "2. Сравниваем текущий элемент с искомым",
    "3. Если совпадает — возвращаем индекс",
    "4. Если нет — переходим к следующему элементу",
    "5. Если массив закончился — возвращаем -1"
  ],
  pros: [
    "✅ Простейший в реализации",
    "✅ Не требует сортировки массива",
    "✅ Работает с любыми типами данных",
    "✅ Хорош для небольших массивов"
  ],
  cons: [
    "❌ Медленный на больших массивах (O(n))",
    "❌ Не использует преимущества упорядоченных данных"
  ],
  example: "Поиск 4 в [5, 2, 4, 6, 1, 3]\n\n" +
    "Шаг 1: 5 === 4? Нет\n" +
    "Шаг 2: 2 === 4? Нет\n" +
    "Шаг 3: 4 === 4? Да → индекс 2",
  whenToUse: "Для небольших массивов, неотсортированных данных, или когда нужно найти первое вхождение.",
  visualHint: "Красным подсвечивается текущий проверяемый элемент. Зелёным — найденный."
};