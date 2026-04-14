/**
 * Сортировка вставками с возвратом истории шагов и подсветкой кода
 */

export const insertionSortCode = [
  { line: 1, code: 'function insertionSort(arr) {' },
  { line: 2, code: '  const n = arr.length;' },
  { line: 3, code: '  for (let i = 1; i < n; i++) {' },
  { line: 4, code: '    let key = arr[i];' },
  { line: 5, code: '    let j = i - 1;' },
  { line: 6, code: '    while (j >= 0 && arr[j] > key) {' },
  { line: 7, code: '      arr[j + 1] = arr[j];' },
  { line: 8, code: '      j--;' },
  { line: 9, code: '    }' },
  { line: 10, code: '    arr[j + 1] = key;' },
  { line: 11, code: '  }' },
  { line: 12, code: '  return arr;' },
  { line: 13, code: '}' }
];

export function insertionSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;

  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "Начало сортировки вставками",
    codeLine: 1,
    variables: { n }
  });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    // Начало внешнего цикла
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Начало итерации i = ${i}`,
      codeLine: 3,
      variables: { i, key, j, n }
    });

    // Сохраняем текущий элемент
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Берем элемент key = ${key} на позиции ${i}`,
      codeLine: 4,
      variables: { i, key, j, n }
    });

    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Начинаем с j = ${j}`,
      codeLine: 5,
      variables: { i, key, j, n }
    });

    // Внутренний цикл while
    let iterations = 0;
    while (j >= 0 && arr[j] > key) {
      // Начало while
      steps.push({
        array: [...arr],
        comparing: [j],
        swapped: [],
        description: `Проверяем условие: j = ${j} >= 0 и arr[${j}] = ${arr[j]} > key = ${key}?`,
        codeLine: 6,
        variables: { i, key, j, n, condition: true }
      });

      // Сдвигаем элемент
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [j],
        swapped: [j + 1],
        description: `Сдвигаем элемент ${arr[j]} на позицию ${j + 1}`,
        codeLine: 7,
        variables: { i, key, j, n, shifted: true }
      });

      j--;
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `Уменьшаем j: j = ${j}`,
        codeLine: 8,
        variables: { i, key, j, n }
      });
      
      iterations++;
    }

    // Если while не выполнился
    if (iterations === 0 && j >= 0 && arr[j] <= key) {
      steps.push({
        array: [...arr],
        comparing: [j],
        swapped: [],
        description: `Элемент ${key} уже больше или равен ${arr[j]}, вставка не нужна`,
        codeLine: 6,
        variables: { i, key, j, n, condition: false }
      });
    }

    // Конец while
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      description: `Завершаем while, вставляем key на позицию ${j + 1}`,
      codeLine: 9,
      variables: { i, key, j, n }
    });

    // Вставляем key на правильное место
    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      comparing: [j + 1],
      swapped: [j + 1],
      description: `Вставляем key = ${key} на позицию ${j + 1}`,
      codeLine: 10,
      variables: { i, key, j, n, inserted: true }
    });

    // Часть массива до i отсортирована
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `Элементы с 0 по ${i} отсортированы`,
      codeLine: 10,
      variables: { i, n, sorted: true }
    });
  }

  // Конец внешнего цикла
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: `Завершаем внешний цикл`,
    codeLine: 11,
    variables: { n }
  });

  // Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [...arr.keys()],
    description: "✅ Сортировка вставками завершена!",
    codeLine: 12,
    codeHighlight: "Возвращаем отсортированный массив"
  });

  return steps;
}

export const insertionSortInfo = {
  name: "Сортировка вставками",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  description: "Постепенно строит отсортированную часть, вставляя каждый новый элемент в нужное место."
};

export const insertionSortTheory = {
  title: "📥 Сортировка вставками (Insertion Sort)",
  principle: "Сортировка вставками работает подобно тому, как вы сортируете карты в руке. Вы берете одну карту и вставляете её в нужное место среди уже отсортированных.",
  
  steps: [
    "1. Начинаем со второго элемента (индекс 1), считая первый элемент отсортированной частью",
    "2. Сохраняем текущий элемент в переменную key",
    "3. Сравниваем key с элементами из отсортированной части (слева)",
    "4. Если элемент отсортированной части больше key, сдвигаем его вправо",
    "5. Повторяем шаг 4, пока не найдем место, где key >= текущего элемента",
    "6. Вставляем key в найденное место",
    "7. Переходим к следующему элементу и повторяем шаги 2-6"
  ],
  
  pros: [
    "✅ Прост в реализации и понимании",
    "✅ Эффективен на небольших массивах (до 50 элементов)",
    "✅ Стабильный (сохраняет порядок равных элементов)",
    "✅ Работает за O(n) на почти отсортированных данных",
    "✅ Требует O(1) дополнительной памяти"
  ],
  
  cons: [
    "❌ Медленный на больших массивах (O(n²))",
    "❌ Не подходит для случайных больших данных",
    "❌ Количество сравнений и обменов большое"
  ],
  
  example: "[5, 2, 4, 6, 1, 3]\n\n" +
    "Шаг 1: key=2 → [2, 5, 4, 6, 1, 3]\n" +
    "Шаг 2: key=4 → [2, 4, 5, 6, 1, 3]\n" +
    "Шаг 3: key=6 → [2, 4, 5, 6, 1, 3]\n" +
    "Шаг 4: key=1 → [1, 2, 4, 5, 6, 3]\n" +
    "Шаг 5: key=3 → [1, 2, 3, 4, 5, 6]",
  
  whenToUse: "Отлично подходит для небольших массивов (до 50 элементов), почти отсортированных данных, или когда данные поступают потоково (по одному элементу).",
  
  visualHint: "Обратите внимание на зелёные элементы слева — они уже отсортированы. Красные — сравниваются, синие — вставляются на свои места."
};